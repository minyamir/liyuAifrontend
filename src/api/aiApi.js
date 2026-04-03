import apiPrivate from "./apiPrivate"; 

export const sendAiMessage = async (sessionId, message) => {
  const response = await apiPrivate.post('/api/ai/chat/', {
    session_id: sessionId,
    message: message
  });
  return response.data; // Returns { reply: "..." }
};

export const updateStudyLanguage = async (sessionId, language) => {
  const response = await apiPrivate.patch('/api/studyroom/update-language/', {
    session_id: sessionId,
    language: language // "en" or "am"
  });
  return response.data;
};