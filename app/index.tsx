import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AvatarViewer from '../src/components/AvatarViewer';
import { DEFAULT_AVATAR_URL } from '../src/config/avatar';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AvatarViewer avatarUrl={DEFAULT_AVATAR_URL || undefined} />
      <Text style={styles.caption}>Milestone 1 — static avatar render</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111318',
  },
  caption: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    color: '#7d828c',
    fontSize: 12,
  },
});
