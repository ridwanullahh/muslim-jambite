
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

// The main SDK class - simplified interface
export default class UniversalSDK {
  constructor(config: UniversalSDKConfig);
  
  async init(): Promise<UniversalSDK>;
  async get<T = any>(collection: string, force?: boolean): Promise<T[]>;
  async insert<T = any>(collection: string, item: Partial<T>): Promise<T & { id: string; uid: string }>;
  async update<T = any>(collection: string, key: string, updates: Partial<T>): Promise<T>;
  async delete<T = any>(collection: string, key: string): Promise<void>;
  
  async sendEmail(to: string, subject: string, html: string): Promise<boolean>;
  renderTemplate(name: string, data: Record<string, any>): string;
  
  queryBuilder<T = any>(collection: string): QueryBuilder<T>;
  
  // Auth methods
  async register(email: string, password: string, profile?: Partial<User>): Promise<User>;
  async login(email: string, password: string): Promise<string>;
  
  // Properties
  smtp?: SMTPConfig;
}
