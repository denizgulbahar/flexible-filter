import { 
  Text, 
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { PaperProvider } from 'react-native-paper';
import InputOriginal from './components/input/inputOriginal';
import TableCard from './components/tableCard/tableCard';
import { ScreenWrapper } from './components/wrapper/screenWrapper';
import { deviceData } from './data/deviceData';
import { color } from './styles/color';
import useFilter from './utilities/hooks/useFilter';
import useFlexibleFilter from './utilities/hooks/useFlexibleFilter';

const { width } = Dimensions.get("window")

// İç içe olan port ve lastMaintenance'da da filtrelemeyi düzgün yap.
export default function App() {
  const initialFilters = {
    deviceName: "1",
    deviceType: "",
    devicePort: "80",
    deviceLastMaintenance: "",
    creationDate: "26.01.2022"
  };

  // Use the custom hook
  const [deviceFilters, updateDeviceFilters] = useFilter(initialFilters);
  
  const inputsData = [
    { id: 1, label: "Cihaz Adı", filterKey: "deviceName" },
    { id: 2, label: "Cihaz Tipi", filterKey: "deviceType" },
    { id: 3, label: "Cihaz Portu", filterKey: "devicePort" },
    { id: 4, label: "Cihaz Yaratım Tarihi", filterKey: "creationDate" }
  ]

  const firstConditions = {
    'and': [
      { 'deviceName': deviceFilters["deviceName"] },
      { 'deviceType': deviceFilters["deviceType"] },
  ]}

  const secondConditions = {
    'or': [
      { 'deviceName': deviceFilters["deviceName"] },
      { 'deviceType': deviceFilters["deviceType"] },
  ]}

  const thirdConditions = {
    'and': [
      { "creationDate": { date: deviceFilters["creationDate"], operator: "lessThan" } },
      { 'deviceType': deviceFilters["deviceType"]},
  ]}

  const fourthConditions = {
    'and': [
      { "deviceProperties": { "lastMaintenance": deviceFilters["deviceLastMaintenance"] } },
      { 'deviceType': deviceFilters["deviceType"] },
  ]}
  const filteredData = useFlexibleFilter(deviceData, deviceFilters, thirdConditions )

  return (
    <PaperProvider>
    {/* Optimize performance and manage theme using the theme prop */}
      {/* When the keyboard is opened, scrolled screen content smoothly */}
      <ScreenWrapper>
        {/* Application header */}
        <Text style={styles.header}>Flexible Filter</Text>
        {/* Display inputs to filter */}
        <View style={styles.inputContainer}>
          {inputsData.map((item) => (
          <InputOriginal
            key={item.id}
            label={item.label} 
            value={deviceFilters[item.filterKey]} 
            onChangeText={(v) => updateDeviceFilters(item.filterKey, v)}
          />
          ))}
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
    marginBottom: 20, 
    paddingHorizontal: 15, 
    paddingVertical: 25, 
    borderRadius: 20, 
    backgroundColor: "#fff" 
  },
  header: { 
    fontSize:  width >= 500 ? 36 : 32, // Responsive fontSize
    fontStyle: "italic",
    fontWeight: "500", 
    textAlign: "center",
    color: color.black,
    marginHorizontal: 10,
    marginVertical: 30,
  },
})
