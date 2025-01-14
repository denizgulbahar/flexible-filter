import { 
    ScrollView, 
    StyleSheet, 
    KeyboardAvoidingView, 
    SafeAreaView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const ScreenWrapper = ({ 
    children, 
    type, 
    gradientColors, 
    gradientDirection, 
    gradientOpacity 
}) => {
    // Determine if the child component have a flatList or not
    const isFlatList = type === 'flatlist';
    // Keyboard behavior based on the platform
    const behavior = Platform.OS === 'ios' ? 'padding' : 'height';
    // Default gradientColors
    const defaultColors = ['#B3E0F2', '#0056A3'];

    return (
        <KeyboardAvoidingView 
            behavior={behavior} 
            keyboardVerticalOffset={0} 
            style={styles.keyboardContainer}
        >  
        {/* When the keyboard is opened, scrolled screen content smoothly */}
            <SafeAreaView style={styles.safeAreaView}>
            {/* Prevented notches on some phones from conflicting with screen content */}
                <LinearGradient 
                    colors={gradientColors || defaultColors} // Gradient colors, defaults if none
                    style={[styles.LinearGradient, {opacity: gradientOpacity || 1 }]} // Opacity, defaults to 1
                    start={gradientDirection?.start || { x: 0, y: 0 }} // Start point, defaults to top-left
                    end={gradientDirection?.end || { x: 1, y: 1 }} // End point, defaults to bottom-right
                >
                {/* Made attractive Background  by using Linear Gradient for User Interfaces */}
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {/* Provided the keyboard to close when touching any non-interactive area */}
                        {isFlatList ? (
                            //  If Content is flatlist no need scrollView
                            <>{children}</>
                        ) : (
                            //  Otherwise display content in scrollView
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {children}
                            </ScrollView>
                        )}
                    </TouchableWithoutFeedback>
                </LinearGradient>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
    }

const styles = StyleSheet.create({
    keyboardContainer: {
        flex: 1,
    },
    LinearGradient: {
        flex: 1,
        paddingHorizontal: width >= 500 ? 20 : 10,
    },
    safeAreaView: {
        flex: 1,
        marginBottom: 60, // It provides showing contents end in UI
    },
}
)


