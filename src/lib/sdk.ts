import UniversalSDK from '../types/sdk';
import { DatabaseSeeder } from '../services/DatabaseSeeder';

// Initialize SDK
const sdk = new UniversalSDK({
  owner: import.meta.env.VITE_GITHUB_OWNER || 'muslimjambite',
  repo: import.meta.env.VITE_GITHUB_REPO || 'data',
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  basePath: 'collections',
  mediaPath: 'media',
  schemas: {
    blogPosts: {
      required: ['title', 'content', 'author'],
      types: {
        title: 'string',
        content: 'string',
        author: 'string',
        publishedAt: 'string',
        status: 'string'
      }
    },
    students: {
      required: ['fullName', 'email'],
      types: {
        fullName: 'string',
        email: 'string',
        paymentStatus: 'string',
        monthlyFee: 'number'
      }
    },
    faqs: {
      required: ['question', 'answer'],
      types: {
        question: 'string',
        answer: 'string',
        category: 'string',
        order: 'number'
      }
    },
    resources: {
      required: ['title', 'type', 'url'],
      types: {
        title: 'string',
        type: 'string',
        url: 'string',
        isPublic: 'boolean',
        downloads: 'number'
      }
    },
    quizzes: {
      required: ['title', 'questions'],
      types: {
        title: 'string',
        questions: 'array',
        passingScore: 'number',
        attempts: 'number'
      }
    },
    polls: {
      required: ['question', 'options'],
      types: {
        question: 'string',
        options: 'array',
        totalVotes: 'number'
      }
    }
  }
});

// Initialize database seeding
sdk.init().then(() => {
  console.log('SDK initialized successfully');
  // Seed database collections
  DatabaseSeeder.getInstance().initializeDatabase();
});

// Blog service
export const BlogService = {
  getPosts: async () => {
    return await sdk.get<UniversalSDK['blogPosts']>('blogPosts');
  },
  getPost: async (id: string) => {
    const posts = await sdk.get<UniversalSDK['blogPosts']>('blogPosts');
    return posts.find(post => post.id === id);
  },
  createPost: async (post: any) => {
    return await sdk.insert<UniversalSDK['blogPosts']>('blogPosts', post);
  },
   updatePost: async (id: string, updates: any) => {
    return await sdk.update<UniversalSDK['blogPosts']>('blogPosts', id, updates);
  },
  deletePost: async (id: string) => {
    return await sdk.delete<UniversalSDK['blogPosts']>('blogPosts', id);
  },
  getCategories: async () => {
    return await sdk.get<UniversalSDK['blogCategories']>('blogCategories');
  },
  getCategory: async (id: string) => {
    const categories = await sdk.get<UniversalSDK['blogCategories']>('blogCategories');
    return categories.find(category => category.id === id);
  },
  createCategory: async (category: any) => {
    return await sdk.insert<UniversalSDK['blogCategories']>('blogCategories', category);
  },
  getComments: async (postId: string) => {
    return await sdk.get<UniversalSDK['blogComments']>('blogComments');
  },
  createComment: async (comment: any) => {
    return await sdk.insert<UniversalSDK['blogComments']>('blogComments', comment);
  }
};

// Registration service
export const RegistrationService = {
  getStudents: async () => {
    return await sdk.get<UniversalSDK['students']>('students');
  },
  getStudent: async (id: string) => {
    const students = await sdk.get<UniversalSDK['students']>('students');
    return students.find(student => student.id === id);
  },
  createStudent: async (student: any) => {
    return await sdk.insert<UniversalSDK['students']>('students', student);
  },
  getProspects: async () => {
    return await sdk.get<UniversalSDK['prospects']>('prospects');
  },
  createProspect: async (prospect: any) => {
    return await sdk.insert<UniversalSDK['prospects']>('prospects', prospect);
  }
};

// FAQ service
export const FAQService = {
  getFAQs: async () => {
    return await sdk.get<UniversalSDK['faqs']>('faqs');
  },
  getFAQ: async (id: string) => {
    const faqs = await sdk.get<UniversalSDK['faqs']>('faqs');
    return faqs.find(faq => faq.id === id);
  },
  createFAQ: async (faq: any) => {
    return await sdk.insert<UniversalSDK['faqs']>('faqs', faq);
  }
};

// Resource service
export const ResourceService = {
  getResources: async () => {
    return await sdk.get<UniversalSDK['resources']>('resources');
  },
  getResource: async (id: string) => {
    const resources = await sdk.get<UniversalSDK['resources']>('resources');
    return resources.find(resource => resource.id === id);
  },
  createResource: async (resource: any) => {
    return await sdk.insert<UniversalSDK['resources']>('resources', resource);
  },
  updateResource: async (id: string, updates: any) => {
    return await sdk.update<UniversalSDK['resources']>('resources', id, updates);
  },
  deleteResource: async (id: string) => {
    return await sdk.delete<UniversalSDK['resources']>('resources', id);
  }
};

export default sdk;
