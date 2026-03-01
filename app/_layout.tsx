import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import '../global.css'; // Inject NativeWind v4 styling

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'My Tasks' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}
