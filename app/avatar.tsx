import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
  Platform,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AvatarViewer from '../src/components/AvatarViewer';
import { SpeechToText } from '../src/engine/SpeechToText';
import { AnimationController } from '../src/engine/AnimationController';
import { Colors, Spacing, Radius, FontSize, FontWeight } from '../src/theme';

const xbotModel = require('../assets/xbot.glb');
const ybotModel = require('../assets/ybot.glb');

const { width: SCREEN_W } = Dimensions.get('window');
const IS_WIDE = SCREEN_W >= 768;

function PulsingMic({ isActive }: { isActive: boolean }) {
  const ring1 = useRef(new Animated.Value(1)).current;
  const ring2 = useRef(new Animated.Value(1)).current;
  const ring1Opacity = useRef(new Animated.Value(0.6)).current;
  const ring2Opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (isActive) {
      const anim1 = Animated.loop(
        Animated.sequence([
          Animated.timing(ring1, { toValue: 1.5, duration: 900, useNativeDriver: true }),
          Animated.timing(ring1, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      );
      const anim1o = Animated.loop(
        Animated.sequence([
          Animated.timing(ring1Opacity, { toValue: 0, duration: 900, useNativeDriver: true }),
          Animated.timing(ring1Opacity, { toValue: 0.6, duration: 900, useNativeDriver: true }),
        ])
      );
      const anim2 = Animated.loop(
        Animated.sequence([
          Animated.timing(ring2, { toValue: 1.85, duration: 1200, useNativeDriver: true }),
          Animated.timing(ring2, { toValue: 1, duration: 1200, useNativeDriver: true }),
        ])
      );
      const anim2o = Animated.loop(
        Animated.sequence([
          Animated.timing(ring2Opacity, { toValue: 0, duration: 1200, useNativeDriver: true }),
          Animated.timing(ring2Opacity, { toValue: 0.3, duration: 1200, useNativeDriver: true }),
        ])
      );
      anim1.start(); anim1o.start(); anim2.start(); anim2o.start();
      return () => { anim1.stop(); anim1o.stop(); anim2.stop(); anim2o.stop(); };
    } else {
      ring1.setValue(1); ring1Opacity.setValue(0.6);
      ring2.setValue(1); ring2Opacity.setValue(0.3);
    }
  }, [isActive]);

  return (
    <View style={micStyles.wrap}>
      {isActive && (
        <>
          <Animated.View style={[micStyles.ring, { transform: [{ scale: ring2 }], opacity: ring2Opacity }]} />
          <Animated.View style={[micStyles.ring, { transform: [{ scale: ring1 }], opacity: ring1Opacity }]} />
        </>
      )}
      <View style={[micStyles.core, isActive && micStyles.coreActive]}>
        <Ionicons name={isActive ? 'mic' : 'mic-outline'} size={32} color={Colors.white} />
      </View>
    </View>
  );
}

const micStyles = StyleSheet.create({
  wrap: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center' },
  ring: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.danger,
  },
  core: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  coreActive: {
    backgroundColor: Colors.danger,
    shadowColor: Colors.danger,
  },
});

