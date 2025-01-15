import { useState, useEffect, useMemo } from 'react';
import flexibleFilter from '../flexibleFilter';

// Hook to filter device data based on filters
const useFlexibleFilter = (data, filters, conditions) => {
  // Use JSON.stringify to avoid ref change 
  const memorizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);
  const memorizedConds = useMemo(() => conditions, [JSON.stringify(conditions)]);

  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const filtered = flexibleFilter(data, memorizedConds);
    setFilteredData(filtered);
  }, [data, memorizedFilters]); 
  
  return filteredData;
};

export default useFlexibleFilter;
