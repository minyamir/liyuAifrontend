import React, { useState } from 'react';
import { Mic, Square } from 'lucide-react';

const VoiceButton = () => {
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Logic: Trigger Web Speech API or Whisper here
    if (!isRecording) {
      console.log("Listening...");
    } else {
      console.log("Stopped.");
    }
  };

  return (
    <button
      type="button"
      onClick={toggleRecording}
      className={`relative p-3 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isRecording 
          ? 'bg-red-500 text-white shadow-lg shadow-red-100' 
          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
      }`}
    >
      {isRecording ? (
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