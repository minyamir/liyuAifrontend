import apiPrivate from "./apiPrivate"; 

export const sendAiMessage = async (sessionId, message) => {
  const response = await apiPrivate.post('/api/ai/chat/', {
    session_id: sessionId,
    message: message
  });
  return response.data; // Returns { reply: "..." }
};

export const getChatHistory = async (sessionId) => {
  const response = await apiPrivate.get(`/api/ai/chat/`, {
    params: { session_id: sessionId } 
  });
  return response.data;
};

export const updateStudyLanguage = async (sessionId, language) => {
  const response = await apiPrivate.patch('/api/studyroom/update-language/', {
    session_id: sessionId,
    language: language // "en" or "am"
  });
  return response.data;
};

export const getAiSummary = async (sessionId) => {
  const response = await apiPrivate.post(`/api/summery/generate/`, {
     session_id: sessionId 
  });
  // Per your backend format: response.data = { message: "...", summary: {...} }
  return response.data.summary; 
};

export const getAiQuiz = async (sessionId) => {
  const response = await apiPrivate.post(`/api/quiz/generate/`, {session_id: sessionId}  );
  return response.data; // This returns the { quiz_id, topic, questions: [] } object
};

export const submitQuizResult = async (quizId, score) => {
  const response = await apiPrivate.post(`/api/quiz/submit-result/`, {
    quiz_id: quizId,
    score: score
  });
  return response.data;
};