import { Stack } from 'expo-router';

// Polyfill for three.js loaders expecting ProgressEvent
if (typeof global.ProgressEvent === 'undefined') {
  global.ProgressEvent = class ProgressEvent {} as any;
}

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
