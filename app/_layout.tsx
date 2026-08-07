import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, View, StyleSheet } from 'react-native';
import { Colors } from '../src/theme';

// Polyfill for three.js loaders expecting ProgressEvent
if (typeof global.ProgressEvent === 'undefined') {
  global.ProgressEvent = class ProgressEvent {} as any;
}

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.bg },
        headerTintColor: Colors.textPrimary,
        headerTitleStyle: { fontWeight: '700', fontSize: 18 },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopWidth: 0,
          borderTopColor: Colors.border,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 8,
          ...styles.tabBarShadow,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrap : undefined}>
              <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="avatar"
        options={{
          title: 'Translate',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrap : undefined}>
              <Ionicons name={focused ? 'mic' : 'mic-outline'} size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View style={focused ? styles.activeIconWrap : undefined}>
              <Ionicons name={focused ? 'book' : 'book-outline'} size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarShadow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  activeIconWrap: {
    backgroundColor: Colors.primaryGlow,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
