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

// Mock Database State
export const mockGyms: Gym[] = [
  {
    id: 'gym-noida-1',
    name: 'Gold\'s Gym (Sector 62)',
    address: 'Plot A-40, Sector 62, Noida, UP 201301',
    latitude: 28.6273,
    longitude: 77.3725,
    tier: 1,
    peak_credit_cost: 10,
    offpeak_credit_cost: 8,
    rating: 4.8,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
    amenities: ['weights', 'cardio', 'pool', 'shower', 'sauna'],
    peak_hours: '06:00 - 09:00, 18:00 - 21:00',
    kill_switch: false,
    is_approved: true,
  },
  {
    id: 'gym-noida-2',
    name: 'FitLine Fitness Studio (Sector 18)',
    address: 'Wave Mall, 3rd Floor, Sector 18, Noida, UP 201301',
    latitude: 28.5708,
    longitude: 77.3261,
    tier: 2,
    peak_credit_cost: 6,
    offpeak_credit_cost: 4,
    rating: 4.5,
    distance: '4.5 km',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    amenities: ['weights', 'cardio', 'shower', 'parking'],
    peak_hours: '07:00 - 10:00, 17:00 - 20:00',
    kill_switch: false,
    is_approved: true,
  },
  {
    id: 'gym-noida-3',
    name: 'The Iron Temple Club (Sector 76)',
    address: 'Silicon Valley Arcade, Sector 76, Noida, UP 201304',
    latitude: 28.5672,
    longitude: 77.3850,
    tier: 3,
    peak_credit_cost: 4,
    offpeak_credit_cost: 2,
    rating: 4.2,
    distance: '2.8 km',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
    amenities: ['weights', 'cardio', 'shower'],
    peak_hours: '06:00 - 09:00, 19:00 - 22:00',
    kill_switch: false,
    is_approved: true,
  },
  {
    id: 'gym-noida-4',
    name: 'Breathe Yoga & Pilates Studio (Sector 50)',
    address: 'Central Plaza, Floor 2, Sector 50, Noida, UP 201301',
    latitude: 28.5833,
    longitude: 77.3614,
    tier: 2, // Boutique
    peak_credit_cost: 15,
    offpeak_credit_cost: 12,
    rating: 4.9,
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    amenities: ['shower', 'yoga mat', 'juice bar'],
    peak_hours: '08:00 - 11:00, 16:00 - 18:00',
    kill_switch: false,
    is_approved: true,
  },
  {
    id: 'gym-noida-5',
    name: 'Champs Boxing & MMA (Sector 137)',
    address: 'Logix Technica, Tower B, Sector 137, Noida, UP 201305',
    latitude: 28.5039,
    longitude: 77.4042,
    tier: 2,
    peak_credit_cost: 6,
    offpeak_credit_cost: 4,
    rating: 4.7,
    distance: '8.2 km',
    image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=800',
    amenities: ['ring', 'weights', 'cardio', 'shower'],
    peak_hours: '06:00 - 09:00, 18:00 - 21:00',
    kill_switch: true, // Kill Switch ON for demo
    is_approved: true,
  }
];

export const mockCheckins: CheckIn[] = [
  { id: 'c1', userName: 'Rahul K.', gymName: 'Gold\'s Gym (Sector 62)', time: '9:23 AM', creditsUsed: 4, earnings: 120, status: 'success' },
  { id: 'c2', userName: 'Priya S.', gymName: 'FitLine Fitness Studio (Sector 18)', time: '11:45 AM', creditsUsed: 4, earnings: 120, status: 'success' },
  { id: 'c3', userName: 'Amit V.', gymName: 'The Iron Temple Club (Sector 76)', time: '2:10 PM', creditsUsed: 2, earnings: 60, status: 'success' },
  { id: 'c4', userName: 'Vikash D.', gymName: 'Champs Boxing & MMA (Sector 137)', time: 'Yesterday', creditsUsed: 6, earnings: 180, status: 'fraud' },
];

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

