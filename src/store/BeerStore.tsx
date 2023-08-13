import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {useAsync} from '../hooks/useAsync';
import {Beer} from '../models/Beer';
import {BeerParams} from '../models/BeerParams';
import {getBeers} from '../services/get-beers';
import {defaultFilters, filtersReducer} from './filtersReducer';

interface BeerStoreState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  beers: Beer[];
  filters: Partial<BeerParams>;
  query: string;
  refetch: (filtres: Partial<BeerParams>) => void;
  dispatch: React.Dispatch<
    {
      type:
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
}

const Beers = createContext<BeerStoreState | null>(null);

export const BeersProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {data: beers, run, status} = useAsync<Beer[]>([]);
  const [filters, dispatch] = useReducer(
    filtersReducer,
    defaultFilters as BeerParams,
  );
  const {beer_name, yeast, hops, malt, food} = filters;

  const query = beer_name || yeast || hops || malt || food;

  const refetch = useCallback((params: Partial<BeerParams>) => {
    run(getBeers(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    run(getBeers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Beers.Provider
      value={{
        status,
        beers,
        filters,
        dispatch,
        refetch,
        query,
      }}>
      {children}
    </Beers.Provider>
  );
};

export const useStore = () => useContext(Beers) as BeerStoreState;
