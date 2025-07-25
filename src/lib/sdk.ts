import UniversalSDK, { UniversalSDKConfig } from '../types/sdk';

// Get GitHub token with fallback
const getGithubToken = () => {
  try {
    return import.meta.env?.GITHUB_TOKEN || "your-github-token-here";
  } catch {
    return "your-github-token-here";
  }
};

// SDK Configuration
const sdkConfig: UniversalSDKConfig = {
  owner: "muslimjambite",
  repo: "waitlist-db", 
  token: getGithubToken(),
  branch: "main",
  basePath: "db",
  mediaPath: "media",
  schemas: {
    registrations: {
      required: ['email', 'fullName', 'phone', 'program', 'isMuslim', 'muslimConfirmation'],
      types: {
        email: 'string',
        fullName: 'string',
        phone: 'string',
        program: 'string',
        isMuslim: 'boolean',
        muslimConfirmation: 'string',
        techTrack: 'boolean',
        techSkill: 'string',
        currentLevel: 'string',
        interests: 'array',
        paymentStatus: 'string',
        paymentReference: 'string',
        registrationFee: 'number',
        monthlyFee: 'number',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        program: 'jamb-prep',
        isMuslim: false,
        muslimConfirmation: '',
        techTrack: false,
        techSkill: '',
        currentLevel: 'ss3',
        interests: [],
        paymentStatus: 'pending',
        registrationFee: 500,
        monthlyFee: 1500,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    prospects: {
      required: ['email'],
      types: {
        email: 'string',
        fullName: 'string',
        phone: 'string',
        program: 'string',
        isMuslim: 'boolean',
        muslimConfirmation: 'string',
        techTrack: 'boolean',
        techSkill: 'string',
        currentLevel: 'string',
        interests: 'array',
        step: 'number',
        completed: 'boolean',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        program: 'jamb-prep',
        isMuslim: false,
        muslimConfirmation: '',
        techTrack: false,
        techSkill: '',
        currentLevel: 'ss3',
        interests: [],
        step: 1,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    payments: {
      required: ['email', 'amount', 'reference'],
      types: {
        email: 'string',
        fullName: 'string',
        amount: 'number',
        currency: 'string',
        reference: 'string',
        status: 'string',
        gateway: 'string',
        metadata: 'object',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        currency: 'NGN',
        status: 'pending',
        gateway: 'paystack',
        metadata: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
    },
    faqs: {
      required: ['id', 'question', 'answer'],
      types: {
        id: 'string',
        question: 'string',
        answer: 'string',
        category: 'string'
      },
      defaults: {
        category: 'General'
      }
    },
    blog_posts: {
      required: ['id', 'title', 'content', 'author'],
      types: {
        id: 'string',
        title: 'string',
        slug: 'string',
        content: 'string',
        excerpt: 'string',
        author: 'string',
        category: 'string',
        tags: 'array',
        status: 'string',
        featured: 'boolean',
        readTime: 'number',
        likes: 'number',
        views: 'number',
        comments: 'array',
        metaTitle: 'string',
        metaDescription: 'string',
        publishedAt: 'date',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        slug: '',
        excerpt: '',
        category: 'General',
        tags: [],
        status: 'draft',
        featured: false,
        readTime: 5,
        likes: 0,
        views: 0,
        comments: [],
        metaTitle: '',
        metaDescription: '',
        publishedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    blog_categories: {
      required: ['id', 'name'],
      types: {
        id: 'string',
        name: 'string',
        slug: 'string',
        description: 'string',
        color: 'string',
        createdAt: 'date'
      },
      defaults: {
        slug: '',
        description: '',
        color: '#05B34D',
        createdAt: new Date().toISOString()
      }
    },
    blog_comments: {
      required: ['id', 'postId', 'author', 'content'],
      types: {
        id: 'string',
        postId: 'string',
        author: 'string',
        email: 'string',
        content: 'string',
        parentId: 'string',
        status: 'string',
        likes: 'number',
        createdAt: 'date',
        updatedAt: 'date'
      },
      defaults: {
        parentId: '',
        status: 'pending',
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    },
    admins: {
      required: ['email', 'username'],
      types: {
        email: 'string',
        username: 'string',
        password: 'string',
        role: 'string',
        permissions: 'array',
        lastLogin: 'date',
        createdAt: 'date'
      },
      defaults: {
        role: 'admin',
        permissions: ['read', 'write', 'delete'],
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    }
  },
  templates: {
    welcome: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #05B34D; text-align: center;">Assalamu Alaikum {{fullName}}!</h2>
        <p>JazakAllahu khairan for your interest in MuslimJambite! Your registration has been received.</p>
        <p>Payment Status: {{paymentStatus}}</p>
        <p>Program: {{program}} {{#techTrack}}+ Tech Skills{{/techTrack}}</p>
        <p>Monthly Fee: ₦{{monthlyFee}}</p>
        <p>We'll keep you updated on your registration status and program details.</p>
        <p style="margin-top: 30px;">Barakallahu feeki,<br>The MuslimJambite Team</p>
      </div>
    `,
    payment_success: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #05B34D; text-align: center;">Payment Successful!</h2>
        <p>Assalamu Alaikum {{fullName}},</p>
        <p>Your registration payment has been successfully processed.</p>
        <p><strong>Payment Details:</strong></p>
        <ul>
          <li>Amount: ₦{{amount}}</li>
          <li>Reference: {{reference}}</li>
          <li>Program: {{program}}</li>
        </ul>
        <p>Welcome to MuslimJambite! We'll contact you soon with next steps.</p>
        <p>Barakallahu feeki,<br>The MuslimJambite Team</p>
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

// Registration interface
export interface RegistrationEntry {
  id?: string;
  uid?: string;
  email: string;
  fullName: string;
  phone: string;
  program: string;
  isMuslim: boolean;
  muslimConfirmation: string;
  techTrack: boolean;
  techSkill?: string;
  currentLevel: string;
  interests: string[];
  paymentStatus: string;
  paymentReference?: string;
  registrationFee: number;
  monthlyFee: number;
  createdAt: string;
  updatedAt: string;
}

// Prospect interface
export interface ProspectEntry {
  id?: string;
  uid?: string;
  email: string;
  fullName?: string;
  phone?: string;
  program: string;
  isMuslim: boolean;
  muslimConfirmation: string;
  techTrack: boolean;
  techSkill?: string;
  currentLevel: string;
  interests: string[];
  step: number;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

// Payment interface
export interface PaymentEntry {
  id?: string;
  uid?: string;
  email: string;
  fullName?: string;
  amount: number;
  currency: string;
  reference: string;
  status: string;
  gateway: string;
  metadata: any;
  createdAt: string;
  updatedAt: string;
}

// Blog interfaces
export interface BlogPost {
  id?: string;
  uid?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  readTime: number;
  likes: number;
  views: number;
  comments: BlogComment[];
  metaTitle: string;
  metaDescription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogCategory {
  id?: string;
  uid?: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  createdAt: string;
}

export interface BlogComment {
  id?: string;
  uid?: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  parentId?: string;
  status: 'pending' | 'approved' | 'rejected';
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id?: string;
  uid?: string;
  email: string;
  username: string;
  password: string;
  role: 'superadmin' | 'admin' | 'editor';
  permissions: string[];
  lastLogin: string;
  createdAt: string;
}

// Registration service
export class RegistrationService {
  // Initialize collections if they don't exist
  static async initializeCollections(): Promise<void> {
    try {
      const collections = ['registrations', 'payments', 'subscribers', 'prospects'];
      for (const collection of collections) {
        try {
          await sdk.get(collection);
        } catch (error: any) {
          if (error.message.includes('Not Found')) {
            console.log(`Creating collection: ${collection}`);
            await sdk.insert(collection, {});
            await sdk.delete(collection, '1'); // Remove the dummy entry
          }
        }
      }
    } catch (error) {
      console.error('Failed to initialize collections:', error);
    }
  }

  static async registerStudent(entry: Omit<RegistrationEntry, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<RegistrationEntry> {
    try {
      await this.initializeCollections();
      
      const monthlyFee = entry.techTrack ? 2000 : 1500;
      const newEntry = await sdk.insert<RegistrationEntry>('registrations', {
        ...entry,
        monthlyFee,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      if (sdk.smtp?.endpoint) {
        await sdk.sendEmail(
          entry.email,
          "Welcome to MuslimJambite Registration!",
          sdk.renderTemplate('welcome', { 
            fullName: entry.fullName,
            paymentStatus: entry.paymentStatus,
            program: entry.program,
            techTrack: entry.techTrack,
            monthlyFee
          })
        );
      }
      
      return newEntry;
    } catch (error) {
      console.error('Failed to register student:', error);
      throw error;
    }
  }

  static async updatePaymentStatus(email: string, reference: string, status: string): Promise<RegistrationEntry> {
    try {
      const registrations = await sdk.get<RegistrationEntry>('registrations');
      const registration = registrations.find(r => r.email === email);
      
      if (!registration) {
        throw new Error('Registration not found');
      }

      const updatedEntry = await sdk.update<RegistrationEntry>('registrations', registration.id!, {
        paymentStatus: status,
        paymentReference: reference,
        updatedAt: new Date().toISOString()
      });

      if (status === 'success' && sdk.smtp?.endpoint) {
        await sdk.sendEmail(
          email,
          "Payment Successful - MuslimJambite Registration",
          sdk.renderTemplate('payment_success', {
            fullName: registration.fullName,
            amount: registration.registrationFee,
            reference,
            program: `${registration.program}${registration.techTrack ? ' + Tech Skills' : ''}`
          })
        );
      }

      return updatedEntry;
    } catch (error) {
      console.error('Failed to update payment status:', error);
      throw error;
    }
  }

  static async recordPayment(payment: Omit<PaymentEntry, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<PaymentEntry> {
    try {
      await this.initializeCollections();
      
      const newPayment = await sdk.insert<PaymentEntry>('payments', {
        ...payment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return newPayment;
    } catch (error) {
      console.error('Failed to record payment:', error);
      throw error;
    }
  }

  static async getRegistrationStats(): Promise<{
    total: number;
    techTrack: number;
    basicTrack: number;
    recentSignups: number;
    pendingPayments: number;
    completedPayments: number;
  }> {
    try {
      await this.initializeCollections();
      const entries = await sdk.get<RegistrationEntry>('registrations');
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      
      return {
        total: entries.length,
        techTrack: entries.filter(e => e.techTrack).length,
        basicTrack: entries.filter(e => !e.techTrack).length,
        recentSignups: entries.filter(e => new Date(e.createdAt) > weekAgo).length,
        pendingPayments: entries.filter(e => e.paymentStatus === 'pending').length,
        completedPayments: entries.filter(e => e.paymentStatus === 'success').length
      };
    } catch (error) {
      console.error('Failed to get registration stats:', error);
      return { total: 0, techTrack: 0, basicTrack: 0, recentSignups: 0, pendingPayments: 0, completedPayments: 0 };
    }
  }

  static async subscribeToNewsletter(email: string): Promise<void> {
    try {
      await this.initializeCollections();
      await sdk.insert('subscribers', { email });
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      throw error;
    }
  }

  static async saveProspect(entry: Omit<ProspectEntry, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<ProspectEntry> {
    try {
      await this.initializeCollections();
      
      // Check if prospect already exists
      const prospects = await sdk.get<ProspectEntry>('prospects');
      const existingProspect = prospects.find(p => p.email === entry.email);
      
      if (existingProspect) {
        return await sdk.update<ProspectEntry>('prospects', existingProspect.id!, {
          ...entry,
          updatedAt: new Date().toISOString()
        });
      }
      
      return await sdk.insert<ProspectEntry>('prospects', {
        ...entry,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save prospect:', error);
      throw error;
    }
  }

  static async getProspect(email: string): Promise<ProspectEntry | null> {
    try {
      await this.initializeCollections();
      const prospects = await sdk.get<ProspectEntry>('prospects');
      return prospects.find(p => p.email === email) || null;
    } catch (error) {
      console.error('Failed to get prospect:', error);
      return null;
    }
  }
}

// Blog service
export class BlogService {
  static async createPost(post: Omit<BlogPost, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    try {
      await RegistrationService.initializeCollections();
      
      const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newPost = await sdk.insert<BlogPost>('blog_posts', {
        ...post,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return newPost;
    } catch (error) {
      console.error('Failed to create blog post:', error);
      throw error;
    }
  }

  static async getPosts(filters?: { category?: string; status?: string; featured?: boolean }): Promise<BlogPost[]> {
    try {
      await RegistrationService.initializeCollections();
      let posts = await sdk.get<BlogPost>('blog_posts');
      
      if (filters) {
        if (filters.category) {
          posts = posts.filter(post => post.category === filters.category);
        }
        if (filters.status) {
          posts = posts.filter(post => post.status === filters.status);
        }
        if (filters.featured !== undefined) {
          posts = posts.filter(post => post.featured === filters.featured);
        }
      }
      
      return posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } catch (error) {
      console.error('Failed to get blog posts:', error);
      return [];
    }
  }

  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      await RegistrationService.initializeCollections();
      const posts = await sdk.get<BlogPost>('blog_posts');
      const post = posts.find(p => p.slug === slug);
      
      if (post) {
        // Increment views
        await sdk.update<BlogPost>('blog_posts', post.id!, {
          views: post.views + 1,
          updatedAt: new Date().toISOString()
        });
        return { ...post, views: post.views + 1 };
      }
      
      return null;
    } catch (error) {
      console.error('Failed to get blog post by slug:', error);
      return null;
    }
  }

  static async createCategory(category: Omit<BlogCategory, 'id' | 'uid' | 'createdAt'>): Promise<BlogCategory> {
    try {
      await RegistrationService.initializeCollections();
      
      const slug = category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newCategory = await sdk.insert<BlogCategory>('blog_categories', {
        ...category,
        slug,
        createdAt: new Date().toISOString()
      });
      
      return newCategory;
    } catch (error) {
      console.error('Failed to create blog category:', error);
      throw error;
    }
  }

  static async getCategories(): Promise<BlogCategory[]> {
    try {
      await RegistrationService.initializeCollections();
      return await sdk.get<BlogCategory>('blog_categories');
    } catch (error) {
      console.error('Failed to get blog categories:', error);
      return [];
    }
  }

  static async addComment(comment: Omit<BlogComment, 'id' | 'uid' | 'createdAt' | 'updatedAt'>): Promise<BlogComment> {
    try {
      await RegistrationService.initializeCollections();
      
      const newComment = await sdk.insert<BlogComment>('blog_comments', {
        ...comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      
      return newComment;
    } catch (error) {
      console.error('Failed to add comment:', error);
      throw error;
    }
  }

  static async getCommentsByPostId(postId: string): Promise<BlogComment[]> {
    try {
      await RegistrationService.initializeCollections();
      const comments = await sdk.get<BlogComment>('blog_comments');
      return comments.filter(c => c.postId === postId && c.status === 'approved')
                   .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      console.error('Failed to get comments:', error);
      return [];
    }
  }
}

// Admin service
export class AdminService {
  static async createAdmin(admin: Omit<AdminUser, 'id' | 'uid' | 'createdAt'>): Promise<AdminUser> {
    try {
      await RegistrationService.initializeCollections();
      
      const newAdmin = await sdk.insert<AdminUser>('admins', {
        ...admin,
        createdAt: new Date().toISOString()
      });
      
      return newAdmin;
    } catch (error) {
      console.error('Failed to create admin:', error);
      throw error;
    }
  }

  static async authenticate(email: string, password: string): Promise<AdminUser | null> {
    try {
      await RegistrationService.initializeCollections();
      const admins = await sdk.get<AdminUser>('admins');
      const admin = admins.find(a => a.email === email && a.password === password);
      
      if (admin) {
        // Update last login
        await sdk.update<AdminUser>('admins', admin.id!, {
          lastLogin: new Date().toISOString()
        });
      }
      
      return admin || null;
    } catch (error) {
      console.error('Failed to authenticate admin:', error);
      return null;
    }
  }
}

// Initialize SDK on app start
export const initializeSDK = async () => {
  try {
    await sdk.init();
    await RegistrationService.initializeCollections();
    
    // Initialize FAQ data only once
    try {
      const existingFaqs = await sdk.get('faqs');
      console.log('Existing FAQs found:', existingFaqs?.length || 0);
      
      if (!existingFaqs || existingFaqs.length === 0) {
        console.log('Initializing FAQ data from JSON...');
        const faqData = await import('../data/faqs.json');
        
        for (const faq of faqData.default) {
          console.log('Inserting FAQ:', faq.id, faq.question.substring(0, 50) + '...');
          await sdk.insert('faqs', faq);
        }
        console.log('✅ FAQ data initialized successfully');
      } else {
        console.log('📋 FAQ data already exists, skipping initialization');
      }
    } catch (error: any) {
      if (error.message.includes('Not Found')) {
        console.log('Creating FAQ collection...');
        const faqData = await import('../data/faqs.json');
        
        for (const faq of faqData.default) {
          console.log('Inserting FAQ:', faq.id, faq.question.substring(0, 50) + '...');
          await sdk.insert('faqs', faq);
        }
        console.log('✅ FAQ collection created and data initialized');
      } else {
        console.error('Error handling FAQ initialization:', error);
      }
    }
    
    console.log('✅ SDK initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize SDK:', error);
  }
};
