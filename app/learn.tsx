import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AvatarViewer from '../src/components/AvatarViewer';
import { AnimationController } from '../src/engine/AnimationController';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../src/theme';

const xbotModel = require('../assets/xbot.glb');
const ybotModel = require('../assets/ybot.glb');

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const WORD_CATEGORIES = [
  {
    label: '👋 Greetings',
    words: ['HELLO', 'YOU', 'NAME', 'GOOD'],
  },
  {
    label: '🌍 Daily Life',
    words: ['WATER', 'FOOD', 'TIME', 'HOME', 'SCHOOL'],
  },
  {
    label: '👨‍👩‍👧 Family',
    words: ['PERSON', 'MOTHER', 'FATHER', 'FRIEND'],
  },
  {
    label: '❤️ Feelings & Courtesy',
    words: ['LOVE', 'HELP', 'PLEASE'],
  },
];

const WORDS = WORD_CATEGORIES.flatMap((c) => c.words);

const { width: SCREEN_W } = Dimensions.get('window');
const IS_WIDE = SCREEN_W >= 768;

type Category = 'alpha' | 'words';

// A-Z color cycling for visual delight
const ALPHA_COLORS = [
  Colors.primary, Colors.secondary, Colors.tertiary,
  Colors.success, Colors.warning, Colors.primaryLight,
];
const alphaColor = (i: number) => ALPHA_COLORS[i % ALPHA_COLORS.length];

