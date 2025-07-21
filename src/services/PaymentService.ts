
export interface PaystackConfig {
  publicKey: string;
  secretKey?: string;
}

export interface PaymentData {
  email: string;
  amount: number;
  currency: string;
  reference: string;
  callback_url?: string;
  metadata?: any;
  channels?: string[];
}

export interface PaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    amount: number;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    customer: {
      id: number;
      first_name?: string;
      last_name?: string;
      email: string;
      customer_code: string;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
    };
  };
}

export class PaymentService {
  private static readonly PAYSTACK_BASE_URL = 'https://api.paystack.co';
  private static config: PaystackConfig = {
    publicKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_xxxx',
    secretKey: process.env.PAYSTACK_SECRET_KEY || 'sk_test_xxxx'
  };

  static setConfig(config: PaystackConfig) {
    this.config = { ...this.config, ...config };
  }

  static generateReference(): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `MJ_${timestamp}_${random}`.toUpperCase();
  }

  static async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.PAYSTACK_BASE_URL}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Payment initialization failed');
      }

      return result;
    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }

  static async verifyPayment(reference: string): Promise<VerificationResponse> {
    try {
      const response = await fetch(`${this.PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Payment verification failed');
      }

      return result;
    } catch (error) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  static async processInlinePayment(
    paymentData: PaymentData,
    onSuccess: (response: any) => void,
    onClose: () => void
  ): Promise<void> {
    // Load Paystack inline script if not already loaded
    if (!window.PaystackPop) {
      await this.loadPaystackScript();
    }

    const handler = window.PaystackPop.setup({
      key: this.config.publicKey,
      email: paymentData.email,
      amount: paymentData.amount * 100, // Convert to kobo
      currency: paymentData.currency || 'NGN',
      ref: paymentData.reference,
      metadata: paymentData.metadata || {},
      channels: paymentData.channels || ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      callback: onSuccess,
      onClose: onClose,
    });

    handler.openIframe();
  }

  private static loadPaystackScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('paystack-script')) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.id = 'paystack-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Paystack script'));
      document.head.appendChild(script);
    });
  }

  static formatAmount(amount: number): string {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static sanitizePhone(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // If starts with 0, replace with +234
    if (digits.startsWith('0')) {
      return `+234${digits.substr(1)}`;
    }
    
    // If starts with 234, add +
    if (digits.startsWith('234')) {
      return `+${digits}`;
    }
    
    // If starts with +234, return as is
    if (digits.length === 13 && phone.startsWith('+234')) {
      return phone;
    }
    
    // Default: assume Nigerian number
    return `+234${digits}`;
  }
}

// Extend Window interface for Paystack
declare global {
  interface Window {
    PaystackPop: {
      setup: (config: any) => {
        openIframe: () => void;
      };
    };
  }
}
