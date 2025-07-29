
import { default as UniversalSDK } from '../types/sdk';
import { DatabaseSeeder } from '../services/DatabaseSeeder';

// Initialize SDK
const sdk = new UniversalSDK({
  owner: import.meta.env.VITE_GITHUB_OWNER || 'ridwanullahh',
  repo: import.meta.env.VITE_GITHUB_REPO || 'muslimjambitebetadb',
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
  branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  basePath: 'db',
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
    blogCategories: {
      required: ['name', 'slug'],
      types: {
        name: 'string',
        slug: 'string',
        description: 'string',
        color: 'string',
        postCount: 'number'
      }
    },
    blogComments: {
      required: ['postId', 'author', 'content'],
      types: {
        postId: 'string',
        author: 'string',
        content: 'string',
        status: 'string',
        likes: 'number'
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
    prospects: {
      required: ['email'],
      types: {
        email: 'string',
        fullName: 'string',
        step: 'number',
        completed: 'boolean'
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
    },
    siteSettings: {
      required: ['key', 'value'],
      types: {
        key: 'string',
        value: 'string',
        type: 'string',
        description: 'string',
        category: 'string'
      }
    }
  }
});

// Initialize database seeding
sdk.init().then(() => {
  console.log('SDK initialized successfully');
  const seeder = new DatabaseSeeder(sdk);
  seeder.initializeDatabase();
});

// Blog service
export const BlogService = {
  getPosts: async () => {
    return await sdk.get('blogPosts');
  },
  getPost: async (id: string) => {
    const posts = await sdk.get('blogPosts');
    return sdk.getItem('blogPosts', id);
  },
  createPost: async (post: any) => {
    return await sdk.insert('blogPosts', post);
  },
  updatePost: async (id: string, updates: any) => {
    return await sdk.update('blogPosts', id, updates);
  },
  deletePost: async (id: string) => {
    return await sdk.delete('blogPosts', id);
  },
  searchPosts: async (query: string) => {
    const posts = await sdk.get('blogPosts');
    return posts.filter((post: any) =>
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  },
  getCategories: async () => {
    return await sdk.get('blogCategories');
  },
  getCategory: async (id: string) => {
    const categories = await sdk.get('blogCategories');
    return sdk.getItem('blogCategories', id);
  },
  createCategory: async (category: any) => {
    return await sdk.insert('blogCategories', category);
  },
  updateCategory: async (id: string, updates: any) => {
    return await sdk.update('blogCategories', id, updates);
  },
  deleteCategory: async (id: string) => {
    return await sdk.delete('blogCategories', id);
  },
  getComments: async (postId: string) => {
    const comments = await sdk.get('blogComments');
    return comments.filter((comment: any) => comment.postId === postId);
  },
  createComment: async (comment: any) => {
    return await sdk.insert('blogComments', comment);
  }
};

// Registration service
export const RegistrationService = {
  getStudents: async () => {
    return await sdk.get('students');
  },
  getStudent: async (id: string) => {
    const students = await sdk.get('students');
    return sdk.getItem('students', id);
  },
  createStudent: async (student: any) => {
    return await sdk.insert('students', student);
  },
  registerStudent: async (student: any) => {
    return await sdk.insert('students', student);
  },
  updateStudent: async (id: string, updates: any) => {
    return await sdk.update('students', id, updates);
  },
  deleteStudent: async (id: string) => {
    return await sdk.delete('students', id);
  },
  getProspects: async () => {
    return await sdk.get('prospects');
  },
  getProspect: async (email: string) => {
    const prospects = await sdk.get('prospects');
    return prospects.find((prospect: any) => prospect.email === email);
  },
  createProspect: async (prospect: any) => {
    return await sdk.insert('prospects', prospect);
  },
  saveProspect: async (prospect: any) => {
    const existing = await RegistrationService.getProspect(prospect.email);
    if (existing) {
      return await sdk.update('prospects', existing.id, prospect);
    } else {
      return await sdk.insert('prospects', prospect);
    }
  }
};

// FAQ service
export const FAQService = {
  getFAQs: async () => {
    return await sdk.get('faqs');
  },
  getFAQ: async (id: string) => {
    const faqs = await sdk.get('faqs');
    return sdk.getItem('faqs', id);
  },
  createFAQ: async (faq: any) => {
    return await sdk.insert('faqs', faq);
  },
  updateFAQ: async (id: string, updates: any) => {
    return await sdk.update('faqs', id, updates);
  },
  deleteFAQ: async (id: string) => {
    return await sdk.delete('faqs', id);
  }
};

// Resource service
export const ResourceService = {
  getResources: async () => {
    return await sdk.get('resources');
  },
  getResource: async (id: string) => {
    const resources = await sdk.get('resources');
    return sdk.getItem('resources', id);
  },
  createResource: async (resource: any) => {
    return await sdk.insert('resources', resource);
  },
  updateResource: async (id: string, updates: any) => {
    return await sdk.update('resources', id, updates);
  },
  deleteResource: async (id: string) => {
    return await sdk.delete('resources', id);
  }
};

// Quiz service
export const QuizService = {
  getQuizzes: async () => {
    return await sdk.get('quizzes');
  },
  getQuiz: async (id: string) => {
    const quizzes = await sdk.get('quizzes');
    return sdk.getItem('quizzes', id);
  },
  createQuiz: async (quiz: any) => {
    return await sdk.insert('quizzes', quiz);
  },
  updateQuiz: async (id: string, updates: any) => {
    return await sdk.update('quizzes', id, updates);
  },
  deleteQuiz: async (id: string) => {
    return await sdk.delete('quizzes', id);
  }
};

// Poll service
export const PollService = {
  getPolls: async () => {
    return await sdk.get('polls');
  },
  getPoll: async (id: string) => {
    const polls = await sdk.get('polls');
    return sdk.getItem('polls', id);
  },
  createPoll: async (poll: any) => {
    return await sdk.insert('polls', poll);
  },
  updatePoll: async (id: string, updates: any) => {
    return await sdk.update('polls', id, updates);
  },
  deletePoll: async (id: string) => {
    return await sdk.delete('polls', id);
  }
};

// Site settings service
export const SiteSettingsService = {
  getSettings: async () => {
    return await sdk.get('siteSettings');
  },
  getSetting: async (key: string) => {
    const settings = await sdk.get('siteSettings');
    return settings.find((setting: any) => setting.key === key);
  },
  setSetting: async (key: string, value: string, type: string = 'string') => {
    const existing = await SiteSettingsService.getSetting(key);
    const settingData = {
      key,
      value,
      type,
      description: '',
      category: 'general'
    };
    
    if (existing) {
      return await sdk.update('siteSettings', existing.id, settingData);
    } else {
      return await sdk.insert('siteSettings', settingData);
    }
  }
};

export const initializeSDK = async () => {
  console.log("SDK initialized from Index page");
  return await sdk.init();
};

export default sdk;
