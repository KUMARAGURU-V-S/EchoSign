import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState, useRef, useEffect } from 'react';
import AvatarViewer from '../src/components/AvatarViewer';
import { SpeechToText } from '../src/engine/SpeechToText';
import { AnimationController } from '../src/engine/AnimationController';
import { Asset } from 'expo-asset';

// We load the models so Expo packs them
const xbotModel = require('../assets/xbot.glb');
const ybotModel = require('../assets/ybot.glb');

export default function HomeScreen() {
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
    speechEngine.current.onResult = (result) => {
      console.log('Speech result:', result.transcript);
      setTranscript(result.transcript);
    };
    
    speechEngine.current.onError = (err) => {
      console.warn('Speech error:', err);
      setIsListening(false);
    };

    speechEngine.current.onEnd = () => {
      setIsListening(false);
    };

    return () => {
      speechEngine.current.stop();
      if (speechEngine.current.destroy) {
        speechEngine.current.destroy();
      }
    };
  }, []);
  
  // Whenever active avatar changes, reset processed text
  useEffect(() => {
    setProcessedText('');
  }, [activeAvatar]);

  // Update controller settings when state changes
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

  const handleStartAnimation = (textToAnimate: string) => {
    if (!textToAnimate.trim() || !animationController.current) return;
    
    // Split text by space and queue
    const words = textToAnimate.trim().split(/\s+/);
    setProcessedText(''); // Reset processed text before starting
    animationController.current.playSequence(words);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.topSection}>
        <View style={styles.avatarContainer}>
          <AvatarViewer 
            avatarUrl={activeAvatar} 
            onControllerReady={(controller) => {
              animationController.current = controller;
              controller.speed = speed;
              controller.pauseTime = pauseTime;
              controller.onTextAdded = (t) => setProcessedText(prev => prev + t);
            }}
          />
        </View>
        
        {/* Right side controls (speed, pause, avatar select) for tablets/web or scrollview for mobile */}
        <View style={styles.settingsPanel}>
          <Text style={styles.label}>Select Avatar:</Text>
          <View style={styles.avatarPickerRow}>
            <TouchableOpacity 
              style={[styles.avatarBtn, activeAvatar === xbotModel && styles.activeBtn]}
              onPress={() => setActiveAvatar(xbotModel)}>
              <Text style={styles.avatarBtnText}>X-Bot</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.avatarBtn, activeAvatar === ybotModel && styles.activeBtn]}
              onPress={() => setActiveAvatar(ybotModel)}>
              <Text style={styles.avatarBtnText}>Y-Bot</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.label}>Speed: {speed.toFixed(2)}</Text>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setSpeed(s => Math.max(0.05, s - 0.05))}>
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setSpeed(s => Math.min(0.5, s + 0.05))}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Pause (ms): {pauseTime}</Text>
          <View style={styles.controlsRow}>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setPauseTime(p => Math.max(0, p - 100))}>
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlBtn} onPress={() => setPauseTime(p => Math.min(2000, p + 100))}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <ScrollView style={styles.panel}>
        <View style={styles.processedBox}>
          <Text style={styles.label}>Processed Text (Live):</Text>
          <Text style={styles.processedText}>{processedText || 'Waiting for animation...'}</Text>
        </View>

        <Text style={styles.label}>Speech Recognition: {isListening ? 'on' : 'off'}</Text>
        <View style={styles.micControls}>
          <TouchableOpacity style={[styles.button, isListening && styles.buttonActive]} onPress={toggleListening}>
            <Text style={styles.buttonText}>{isListening ? 'Mic Off' : 'Mic On'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonSecondary} onPress={() => setTranscript('')}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Speech input..."
            placeholderTextColor="#718096"
            value={transcript}
            onChangeText={setTranscript}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleStartAnimation(transcript)}>
            <Text style={styles.buttonText}>Animate</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Manual text input..."
            placeholderTextColor="#718096"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleStartAnimation(inputText)}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => handleStartAnimation(inputText)}>
            <Text style={styles.buttonText}>Animate</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111318',
  },
  topSection: {
    flex: 1,
    flexDirection: 'row',
  },
  avatarContainer: {
    flex: 2,
    backgroundColor: '#1b1e24',
  },
  settingsPanel: {
    flex: 1,
    backgroundColor: '#2d3748',
    padding: 16,
    borderLeftWidth: 1,
    borderColor: '#4a5568',
  },
  avatarPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  avatarBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#4a5568',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  activeBtn: {
    backgroundColor: '#3182ce',
  },
  avatarBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  controlBtn: {
    backgroundColor: '#4a5568',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  controlText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  panel: {
    backgroundColor: '#1b1e24',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '45%',
  },
  processedBox: {
    backgroundColor: '#2a4365',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  processedText: {
    color: '#90cdf4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  micControls: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    backgroundColor: '#3182ce',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  buttonActive: {
    backgroundColor: '#e53e3e',
  },
  buttonSecondary: {
    backgroundColor: '#4a5568',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#2d3748',
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: '#48bb78',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  label: {
    color: '#a0aec0',
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
});
