import axios from 'axios';
import { mockEmployees, mockDivisions, mockAdmin } from './mockData';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

// Helper untuk simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper untuk generate UUID
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// =============== AUTH API ===============
export const authAPI = {
  login: async (credentials) => {
    if (IS_DEMO_MODE) {
      await delay(800); // Simulate network delay
      
      if (credentials.username === 'admin' && credentials.password === 'pastibisa') {
        return {
          data: {
            status: 'success',
            message: 'Login berhasil',
            data: {
              token: 'demo-token-' + Date.now(),
              admin: mockAdmin
            }
          }
        };
      } else {
        throw {
          response: {
            data: {
              status: 'error',
              message: 'Username atau password salah'
            }
          }
        };
      }
    }
    return api.post('/login', credentials);
  },
  
  logout: async () => {
    if (IS_DEMO_MODE) {
      await delay(300);
      return { 
        data: { 
          status: 'success', 
          message: 'Logout berhasil' 
        } 
      };
    }
    return api.post('/logout');
  },
};

// =============== DIVISION API ===============
export const divisionAPI = {
  getAll: async (params) => {
    if (IS_DEMO_MODE) {
      await delay(500);
      
      let divisions = [...mockDivisions];
      
      // Filter by name
      if (params.name) {
        divisions = divisions.filter(d => 
          d.name.toLowerCase().includes(params.name.toLowerCase())
        );
      }
      
      // Pagination
      const page = parseInt(params.page) || 1;
      const perPage = 10;
      const total = divisions.length;
      const lastPage = Math.ceil(total / perPage) || 1;
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedDivisions = divisions.slice(start, end);
      
      return {
        data: {
          status: 'success',
          message: 'Data divisi berhasil diambil',
          data: { 
            divisions: paginatedDivisions 
          },
          pagination: {
            current_page: page,
            last_page: lastPage,
            per_page: perPage,
            total: total,
            from: paginatedDivisions.length > 0 ? start + 1 : null,
            to: paginatedDivisions.length > 0 ? Math.min(end, total) : null
          }
        }
      };
    }
    return api.get('/divisions', { params });
  },
};

// =============== EMPLOYEE API ===============
export const employeeAPI = {
  getAll: async (params) => {
    if (IS_DEMO_MODE) {
      await delay(600);
      
      // Initialize demo employees in localStorage if not exists
      if (!localStorage.getItem('demo_employees')) {
        localStorage.setItem('demo_employees', JSON.stringify(mockEmployees));
      }
      
      // Get employees from localStorage
      let employees = JSON.parse(localStorage.getItem('demo_employees') || '[]');
      
      // Filter by name
      if (params.name) {
        employees = employees.filter(e => 
          e.name.toLowerCase().includes(params.name.toLowerCase())
        );
      }
      
      // Filter by division
      if (params.division_id) {
        employees = employees.filter(e => e.division.id === params.division_id);
      }
      
      // Pagination
      const page = parseInt(params.page) || 1;
      const perPage = 10;
      const total = employees.length;
      const lastPage = Math.ceil(total / perPage) || 1;
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedEmployees = employees.slice(start, end);
      
      return {
        data: {
          status: 'success',
          message: 'Data karyawan berhasil diambil',
          data: { 
            employees: paginatedEmployees 
          },
          pagination: {
            current_page: page,
            last_page: lastPage,
            per_page: perPage,
            total: total,
            from: paginatedEmployees.length > 0 ? start + 1 : null,
            to: paginatedEmployees.length > 0 ? Math.min(end, total) : null
          }
        }
      };
    }
    return api.get('/employees', { params });
  },
  
  create: async (data) => {
    if (IS_DEMO_MODE) {
      await delay(800);
      
      const employees = JSON.parse(localStorage.getItem('demo_employees') || '[]');
      
      // Handle image
      let imageUrl = 'https://i.pravatar.cc/150?img=' + Math.floor(Math.random() * 70);
      if (data.image && data.image instanceof File) {
        // Convert image to base64 for demo
        const reader = new FileReader();
        imageUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(data.image);
        });
      }
      
      // Find division
      const division = mockDivisions.find(d => d.id === data.division);
      
      // Create new employee
      const newEmployee = {
        id: generateUUID(),
        name: data.name,
        phone: data.phone,
        image: imageUrl,
        division: division || mockDivisions[0],
        position: data.position
      };
      
      // Add to beginning of array
      employees.unshift(newEmployee);
      localStorage.setItem('demo_employees', JSON.stringify(employees));
      
      return {
        data: {
          status: 'success',
          message: 'Data karyawan berhasil ditambahkan'
        }
      };
    }
    
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    return api.post('/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  update: async (id, data) => {
    if (IS_DEMO_MODE) {
      await delay(800);
      
      const employees = JSON.parse(localStorage.getItem('demo_employees') || '[]');
      const index = employees.findIndex(e => e.id === id);
      
      if (index === -1) {
        throw {
          response: {
            data: {
              status: 'error',
              message: 'Data karyawan tidak ditemukan'
            }
          }
        };
      }
      
      // Find division
      const division = mockDivisions.find(d => d.id === data.division);
      
      // Handle image update
      let imageUrl = employees[index].image;
      if (data.image && data.image instanceof File) {
        const reader = new FileReader();
        imageUrl = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(data.image);
        });
      }
      
      // Update employee
      employees[index] = {
        ...employees[index],
        name: data.name,
        phone: data.phone,
        division: division || employees[index].division,
        position: data.position,
        image: imageUrl
      };
      
      localStorage.setItem('demo_employees', JSON.stringify(employees));
      
      return {
        data: {
          status: 'success',
          message: 'Data karyawan berhasil diupdate'
        }
      };
    }
    
    const formData = new FormData();
    formData.append('_method', 'PUT');
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return api.post(`/employees/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  
  delete: async (id) => {
    if (IS_DEMO_MODE) {
      await delay(500);
      
      const employees = JSON.parse(localStorage.getItem('demo_employees') || '[]');
      const index = employees.findIndex(e => e.id === id);
      
      if (index === -1) {
        throw {
          response: {
            data: {
              status: 'error',
              message: 'Data karyawan tidak ditemukan'
            }
          }
        };
      }
      
      // Remove employee
      employees.splice(index, 1);
      localStorage.setItem('demo_employees', JSON.stringify(employees));
      
      return {
        data: {
          status: 'success',
          message: 'Data karyawan berhasil dihapus'
        }
      };
    }
    return api.delete(`/employees/${id}`);
  },
};

export default api;