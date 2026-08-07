import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image 
            source={require('../assets/logo.jpg')} 
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>EchoSign</Text>
        <Text style={styles.subtitle}>
          Real-time speech to sign language translation powered by interactive 3D avatars.
        </Text>
        
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="mic-outline" size={24} color="#3182CE" />
            <Text style={styles.featureText}>Speak naturally into your device</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="flash-outline" size={24} color="#3182CE" />
            <Text style={styles.featureText}>Instant real-time translation</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="accessibility-outline" size={24} color="#3182CE" />
            <Text style={styles.featureText}>3D avatar demonstrates signs</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.push('/avatar')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/learn')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Learn Signs</Text>
            <Ionicons name="book-outline" size={20} color="#fff" style={styles.buttonIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 36,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    marginBottom: 24,
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 42,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#1E293B',
    borderRadius: 24,
    padding: 24,
    marginBottom: 40,
    gap: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    color: '#E2E8F0',
    fontSize: 16,
    fontWeight: '500',
  },
  actionButtons: {
    width: '100%',
    gap: 16,
    alignItems: 'center',
  },
  button: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#0284C7',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 999,
    alignItems: 'center',
    shadowColor: '#0284C7',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  secondaryButton: {
    backgroundColor: '#1E293B',
    shadowColor: 'transparent',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#334155',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonIcon: {
    marginLeft: 8,
  }
});
