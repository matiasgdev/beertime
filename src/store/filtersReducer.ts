import {BeerParams} from '../models/BeerParams';

export const PAGE_OFFSET = 10;

export type Action = {
  type:
    | 'set_next_page'
    | 'abv'
    | 'ibu'
    | 'ebc'
    | 'beer_name'
    | 'yeast'
    | 'hops'
    | 'malt'
    | 'food'
    | 'reset';
} & Partial<BeerParams>;

// used to flush rest of params
const defaultQuerySearch: Partial<BeerParams> = {
  beer_name: '',
  yeast: '',
  hops: '',
  malt: '',
  food: '',
};

export const defaultFilters: Partial<BeerParams> = {
  abv_gt: 0,
  ibu_gt: 0,
  ebc_gt: 0,
  page: 1,
  per_page: PAGE_OFFSET,
  ...defaultQuerySearch,
};

export const filtersReducer = (
  state: BeerParams,
  {type, ...payload}: Action,
): BeerParams => {
  switch (type) {
    case 'set_next_page': {
      return {...state, page: state.page + 1};
    }
    case 'abv': {
      return {...state, abv_gt: payload.abv_gt!};
    }
    case 'ibu': {
      return {...state, ibu_gt: payload.ibu_gt!};
    }
    case 'ebc': {
      return {...state, ebc_gt: payload.ebc_gt!};
    }
    case 'beer_name':
      return {...state, ...defaultQuerySearch, ...payload};
    case 'yeast':
      return {...state, ...defaultQuerySearch, ...payload};
    case 'hops': {
      return {...state, ...defaultQuerySearch, ...payload};
    }
    case 'malt': {
      return {...state, ...defaultQuerySearch, ...payload};
    }
    case 'food': {
      return {...state, ...defaultQuerySearch, ...payload};
    }
    case 'reset': {
      return defaultFilters as BeerParams;
    }
    default:
      return defaultFilters as BeerParams;
  }
};
