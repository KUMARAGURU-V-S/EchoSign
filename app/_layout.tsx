import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#111318' },
        headerTintColor: '#fff',
        contentStyle: { backgroundColor: '#111318' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'EchoSign' }} />
    </Stack>
  );
}
