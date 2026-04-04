import apiPublic from "./apiPublic";
import apiPrivate from "./apiPrivate";

/**
 * 1.1 Login
 * Sends email/password and returns { access, refresh }
 */
export const loginUser = async (credentials) => {
  const response = await apiPublic.post("/api/users/login/", credentials);
  return response.data;
};

/**
 * 1.2 Register
 * Sends name, email, password, confirm_password
 */
export const registerUser = async (userData) => {
  const response = await apiPublic.post("/api/users/register/", userData);
  return response.data;
};

/**
 * 1.3 & 1.4 Set User Preferences (Private)
 * These require the token, so we use apiPrivate
 */
export const setUserGrade = async (gradeData) => {
  const response = await apiPrivate.post("/api/users/set-grade/", gradeData);
  return response.data;
};

export const setUserField = async (fieldData) => {
  const response = await apiPrivate.post("/api/users/set-field/", fieldData);
  return response.data;
};


// 1.5 Get Current User Info

export const getUserInfo = async () => {
  const response = await apiPrivate.get("/api/users/me/");
  return response.data;
};