
import { 
  BlogPost, 
  BlogComment, 
  BlogCategory, 
  Student, 
  ProspectEntry, 
  FAQ, 
  Resource,
  UniversalSDKConfig,
  UniversalSDKInterface
} from '../types/sdk';
import UniversalSDK from '../types/sdk';

// Initialize SDK
const sdkConfig: UniversalSDKConfig = {
  owner: 'muslimjambite',
  repo: 'data',
  token: process.env.GITHUB_TOKEN || 'mock-token',
  branch: 'main',
  basePath: 'data',
  mediaPath: 'media',
  templates: {
    welcome: 'Assalamu alaikum {{name}}, welcome to MuslimJambite!',
    confirmation: 'Your registration has been confirmed. Barakallahu feek!'
  },
  schemas: {
    students: {
      required: ['fullName', 'email', 'phone', 'isMuslim'],
      types: {
        fullName: 'string',
        email: 'email',
        phone: 'string',
        isMuslim: 'boolean'
      }
    },
    blog_posts: {
      required: ['title', 'content', 'author', 'category'],
      types: {
        title: 'string',
        content: 'text',
        author: 'string',
        category: 'string'
      }
    }
  },
  auth: {
    requireEmailVerification: true,
    otpTriggers: ['login', 'register']
  }
};

export const sdk = new UniversalSDK(sdkConfig);

export const initializeSDK = async (): Promise<UniversalSDKInterface> => {
  return await sdk.init();
};

// Export types for external use
export type { BlogPost, BlogComment, BlogCategory, Student, ProspectEntry, FAQ, Resource };

// Mock data for development
let mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Islamic Approach to Education: Balancing Deen and Dunya',
    slug: 'islamic-approach-to-education',
    excerpt: 'Discover how to excel in your studies while maintaining your Islamic values and spiritual growth.',
    content: 'Education in Islam is not merely about acquiring knowledge for worldly success, but about developing a comprehensive understanding that encompasses both spiritual and intellectual growth. The Prophet Muhammad (peace be upon him) emphasized the importance of seeking knowledge, stating "Seek knowledge from the cradle to the grave." This holistic approach to education is what makes the Islamic perspective unique and valuable for Muslim students preparing for their academic journey.',
    author: 'Dr. Amina Hassan',
    category: 'Islamic Education',
    tags: ['Education', 'Islam', 'Spirituality', 'Academic Success'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    featured: true,
    views: 1250,
    likes: 89,
    seoTitle: 'Islamic Approach to Education - Balancing Deen and Dunya',
    seoDescription: 'Learn how to excel in your studies while maintaining Islamic values. Discover the holistic approach to education in Islam.',
    seoKeywords: ['Islamic education', 'Muslim students', 'Deen and Dunya', 'Islamic values', 'Academic success']
  },
  {
    id: '2',
    title: 'JAMB Success Stories: How Faith Fueled Their Achievement',
    slug: 'jamb-success-stories-faith-fueled-achievement',
    excerpt: 'Inspiring stories of Muslim students who combined faith with hard work to achieve JAMB excellence.',
    content: 'Success in JAMB is not just about academic preparation; it requires a balance of faith, dedication, and strategic planning. In this article, we share inspiring stories of Muslim students who achieved remarkable JAMB scores while maintaining their Islamic values and practices.',
    author: 'Ustaz Ibrahim Musa',
    category: 'Success Stories',
    tags: ['JAMB', 'Success Stories', 'Faith', 'Achievement', 'Muslim Students'],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    featured: false,
    views: 980,
    likes: 67,
    seoTitle: 'JAMB Success Stories - Faith-Fueled Achievement',
    seoDescription: 'Inspiring stories of Muslim students who achieved JAMB excellence through faith and hard work.',
    seoKeywords: ['JAMB success', 'Muslim students', 'faith and education', 'JAMB preparation', 'Islamic values']
  }
];

