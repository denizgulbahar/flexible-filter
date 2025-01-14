import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList  } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { color } from '../../styles/color';

const { width } = Dimensions.get("window")

// Card Componentte keylerin gelmesini sağla index yerine sadece. Sonra da filtreleme yapılacak.
const TableCard = ({ deviceData }) => {
  // DeviceData Transformations
  const tableHead = deviceData.map(item => Object.keys(item))
  // const tableHead = Object.values(deviceData).map(item => Object.keys(item))
  const tableData = Object.values(deviceData).map(item => Object.values(item))

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
        {tableHead.map((keyArray, index) => (
          <View key={`${keyArray}_${index}`} style={styles.cardContainer}>
            {keyArray.map((key, innerIndex) => (
            <View key={`${key}_${index}`} style={{ flex: 1, flexDirection: "row", padding: 10 }}>
              <Text style={{ flex: 1 }}>{key}:</Text>
              <Text style={{ flex: 1 }}>
                {(typeof(tableData[index])!== "object") ? 
                  tableData[innerIndex] : 
                  JSON.stringify(tableData[index][innerIndex])
                }
              </Text>
            </View>
            ))
            }
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
        scrollEnabled={false}
        contentContainerStyle={{ flex: 1 }}
        data={data}
        nestedScrollEnabled={true}
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
  },
  cardContainer:{ 
    flex: 1, 
    backgroundColor: "#81c784", 
    justifyContent: "space-around", 
    borderRadius: 10, 
    padding: 10,
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
