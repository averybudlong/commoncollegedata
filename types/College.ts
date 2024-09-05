interface College {
  id: number;
  name: string;
  alias: string;
  city: string;
  state: string;
  website: string;
  app_website: string;
  longitude: number;
  latitude: number;
  standardized_test: string;
  applicants: number;
  applicants_m: number;
  applicants_w: number;
  admitted: number;
  admitted_m: number;
  admitted_w: number;
  enrolled_cycle: number;
  enrolled_cycle_m: number;
  enrolled_cycle_w: number;
  sat_pct: number;
  act_pct: number;
  sat_rw25: number;
  sat_rw50: number;
  sat_rw75: number;
  sat_m25: number;
  sat_m50: number;
  sat_m75: number;
  act25: number;
  act50: number;
  act75: number;
  act_e25: number;
  act_e50: number;
  act_e75: number;
  act_m25: number;
  act_m50: number;
  act_m75: number;
  enrolled: number;
  enrolled_m: number;
  enrolled_w: number;
  american_indian: number;
  american_indian_m: number;
  american_indian_w: number;
  asian: number;
  asian_m: number;
  asian_w: number;
  black: number;
  black_m: number;
  black_w: number;
  hispanic: number;
  hispanic_m: number;
  hispanic_w: number;
  pacific_islander: number;
  pacific_islander_m: number;
  pacific_islander_w: number;
  white: number;
  white_m: number;
  white_w: number;
  multiple_races: number;
  multiple_races_m: number;
  multiple_races_w: number;
  unknown_race: number;
  non_us: number;
  non_us_m: number;
  non_us_w: number;
  unknown_gender: number;
  enrolled_grad: number;
  enrolled_grad_m: number;
  enrolled_grad_w: number;
  non_us_grad: number;
  non_us_grad_m: number;
  non_us_grad_w: number;
  revenue_pub: number;
  revenue_priv: number;
  endowment_per_capita_pub: number;
  endowment_per_capita_priv: number;
  instruction_per_capita_pub: number;
  instruction_per_capita_priv: number;
  research_per_capita_pub: number;
  research_per_capita_priv: number;
  image_url: string;
  acceptance_rate: number;
  custom_order: number;
}

export type { College };
