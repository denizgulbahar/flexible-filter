import { useState, useEffect } from 'react';
import flexibleFilter from '../flexibleFilter';

// Hook to filter device data based on filters
const useFlexibleFilter = (data, filters, conditions) => {
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const filtered = flexibleFilter(data, conditions);
    setFilteredData(filtered);
  }, [data, filters]); 
  
  return filteredData;
};

export default useFlexibleFilter;
