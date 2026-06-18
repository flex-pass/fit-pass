import apiClient from '@/lib/api-client';

export const paymentService = {
  async createOrder(amountInPaise: number) {
    const response = await apiClient.post('/credits/create-order', {
      amount: amountInPaise
    });
    return response.data;
  },

  async verifyPayment(data: {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    amount: number;
  }) {
    const response = await apiClient.post('/credits/verify-payment', data);
    return response.data;
  }
};
