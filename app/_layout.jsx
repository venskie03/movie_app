import { Stack } from "expo-router"
import FontLoader from "../components/FontLoader"

const StackLayout = () =>{
  return (
    <Stack>
       <Stack.Screen name="index" options={{ headerShown: false }} />
       <Stack.Screen name={`overview/[id]`} options={{ headerShown: false }} />
       <Stack.Screen name={`genres/[id]`} options={{ headerShown: false }} />
       <Stack.Screen name={`player/[id]`} options={{ headerShown: false }} />
       <Stack.Screen name={`search/[params]`} options={{ headerShown: false }} />
    </Stack>
  )
}

const RootLayout = () => {
  return (
    <FontLoader>
      <StackLayout/>
    </FontLoader>
  )
}

export default RootLayout
