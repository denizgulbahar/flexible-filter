import { useState, useEffect } from 'react';
import flexibleFilter from './flexibleFilter';

// Hook to filter device data based on deviceFilters
const useDeviceFilter = (deviceData, deviceFilters, conditions ) => {
  const [filteredData, setFilteredData] = useState([]);
  
  useEffect(() => {
    const filtered = flexibleFilter(deviceData, conditions);
    setFilteredData(filtered);
  }, [deviceData, deviceFilters]); 
  
  return filteredData;
};

export default useDeviceFilter;
