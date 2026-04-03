import axios from 'axios';
import { generateSystemPrompt } from '../../utils/promptBuilder';

export const askAI = async (prompt, context) => {
  const { grade, subject, language } = context;
  const systemMessage = generateSystemPrompt(grade, subject, language);

  // For Hackathon MVP: Mock response or direct API call
  console.log("System Prompt Sent:", systemMessage);
  
  // Replace with actual API endpoint
  // const response = await axios.post('/api/ai/chat', { prompt, systemMessage });
  // return response.data;

  return `[Mock AI Response for ${subject}]: This is a placeholder explanation for ${grade} in ${language}.`;
};