import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Dimensions 
} from "react-native";
import { color } from "../../styles/color";

const width = Dimensions.get('window').width;

const ButtonOriginal = ({ children, title, onPress, buttonStyle, textStyle }) => {
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, buttonStyle]}
      onPress={onPress}
    >
       {children ? (
        // If Button has children, display them
        children
      ) : (
        // Otherwise, display a Text component with the specified title
        <Text style={[styles.buttonText, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonOriginal;
const styles = StyleSheet.create({
  button: {
    height: 50,
    borderWidth: 0,
    backgroundColor: color.white,
    borderColor: color.apricot,
    shadowColor: color.black,
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    borderRadius: 12,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: width > 500 ? 22 : 18,
    fontStyle: "italic",
  }
});