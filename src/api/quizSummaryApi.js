import apiPrivate from "./apiPrivate";
 
// Summary
export const generateSummary = async (sessionId) => {
  const response = await apiPrivate.post('/api/summery/generate/', { session_id: sessionId });
  return response.data; 
};

// Quiz
export const generateQuiz = async (sessionId) => {
  const response = await apiPrivate.post('/api/quiz/generate/', { session_id: sessionId });
  return response.data; 
};

export const submitQuizResult = async (quizId, score) => {
  const response = await apiPrivate.post('/api/quiz/submit-result/', {
    quiz_id: quizId,
    score: score
  });
  return response.data;
};