let mockBlogComments: BlogComment[] = [
  {
    id: '1',
    postId: '1',
    author: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    content: 'This article beautifully explains the balance between spiritual and academic growth. JazakAllahu khair for sharing this wisdom.',
    status: 'approved',
    likes: 12,
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '2',
    postId: '1',
    author: 'Muhammad Ali',
    email: 'ali@example.com',
    content: 'As a student preparing for JAMB, this perspective has given me a new understanding of how to approach my studies. Barakallahu feeki.',
    status: 'approved',
    likes: 8,
    createdAt: '2024-01-16T15:45:00Z',
    updatedAt: '2024-01-16T15:45:00Z'
  }
];

let mockBlogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Islamic Education',
    slug: 'islamic-education',
    description: 'Articles about Islamic approach to learning and education',
    color: '#10B981',
    postCount: 15
  },
  {
    id: '2',
    name: 'JAMB Preparation',
    slug: 'jamb-preparation',
    description: 'Tips and strategies for JAMB success',
    color: '#3B82F6',
    postCount: 23
  },
  {
    id: '3',
    name: 'Success Stories',
    slug: 'success-stories',
    description: 'Inspiring stories from our students',
    color: '#F59E0B',
    postCount: 8
  },
  {
    id: '4',
    name: 'Islamic Values',
    slug: 'islamic-values',
    description: 'Living as a Muslim student in modern times',
    color: '#8B5CF6',
    postCount: 12
  }
];

