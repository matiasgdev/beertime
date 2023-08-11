export interface BeerParams {
  abv_gt: number;
  abv_lt: number;
  ibu_gt: number;
  ibu_lt: number;
  ebc_gt: number;
  ebc_lt: number;
  beer_name: string;
  yeast: string;
  brewed_before: `${string}-${string}` /* Date: mm-yyyy */;
  brewed_after: `${string}-${string}` /* Date: mm-yyyy */;
  hops: string;
  malt: string;
  food: string;
  ids: string[];
  page: number;
  per_page: number;
}
