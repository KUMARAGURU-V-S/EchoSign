import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../src/theme';

const features = [
  {
    icon: 'mic-outline',
    color: Colors.primary,
    bg: Colors.primaryGlow,
    title: 'Speak Naturally',
    description: 'Your voice becomes sign language in real time',
  },
  {
    icon: 'flash-outline',
    color: Colors.secondary,
    bg: Colors.secondaryGlow,
    title: 'Instant Translation',
    description: 'Zero-latency 3D avatar sign animation',
  },
  {
    icon: 'book-outline',
    color: Colors.tertiary,
    bg: Colors.tertiaryGlow,
    title: 'Learn ISL',
    description: 'All 26 alphabets + common words with avatar',
  },
];

function FeatureCard({ icon, color, bg, title, description }: typeof features[0]) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Animated.View style={[styles.featureCard, { transform: [{ scale }] }]}>
      <View style={[styles.featureIconWrap, { backgroundColor: bg }]}>
        <Ionicons name={icon as any} size={22} color={color} />
      </View>
      <View style={styles.featureTextWrap}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDesc}>{description}</Text>
      </View>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const primaryScale = useRef(new Animated.Value(1)).current;
  const secondaryScale = useRef(new Animated.Value(1)).current;

  const animatePress = (ref: Animated.Value, toScale: number, cb?: () => void) => {
    Animated.spring(ref, {
      toValue: toScale,
      useNativeDriver: true,
      tension: 200,
      friction: 8,
    }).start(cb);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Decorative radial glows */}
      <View style={styles.glowTopLeft} pointerEvents="none" />
      <View style={styles.glowBottomRight} pointerEvents="none" />

      <View style={styles.content}>
        {/* Badge */}
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>Indian Sign Language · ISL</Text>
        </View>

        {/* Hero section */}
        <View style={styles.heroRow}>
          <View style={styles.logoRing}>
            <View style={styles.logoInner}>
              <Text style={styles.logoEmoji}>🤟</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title}>
          Echo<Text style={styles.titleAccent}>Sign</Text>
        </Text>
        <Text style={styles.subtitle}>
          Bridging voices and hands with real-time 3D sign language translation
        </Text>

        {/* Feature cards */}
        <View style={styles.featuresContainer}>
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </View>

        {/* CTA buttons */}
        <View style={styles.ctaSection}>
          <Animated.View style={{ transform: [{ scale: primaryScale }], width: '100%' }}>
            <TouchableOpacity
              style={styles.primaryBtn}
              activeOpacity={0.9}
              onPressIn={() => animatePress(primaryScale, 0.96)}
              onPressOut={() => animatePress(primaryScale, 1, () => router.push('/avatar'))}
            >
              <Ionicons name="mic" size={20} color="#fff" />
              <Text style={styles.primaryBtnText}>Start Translating</Text>
              <Ionicons name="arrow-forward" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={{ transform: [{ scale: secondaryScale }], width: '100%' }}>
            <TouchableOpacity
              style={styles.secondaryBtn}
              activeOpacity={0.9}
              onPressIn={() => animatePress(secondaryScale, 0.96)}
              onPressOut={() => animatePress(secondaryScale, 1, () => router.push('/learn'))}
            >
              <Ionicons name="book-outline" size={20} color={Colors.primary} />
              <Text style={styles.secondaryBtnText}>Learn Sign Language</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer note */}
        <Text style={styles.footerNote}>
          Powered by Mixamo avatars & ISL animations
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  glowTopLeft: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primaryGlow,
    opacity: 0.4,
  },
  glowBottomRight: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: Colors.tertiaryGlow,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
    gap: Spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.surfaceAlt,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.sm,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
  },
  badgeText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.5,
  },
  heroRow: {
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  logoRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryGlow,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
  },
  logoInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: Colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 44,
  },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  titleAccent: {
    color: Colors.primary,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
    marginBottom: Spacing.sm,
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  featureIconWrap: {
    width: 42,
    height: 42,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    marginBottom: 2,
  },
  featureDesc: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    lineHeight: 18,
  },
  ctaSection: {
    width: '100%',
    gap: Spacing.md,
    alignItems: 'center',
  },
  primaryBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingVertical: Spacing.base,
    borderRadius: Radius.full,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  secondaryBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.base,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryBtnText: {
    color: Colors.primary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  footerNote: {
    color: Colors.textDisabled,
    fontSize: FontSize.xs,
    textAlign: 'center',
    marginTop: Spacing.xs,
  },
});
