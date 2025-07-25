
// Re-export the SDK interfaces and classes
export interface CloudinaryConfig {
  uploadPreset?: string;
  cloudName?: string;
  apiKey?: string;
  apiSecret?: string;
}

export interface SMTPConfig {
  endpoint?: string;
  from?: string;
  test?: () => Promise<boolean>;
}

export interface AuthConfig {
  requireEmailVerification?: boolean;
  otpTriggers?: string[];
}

export interface SchemaDefinition {
  required?: string[];
  types?: Record<string, string>;
  defaults?: Record<string, any>;
}

export interface UniversalSDKConfig {
  owner: string;
  repo: string;
  token: string;
  branch?: string;
  basePath?: string;
  mediaPath?: string;
  cloudinary?: CloudinaryConfig;
  smtp?: SMTPConfig;
  templates?: Record<string, string>;
  schemas?: Record<string, SchemaDefinition>;
  auth?: AuthConfig;
}

export interface User {
  id?: string;
  uid?: string;
  email: string;
  password?: string;
  googleId?: string;
  verified?: boolean;
  roles?: string[];
  permissions?: string[];
  [key: string]: any;
}

export interface Session {
  token: string;
  user: User;
  created: number;
}

export interface QueryBuilder<T = any> {
  where(fn: (item: T) => boolean): QueryBuilder<T>;
  sort(field: string, dir?: 'asc' | 'desc'): QueryBuilder<T>;
  project(fields: string[]): QueryBuilder<Partial<T>>;
  exec(): Promise<T[]>;
}

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  [key: string]: any;
}

// Enhanced Blog types with comprehensive features
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  views: number;
  likes: number;
  bookmarks?: number;
  readTime?: number;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  createdAt?: string;
  reactions?: {
    like: number;
    heart: number;
    thumbsUp: number;
    celebrate: number;
  };
  schema?: {
    type: 'Article' | 'BlogPosting';
    headline: string;
    description: string;
    author: string;
    datePublished: string;
    dateModified: string;
    publisher: string;
    image?: string;
    wordCount?: number;
  };
  accessibility?: {
    altText?: string;
    ariaLabel?: string;
    headingStructure?: string[];
  };
  social?: {
    twitterCard?: 'summary' | 'summary_large_image';
    ogType?: 'article';
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
}

export interface BlogComment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  likes: number;
  parentId?: string;
  replies?: BlogComment[];
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
  ipAddress?: string;
  userAgent?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
  postCount: number;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  icon?: string;
  parentId?: string;
  order?: number;
}

// Site Settings interface
export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  description?: string;
  type: 'string' | 'boolean' | 'number' | 'json';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Enhanced Student types
export interface Student {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  state?: string;
  lga?: string;
  address?: string;
  parentName?: string;
  parentPhone?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  academicBackground?: string;
  jambSubjects?: string[];
  techSkill?: string;
  learningGoals?: string[];
  studySchedule?: string;
  motivations?: string[];
  challenges?: string[];
  expectations?: string[];
  islamicKnowledge?: string;
  isMuslim: boolean;
  muslimConfirmation?: string;
  program?: string;
  paymentStatus?: string;
  monthlyFee?: number;
  registrationFee?: number;
  techTrack?: boolean;
  currentLevel?: string;
  interests?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProspectEntry {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  interests?: string[];
  source?: string;
  step?: number;
  completed?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'audio' | 'link' | 'document';
  url: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  downloads?: number;
  createdAt: string;
  updatedAt: string;
}

// Poll and Quiz interfaces for user engagement
export interface Poll {
  id: string;
  postId: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

export interface Quiz {
  id: string;
  postId: string;
  title: string;
  questions: QuizQuestion[];
  passingScore: number;
  timeLimit?: number;
  attempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  points: number;
}

// Newsletter interface
export interface Newsletter {
  id: string;
  email: string;
  name?: string;
  subscribed: boolean;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

// Bookmark interface
export interface Bookmark {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

// Analytics interface
export interface Analytics {
  id: string;
  postId: string;
  userId?: string;
  action: 'view' | 'like' | 'share' | 'comment' | 'bookmark';
  metadata?: Record<string, any>;
  timestamp: string;
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
}

// The main SDK class interface
export interface UniversalSDKInterface {
  init(): Promise<UniversalSDKInterface>;
  get<T = any>(collection: string, force?: boolean): Promise<T[]>;
  insert<T = any>(collection: string, item: Partial<T>): Promise<T & { id: string; uid: string }>;
  update<T = any>(collection: string, key: string, updates: Partial<T>): Promise<T>;
  delete<T = any>(collection: string, key: string): Promise<void>;
  
  sendEmail(to: string, subject: string, html: string): Promise<boolean>;
  renderTemplate(name: string, data: Record<string, any>): string;
  
  queryBuilder<T = any>(collection: string): QueryBuilder<T>;
  
  // Auth methods
  register(email: string, password: string, profile?: Partial<User>): Promise<User>;
  login(email: string, password: string): Promise<string>;
  
  // Properties
  smtp?: SMTPConfig;
}

// Mock implementation for development
export default class UniversalSDK implements UniversalSDKInterface {
  private config: UniversalSDKConfig;
  public smtp?: SMTPConfig;

  constructor(config: UniversalSDKConfig) {
    this.config = config;
    this.smtp = config.smtp;
  }

  async init(): Promise<UniversalSDKInterface> {
    console.log('SDK initialized with config:', this.config.owner + '/' + this.config.repo);
    return this;
  }

  async get<T = any>(collection: string, force?: boolean): Promise<T[]> {
    console.log('Getting collection:', collection);
    return [];
  }

  async insert<T = any>(collection: string, item: Partial<T>): Promise<T & { id: string; uid: string }> {
    console.log('Inserting into collection:', collection, item);
    return {
      ...item as T,
      id: Date.now().toString(),
      uid: Date.now().toString()
    };
  }

  async update<T = any>(collection: string, key: string, updates: Partial<T>): Promise<T> {
    console.log('Updating collection:', collection, key, updates);
    return updates as T;
  }

  async delete<T = any>(collection: string, key: string): Promise<void> {
    console.log('Deleting from collection:', collection, key);
  }

  async sendEmail(to: string, subject: string, html: string): Promise<boolean> {
    console.log('Sending email to:', to, 'Subject:', subject);
    return true;
  }

  renderTemplate(name: string, data: Record<string, any>): string {
    const template = this.config.templates?.[name] || '';
    let rendered = template;
    
    for (const [key, value] of Object.entries(data)) {
      rendered = rendered.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
    
    return rendered;
  }

  queryBuilder<T = any>(collection: string): QueryBuilder<T> {
    return {
      where: (fn: (item: T) => boolean) => this.queryBuilder(collection),
      sort: (field: string, dir?: 'asc' | 'desc') => this.queryBuilder(collection),
      project: (fields: string[]) => this.queryBuilder(collection),
      exec: async () => []
    };
  }

  async register(email: string, password: string, profile?: Partial<User>): Promise<User> {
    console.log('Registering user:', email);
    return {
      id: Date.now().toString(),
      email,
      ...profile
    };
  }

  async login(email: string, password: string): Promise<string> {
    console.log('Logging in user:', email);
    return 'mock-token-' + Date.now();
  }
}
