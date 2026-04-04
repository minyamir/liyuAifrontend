import React, { useState, useEffect, useRef } from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceButton = ({ onTranscript, language = 'en-US' }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recog = new SpeechRecognition();
    recog.continuous = true; 
    recog.interimResults = false; // We only want final results to avoid replication
    recog.lang = language;

    recog.onresult = (event) => {
      const last = event.results.length - 1;
      const transcript = event.results[last][0].transcript;

      if (event.results[last].isFinal) {
        // Send the clean, finalized text to the input
        onTranscript(transcript.trim());
      }
    };

    recog.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recog;

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [language, onTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleListening}
      className={`relative p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isListening 
          ? 'bg-red-500 text-white shadow-lg shadow-red-200' 
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {isListening ? (
        <>
          <Square size={18} fill="currentColor" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
        </>
      ) : (
        <Mic size={18} />
      )}
    </button>
  );
};

export default VoiceButton;