import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(config => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});

export default {
  // Authentification
  login(credentials) {
    return apiClient.post('/login', credentials);
  },

  // Enseignants
  createTeacher(teacherData) {
    return apiClient.post('/teachers/create', teacherData);
  },
  getAllTeachers() {
    return apiClient.get('/teachers/list');
  },
  getTeacherById(teacherId) {
    return apiClient.get(`/teachers/${teacherId}/details`);
  },
  updateTeacher(teacherId, teacherData) {
    return apiClient.post(`/teachers/${teacherId}/update`, teacherData);
  },
  deleteTeacher(teacherId) {
    return apiClient.delete(`/teachers/${teacherId}/delete`);
  },

  // Étudiants
  createStudent(studentData) {
    return apiClient.post('/students/create', studentData);
  },
  getAllStudents() {
    return apiClient.get('/students/list');
  },
  getStudentById(studentId) {
    return apiClient.get(`/students/${studentId}/details`);
  },
  updateStudent(studentId, studentData) {
    return apiClient.post(`/students/${studentId}/update`, studentData);
  },
  deleteStudent(studentId) {
    return apiClient.delete(`/students/${studentId}/delete`);
  },

  // Soutenances
  createDefense(defenseData) {
    return apiClient.post('/defenses/create', defenseData);
  },
  getAllDefenses() {
    return apiClient.get('/defenses/list');
  },
  getDefenseById(defenseId) {
    return apiClient.get(`/defenses/${defenseId}/details`);
  },
  updateDefense(defenseId, defenseData) {
    return apiClient.post(`/defenses/${defenseId}/update`, defenseData);
  },
  deleteDefense(defenseId) {
    return apiClient.delete(`/defenses/${defenseId}/delete`);
  },
};
