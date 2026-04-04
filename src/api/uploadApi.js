import apiPrivate from "./apiPrivate";
 

export const uploadFile = async (file, sessionId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('session', sessionId);

  const response = await apiPrivate.post('/api/uploads/upload/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data; // Returns serialized file data
};

export const getSessionFiles = async (sessionId) => {
  const response = await apiPrivate.get(`/api/uploads/list/?session_id=${sessionId}`);
  return response.data; // Returns list of active PDFs for this session
};

export const deleteFile = async (fileId) => {
  const response = await apiPrivate.delete(`/api/uploads/${fileId}/delete/`);
  return response.data;
};


export const activateFile = async (fileId) => {
  const response = await apiPrivate.post(`/api/uploads/${fileId}/activate/`);
  return response.data;
};