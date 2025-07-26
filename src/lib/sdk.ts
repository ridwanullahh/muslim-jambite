import UniversalSDK from '../types/sdk';
import { 
  BlogPost, 
  BlogComment, 
  BlogCategory, 
  Student, 
  ProspectEntry, 
  FAQ, 
  Resource, 
  SiteSettings,
  Poll,
  Quiz,
  Newsletter,
  Analytics
} from '../types/sdk';

// Initialize SDK with GitHub configuration
const sdk = new UniversalSDK({
  owner: import.meta.env.VITE_GITHUB_OWNER || 'muslimjambite',
  repo: import.meta.env.VITE_GITHUB_REPO || 'data',
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
  branch: 'main',
  basePath: 'data',
  mediaPath: 'media',
  schemas: {
    blog_posts: {
      required: ['id', 'title', 'slug', 'content', 'author', 'category', 'publishedAt'],
      types: {
        id: 'string',
        title: 'string',
        slug: 'string',
        content: 'string',
        author: 'string',
        category: 'string',
        publishedAt: 'string',
        featured: 'boolean',
        status: 'string'
      }
    },
    blog_comments: {
      required: ['id', 'postId', 'author', 'content', 'status'],
      types: {
        id: 'string',
        postId: 'string',
        author: 'string',
        content: 'string',
        status: 'string'
      }
    },
    blog_categories: {
      required: ['id', 'name', 'slug'],
      types: {
        id: 'string',
        name: 'string',
        slug: 'string',
        description: 'string',
        color: 'string',
        postCount: 'number'
      }
    },
    polls: {
      required: ['id', 'postId', 'question', 'options'],
      types: {
        id: 'string',
        postId: 'string',
        question: 'string',
        options: 'array'
      }
    },
    quizzes: {
      required: ['id', 'postId', 'title', 'questions'],
      types: {
        id: 'string',
        postId: 'string',
        title: 'string',
        questions: 'array'
      }
    },
    site_settings: {
      required: ['id', 'key', 'value'],
      types: {
        id: 'string',
        key: 'string',
        value: 'string',
        type: 'string'
      }
    },
    students: {
      required: ['id', 'fullName', 'email', 'isMuslim'],
      types: {
        id: 'string',
        fullName: 'string',
        email: 'string',
        isMuslim: 'boolean'
      }
    },
    prospects: {
      required: ['id', 'email'],
      types: {
        id: 'string',
        email: 'string',
        fullName: 'string',
        completed: 'boolean',
        step: 'number'
      }
    },
    faqs: {
      required: ['id', 'question', 'answer'],
      types: {
        id: 'string',
        question: 'string',
        answer: 'string',
        category: 'string'
      }
    },
    resources: {
      required: ['id', 'title', 'type', 'url'],
      types: {
        id: 'string',
        title: 'string',
        type: 'string',
        url: 'string',
        category: 'string'
      }
    },
    newsletters: {
      required: ['id', 'email'],
      types: {
        id: 'string',
        email: 'string',
        subscribed: 'boolean'
      }
    },
    analytics: {
      required: ['id', 'postId', 'action', 'timestamp'],
      types: {
        id: 'string',
        postId: 'string',
        action: 'string',
        timestamp: 'string'
      }
    }
  }
});