let mockStudents: Student[] = [];
let mockProspects: ProspectEntry[] = [];
let mockFAQs: FAQ[] = [];
let mockResources: Resource[] = [];

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const BlogService = {
  async getPosts(filters?: { category?: string; status?: string; featured?: boolean }): Promise<BlogPost[]> {
    await delay(500);
    let filteredPosts = mockBlogPosts;
    
    if (filters?.category) {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category);
    }
    if (filters?.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status);
    }
    if (filters?.featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
    }
    
    return filteredPosts;
  },

  async getPostById(id: string): Promise<BlogPost | null> {
    await delay(300);
    return mockBlogPosts.find(post => post.id === id) || null;
  },

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    await delay(300);
    return mockBlogPosts.find(post => post.slug === slug) || null;
  },

  async getRelatedPosts(postId: string): Promise<BlogPost[]> {
    await delay(300);
    const post = mockBlogPosts.find(p => p.id === postId);
    if (!post) return [];
    
    return mockBlogPosts
      .filter(p => p.id !== postId && p.category === post.category)
      .slice(0, 4);
  },

  async getPopularPosts(): Promise<BlogPost[]> {
    await delay(300);
    return mockBlogPosts
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  },

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    await delay(500);
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockBlogPosts.unshift(newPost);
    return newPost;
  },

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    await delay(500);
    const index = mockBlogPosts.findIndex(post => post.id === id);
    if (index === -1) return null;
    
    mockBlogPosts[index] = {
      ...mockBlogPosts[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockBlogPosts[index];
  },

  async deletePost(id: string): Promise<boolean> {
    await delay(500);
    const index = mockBlogPosts.findIndex(post => post.id === id);
    if (index === -1) return false;
    
    mockBlogPosts.splice(index, 1);
    return true;
  },

  async updatePostViews(id: string): Promise<void> {
    await delay(100);
    const post = mockBlogPosts.find(p => p.id === id);
    if (post) {
      post.views += 1;
    }
  },

  async likePost(id: string): Promise<void> {
    await delay(200);
    const post = mockBlogPosts.find(p => p.id === id);
    if (post) {
      post.likes += 1;
    }
  },

  async getComments(postId: string): Promise<BlogComment[]> {
    await delay(300);
    return mockBlogComments.filter(comment => comment.postId === postId);
  },

  async addComment(comment: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogComment> {
    await delay(500);
    const newComment: BlogComment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockBlogComments.push(newComment);
    return newComment;
  },

  async updateComment(id: string, updates: Partial<BlogComment>): Promise<BlogComment | null> {
    await delay(500);
    const index = mockBlogComments.findIndex(comment => comment.id === id);
    if (index === -1) return null;
    
    mockBlogComments[index] = {
      ...mockBlogComments[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockBlogComments[index];
  },

  async deleteComment(id: string): Promise<boolean> {
    await delay(500);
    const index = mockBlogComments.findIndex(comment => comment.id === id);
    if (index === -1) return false;
    
    mockBlogComments.splice(index, 1);
    return true;
  },

  async getCategories(): Promise<BlogCategory[]> {
    await delay(300);
    return mockBlogCategories;
  },

  async createCategory(category: Omit<BlogCategory, 'id' | 'postCount'>): Promise<BlogCategory> {
    await delay(500);
    const newCategory: BlogCategory = {
      ...category,
      id: Date.now().toString(),
      postCount: 0
    };
    mockBlogCategories.push(newCategory);
    return newCategory;
  },

  async updateCategory(id: string, updates: Partial<BlogCategory>): Promise<BlogCategory | null> {
    await delay(500);
    const index = mockBlogCategories.findIndex(category => category.id === id);
    if (index === -1) return null;
    
    mockBlogCategories[index] = {
      ...mockBlogCategories[index],
      ...updates
    };
    return mockBlogCategories[index];
  },

  async deleteCategory(id: string): Promise<boolean> {
    await delay(500);
    const index = mockBlogCategories.findIndex(category => category.id === id);
    if (index === -1) return false;
    
    mockBlogCategories.splice(index, 1);
    return true;
  }
};

export const RegistrationService = {
  async registerStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
    await delay(1000);
    const newStudent: Student = {
      ...student,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockStudents.push(newStudent);
    return newStudent;
  },

  async getStudents(): Promise<Student[]> {
    await delay(500);
    return mockStudents;
  },

  async getStudent(id: string): Promise<Student | null> {
    await delay(300);
    return mockStudents.find(student => student.id === id) || null;
  },

  async updateStudent(id: string, updates: Partial<Student>): Promise<Student | null> {
    await delay(500);
    const index = mockStudents.findIndex(student => student.id === id);
    if (index === -1) return null;
    
    mockStudents[index] = {
      ...mockStudents[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockStudents[index];
  },

  async saveProspect(prospect: Omit<ProspectEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProspectEntry> {
    await delay(500);
    const existingIndex = mockProspects.findIndex(p => p.email === prospect.email);
    
    if (existingIndex !== -1) {
      mockProspects[existingIndex] = {
        ...mockProspects[existingIndex],
        ...prospect,
        updatedAt: new Date().toISOString()
      };
      return mockProspects[existingIndex];
    }
    
    const newProspect: ProspectEntry = {
      ...prospect,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockProspects.push(newProspect);
    return newProspect;
  },

  async getProspect(email: string): Promise<ProspectEntry | null> {
    await delay(300);
    return mockProspects.find(prospect => prospect.email === email) || null;
  },

  async getProspects(): Promise<ProspectEntry[]> {
    await delay(500);
    return mockProspects;
  }
};

export const FAQService = {
  async getFAQs(): Promise<FAQ[]> {
    await delay(300);
    return mockFAQs;
  },

  async createFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    await delay(500);
    const newFAQ: FAQ = {
      ...faq,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockFAQs.push(newFAQ);
    return newFAQ;
  },

  async updateFAQ(id: string, updates: Partial<FAQ>): Promise<FAQ | null> {
    await delay(500);
    const index = mockFAQs.findIndex(faq => faq.id === id);
    if (index === -1) return null;
    
    mockFAQs[index] = {
      ...mockFAQs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockFAQs[index];
  },

  async deleteFAQ(id: string): Promise<boolean> {
    await delay(500);
    const index = mockFAQs.findIndex(faq => faq.id === id);
    if (index === -1) return false;
    
    mockFAQs.splice(index, 1);
    return true;
  }
};

export const ResourceService = {
  async getResources(): Promise<Resource[]> {
    await delay(300);
    return mockResources;
  },

  async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resource> {
    await delay(500);
    const newResource: Resource = {
      ...resource,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockResources.push(newResource);
    return newResource;
  },

  async updateResource(id: string, updates: Partial<Resource>): Promise<Resource | null> {
    await delay(500);
    const index = mockResources.findIndex(resource => resource.id === id);
    if (index === -1) return null;
    
    mockResources[index] = {
      ...mockResources[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return mockResources[index];
  },

  async deleteResource(id: string): Promise<boolean> {
    await delay(500);
    const index = mockResources.findIndex(resource => resource.id === id);
    if (index === -1) return false;
    
    mockResources.splice(index, 1);
    return true;
  }
};
