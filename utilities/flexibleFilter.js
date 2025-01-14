import parseDate from "./parseDate";
// Helper function to compare dates
function compareDates(itemDate, valueDate, operator) {
  switch (operator) {
    case 'greaterThan':
      return itemDate > valueDate;
    case 'lessThan':
      return itemDate < valueDate;
    case 'greaterThanOrEqual':
      return itemDate >= valueDate;
    case 'lessThanOrEqual':
      return itemDate <= valueDate;
    case 'equal':
    default:
      return itemDate.getTime() === valueDate.getTime();
  }
}
// Helper function to compare values - Is it date or not 
function compareValues(itemValue, conditionValue) {
  console.log("f4", itemValue, conditionValue,conditionValue.operator)
  if (typeof itemValue === 'string') {
    const itemDate = parseDate(itemValue);
    const valueDate = parseDate(conditionValue.date);

    if (itemDate && valueDate) {
      return compareDates(itemDate, valueDate, conditionValue.operator || 'equal');
    }

    return itemValue.toLowerCase().includes(conditionValue.toLowerCase());
  }

  return itemValue === conditionValue;
}

function evaluateCondition(item, condition) {
  // Check if the condition is an array
  if (Array.isArray(condition)) {
    return condition.every(subCondition => evaluateCondition(item, subCondition));
  }

  // Check if the condition is a non-null object
  if (condition && typeof condition === 'object') {
    // Handle 'or' condition
    if (condition.hasOwnProperty('or')) {
      return condition['or'].some(subCondition => evaluateCondition(item, subCondition));
    }

    // Handle 'and' condition
    if (condition.hasOwnProperty('and')) {
      return condition['and'].every(subCondition => evaluateCondition(item, subCondition));
    }

    // Handle key-value pair conditions
    return Object.entries(condition).every(([key, value]) => {
      // Split the key by '.' to handle nested properties (e.g., 'deviceProperties.port')
      const keys = key.split('.');  // ['deviceProperties', 'port']
      // Traverse the object using the keys to access nested properties
      const itemValue = keys.reduce((obj, k) => obj && obj[k], item);  // Access nested object values
      // Compare the resolved item value with the condition value
      return compareValues(itemValue, value);
    });
  }

  return false;
}

// Main filter function
export default function flexibleFilter(array, conditions) {
  return array.filter(item => evaluateCondition(item, conditions));
}

//   Condition bir nesne ise, iç içe nesneler olabileceği durumlar için 
//   tekrar fonksiyona sokuluyor. Değer nesne olmayana kadar bu süreç devam ediyor 
//   ve koşul sağlanınca, item[key]'in value'yu küçük harfe duyarlı olarak içerip 
//   içermediği kontrol ediliyor.

//   const filteredData = flexibleFilter(data, {
//     'or': [
//       { 'name': 'Alice' },
//       {
//         'and': [
//           { 'city': 'New York' },
//           { 'age': 30 }
//         ]
//       }
//     ]
//   });