import removeMarkdown from 'remove-markdown';
export const liyuVoice = {
  enabled: true,
  
  speak: (text) => {
    if (!liyuVoice.enabled || !text) return;

    // Stop any current speaking before starting new one
    window.speechSynthesis.cancel();

    const cleanText = removeMarkdown(text);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Auto-detect Amharic to set the correct language code
    const isAmharic = /[ሀ-፼]/.test(text);
    utterance.lang = isAmharic ? 'am-ET' : 'en-US';
    
    // Optional: Adjust pitch and rate for a "Tutor" feel
    utterance.pitch = 1.1;
    utterance.rate = 1.0;

    window.speechSynthesis.speak(utterance);
  },

  stop: () => {
    window.speechSynthesis.cancel();
  }
};