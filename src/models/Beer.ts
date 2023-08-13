export interface Beer {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  volume: Measurement;
  boil_volume: Measurement;
  method: {
    marsh_temp: {temp: Measurement; duration: number | null}[];
    fermentation: {temp: Measurement};
    twist: string | null;
  };
  ingredients: {
    malt: Ingredient[];
    hops: Ingredient[];
    yeast: string;
  };
  food_pairing: string[];
  brewer_tips: string;
  contributed_by: string;
}

interface Measurement {
  value: number;
  unit: string;
}

export interface Ingredient {
  name: string;
  amount: Measurement;
  add?: string;
  attribute?: string;
}
