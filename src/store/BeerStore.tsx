import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {Skeletons} from '../components/SkeletonCard';
import {useAsync} from '../hooks/useAsync';
import {Beer} from '../models/Beer';
import {BeerParams} from '../models/BeerParams';
import {getBeers} from '../services/get-beers';

interface BeerStoreState {
  status: 'idle' | 'pending' | 'resolved' | 'rejected';
  beers: Beer[];
  filters: Partial<BeerParams>;
  setFilters: (newFilter: Partial<BeerParams>) => void;
}

const filterReducer = (
  prevParams: Partial<BeerParams>,
  newParams: Partial<BeerParams>,
) => ({...prevParams, ...newParams});

const Beers = createContext<BeerStoreState | null>(null);

export const BeersProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {data: beers, run, status} = useAsync<Beer[]>([]);
  const [filters, setFilters] = useReducer(filterReducer, {});

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
      }}>
      {children}
    </Beers.Provider>
  );
};

export const useStore = () => useContext(Beers) as BeerStoreState;
