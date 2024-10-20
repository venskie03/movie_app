import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    PoppinsMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    PoppinsThinItalic: require('../assets/fonts/Poppins-ThinItalic.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return children;
};

export default FontLoader;
