import api from "./api";

// GET ALL
export const getSubjects = () => api.get("/subjects");

// GET BY ID
export const getSubjectById = (id) => api.get(`/subjects/${id}`);

// CREATE
export const createSubject = (data) => api.post("/subjects", data);

// UPDATE
export const updateSubject = (id, data) =>
  api.put(`/subjects/${id}`, data);

// DELETE
export const deleteSubject = (id) =>
  api.delete(`/subjects/${id}`);