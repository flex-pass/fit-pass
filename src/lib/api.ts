// Centralized API client for FlexPass
import apiClient from './api-client';

export interface Gym {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  tier: 1 | 2 | 3; // 1=premium, 2=mid, 3=budget
  peak_credit_cost: number;
  offpeak_credit_cost: number;
  rating: number;
  distance: string;
  image: string;
  amenities: string[];
  peak_hours: string;
  kill_switch: boolean;
  is_approved: boolean;
}

export interface CheckIn {
  id: string;
  userName: string;
  gymName: string;
  time: string;
  creditsUsed: number;
  earnings: number;
  status: 'success' | 'failed' | 'fraud';
}

export interface CreditPlan {
  id: string;
  name: string;
  price: number;
  credits: number;
  costPerCredit: number;
  rollover: number;
}



export const creditPlans: CreditPlan[] = [
  { id: 'plan-basic', name: 'Basic', price: 1500, credits: 30, costPerCredit: 50, rollover: 30 },
  { id: 'plan-standard', name: 'Standard', price: 2500, credits: 55, costPerCredit: 45.4, rollover: 55 },
  { id: 'plan-premium', name: 'Premium', price: 4000, credits: 100, costPerCredit: 40, rollover: 100 },
];

// Helper to determine if current time is peak hours
export function isPeakHour(gym: Gym): boolean {
  const now = new Date();
  const hours = now.getHours();
  // Simple check for demo: peak morning is 6-9 AM (6-9), peak evening is 6-9 PM (18-21)
  if ((hours >= 6 && hours < 9) || (hours >= 18 && hours < 21)) {
    return true;
  }
  return false;
}

export function getCurrentCreditCost(gym: Gym): number {
  return isPeakHour(gym) ? gym.peak_credit_cost : gym.offpeak_credit_cost;
}

// REST Backend Services
export const gymService = {
  async getNearby(lat: number, lng: number, radius?: number) {
    const response = await apiClient.get('/gyms/nearby', {
      params: { lat, lng, radius }
    });
    return response.data;
  },
  async getById(id: string) {
    const response = await apiClient.get(`/gyms/${id}`);
    return response.data;
  },
  async getCreditCost(id: string) {
    const response = await apiClient.get(`/gyms/${id}/credit-cost`);
    return response.data;
  },
  async create(gymData: any) {
    const response = await apiClient.post('/gyms', gymData);
    return response.data;
  },
  async update(id: string, gymData: any) {
    const response = await apiClient.put(`/gyms/${id}`, gymData);
    return response.data;
  },
  async toggleKillSwitch(id: string, kill_switch: boolean) {
    const response = await apiClient.patch(`/gyms/${id}/kill-switch`, { kill_switch });
    return response.data;
  }
};

export const checkinService = {
  async generateQR(gymId: string, lat: number, lng: number) {
    const response = await apiClient.post('/checkin/generate-qr', {
      gym_id: gymId,
      user_lat: lat,
      user_lng: lng
    });
    return response.data;
  },
  async validateQR(qrToken: string) {
    const response = await apiClient.post('/checkin/validate', {
      qr_token: qrToken
    });
    return response.data;
  },
  async getHistory() {
    const response = await apiClient.get('/checkin/history');
    return response.data;
  }
};

export const creditsService = {
  async getBalance() {
    const response = await apiClient.get('/credits/balance');
    return response.data;
  },
  async getHistory() {
    const response = await apiClient.get('/credits/history');
    return response.data;
  },
  async purchaseTopup(amount: number, description?: string) {
    const response = await apiClient.post('/credits/topup', {
      amount,
      type: 'topup',
      description
    });
    return response.data;
  }
};

export const adminService = {
  async approveGym(id: string) {
    const response = await apiClient.patch(`/admin/gyms/${id}/approve`);
    return response.data;
  },
  async getPendingGyms() {
    const response = await apiClient.get('/admin/gyms');
    return response.data;
  },
  async getFraudLogs() {
    const response = await apiClient.get('/admin/fraud-logs');
    return response.data;
  },
  async getDashboard() {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  },
  async getUsers() {
    const response = await apiClient.get('/admin/users');
    return response.data;
  },
  async getAdmins() {
    const response = await apiClient.get('/admin/admins');
    return response.data;
  }
};

