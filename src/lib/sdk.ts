
import UniversalSDK, { UniversalSDKConfig } from '../types/sdk';

// SDK Configuration
const sdkConfig: UniversalSDKConfig = {
  owner: "muslimjambite",
  repo: "waitlist-db",
  token: process.env.GITHUB_TOKEN || "your-github-token-here",
  branch: "main",
  basePath: "db",
  mediaPath: "media",
  schemas: {
    waitlist: {
      required: ['email', 'fullName', 'phone'],
      types: {
        email: 'string',
        fullName: 'string',
        phone: 'string',
        program: 'string',
        techTrack: 'boolean',
        currentLevel: 'string',
        interests: 'array',
        createdAt: 'date'
      },
      defaults: {
        program: 'jamb-prep',
        techTrack: false,
        currentLevel: 'ss3',
        interests: [],
        createdAt: new Date().toISOString()
      }
    },
    subscribers: {
      required: ['email'],
      types: {
        email: 'string',
        source: 'string',
        createdAt: 'date'
      },
      defaults: {
        source: 'landing-page',
        createdAt: new Date().toISOString()
      }
    }
  },
  templates: {
    welcome: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #05B34D; text-align: center;">Assalamu Alaikum {{fullName}}!</h2>
        <p>JazakAllahu khairan for your interest in MuslimJambite! You've been successfully added to our waitlist.</p>
        <p>We'll keep you updated on our launch and exclusive early access opportunities.</p>
        <p style="margin-top: 30px;">Barakallahu feeki,<br>The MuslimJambite Team</p>
      </div>
    `,
    otp: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #05B34D; text-align: center;">Your OTP Code</h2>
        <div style="background: #E9FBF1; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0;">
          <h3 style="color: #05B34D; font-size: 24px; margin: 0;">{{otp}}</h3>
        </div>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `
  }
};

// Initialize SDK
export const sdk = new UniversalSDK(sdkConfig);

// Waitlist interface
export interface WaitlistEntry {
  id?: string;
  uid?: string;
  email: string;
  fullName: string;
  phone: string;
  program: string;
  techTrack: boolean;
  currentLevel: string;
  interests: string[];
  createdAt: string;
}

// Waitlist service
export class WaitlistService {
  static async addToWaitlist(entry: Omit<WaitlistEntry, 'id' | 'uid' | 'createdAt'>): Promise<WaitlistEntry> {
    try {
      const newEntry = await sdk.insert<WaitlistEntry>('waitlist', {
        ...entry,
        createdAt: new Date().toISOString()
      });
      
      // Send welcome email (if SMTP is configured)
      if (sdk.smtp?.endpoint) {
        await sdk.sendEmail(
          entry.email,
          "Welcome to MuslimJambite Waitlist!",
          sdk.renderTemplate('welcome', { fullName: entry.fullName })
        );
      }
      
      return newEntry;
    } catch (error) {
      console.error('Failed to add to waitlist:', error);
      throw error;
    }
  }

  static async getWaitlistStats(): Promise<{
    total: number;
    techTrack: number;
    basicTrack: number;
    recentSignups: number;
  }> {
    try {
      const entries = await sdk.get<WaitlistEntry>('waitlist');
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      return {
        total: entries.length,
        techTrack: entries.filter(e => e.techTrack).length,
        basicTrack: entries.filter(e => !e.techTrack).length,
        recentSignups: entries.filter(e => new Date(e.createdAt) > weekAgo).length
      };
    } catch (error) {
      console.error('Failed to get waitlist stats:', error);
      return { total: 0, techTrack: 0, basicTrack: 0, recentSignups: 0 };
    }
  }

  static async subscribeToNewsletter(email: string): Promise<void> {
    try {
      await sdk.insert('subscribers', { email });
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      throw error;
    }
  }
}

// Initialize SDK on app start
export const initializeSDK = async () => {
  try {
    await sdk.init();
    console.log('SDK initialized successfully');
  } catch (error) {
    console.error('Failed to initialize SDK:', error);
  }
};
