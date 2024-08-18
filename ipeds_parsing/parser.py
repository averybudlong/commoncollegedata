import math
import pandas as pd
from dotenv import load_dotenv
import os
from supabase import create_client, Client
from attribute_maps import (
  colsCollege,
  colsCDS,
  colsHeadCountUndergrad,
  colsHeadCountGrad,
  colsFinancial,
)

# Loading local env variables
load_dotenv('../.env.local')
url: str = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.getenv("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

# Loading IPEDS csv data
collegeData = pd.read_csv('hd2022.csv', encoding_errors='replace')
cdsData = pd.read_csv('adm2022.csv')
financialData = pd.read_csv('drvf2022.csv')
headCountData = pd.read_csv('effy2022.csv')

# This function normalizes the data ingested from the IPEDS csv files
def processMap(dataMap, currentCollege, row):
    for attribute in dataMap:
        value = row[dataMap.get(attribute)]

        if attribute in ['latitude', 'longitude']:
            currentCollege[attribute] = value

        elif attribute in ['website', 'app_website']:
          if not value.startswith('https://') and not value.startswith('http://'):
            value = 'https://' + value
          currentCollege[attribute] = value

        elif isinstance(value, str):
            currentCollege[attribute] = value if value else None

        elif isinstance(value, pd.Series):
            item = value.item() if not value.empty else None

            # sometimes the column value is a "." when it should be null
            if item is None or item == '.' or (not isinstance(item, str) and math.isnan(item)):
                currentCollege[attribute] = None
            else:
                currentCollege[attribute] = int(item)

        else:
            item = value.item()
            if (not isinstance(item, str) and math.isnan(item)):
                currentCollege[attribute] = None
            else:
                currentCollege[attribute] = int(item)
        
        # The headcount shouldn't ever be null. If it is null its assumed the headcount is 0
        if attribute in colsHeadCountGrad or attribute in colsHeadCountUndergrad:
          if currentCollege[attribute] == None:
             currentCollege[attribute] = 0
              
def getCollegeData(i):
  currentCollege = {}
  collegeDataRow = collegeData.iloc[i]
  currentCollegeId = collegeDataRow['UNITID'].item()
  cdsDataRow = cdsData.query(f'UNITID == {currentCollegeId}')

  # Excludes colleges with less than 2000 applicants to reduce data
  if cdsDataRow['APPLCN'].empty or cdsDataRow['APPLCN'].item() < 2000:
    print("skipped: #", i)
    return

  # EFFYALEV is the identifier for schooling level (undergrad vs grad)
  headCountUndergradDataRow = headCountData.query(f'UNITID == {currentCollegeId} and EFFYALEV == {2}')
  headCountGradDataRow = headCountData.query(f'UNITID == {currentCollegeId} and EFFYALEV == {12}')
  financialDataRow = financialData.query(f'UNITID == {currentCollegeId}')

  # Populating currentCollege object
  processMap(colsCollege, currentCollege, collegeDataRow)
  processMap(colsCDS, currentCollege, cdsDataRow)
  processMap(colsCDS, currentCollege, cdsDataRow)
  processMap(colsHeadCountUndergrad, currentCollege, headCountUndergradDataRow)
  processMap(colsHeadCountGrad, currentCollege, headCountGradDataRow)
  processMap(colsFinancial, currentCollege, financialDataRow)

  return currentCollege

def addAllCollegesToSupabase():
  for i in range(len(collegeData)):
    newCollege = getCollegeData(i)
    
    if not newCollege:
      continue

    try:
      supabase.table('colleges').upsert(newCollege).execute()
      print(f"added {newCollege['name']}")
    except Exception as e:
      print(e)

addAllCollegesToSupabase()
    
    