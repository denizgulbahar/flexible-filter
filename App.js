import { useEffect, useState } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import TableCard from './components/tableCard/tableCard';
import { ScreenWrapper } from './components/wrapper/screenWrapper';
import { deviceData } from './data/deviceData';
import { color } from './styles/color';
import useFlexibleFilter from './utilities/hooks/useFlexibleFilter';

const { width } = Dimensions.get("window")

// İç içe olan port ve lastMaintenance'da da filtrelemeyi düzgün yap.
export default function App() {

  const initialFilters = {
    deviceName: "1",
    deviceType: "",
    devicePort: 8088,
    creationDateMin: '2021-05-01',
    creationDateMax: '2022-01-06'
  };
  const [condition, setCondition] = useState({})
  const firstConditions = {
    'and': [
      { 'deviceName': initialFilters["deviceName"] },
      { 'deviceType': initialFilters["deviceType"] },
  ]}

  const secondConditions = {
    'or': [
      { 'deviceName': initialFilters["deviceName"] },
      { 'deviceType': initialFilters["deviceType"] },
  ]}

  const thirdConditions = {
    "and": [
      { "creationDate": { date: initialFilters["creationDateMin"], operator: 'greaterThan' } },
      { "creationDate": { date: initialFilters["creationDateMax"], operator: 'lessThan' } },
    ],
  };

  const fourthConditions = {
    and: [
      { 'deviceProperties.port': 8088 },  // Use key chaining to access nested properties
      { deviceType: initialFilters["deviceType"] }
    ]
  };

  // Choose Cond Type
  useEffect(() => {
    setCondition(thirdConditions)
  },[])
  // Filter Custom Hook
  const filteredData = useFlexibleFilter(deviceData, initialFilters, condition);

  return (
    <PaperProvider>
    {/* Optimize performance and manage theme using the theme prop */}
      {/* When the keyboard is opened, scrolled screen content smoothly */}
      <ScreenWrapper>
        {/* Application header */}
        <Text style={styles.header}>Flexible Filter</Text>
        {/* Display inputs to filter */}
        <View style={styles.inputContainer}>
        <Text style={[styles.conditionText, { fontWeight:"bold" }]}>Condition:</Text>
          <Text style={styles.conditionText}>{JSON.stringify(condition)}</Text>
        </View>
        {/* Displaying DataTable  */}
        <TableCard deviceData={filteredData} />
      </ScreenWrapper>
    </PaperProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#3AA6B9", 
    padding: 10
  },
  userText: {
    flex: 1,
    padding: 10,
    margin: 5,
    fontSize: width >= 500 ? 20 : 16, // Responsive fontSize
    lineHeight: 24, // Using lineHeight to increase line spacing
    textAlign: "left",
    color: color.black,
  },
  inputContainer: { 
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20, 
    borderRadius: 20, 
    paddingVertical: 20,
    backgroundColor: "#fff" 
  },
  conditionText: {
    flex: 1,
    alignItems: "flex-start",
    padding: 10,
    fontSize:  width >= 500 ? 20 : 16, 
    fontWeight: "500", 
  },
  header: { 
    fontSize:  width >= 500 ? 36 : 32, // Responsive fontSize
    fontWeight: "500", 
    textAlign: "center",
    color: color.black,
    marginHorizontal: 10,
    marginVertical: 30,
  },
})
