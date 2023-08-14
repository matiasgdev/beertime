import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {useAsync} from '../hooks/useAsync';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {filterByName} from '../lib/filterByName';
import {Beer} from '../models/Beer';
import {BeerParams} from '../models/BeerParams';
import {getBeers} from '../services/get-beers';
import {defaultFilters, filtersReducer, PAGE_OFFSET} from './filtersReducer';
import {BeerStoreState} from './type';

const Beers = createContext<BeerStoreState | null>(null);

export const BeersProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [{beer_name, yeast, hops, malt, food, page, ...filters}, dispatch] =
    useReducer(filtersReducer, defaultFilters as BeerParams);
  const [globalQuery, setGlobalQuery] = useState('');

  const debouncedQuery = useDebouncedValue(globalQuery, 500);

  const {run, status, data, error} = useAsync<Beer[]>([], {
    onSuccess: beers => {
      if (page === 1) {
        return setBeers(beers);
      }
      setBeers(previousBeers => [...previousBeers, ...beers]);
    },
  });

  const reachLimit = Boolean(data.length < PAGE_OFFSET);

  const query = beer_name || yeast || hops || malt || food;

  const refetch = useCallback((params: Partial<BeerParams>) => {
    run(getBeers(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    run(getBeers(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const filteredBeers = useMemo(
    () => filterByName(beers, debouncedQuery),
    [beers, debouncedQuery],
  );

  return (
    <Beers.Provider
      value={{
        status: beers.length && status === 'pending' ? 'refetching' : status,
        beers: filteredBeers,
        error,
        filters,
        dispatch,
        refetch,
        query,
        globalQuery,
        setGlobalQuery,
        reachLimit,
      }}>
      {children}
    </Beers.Provider>
  );
};

export const useStore = () => useContext(Beers) as BeerStoreState;
