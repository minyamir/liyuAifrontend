import apiPrivate from "./apiPrivate";

/**
 * 2.1 Get Subjects
 * Fetches the list of subjects filtered by the user's grade and field.
 * Returns: Array of subject objects [{id, name, category, grade_level, field, description}]
 */
export const getSubjects = async () => {
  try{
  const response = await apiPrivate.get("/api/subjects/");
  return response.data;
  }catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};

/**
 * 3.1 Start Study Session
 * Initializes a session for a specific subject. 
 * This is called when a user clicks a Subject Card.
 * Request: { subject_id: number }
 * Returns: { session_id, subject, grade, feild, language, created }
 */
export const startStudySession = async (subjectId) => {
  const response = await apiPrivate.post("/api/studyroom/start/", {
    subject_id: subjectId,
  });
  return response.data;
};

/**
 * 8.1 Get Progress Stats
 * Fetches the user's level, XP, streak, and subject mastery.
 * Used for the Dashboard Sidebar (Flame card and Progress card).
 */
export const getProgressStats = async () => {
  try {
  const response = await apiPrivate.get("/api/progress/stats/");
  return response.data;
  } catch (error) {
    console.error("Error fetching progress stats:", error);
    throw error;
  }
};