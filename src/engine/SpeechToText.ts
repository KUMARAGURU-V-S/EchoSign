import { Platform, PermissionsAndroid } from 'react-native';
import { ExpoSpeechRecognitionModule } from 'expo-speech-recognition';

export interface SpeechToTextResult {
  transcript: string;
  isFinal: boolean;
}

export class SpeechToText {
  private recognition: any = null;
  private isListening = false;
  
  public onResult?: (result: SpeechToTextResult) => void;
  public onError?: (error: string) => void;
  public onEnd?: () => void;

  private listeners: any[] = [];

  constructor() {
    if (Platform.OS === 'web') {
      if (typeof window !== 'undefined') {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          this.recognition = new SpeechRecognition();
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          this.recognition.lang = 'en-IN';
          
          this.recognition.onresult = (event: any) => {
            let interimTranscript = '';
            let finalTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
              } else {
                interimTranscript += event.results[i][0].transcript;
              }
            }

            if (this.onResult) {
              this.onResult({
                transcript: finalTranscript || interimTranscript,
                isFinal: !!finalTranscript
              });
            }
          };

          this.recognition.onerror = (event: any) => {
            if (this.onError) this.onError(event.error);
          };

          this.recognition.onend = () => {
            this.isListening = false;
            if (this.onEnd) this.onEnd();
          };
        } else {
          console.warn('SpeechRecognition API not supported in this browser.');
        }
      }
    } else {
      // Native using expo-speech-recognition
      this.listeners.push(
        ExpoSpeechRecognitionModule.addListener('result', (event) => {
          if (event.results && event.results.length > 0) {
            const lastResult = event.results[0]; // best result
            if (this.onResult) {
              this.onResult({
                transcript: lastResult.transcript,
                isFinal: event.isFinal,
              });
            }
          }
        })
      );

      this.listeners.push(
        ExpoSpeechRecognitionModule.addListener('error', (event) => {
          if (this.onError) this.onError(event.message);
          this.isListening = false;
          if (this.onEnd) this.onEnd();
        })
      );

      this.listeners.push(
        ExpoSpeechRecognitionModule.addListener('end', () => {
          this.isListening = false;
          if (this.onEnd) this.onEnd();
        })
      );
    }
  }

  public async start() {
    if (this.isListening) return;

    if (Platform.OS === 'web') {
      if (!this.recognition) {
        if (this.onError) this.onError('Speech Recognition not supported');
        return;
      }
      try {
        this.recognition.start();
        this.isListening = true;
      } catch (e: any) {
        if (this.onError) this.onError(e.message);
      }
    } else {
      try {
        const { granted } = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
        if (!granted) {
          if (this.onError) this.onError('Microphone permission denied');
          return;
        }

        this.isListening = true;
        ExpoSpeechRecognitionModule.start({
          lang: 'en-IN',
          interimResults: true,
          continuous: true,
        });
      } catch (e: any) {
        this.isListening = false;
        if (this.onError) this.onError(e.message);
      }
    }
  }

  public async stop() {
    if (!this.isListening) return;

    if (Platform.OS === 'web') {
      if (this.recognition) {
        this.recognition.stop();
      }
    } else {
      try {
        ExpoSpeechRecognitionModule.stop();
      } catch (e) {
        console.warn(e);
      }
    }
    this.isListening = false;
  }

  public destroy() {
    this.listeners.forEach(l => l.remove && l.remove());
    this.listeners = [];
  }
}
