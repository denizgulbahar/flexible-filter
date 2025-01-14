import { useState } from 'react';

const useFilter = (initialState) => {
  const [filters, setFilters] = useState(initialState);

  const updateFilter = (key, value) => {
    setFilters(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  return [filters, updateFilter];
};

export default useFilter;
