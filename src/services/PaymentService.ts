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
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '',
    secretKey: import.meta.env.VITE_PAYSTACK_SECRET_KEY || ''
  };

  static setConfig(config: PaystackConfig) {
    this.config = { ...this.config, ...config };
  }

  static validateConfig(): boolean {
    if (!this.config.publicKey || !this.config.secretKey) {
      console.error('Paystack configuration is incomplete');
      return false;
    }
    return true;
  }

  static generateReference(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    const hash = btoa(`${timestamp}-${random}`).replace(/[^a-zA-Z0-9]/g, '').substr(0, 10);
    return `MJ_${timestamp}_${hash}`.toUpperCase();
  }

  static validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000 && Number.isInteger(amount * 100);
  }

  static sanitizeMetadata(metadata: any): any {
    if (!metadata || typeof metadata !== 'object') return {};
    
    const sanitized: any = {};
    const allowedKeys = ['fullName', 'program', 'techTrack', 'techSkill', 'currentLevel', 'interests', 'phone'];
    
    allowedKeys.forEach(key => {
      if (metadata[key]) {
        sanitized[key] = String(metadata[key]).substring(0, 255);
      }
    });
    
    return sanitized;
  }

  static async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    if (!this.validateConfig()) {
      throw new Error('Paystack configuration is invalid');
    }

    if (!this.validateEmail(paymentData.email)) {
      throw new Error('Invalid email address');
    }

    if (!this.validateAmount(paymentData.amount)) {
      throw new Error('Invalid payment amount');
    }

    const sanitizedData = {
      ...paymentData,
      amount: Math.round(paymentData.amount * 100), // Convert to kobo
      metadata: this.sanitizeMetadata(paymentData.metadata),
      channels: paymentData.channels || ['card', 'bank', 'ussd', 'bank_transfer']
    };

    try {
      const response = await fetch(`${this.PAYSTACK_BASE_URL}/transaction/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
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
    if (!this.validateConfig()) {
      throw new Error('Paystack configuration is invalid');
    }

    if (!reference || typeof reference !== 'string' || reference.length < 10) {
      throw new Error('Invalid payment reference');
    }

    try {
      const response = await fetch(`${this.PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
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
    if (!this.validateConfig()) {
      throw new Error('Paystack configuration is invalid');
    }

    if (!this.validateEmail(paymentData.email)) {
      throw new Error('Invalid email address');
    }

    if (!this.validateAmount(paymentData.amount)) {
      throw new Error('Invalid payment amount');
    }

    // Load Paystack inline script if not already loaded
    if (!window.PaystackPop) {
      await this.loadPaystackScript();
    }

    const handler = window.PaystackPop.setup({
      key: this.config.publicKey,
      email: paymentData.email,
      amount: Math.round(paymentData.amount * 100), // Convert to kobo
      currency: paymentData.currency || 'NGN',
      ref: paymentData.reference,
      metadata: this.sanitizeMetadata(paymentData.metadata) || {},
      channels: paymentData.channels || ['card', 'bank', 'ussd', 'bank_transfer'],
      callback: async (response: any) => {
        try {
          // Verify payment on the backend before calling success
          const verification = await this.verifyPayment(response.reference);
          if (verification.status && verification.data.status === 'success') {
            onSuccess(response);
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment callback error:', error);
          throw error;
        }
      },
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
    return emailRegex.test(email) && email.length <= 254;
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

  // Security helper methods
  static isValidReference(reference: string): boolean {
    return /^MJ_\d+_[A-Z0-9]+$/.test(reference);
  }

  static generateSecureHash(data: string): string {
    // Simple hash for reference validation
    return btoa(data).replace(/[^a-zA-Z0-9]/g, '').substr(0, 16);
  }

  // Enhanced security methods
  static hashPassword(password: string, salt: string): string {
    // Simple hash implementation - in production use proper crypto
    return btoa(password + salt).replace(/[^a-zA-Z0-9]/g, '').substr(0, 32);
  }

  static verifyIntegrity(data: any, expectedHash: string): boolean {
    const dataString = JSON.stringify(data);
    const computedHash = this.generateSecureHash(dataString);
    return computedHash === expectedHash;
  }

  static rateLimit(identifier: string, limit: number = 5, windowMs: number = 60000): boolean {
    const key = `rate_limit_${identifier}`;
    const now = Date.now();
    const requests = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Remove old requests outside the window
    const validRequests = requests.filter((time: number) => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false; // Rate limit exceeded
    }
    
    validRequests.push(now);
    localStorage.setItem(key, JSON.stringify(validRequests));
    return true;
  }

  static async securePaymentFlow(paymentData: PaymentData): Promise<{ success: boolean; reference?: string; error?: string }> {
    try {
      // Rate limiting check
      if (!this.rateLimit(paymentData.email, 3, 300000)) { // 3 attempts per 5 minutes
        throw new Error('Too many payment attempts. Please wait before trying again.');
      }

      // Generate secure reference with timestamp
      const reference = this.generateReference();
      const timestamp = Date.now();
      
      // Create payment with enhanced metadata
      const enhancedPaymentData = {
        ...paymentData,
        reference,
        metadata: {
          ...this.sanitizeMetadata(paymentData.metadata),
          timestamp,
          userAgent: navigator.userAgent.substring(0, 100),
          origin: window.location.origin
        }
      };

      const result = await this.initializePayment(enhancedPaymentData);
      
      if (result.status) {
        return { success: true, reference: result.data.reference };
      } else {
        throw new Error(result.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Secure payment flow error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Payment processing failed' 
      };
    }
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