function SignButton({
  label,
  accent,
  isActive,
  onPress,
}: {
  label: string;
  accent: string;
  isActive: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glow, { toValue: 1, duration: 700, useNativeDriver: false }),
          Animated.timing(glow, { toValue: 0, duration: 700, useNativeDriver: false }),
        ])
      ).start();
    } else {
      glow.stopAnimation();
      glow.setValue(0);
    }
  }, [isActive]);

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.88, useNativeDriver: true, tension: 300, friction: 8 }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 8 }).start(onPress);

  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0, 0.6] });

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Animated.View
        style={[
          styles.signBtnGlow,
          { backgroundColor: accent, opacity: glowOpacity },
        ]}
      />
      <TouchableOpacity
        style={[
          styles.signBtn,
          isActive && { borderColor: accent, backgroundColor: `${accent}22` },
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Text style={[styles.signBtnText, isActive && { color: accent }]}>{label}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

function SpeedControl({
  label,
  value,
  onDecrease,
  onIncrease,
  displayValue,
}: {
  label: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  displayValue: string;
}) {
  return (
    <View style={styles.controlRow}>
      <Text style={styles.controlLabel}>{label}</Text>
      <View style={styles.stepperRow}>
        <TouchableOpacity style={styles.stepperBtn} onPress={onDecrease}>
          <Ionicons name="remove" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.stepperValue}>{displayValue}</Text>
        <TouchableOpacity style={styles.stepperBtn} onPress={onIncrease}>
          <Ionicons name="add" size={16} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function LearnScreen() {
  const [activeAvatar, setActiveAvatar] = useState<any>(ybotModel);
  const [category, setCategory] = useState<Category>('alpha');
  const [activeSign, setActiveSign] = useState<string | null>(null);
  const [speed, setSpeed] = useState(0.1);
  const [pauseTime, setPauseTime] = useState(800);
  const animController = useRef<AnimationController | null>(null);
  const headerY = useRef(new Animated.Value(-30)).current;
  const headerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(headerY, { toValue: 0, useNativeDriver: true, tension: 80, friction: 10 }),
      Animated.timing(headerOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (animController.current) {
      animController.current.speed = speed;
      animController.current.pauseTime = pauseTime;
    }
  }, [speed, pauseTime]);

  const handleSign = useCallback(
    (sign: string, type: 'alpha' | 'word') => {
      if (!animController.current) return;
      animController.current.clearQueue();
      setActiveSign(sign);
      if (type === 'alpha') {
        animController.current.playLetter(sign);
      } else {
        animController.current.playWord(sign);
      }
    },
    []
  );

  // Render left panel content
  const renderSignList = () => (
    <ScrollView
      style={styles.signList}
      contentContainerStyle={styles.signListContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Category tabs */}
      <View style={styles.catTabRow}>
        <TouchableOpacity
          style={[styles.catTab, category === 'alpha' && styles.catTabActive]}
          onPress={() => setCategory('alpha')}
        >
          <Text style={[styles.catTabText, category === 'alpha' && styles.catTabTextActive]}>
            🔤 Alphabets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.catTab, category === 'words' && styles.catTabActive]}
          onPress={() => setCategory('words')}
        >
          <Text style={[styles.catTabText, category === 'words' && styles.catTabTextActive]}>
            💬 Words
          </Text>
        </TouchableOpacity>
      </View>

      {category === 'alpha' && (
        <>
          <Text style={styles.sectionLabel}>A – Z</Text>
          <View style={styles.alphaGrid}>
            {ALPHABETS.map((ch, i) => (
              <SignButton
                key={ch}
                label={ch}
                accent={alphaColor(i)}
                isActive={activeSign === ch}
                onPress={() => handleSign(ch, 'alpha')}
              />
            ))}
          </View>
        </>
      )}

      {category === 'words' && (
        <>
          {WORD_CATEGORIES.map((cat) => (
            <View key={cat.label}>
              <Text style={styles.sectionLabel}>{cat.label}</Text>
              <View style={styles.wordGrid}>
                {cat.words.map((w) => (
                  <SignButton
                    key={w}
                    label={w}
                    accent={Colors.secondary}
                    isActive={activeSign === w}
                    onPress={() => handleSign(w, 'word')}
                  />
                ))}
              </View>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );

  // Right / bottom controls panel
  const renderControls = () => (
    <View style={styles.controlsPanel}>
      <Text style={styles.controlsPanelTitle}>Settings</Text>

      {/* Avatar Picker */}
      <Text style={styles.controlLabel}>Avatar</Text>
      <View style={styles.avatarPickerRow}>
        <TouchableOpacity
          style={[styles.avatarBtn, activeAvatar === ybotModel && styles.avatarBtnActive]}
          onPress={() => setActiveAvatar(ybotModel)}
        >
          <Text style={styles.avatarBtnEmoji}>🟦</Text>
          <Text style={[styles.avatarBtnText, activeAvatar === ybotModel && styles.avatarBtnTextActive]}>
            Y-Bot
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.avatarBtn, activeAvatar === xbotModel && styles.avatarBtnActive]}
          onPress={() => setActiveAvatar(xbotModel)}
        >
          <Text style={styles.avatarBtnEmoji}>🟥</Text>
          <Text style={[styles.avatarBtnText, activeAvatar === xbotModel && styles.avatarBtnTextActive]}>
            X-Bot
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <SpeedControl
        label="Animation Speed"
        value={speed}
        displayValue={speed.toFixed(2)}
        onDecrease={() => setSpeed((s) => Math.max(0.05, parseFloat((s - 0.05).toFixed(2))))}
        onIncrease={() => setSpeed((s) => Math.min(0.5, parseFloat((s + 0.05).toFixed(2))))}
      />

      <SpeedControl
        label="Pause (ms)"
        value={pauseTime}
        displayValue={`${pauseTime}`}
        onDecrease={() => setPauseTime((p) => Math.max(0, p - 100))}
        onIncrease={() => setPauseTime((p) => Math.min(2000, p + 100))}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Decorative glow */}
      <View style={styles.glowTop} pointerEvents="none" />

      {/* Header */}
      <Animated.View
        style={[
          styles.header,
          { transform: [{ translateY: headerY }], opacity: headerOpacity },
        ]}
      >
        <View>
          <Text style={styles.headerTitle}>Learn ISL</Text>
          <Text style={styles.headerSub}>Tap a sign to see it live</Text>
        </View>
        {activeSign && (
          <View style={styles.activeSignBadge}>
            <Text style={styles.activeSignText}>Showing: {activeSign}</Text>
          </View>
        )}
      </Animated.View>

      {IS_WIDE ? (
        // ── Wide / Tablet / Web layout ─────────────────────────────────
        <View style={styles.wideLayout}>
          {/* Left: sign list */}
          <View style={styles.wideLeft}>{renderSignList()}</View>

          {/* Center: avatar */}
          <View style={styles.wideCenter}>
            <View style={styles.avatarWrapper}>
              <AvatarViewer
                avatarUrl={activeAvatar}
                onControllerReady={(ctrl) => {
                  animController.current = ctrl;
                  ctrl.speed = speed;
                  ctrl.pauseTime = pauseTime;
                }}
              />
              {/* Subtle bottom vignette */}
              <View style={styles.avatarVignette} pointerEvents="none" />
            </View>
          </View>

          {/* Right: controls */}
          <View style={styles.wideRight}>{renderControls()}</View>
        </View>
      ) : (
        // ── Mobile layout ────────────────────────────────────────────────
        <View style={styles.mobileLayout}>
          {/* Avatar top half */}
          <View style={styles.mobileAvatarWrap}>
            <AvatarViewer
              avatarUrl={activeAvatar}
              onControllerReady={(ctrl) => {
                animController.current = ctrl;
                ctrl.speed = speed;
                ctrl.pauseTime = pauseTime;
              }}
            />
            <View style={styles.avatarVignette} pointerEvents="none" />
          </View>

          {/* Inline compact controls */}
          <View style={styles.mobileControlsRow}>
            <TouchableOpacity
              style={[styles.avatarBtn, activeAvatar === ybotModel && styles.avatarBtnActive]}
              onPress={() => setActiveAvatar(ybotModel)}
            >
              <Text style={[styles.avatarBtnText, activeAvatar === ybotModel && styles.avatarBtnTextActive]}>
                Y-Bot
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.avatarBtn, activeAvatar === xbotModel && styles.avatarBtnActive]}
              onPress={() => setActiveAvatar(xbotModel)}
            >
              <Text style={[styles.avatarBtnText, activeAvatar === xbotModel && styles.avatarBtnTextActive]}>
                X-Bot
              </Text>
            </TouchableOpacity>
            <View style={styles.mobileSpeedRow}>
              <Ionicons name="speedometer-outline" size={14} color={Colors.textMuted} />
              <TouchableOpacity onPress={() => setSpeed((s) => Math.max(0.05, parseFloat((s - 0.05).toFixed(2))))}>
                <Text style={styles.mobileStepBtn}>−</Text>
              </TouchableOpacity>
              <Text style={styles.mobileStepVal}>{speed.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => setSpeed((s) => Math.min(0.5, parseFloat((s + 0.05).toFixed(2))))}>
                <Text style={styles.mobileStepBtn}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom: scrollable sign list */}
          {renderSignList()}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  glowTop: {
    position: 'absolute',
    top: -60,
    alignSelf: 'center',
    width: 300,
    height: 200,
    borderRadius: 150,
    backgroundColor: Colors.primaryGlow,
    opacity: 0.5,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.black,
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  activeSignBadge: {
    backgroundColor: Colors.primaryGlow,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  activeSignText: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },

  // Wide layout
  wideLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  wideLeft: {
    width: 200,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  wideCenter: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  wideRight: {
    width: 200,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  // Mobile layout
  mobileLayout: {
    flex: 1,
  },
  mobileAvatarWrap: {
    height: 260,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
  },
  mobileControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  mobileSpeedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  mobileStepBtn: {
    color: Colors.primary,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    paddingHorizontal: 6,
  },
  mobileStepVal: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    minWidth: 32,
    textAlign: 'center',
  },

  // Avatar
  avatarWrapper: {
    flex: 1,
    overflow: 'hidden',
  },
  avatarVignette: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'transparent',
    // Gradient effect via opacity — on native it fades into bg
  },

  // Sign list
  signList: {
    flex: 1,
  },
  signListContent: {
    padding: Spacing.base,
    gap: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  catTabRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  catTab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  catTabActive: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.primary,
  },
  catTabText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  catTabTextActive: {
    color: Colors.primary,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  alphaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  wordGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },

  // Sign buttons
  signBtn: {
    minWidth: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.sm,
  },
  signBtnText: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
  },
  signBtnGlow: {
    position: 'absolute',
    inset: -4 as any,
    borderRadius: Radius.md + 4,
    zIndex: -1,
  },

  // Controls panel
  controlsPanel: {
    padding: Spacing.base,
    gap: Spacing.md,
  },
  controlsPanelTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  controlRow: {
    gap: Spacing.xs,
  },
  controlLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperValue: {
    color: Colors.textPrimary,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    flex: 1,
    textAlign: 'center',
  },
  avatarPickerRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  avatarBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarBtnActive: {
    backgroundColor: Colors.primaryGlow,
    borderColor: Colors.primary,
  },
  avatarBtnEmoji: {
    fontSize: 16,
  },
  avatarBtnText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  avatarBtnTextActive: {
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
