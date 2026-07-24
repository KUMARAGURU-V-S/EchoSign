// Minimal wrapper for Web Speech API

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

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-IN'; // Indian English
        
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
  }

  public start() {
    if (!this.recognition) {
      if (this.onError) this.onError('Speech Recognition not supported');
      return;
    }
    if (this.isListening) return;
    try {
      this.recognition.start();
      this.isListening = true;
    } catch (e: any) {
      if (this.onError) this.onError(e.message);
    }
  }

  public stop() {
    if (!this.recognition || !this.isListening) return;
    this.recognition.stop();
    this.isListening = false;
  }
}
