import apiClient from '@/lib/api-client';

export interface RegisterDetails {
  name: string;
  email: string;
  password?: string;
  phone_number?: string;
  city?: string;
  role?: string;
}

export interface LoginDetails {
  email: string;
  password?: string;
}

export const authService = {
  async login(details: LoginDetails) {
    const response = await apiClient.post('/auth/login', {
      email: details.email,
      password: details.password || '123456', // Fallback default password for demo flow
    });
    
    if (response.data?.success && response.data?.data?.accessToken) {
      const { accessToken, user } = response.data.data;
      localStorage.setItem('flexpass-auth-token', accessToken);
      localStorage.setItem('flexpass-auth-user', JSON.stringify(user));
      
      return {
        success: true,
        data: {
          token: accessToken,
          user: user
        }
      };
    }
    return response.data;
  },

  async register(details: RegisterDetails) {
    const response = await apiClient.post('/auth/register', {
      name: details.name,
      email: details.email,
      password: details.password || '123456', // Default password for testing
      phone_number: details.phone_number,
      city: details.city,
      role: details.role || 'USER',
    });
    
    return response.data;
  },

  async getMe() {
    const response = await apiClient.get('/auth/me');
    return response.data;
  },

  async logout() {
    const token = this.getToken();
    localStorage.removeItem('flexpass-auth-token');
    localStorage.removeItem('flexpass-auth-user');
    localStorage.removeItem('flexpass-mock-role');

    if (token) {
      try {
        await apiClient.post('/auth/logout', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } catch (error) {
        console.error('Logout API call failed:', error);
      }
    }
  },

  getCurrentUser() {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem('flexpass-auth-user');
    return userJson ? JSON.parse(userJson) : null;
  },

  getToken() {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('flexpass-auth-token');
  }
};
