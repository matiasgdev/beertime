import axios from 'axios';
import {buildQueryParams} from '../lib/buildQueryParams';
import {getBaseURL} from '../lib/getBaseURL';
import {Beer} from '../models/Beer';
import {BeerParams} from '../models/BeerParams';

// persist same result
const cache: Record<string, Beer[]> = {};

export const getBeers = async (params: Partial<BeerParams> = {}) => {
  const url = getBaseURL();
  const query = buildQueryParams(params).toString();

  if (cache[query]) {
    return cache[query];
  }

  const result = (await axios.get<Beer[]>(`${url.href}?${query}`)).data;

  cache[query] = result;

  return result;
};