// Registration Service
export const RegistrationService = {
  async registerStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
    try {
      const newStudent = {
        ...student,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<Student>('students', newStudent);
      return newStudent as Student;
    } catch (error) {
      console.error('Error registering student:', error);
      throw error;
    }
  },

  async saveProspect(prospect: Partial<ProspectEntry>): Promise<ProspectEntry> {
    try {
      const existingProspects = await sdk.get<ProspectEntry>('prospects');
      const existing = existingProspects.find(p => p.email === prospect.email);
      
      if (existing) {
        const updated = { ...existing, ...prospect, updatedAt: new Date().toISOString() };
        await sdk.update('prospects', existing.id, updated);
        return updated as ProspectEntry;
      } else {
        const newProspect = {
          ...prospect,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        await sdk.insert<ProspectEntry>('prospects', newProspect);
        return newProspect as ProspectEntry;
      }
    } catch (error) {
      console.error('Error saving prospect:', error);
      throw error;
    }
  },

  async getProspect(email: string): Promise<ProspectEntry | null> {
    try {
      const prospects = await sdk.get<ProspectEntry>('prospects');
      return prospects.find(p => p.email === email) || null;
    } catch (error) {
      console.error('Error getting prospect:', error);
      return null;
    }
  },

  async getProspects(): Promise<ProspectEntry[]> {
    try {
      return await sdk.get<ProspectEntry>('prospects');
    } catch (error) {
      console.error('Error getting prospects:', error);
      return [];
    }
  },

  async getStudents(): Promise<Student[]> {
    try {
      return await sdk.get<Student>('students');
    } catch (error) {
      console.error('Error getting students:', error);
      return [];
    }
  }
};

// FAQ Service
export const FAQService = {
  async getFAQs(): Promise<FAQ[]> {
    try {
      return await sdk.get<FAQ>('faqs');
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return [];
    }
  },

  async createFAQ(faq: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>): Promise<FAQ> {
    try {
      const newFAQ = {
        ...faq,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<FAQ>('faqs', newFAQ);
      return newFAQ as FAQ;
    } catch (error) {
      console.error('Error creating FAQ:', error);
      throw error;
    }
  }
};

// Resource Service
export const ResourceService = {
  async getResources(): Promise<Resource[]> {
    try {
      return await sdk.get<Resource>('resources');
    } catch (error) {
      console.error('Error fetching resources:', error);
      return [];
    }
  },

  async createResource(resource: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<Resource> {
    try {
      const newResource = {
        ...resource,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<Resource>('resources', newResource);
      return newResource as Resource;
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  }
};

// Blog Service (enhanced)
export const BlogService = {
  // Get all posts
  async getPosts(): Promise<BlogPost[]> {
    try {
      const posts = await sdk.get<BlogPost>('blog_posts');
      return posts.filter(post => post.status === 'published').sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      return this.getSamplePosts();
    }
  },

  // Get post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      const posts = await sdk.get<BlogPost>('blog_posts');
      return posts.find(post => post.slug === slug && post.status === 'published') || null;
    } catch (error) {
      console.error('Error fetching post:', error);
      return null;
    }
  },

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const posts = await sdk.get<BlogPost>('blog_posts');
      return posts.filter(post => post.category === category && post.status === 'published');
    } catch (error) {
      console.error('Error fetching posts by category:', error);
      return [];
    }
  },

  // Search posts - fix the signature
  async searchPosts(query: string, filters?: { category?: string; tags?: string[] }): Promise<BlogPost[]> {
    try {
      const posts = await sdk.get<BlogPost>('blog_posts');
      let filteredPosts = posts.filter(post => post.status === 'published');

      if (query) {
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.content.toLowerCase().includes(query.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }

      if (filters?.category) {
        filteredPosts = filteredPosts.filter(post => post.category === filters.category);
      }

      if (filters?.tags && filters.tags.length > 0) {
        filteredPosts = filteredPosts.filter(post => 
          filters.tags!.some(tag => post.tags.includes(tag))
        );
      }

      return filteredPosts;
    } catch (error) {
      console.error('Error searching posts:', error);
      return [];
    }
  },

  // Add missing methods
  async getCategories(): Promise<BlogCategory[]> {
    try {
      return await sdk.get<BlogCategory>('blog_categories');
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [
        { id: '1', name: 'Islamic Education', slug: 'islamic-education', description: 'Articles about Islamic education', color: 'green', postCount: 0 },
        { id: '2', name: 'Academic Preparation', slug: 'academic-preparation', description: 'JAMB and academic preparation', color: 'blue', postCount: 0 },
        { id: '3', name: 'Technology', slug: 'technology', description: 'Technology and programming', color: 'purple', postCount: 0 }
      ];
    }
  },

  async createPost(post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost> {
    try {
      const newPost = {
        ...post,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<BlogPost>('blog_posts', newPost);
      return newPost as BlogPost;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },

  // Get comments for a post
  async getComments(postId: string): Promise<BlogComment[]> {
    try {
      const comments = await sdk.get<BlogComment>('blog_comments');
      return comments.filter(comment => comment.postId === postId && comment.status === 'approved');
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    }
  },

  // Add comment
  async addComment(comment: Omit<BlogComment, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogComment> {
    try {
      const newComment = {
        ...comment,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<BlogComment>('blog_comments', newComment);
      return newComment as BlogComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  // React to post
  async reactToPost(postId: string, type: 'like' | 'heart' | 'thumbsUp' | 'celebrate'): Promise<void> {
    try {
      await sdk.insert('analytics', {
        id: Date.now().toString(),
        postId,
        action: type,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error reacting to post:', error);
    }
  },

  // Bookmark post
  async bookmarkPost(postId: string): Promise<void> {
    try {
      await sdk.insert('analytics', {
        id: Date.now().toString(),
        postId,
        action: 'bookmark',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  },

  // Update post views
  async updatePostViews(postId: string): Promise<void> {
    try {
      await sdk.insert('analytics', {
        id: Date.now().toString(),
        postId,
        action: 'view',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating views:', error);
    }
  },

  // Get related posts
  async getRelatedPosts(postId: string): Promise<BlogPost[]> {
    try {
      const posts = await sdk.get<BlogPost>('blog_posts');
      const currentPost = posts.find(p => p.id === postId);
      if (!currentPost) return [];

      return posts
        .filter(post => 
          post.id !== postId && 
          post.status === 'published' &&
          (post.category === currentPost.category || 
           post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .slice(0, 4);
    } catch (error) {
      console.error('Error fetching related posts:', error);
      return [];
    }
  },

  // Get sample posts for fallback
  getSamplePosts(): BlogPost[] {
    return [
      {
        id: '1',
        title: 'Complete Guide to Islamic Education: Balancing Deen and Dunya for Modern Muslim Students',
        slug: 'complete-guide-islamic-education-balancing-deen-dunya-modern-muslim-students',
        excerpt: 'Discover how to excel in both religious and worldly education as a Muslim student. Learn practical strategies for balancing Islamic studies with academic pursuits.',
        content: `# Complete Guide to Islamic Education: Balancing Deen and Dunya for Modern Muslim Students

In today's rapidly evolving world, Muslim students face the unique challenge of excelling in both religious (Deen) and worldly (Dunya) education. This comprehensive guide will help you navigate this balance while maintaining your Islamic identity and values.

## Understanding the Balance

The concept of balancing Deen and Dunya is not about choosing one over the other, but rather integrating both aspects into a harmonious educational journey. Islam encourages the pursuit of knowledge in all its forms, as the Prophet Muhammad (PBUH) said: "Seek knowledge from the cradle to the grave."

## Key Principles for Success

### 1. Time Management
- Allocate specific times for Islamic studies and academic subjects
- Use the Barakah (blessing) of early morning hours for Quran recitation
- Implement the Islamic concept of prioritization in your daily schedule

### 2. Intention (Niyyah)
- Begin every study session with the right intention
- View your academic pursuits as a form of worship
- Remember that knowledge is a trust from Allah

### 3. Practical Integration
- Look for connections between Islamic teachings and your academic subjects
- Apply Islamic ethics in your educational environment
- Seek halal means of achieving your educational goals

## Building Strong Foundations

### Islamic Education Components
- **Quran Studies**: Regular recitation, memorization, and understanding
- **Hadith Literature**: Learning the sayings and actions of Prophet Muhammad (PBUH)
- **Fiqh**: Understanding Islamic jurisprudence for daily life
- **Seerah**: Studying the life of the Prophet as a practical guide

### Academic Excellence
- Maintain high standards in your chosen field of study
- Develop critical thinking skills while staying grounded in Islamic values
- Participate in extracurricular activities that align with your beliefs

## Conclusion

Balancing Deen and Dunya is not just possible but necessary for the modern Muslim student. By integrating Islamic principles into your educational journey, you create a foundation for success in both this world and the hereafter.

May Allah bless your educational journey and make it a means of closeness to Him. Ameen.`,
        author: 'Dr. Amina Hassan',
        category: 'Islamic Education',
        tags: ['Islamic Education', 'Student Life', 'Academic Success', 'Deen and Dunya', 'Study Tips'],
        publishedAt: '2024-01-15T00:00:00Z',
        updatedAt: '2024-01-15T00:00:00Z',
        status: 'published' as const,
        featured: true,
        views: 1251,
        likes: 89,
        bookmarks: 45,
        readTime: 12,
        seoTitle: 'Complete Guide to Islamic Education: Balancing Deen and Dunya for Modern Muslim Students',
        seoDescription: 'Discover how to excel in both religious and worldly education as a Muslim student. Learn practical strategies for balancing Islamic studies with academic pursuits.',
        seoKeywords: ['Islamic Education', 'Muslim Students', 'Deen and Dunya', 'Academic Success', 'Study Tips', 'Religious Education'],
        reactions: {
          like: 89,
          heart: 56,
          thumbsUp: 73,
          celebrate: 23
        }
      },
      {
        id: '2',
        title: 'JAMB Preparation Strategies for Muslim Students: Excellence in Academic and Spiritual Growth',
        slug: 'jamb-preparation-strategies-muslim-students-academic-spiritual-growth',
        excerpt: 'Master JAMB preparation while maintaining your Islamic values. Learn proven strategies that integrate faith with academic excellence.',
        content: `# JAMB Preparation Strategies for Muslim Students: Excellence in Academic and Spiritual Growth

Preparing for JAMB (Joint Admissions and Matriculation Board) examination is a crucial step for Nigerian students seeking university admission. As Muslim students, we have the unique opportunity to approach this challenge with both academic rigor and spiritual strength.

## The Islamic Approach to Learning

Before diving into specific strategies, it's important to understand that seeking knowledge is a fundamental Islamic value. The Quran states: "And say: My Lord, increase me in knowledge" (Quran 20:114). This verse reminds us that academic pursuit is not separate from our spiritual journey but is an integral part of it.

## Comprehensive Study Plan

### Time Management the Islamic Way
1. **Fajr Time**: Utilize the blessed early morning hours for the most challenging subjects
2. **Between Prayers**: Use the intervals between prayers for focused study sessions
3. **After Maghrib**: Review and consolidate the day's learning
4. **Before Sleep**: Light revision and gratitude to Allah

## Conclusion

JAMB preparation is not just about academic success; it's an opportunity to strengthen your relationship with Allah while developing the skills and knowledge needed for your future. By integrating Islamic values into your study routine, you create a foundation for success that extends beyond examination results.

May Allah grant you success in your examinations and bless your educational journey. Ameen.`,
        author: 'Prof. Muhammad Ibrahim',
        category: 'Academic Preparation',
        tags: ['JAMB', 'Academic Preparation', 'Islamic Values', 'Study Strategies', 'University Admission'],
        publishedAt: '2024-01-10T00:00:00Z',
        updatedAt: '2024-01-10T00:00:00Z',
        status: 'published' as const,
        featured: true,
        views: 892,
        likes: 67,
        bookmarks: 34,
        readTime: 15,
        seoTitle: 'JAMB Preparation Strategies for Muslim Students: Excellence in Academic and Spiritual Growth',
        seoDescription: 'Master JAMB preparation while maintaining your Islamic values. Learn proven strategies that integrate faith with academic excellence.',
        seoKeywords: ['JAMB Preparation', 'Muslim Students', 'Academic Excellence', 'Study Strategies', 'Islamic Education', 'University Admission'],
        reactions: {
          like: 67,
          heart: 45,
          thumbsUp: 82,
          celebrate: 19
        }
      },
      {
        id: '3',
        title: 'Tech Skills for Muslim Students: Navigating the Digital Age with Islamic Ethics',
        slug: 'tech-skills-muslim-students-digital-age-islamic-ethics',
        excerpt: 'Discover how to develop technological skills while maintaining Islamic values. Learn about ethical technology use and career opportunities in tech.',
        content: `# Tech Skills for Muslim Students: Navigating the Digital Age with Islamic Ethics

In our increasingly digital world, technology skills have become essential for success in virtually every field. As Muslim students, we have the opportunity to approach technology learning through the lens of Islamic values and ethics.

## Essential Tech Skills for Modern Muslim Students

### 1. Programming and Software Development
Programming is like learning a new language – one that allows you to communicate with computers and create solutions for real-world problems.

### 2. Digital Design and User Experience (UX)
Good design is about creating interfaces that are intuitive, accessible, and serve users' needs effectively.

## Conclusion

Technology skills are not just about career advancement; they're about becoming equipped to serve Allah and humanity in the digital age. As Muslim students, you have the opportunity to approach technology learning with purpose, ethics, and a commitment to beneficial impact.

May Allah grant you success in your technological endeavors and make you among those who use their skills for the greater good. Ameen.`,
        author: 'Dr. Sarah Ahmed',
        category: 'Technology',
        tags: ['Technology', 'Programming', 'Career Development', 'Islamic Ethics', 'Digital Skills'],
        publishedAt: '2024-01-05T00:00:00Z',
        updatedAt: '2024-01-05T00:00:00Z',
        status: 'published' as const,
        featured: false,
        views: 645,
        likes: 52,
        bookmarks: 28,
        readTime: 18,
        seoTitle: 'Tech Skills for Muslim Students: Navigating the Digital Age with Islamic Ethics',
        seoDescription: 'Discover how to develop technological skills while maintaining Islamic values. Learn about ethical technology use and career opportunities in tech.',
        seoKeywords: ['Technology Skills', 'Muslim Students', 'Programming', 'Islamic Ethics', 'Career Development', 'Digital Age'],
        reactions: {
          like: 52,
          heart: 38,
          thumbsUp: 61,
          celebrate: 15
        }
      }
    ];
  }
};

// Quiz Service
export const QuizService = {
  async getQuizzesByPost(postId: string): Promise<Quiz[]> {
    try {
      const quizzes = await sdk.get<Quiz>('quizzes');
      return quizzes.filter(quiz => quiz.postId === postId);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      return [];
    }
  },

  async createQuiz(quiz: Omit<Quiz, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quiz> {
    try {
      const newQuiz = {
        ...quiz,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<Quiz>('quizzes', newQuiz);
      return newQuiz as Quiz;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  }
};

// Poll Service
export const PollService = {
  async getPollsByPost(postId: string): Promise<Poll[]> {
    try {
      const polls = await sdk.get<Poll>('polls');
      return polls.filter(poll => poll.postId === postId);
    } catch (error) {
      console.error('Error fetching polls:', error);
      return [];
    }
  },

  async createPoll(poll: Omit<Poll, 'id' | 'createdAt' | 'updatedAt'>): Promise<Poll> {
    try {
      const newPoll = {
        ...poll,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<Poll>('polls', newPoll);
      return newPoll as Poll;
    } catch (error) {
      console.error('Error creating poll:', error);
      throw error;
    }
  },

  async voteOnPoll(pollId: string, optionId: string): Promise<void> {
    try {
      await sdk.insert('analytics', {
        id: Date.now().toString(),
        postId: pollId,
        action: 'vote',
        metadata: { optionId },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error voting on poll:', error);
    }
  }
};

// Site Settings Service
export const SiteSettingsService = {
  async getSetting(key: string): Promise<SiteSettings | null> {
    try {
      const settings = await sdk.get<SiteSettings>('site_settings');
      return settings.find(setting => setting.key === key) || null;
    } catch (error) {
      console.error('Error fetching setting:', error);
      return null;
    }
  },

  async updateSetting(key: string, value: string, type: 'string' | 'boolean' | 'number' | 'json' = 'string'): Promise<void> {
    try {
      const settings = await sdk.get<SiteSettings>('site_settings');
      const existingSetting = settings.find(s => s.key === key);
      
      if (existingSetting) {
        await sdk.update('site_settings', existingSetting.id, {
          value,
          type,
          updatedAt: new Date().toISOString()
        });
      } else {
        await sdk.insert('site_settings', {
          id: Date.now().toString(),
          key,
          value,
          type,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error updating setting:', error);
    }
  }
};

// Student Service
export const StudentService = {
  async getStudents(): Promise<Student[]> {
    try {
      return await sdk.get<Student>('students');
    } catch (error) {
      console.error('Error fetching students:', error);
      return [];
    }
  },

  async addStudent(student: Omit<Student, 'id' | 'createdAt' | 'updatedAt'>): Promise<Student> {
    try {
      const newStudent = {
        ...student,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await sdk.insert<Student>('students', newStudent);
      return newStudent as Student;
    } catch (error) {
      console.error('Error adding student:', error);
      throw error;
    }
  }
};

// Newsletter Service
export const NewsletterService = {
  async subscribe(email: string, name?: string): Promise<void> {
    try {
      await sdk.insert('newsletters', {
        id: Date.now().toString(),
        email,
        name,
        subscribed: true,
        categories: ['general'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  }
};

// Analytics Service
export const AnalyticsService = {
  async trackEvent(postId: string, action: string, metadata?: Record<string, any>): Promise<void> {
    try {
      await sdk.insert('analytics', {
        id: Date.now().toString(),
        postId,
        action,
        metadata,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }
};

// Initialize SDK function
export const initializeSDK = async () => {
  try {
    await sdk.init();
    console.log('SDK initialized successfully');
  } catch (error) {
    console.error('SDK initialization error:', error);
  }
};

// Initialize SDK
sdk.init().then(() => {
  console.log('SDK initialized successfully');
}).catch(error => {
  console.error('SDK initialization error:', error);
});

export type { ProspectEntry };
export { sdk };
export default sdk;
