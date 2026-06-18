'use client';

import { useState } from 'react';
import { paymentService } from '@/services/payment.service';
import { authService } from '@/services/auth.service';

interface RazorpayCheckoutButtonProps {
  amount: number; // in paise
  onSuccess?: () => void;
  onError?: (error: any) => void;
  children?: React.ReactNode;
}

export default function RazorpayCheckoutButton({ amount, onSuccess, onError, children }: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await loadRazorpayScript();

      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setLoading(false);
        return;
      }

      // Create order
      const orderResponse = await paymentService.createOrder(amount);

      if (!orderResponse.success) {
        alert(orderResponse.error?.message || 'Failed to create order');
        setLoading(false);
        return;
      }

      const orderData = orderResponse.data;
      const user = authService.getCurrentUser();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'FlexPass',
        description: 'Buy Credits',
        order_id: orderData.order_id,
        handler: async function (response: any) {
          try {
            // Verify payment
            const verifyRes = await paymentService.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderData.amount,
            });

            if (verifyRes.success) {
              if (onSuccess) onSuccess();
            } else {
              if (onError) onError(new Error('Payment verification failed'));
            }
          } catch (err: any) {
             if (onError) onError(err);
          }
        },
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        if (onError) onError(response.error);
        else alert(`Payment Failed: ${response.error.description}`);
      });
      
      paymentObject.open();

    } catch (error) {
      if (onError) onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-50"
    >
      {loading ? 'Processing...' : children || `Pay ₹${amount / 100}`}
    </button>
  );
}
