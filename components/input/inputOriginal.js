import { Text, View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { color } from '../../styles/color';

const { width } = Dimensions.get('window');

const InputOriginal = ({ 
  label, 
  value, 
  onChangeText, 
  viewStyle, 
  labelStyle, 
  inputStyle, 
  multiline, 
  numberOfLines, 
  placeholder, 
  secureTextEntry, 
  keyboardType 
}) => {

  return (
    <View style={[styles.col, viewStyle]}>
      {/* If Input has label prop, display it in Text Component */}
      {label && ( 
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <TextInput
        style={[styles.textInput, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={color.grey}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        value={value}
        multiline={multiline}
        numberOfLines={numberOfLines}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    margin: 5,
    textAlign: "left",
    fontSize: width > 500 ? 22 : 18,
  },
  textInput: {
    outlineStyle: 'none',
    textAlign: "left",
    fontSize: width > 500 ? 22 : 18,
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
  },
  col: {
    flexDirection: 'column',
  },
})
export default InputOriginal;

