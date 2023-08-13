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

interface BeerStoreState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  beers: Beer[];
  filters: Partial<BeerParams>;
  call: (filtres: Partial<BeerParams>) => void;
  setFilters: (newFilter: Partial<BeerParams>) => void;
}

const filterReducer = (
  prevParams: Partial<BeerParams>,
  newParams: Partial<BeerParams>,
) => ({...prevParams, ...newParams});

export const defaultFilters: Partial<BeerParams> = {
  abv_gt: 0,
  ibu_gt: 0,
  ebc_gt: 0,
};

const Beers = createContext<BeerStoreState | null>(null);

export const BeersProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {data: beers, run, status} = useAsync<Beer[]>([]);
  const [filters, setFilters] = useReducer(filterReducer, defaultFilters);

  const call = useCallback((params: Partial<BeerParams>) => {
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
        setFilters,
        call,
      }}>
      {children}
    </Beers.Provider>
  );
};

export const useStore = () => useContext(Beers) as BeerStoreState;
