import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const { width } = Dimensions.get("window")

// Card Componentte keylerin gelmesini sağla index yerine sadece. Sonra da filtreleme yapılacak.
const TableCard = ({ deviceData }) => {
  // DeviceData Transformations
  const tableHead = Object.values(deviceData).map(item => Object.keys(item))
  const tableData = Object.values(deviceData).map(item => Object.values(item))

  console.log("tableHead:",tableHead)
  const tableComponent = () => (
    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
      <Row data={tableHead} style={styles.head} textStyle={styles.text}/>
      <Rows data={tableData} textStyle={styles.text}/>
    </Table>
  )

  const renderCardItem = ({ item }) => {
    const { tableHead, tableData } = item;
    console.log("sus",tableHead)
    console.log("sup",tableData)

    // Check keys and values have matching lengths
    if (tableHead.length !== tableData.length) {
      return <Text>Data mismatch</Text>; // Handle mismatched data
    }
    return (
      <View style={{ flex: 1 }}>
        {tableHead.map((key, innerIndex) => (
          <View key={`${key}_${innerIndex}`} style={styles.cardContainer}>
            <Text style={{ flex: 1 }}>{key}:</Text>
            <Text style={{ flex: 1 }}>
              {(typeof(tableData[innerIndex])!== "object") ? 
                tableData[innerIndex] : 
                JSON.stringify(tableData[innerIndex])
              }
            </Text>
          </View>
        ))}
      </View>
    );
  };
  
  const cardComponent = () => {
    let data = [
      {
        tableHead: tableHead,
        tableData: tableData,
      },
    ]
    return(
      <FlatList
        contentContainerStyle={{ flex: 1 }}
        data={data}
        renderItem={renderCardItem}
        keyExtractor={(index) => index.toString()}
      />
    )
  }

  return (
    <View style={styles.container}>
      {width >= 500 ? tableComponent() : cardComponent()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,  
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10
  },
  cardContainer:{ 
    flex: 1, 
    flexDirection: "row",
    justifyContent: "space-around", 
    backgroundColor: "blue", 
    borderRadius: 15, 
    margin: 5  
  },
  head: { 
    height: 40, 
    backgroundColor: '#f1f8ff' 
  },
  text: { 
    margin: 6 
  },
});

export default TableCard;
