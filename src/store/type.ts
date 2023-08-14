import {Dispatch, SetStateAction} from 'react';
import {Beer} from '../models/Beer';
import {BeerParams} from '../models/BeerParams';

export interface BeerStoreState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected' | 'refetching';
  beers: Beer[];
  filters: Partial<BeerParams>;
  error: Error | null;
  query: string;
  globalQuery: string;
  setGlobalQuery: Dispatch<SetStateAction<string>>;
  refetch: (filtres: Partial<BeerParams>) => void;
  dispatch: React.Dispatch<
    {
      type:
        | 'set_next_page'
        | 'yeast'
        | 'hops'
        | 'malt'
        | 'food'
        | 'abv'
        | 'ibu'
        | 'ebc'
        | 'beer_name'
        | 'reset';
    } & Partial<BeerParams>
  >;
  reachLimit: boolean;
}
