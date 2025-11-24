// API service layer for backend integration
const API_BASE_URL = 'https://primary-production-24c8a.up.railway.app';

export interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  status: 'active' | 'pending' | 'inactive';
  lastService: string;
  nextService: string;
  servicesCount: number;
  contractValue: string;
  createdAt: string;
}

export interface Service {
  id: string;
  type: string;
  client: string;
  clientId: string;
  technician: string;
  technicianId: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  duration: string;
  cost: string;
  description?: string;
  location: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  location: string;
  client: string;
  clientId: string;
  status: 'good' | 'maintenance-due' | 'critical' | 'out-of-service';
  lastInspection: string;
  nextInspection: string;
  certificationExpiry: string;
  serialNumber: string;
  manufacturer?: string;
  model?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  certifications: string[];
  activeServices: number;
  completedServices: number;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
  avatar: string;
  department: string;
}

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Client Management
  async getClients(): Promise<Client[]> {
    return this.request<Client[]>('/api/clients');
  }

  async createClient(client: Omit<Client, 'id' | 'createdAt'>): Promise<Client> {
    return this.request<Client>('/api/clients', {
      method: 'POST',
      body: JSON.stringify(client),
    });
  }

  async updateClient(id: string, client: Partial<Client>): Promise<Client> {
    return this.request<Client>(`/api/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(client),
    });
  }

  async deleteClient(id: string): Promise<void> {
    return this.request<void>(`/api/clients/${id}`, {
      method: 'DELETE',
    });
  }

  // Service Management
  async getServices(): Promise<Service[]> {
    return this.request<Service[]>('/api/services');
  }

  async createService(service: Omit<Service, 'id'>): Promise<Service> {
    return this.request<Service>('/api/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  }

  async updateService(id: string, service: Partial<Service>): Promise<Service> {
    return this.request<Service>(`/api/services/${id}`, {
      method: 'PUT',
      body: JSON.stringify(service),
    });
  }

  // Equipment Management
  async getEquipment(): Promise<Equipment[]> {
    return this.request<Equipment[]>('/api/equipment');
  }

  async createEquipment(equipment: Omit<Equipment, 'id'>): Promise<Equipment> {
    return this.request<Equipment>('/api/equipment', {
      method: 'POST',
      body: JSON.stringify(equipment),
    });
  }

  async updateEquipment(id: string, equipment: Partial<Equipment>): Promise<Equipment> {
    return this.request<Equipment>(`/api/equipment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(equipment),
    });
  }

  // Employee Management
  async getEmployees(): Promise<Employee[]> {
    return this.request<Employee[]>('/api/employees');
  }

  async createEmployee(employee: Omit<Employee, 'id'>): Promise<Employee> {
    return this.request<Employee>('/api/employees', {
      method: 'POST',
      body: JSON.stringify(employee),
    });
  }

  async updateEmployee(id: string, employee: Partial<Employee>): Promise<Employee> {
    return this.request<Employee>(`/api/employees/${id}`, {
      method: 'PUT',
      body: JSON.stringify(employee),
    });
  }

  // Dashboard Analytics
  async getDashboardStats(): Promise<any> {
    return this.request<any>('/api/dashboard/stats');
  }

  async getServiceTrends(): Promise<any> {
    return this.request<any>('/api/dashboard/trends');
  }

  // Reports
  async generateReport(type: string, params: any): Promise<any> {
    return this.request<any>('/api/reports/generate', {
      method: 'POST',
      body: JSON.stringify({ type, params }),
    });
  }
}

export const apiService = new ApiService();