export default function AvatarScreen() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [inputText, setInputText] = useState('');
  const [processedText, setProcessedText] = useState('');
  const [activeAvatar, setActiveAvatar] = useState(ybotModel);
  const [speed, setSpeed] = useState(0.1);
  const [pauseTime, setPauseTime] = useState(800);

  const speechEngine = useRef(new SpeechToText());
  const animationController = useRef<AnimationController | null>(null);

  useEffect(() => {
    speechEngine.current.onResult = (result) => setTranscript(result.transcript);
    speechEngine.current.onError = () => setIsListening(false);
    speechEngine.current.onEnd = () => setIsListening(false);
    return () => {
      speechEngine.current.stop();
      speechEngine.current.destroy?.();
    };
  }, []);

  useEffect(() => { setProcessedText(''); }, [activeAvatar]);

  useEffect(() => {
    if (animationController.current) {
      animationController.current.speed = speed;
      animationController.current.pauseTime = pauseTime;
    }
  }, [speed, pauseTime]);

  const toggleListening = async () => {
    if (isListening) {
      setIsListening(false);
      await speechEngine.current.stop();
    } else {
      setTranscript('');
      setIsListening(true);
      await speechEngine.current.start();
    }
  };

  const handleAnimate = (text: string) => {
    if (!text.trim() || !animationController.current) return;
    setProcessedText('');
    animationController.current.playSequence(text.trim().split(/\s+/));
  };

  const renderSettingsPanel = () => (
    <View style={styles.settingsPanel}>
      <Text style={styles.panelTitle}>Settings</Text>

      <Text style={styles.settingLabel}>Avatar</Text>
      <View style={styles.avatarRow}>
        {[{ model: ybotModel, label: 'Y-Bot' }, { model: xbotModel, label: 'X-Bot' }].map(({ model, label }) => (
          <TouchableOpacity
            key={label}
            style={[styles.avatarChip, activeAvatar === model && styles.avatarChipActive]}
            onPress={() => setActiveAvatar(model)}
          >
            <Text style={[styles.avatarChipText, activeAvatar === model && styles.avatarChipTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />

      <Text style={styles.settingLabel}>Speed</Text>
      <View style={styles.stepRow}>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setSpeed(s => Math.max(0.05, parseFloat((s - 0.05).toFixed(2))))}>
          <Ionicons name="remove" size={14} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.stepValue}>{speed.toFixed(2)}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setSpeed(s => Math.min(0.5, parseFloat((s + 0.05).toFixed(2))))}>
          <Ionicons name="add" size={14} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.settingLabel}>Pause (ms)</Text>
      <View style={styles.stepRow}>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setPauseTime(p => Math.max(0, p - 100))}>
          <Ionicons name="remove" size={14} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.stepValue}>{pauseTime}</Text>
        <TouchableOpacity style={styles.stepBtn} onPress={() => setPauseTime(p => Math.min(2000, p + 100))}>
          <Ionicons name="add" size={14} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar style="light" />

      {/* Header bar */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Translate</Text>
          <Text style={styles.headerSub}>Speech → ISL Sign Language</Text>
        </View>
        {processedText ? (
          <View style={styles.signBadge}>
            <Text style={styles.signBadgeText} numberOfLines={1}>✋ {processedText}</Text>
          </View>
        ) : null}
      </View>

      {IS_WIDE ? (
        // ── Wide layout ─────────────────────────────────────────────────
        <View style={styles.wideLayout}>
          {/* Left: input */}
          <View style={styles.wideLeft}>
            <View style={styles.inputPanel}>
              <Text style={styles.panelTitle}>Input</Text>

              {/* Mic */}
              <View style={styles.micSection}>
                <TouchableOpacity onPress={toggleListening} activeOpacity={0.85}>
                  <PulsingMic isActive={isListening} />
                </TouchableOpacity>
                <Text style={styles.micStatusText}>
                  {isListening ? '● Listening...' : 'Tap to speak'}
                </Text>
              </View>

              {/* Speech input */}
              <Text style={styles.inputLabel}>Recognized Speech</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={transcript}
                  onChangeText={setTranscript}
                  placeholder="Your speech..."
                  placeholderTextColor={Colors.textMuted}
                  multiline
                />
              </View>
              <TouchableOpacity style={styles.animateBtn} onPress={() => handleAnimate(transcript)}>
                <Ionicons name="play" size={16} color={Colors.white} />
                <Text style={styles.animateBtnText}>Animate Speech</Text>
              </TouchableOpacity>

              <View style={styles.divider} />

              {/* Manual input */}
              <Text style={styles.inputLabel}>Manual Text</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={inputText}
                  onChangeText={setInputText}
                  placeholder="Type any text..."
                  placeholderTextColor={Colors.textMuted}
                  onSubmitEditing={() => handleAnimate(inputText)}
                />
              </View>
              <TouchableOpacity style={styles.animateBtn} onPress={() => handleAnimate(inputText)}>
                <Ionicons name="play" size={16} color={Colors.white} />
                <Text style={styles.animateBtnText}>Animate Text</Text>
              </TouchableOpacity>

              {/* Processed text display */}
              {processedText ? (
                <View style={styles.processedBox}>
                  <Text style={styles.processedLabel}>Now Signing</Text>
                  <Text style={styles.processedText}>{processedText}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Center: avatar */}
          <View style={styles.wideCenter}>
            <AvatarViewer
              avatarUrl={activeAvatar}
              onControllerReady={(ctrl) => {
                animationController.current = ctrl;
                ctrl.speed = speed;
                ctrl.pauseTime = pauseTime;
                ctrl.onTextAdded = (t) => setProcessedText((p) => p + t);
              }}
            />
          </View>

          {/* Right: settings */}
          <View style={styles.wideRight}>{renderSettingsPanel()}</View>
        </View>
      ) : (
        // ── Mobile layout ────────────────────────────────────────────────
        <View style={styles.mobileLayout}>
          {/* Avatar */}
          <View style={styles.mobileAvatar}>
            <AvatarViewer
              avatarUrl={activeAvatar}
              onControllerReady={(ctrl) => {
                animationController.current = ctrl;
                ctrl.speed = speed;
                ctrl.pauseTime = pauseTime;
                ctrl.onTextAdded = (t) => setProcessedText((p) => p + t);
              }}
            />
          </View>

          {/* Bottom panel */}
          <ScrollView style={styles.mobilePanel} contentContainerStyle={styles.mobilePanelContent}>
            {/* Mic + avatar row */}
            <View style={styles.mobileTopRow}>
              <TouchableOpacity onPress={toggleListening} activeOpacity={0.85}>
                <PulsingMic isActive={isListening} />
              </TouchableOpacity>
              <View style={styles.mobileAvatarBtns}>
                {[{ model: ybotModel, label: 'Y-Bot' }, { model: xbotModel, label: 'X-Bot' }].map(({ model, label }) => (
                  <TouchableOpacity
                    key={label}
                    style={[styles.avatarChip, activeAvatar === model && styles.avatarChipActive]}
                    onPress={() => setActiveAvatar(model)}
                  >
                    <Text style={[styles.avatarChipText, activeAvatar === model && styles.avatarChipTextActive]}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.clearBtn}
                  onPress={() => { setTranscript(''); setProcessedText(''); }}
                >
                  <Ionicons name="refresh" size={14} color={Colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Status */}
            <Text style={styles.micStatusText}>{isListening ? '● Listening...' : 'Tap mic to speak'}</Text>

            {/* Processed text */}
            {processedText ? (
              <View style={styles.processedBox}>
                <Text style={styles.processedLabel}>Now Signing</Text>
                <Text style={styles.processedText}>{processedText}</Text>
              </View>
            ) : null}

            {/* Speech input */}
            <View style={styles.inputGroupRow}>
              <TextInput
                style={styles.textInput}
                value={transcript}
                onChangeText={setTranscript}
                placeholder="Speech input..."
                placeholderTextColor={Colors.textMuted}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={() => handleAnimate(transcript)}>
                <Ionicons name="play" size={18} color={Colors.white} />
              </TouchableOpacity>
            </View>

            {/* Manual input */}
            <View style={styles.inputGroupRow}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Manual text..."
                placeholderTextColor={Colors.textMuted}
                onSubmitEditing={() => handleAnimate(inputText)}
              />
              <TouchableOpacity style={styles.sendBtn} onPress={() => handleAnimate(inputText)}>
                <Ionicons name="play" size={18} color={Colors.white} />
              </TouchableOpacity>
            </View>

            {/* Speed row */}
            <View style={styles.mobileSpeedRow}>
              <Text style={styles.settingLabel}>Speed {speed.toFixed(2)}</Text>
              <View style={styles.stepRow}>
                <TouchableOpacity style={styles.stepBtn} onPress={() => setSpeed(s => Math.max(0.05, parseFloat((s - 0.05).toFixed(2))))}>
                  <Ionicons name="remove" size={14} color={Colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.stepBtn} onPress={() => setSpeed(s => Math.min(0.5, parseFloat((s + 0.05).toFixed(2))))}>
                  <Ionicons name="add" size={14} color={Colors.textPrimary} />
                </TouchableOpacity>
              </View>
              <Text style={styles.settingLabel}>Pause {pauseTime}ms</Text>
              <View style={styles.stepRow}>
                <TouchableOpacity style={styles.stepBtn} onPress={() => setPauseTime(p => Math.max(0, p - 100))}>
                  <Ionicons name="remove" size={14} color={Colors.textPrimary} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.stepBtn} onPress={() => setPauseTime(p => Math.min(2000, p + 100))}>
                  <Ionicons name="add" size={14} color={Colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
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
  signBadge: {
    backgroundColor: Colors.successGlow,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.success,
    maxWidth: 180,
  },
  signBadgeText: {
    color: Colors.success,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
  },

  // Wide
  wideLayout: { flex: 1, flexDirection: 'row' },
  wideLeft: {
    width: 180,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  wideCenter: { flex: 1, backgroundColor: Colors.bg },
  wideRight: {
    width: 220,
    borderLeftWidth: 1,
    borderLeftColor: Colors.border,
    backgroundColor: Colors.surface,
  },

  // Mobile
  mobileLayout: { flex: 1 },
  mobileAvatar: { height: 300, backgroundColor: Colors.surfaceAlt },
  mobilePanel: { flex: 1, backgroundColor: Colors.surface },
  mobilePanelContent: { padding: Spacing.base, gap: Spacing.md, paddingBottom: Spacing.xxl },
  mobileTopRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.base },
  mobileAvatarBtns: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  mobileSpeedRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, flexWrap: 'wrap' },

  // Panels
  settingsPanel: { padding: Spacing.base, gap: Spacing.md },
  inputPanel: { padding: Spacing.base, gap: Spacing.md },
  panelTitle: {
    color: Colors.textPrimary,
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
    marginBottom: Spacing.xs,
  },
  divider: { height: 1, backgroundColor: Colors.border },

  // Avatar picker
  avatarRow: { flexDirection: 'row', gap: Spacing.sm },
  avatarChip: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  avatarChipActive: { backgroundColor: Colors.primaryGlow, borderColor: Colors.primary },
  avatarChipText: { color: Colors.textMuted, fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  avatarChipTextActive: { color: Colors.primary },

  // Stepper
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  stepBtn: {
    width: 30,
    height: 30,
    borderRadius: Radius.sm,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepValue: { color: Colors.textPrimary, fontSize: FontSize.sm, fontWeight: FontWeight.semibold, flex: 1, textAlign: 'center' },
  settingLabel: { color: Colors.textMuted, fontSize: FontSize.xs, fontWeight: FontWeight.semibold, letterSpacing: 0.5, textTransform: 'uppercase' },

  // Mic section
  micSection: { alignItems: 'center', gap: Spacing.sm, paddingVertical: Spacing.md },
  micStatusText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    textAlign: 'center',
  },

  // Input
  inputLabel: { color: Colors.textMuted, fontSize: FontSize.xs, fontWeight: FontWeight.semibold, letterSpacing: 0.5, textTransform: 'uppercase' },
  inputRow: { gap: Spacing.sm },
  inputGroupRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  textInput: {
    flex: 1,
    backgroundColor: Colors.surfaceAlt,
    color: Colors.textPrimary,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: FontSize.md,
    minHeight: 44,
  },
  animateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  animateBtnText: { color: Colors.white, fontSize: FontSize.sm, fontWeight: FontWeight.bold },
  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: Radius.md,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  clearBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Processed
  processedBox: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radius.md,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.successGlow,
  },
  processedLabel: { color: Colors.success, fontSize: FontSize.xs, fontWeight: FontWeight.bold, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.xs },
  processedText: { color: Colors.secondary, fontSize: FontSize.lg, fontWeight: FontWeight.bold },
});
