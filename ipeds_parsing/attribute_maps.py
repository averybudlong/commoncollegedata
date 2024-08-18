'''
Maps supabase column names to the IPEDS provided column names in the csv files
'''

colsCollege = {
    'id': 'UNITID',
    'name': 'INSTNM',
    'alias': 'IALIAS',
    'city': 'CITY',
    'state': 'STABBR',
    'website': 'WEBADDR',
    'app_website': 'APPLURL',
    'longitude': 'LONGITUD',
    'latitude': 'LATITUDE',
}

colsCDS = {
    'standardized_test': 'ADMCON7',
    'applicants': 'APPLCN',
    'applicants_m': 'APPLCNM',
    'applicants_w': 'APPLCNW',
    'admitted': 'ADMSSN',
    'admitted_m': 'ADMSSNM',
    'admitted_w': 'ADMSSNW',
    'enrolled_cycle': 'ENRLT',
    'enrolled_cycle_m': 'ENRLM',
    'enrolled_cycle_w': 'ENRLW',
    'sat_pct': 'SATPCT',
    'act_pct': 'ACTPCT',
    'sat_rw25': 'SATVR25',
    'sat_rw50': 'SATVR50',
    'sat_rw75': 'SATVR75',
    'sat_m25': 'SATMT25',
    'sat_m50': 'SATMT50',
    'sat_m75': 'SATMT75',
    'act25': 'ACTCM25',
    'act50': 'ACTCM50',
    'act75': 'ACTCM75',
    'act_e25': 'ACTEN25',
    'act_e50': 'ACTEN50',
    'act_e75': 'ACTEN75',
    'act_m25': 'ACTMT25',
    'act_m50': 'ACTMT50',
    'act_m75': 'ACTMT75',
}

# EFFYALEV=2 in effy2022.csv for undergraduate school data
colsHeadCountUndergrad = {
    'enrolled': 'EFYTOTLT',
    'enrolled_m': 'EFYTOTLM',
    'enrolled_w': 'EFYTOTLW',
    'american_indian': 'EFYAIANT',
    'american_indian_m': 'EFYAIANM',
    'american_indian_w': 'EFYAIANW',
    'asian': 'EFYASIAT',
    'asian_m': 'EFYASIAM',
    'asian_w': 'EFYASIAW',
    'black': 'EFYBKAAT',
    'black_m': 'EFYBKAAM',
    'black_w': 'EFYBKAAW',
    'hispanic': 'EFYHISPT',
    'hispanic_m': 'EFYHISPM',
    'hispanic_w': 'EFYHISPW',
    'pacific_islander': 'EFYNHPIT',
    'pacific_islander_m': 'EFYNHPIM',
    'pacific_islander_w': 'EFYNHPIW',
    'white': 'EFYWHITT',
    'white_m': 'EFYWHITM',
    'white_w': 'EFYWHITW',
    'multiple_races': 'EFY2MORT',
    'multiple_races_m': 'EFY2MORM',
    'multiple_races_w': 'EFY2MORW',
    'unknown_race': 'EFYUNKNT',
    'non_us': 'EFYNRALT',
    'non_us_m': 'EFYNRALM',
    'non_us_w': 'EFYNRALW',
    'unknown_gender': 'EFYGUTOT',
}

# EFFYALEV=12 in effy2022.csv for graduate school data
colsHeadCountGrad = {
    'enrolled_grad': 'EFYTOTLT',
    'enrolled_grad_m': 'EFYTOTLM',
    'enrolled_grad_w': 'EFYTOTLW',
    'non_us_grad': 'EFYNRALT',
    'non_us_grad_m': 'EFYNRALM',
    'non_us_grad_w': 'EFYNRALW',
}

colsFinancial = {
    'revenue_pub': 'F1CORREV',
    'revenue_priv': 'F2CORREV',
    'endowment_per_capita_pub': 'F1ENDMFT',
    'endowment_per_capita_priv': 'F2ENDMFT',
    'instruction_per_capita_pub': 'F1INSTFT',
    'instruction_per_capita_priv': 'F2INSTFT',
    'research_per_capita_pub': 'F1RSRCFT',
    'research_per_capita_priv': 'F2RSRCFT',
}
