import {Beer} from '../models/Beer';

export const filterByName = (beers: Beer[], query: string) =>
  beers.filter(beer =>
    beer.name.toLowerCase().includes(query.trim().toLowerCase()),
  );
