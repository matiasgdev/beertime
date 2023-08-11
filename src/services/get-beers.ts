import axios from 'axios';
import {buildQueryParams} from '../lib/buildQueryParams';
import {getBaseURL} from '../lib/getBaseURL';
import {BeerParams} from '../models/BeerParams';

export const getBeers = async (params: Partial<BeerParams> = {}) => {
  const url = getBaseURL();
  const query = buildQueryParams(params);

  return (
    await axios.get(url.href, {
      params: query,
    })
  ).data;
};
