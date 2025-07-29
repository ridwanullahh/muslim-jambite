
import { default as UniversalSDK, BlogCategory, FAQ, Resource, SiteSettings } from '../types/sdk';

export class DatabaseSeeder {
  private sdk: UniversalSDK;
  private initialized = false;

  constructor(sdk: UniversalSDK) {
    this.sdk = sdk;
  }

  async initializeDatabase(): Promise<void> {
    if (this.initialized) return;

    try {
      console.log('Initializing database collections...');
      
      await Promise.all([
        this.seedBlogCategories(),
        this.seedFAQs(),
        this.seedResources(),
        this.seedSiteSettings(),
        this.seedQuizzes(),
        this.seedPolls(),
        this.seedStudents(),
        this.seedBlogPosts(),
        this.seedBlogComments(),
        this.seedProspects()
      ]);

      this.initialized = true;
      console.log('Database initialization completed successfully');
    } catch (error) {
      console.error('Database initialization failed:', error);
      throw error;
    }
  }

  private async seedBlogCategories(): Promise<void> {
    try {
      const categories = await this.sdk.get('blogCategories');
      
      if (categories.length === 0) {
        const defaultCategories: Partial<BlogCategory>[] = [
          {
            name: 'Islamic Education',
            slug: 'islamic-education',
            description: 'Articles about Islamic teachings and education',
            color: '#059669',
            postCount: 0,
            featured: true
          },
          {
            name: 'JAMB Preparation',
            slug: 'jamb-preparation',
            description: 'JAMB examination tips and resources',
            color: '#7C3AED',
            postCount: 0,
            featured: true
          },
          {
            name: 'Study Tips',
            slug: 'study-tips',
            description: 'Effective study methods and techniques',
            color: '#DC2626',
            postCount: 0,
            featured: false
          }
        ];

        for (const category of defaultCategories) {
          await this.sdk.insert('blogCategories', category);
        }
        console.log('Blog categories seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding blog categories:', error);
    }
  }

  private async seedFAQs(): Promise<void> {
    try {
      const faqs = await this.sdk.get('faqs');
      
      if (faqs.length === 0) {
        const defaultFAQs: Partial<FAQ>[] = [
          {
            question: 'What is the MuslimJambite program?',
            answer: 'MuslimJambite is a comprehensive Islamic education program designed to help Muslim students excel in their JAMB examinations while maintaining their Islamic values and spiritual growth.',
            category: 'General',
            order: 1
          },
          {
            question: 'How much does the program cost?',
            answer: 'The program costs ₦1,500 per month with a one-time registration fee of ₦500. We also offer scholarships for students who need financial assistance.',
            category: 'Payment',
            order: 2
          },
          {
            question: 'What subjects are covered?',
            answer: 'We cover all major JAMB subjects including English, Mathematics, Physics, Chemistry, Biology, Government, Economics, and more.',
            category: 'Academic',
            order: 3
          }
        ];

        for (const faq of defaultFAQs) {
          await this.sdk.insert('faqs', faq);
        }
        console.log('FAQs seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding FAQs:', error);
    }
  }

  private async seedResources(): Promise<void> {
    try {
      const resources = await this.sdk.get('resources');
      
      if (resources.length === 0) {
        const defaultResources: Partial<Resource>[] = [
          {
            title: 'JAMB Past Questions 2024',
            description: 'Comprehensive collection of JAMB past questions with solutions',
            type: 'pdf',
            url: '#',
            category: 'JAMB',
            tags: ['jamb', 'past-questions', '2024'],
            isPublic: true,
            downloads: 0
          },
          {
            title: 'Islamic Studies Guide',
            description: 'Complete guide to Islamic studies for students',
            type: 'pdf',
            url: '#',
            category: 'Islamic Studies',
            tags: ['islam', 'studies', 'guide'],
            isPublic: true,
            downloads: 0
          }
        ];

        for (const resource of defaultResources) {
          await this.sdk.insert('resources', resource);
        }
        console.log('Resources seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding resources:', error);
    }
  }

  private async seedSiteSettings(): Promise<void> {
    try {
      const settings = await this.sdk.get('siteSettings');
      if (settings.length === 0) {
        const defaultSettings: Partial<SiteSettings>[] = [
          {
            key: 'registration_enabled',
            value: 'true',
            description: 'Enable/disable student registration',
            type: 'boolean',
            category: 'general'
          },
          {
            key: 'banner_enabled',
            value: 'true',
            description: 'Enable/disable promotional banner',
            type: 'boolean',
            category: 'ui'
          },
          {
            key: 'maintenance_mode',
            value: 'false',
            description: 'Enable/disable maintenance mode',
            type: 'boolean',
            category: 'general'
          }
        ];
        for (const setting of defaultSettings) {
          await this.sdk.insert('siteSettings', setting);
        }
        console.log('Site settings seeded successfully');
      }
    } catch (error) {
      console.error('Error seeding site settings:', error);
    }
  }

  private async seedQuizzes(): Promise<void> {
    try {
      const quizzes = await this.sdk.get('quizzes');
      if (quizzes.length === 0) {
        await this.sdk.save('quizzes', []);
        console.log('Quizzes collection initialized');
      }
    } catch (error) {
      console.error('Error seeding quizzes:', error);
    }
  }

  private async seedPolls(): Promise<void> {
    try {
      const polls = await this.sdk.get('polls');
      if (polls.length === 0) {
        await this.sdk.save('polls', []);
        console.log('Polls collection initialized');
      }
    } catch (error) {
      console.error('Error seeding polls:', error);
    }
  }

  private async seedStudents(): Promise<void> {
    try {
      const students = await this.sdk.get('students');
      if (students.length === 0) {
        await this.sdk.save('students', []);
        console.log('Students collection initialized');
      }
    } catch (error) {
      console.error('Error seeding students:', error);
    }
  }

  private async seedBlogPosts(): Promise<void> {
    try {
      const posts = await this.sdk.get('blogPosts');
      if (posts.length === 0) {
        await this.sdk.save('blogPosts', []);
        console.log('Blog posts collection initialized');
      }
    } catch (error) {
      console.error('Error seeding blog posts:', error);
    }
  }

  private async seedBlogComments(): Promise<void> {
    try {
      const comments = await this.sdk.get('blogComments');
      if (comments.length === 0) {
        await this.sdk.save('blogComments', []);
        console.log('Blog comments collection initialized');
      }
    } catch (error) {
      console.error('Error seeding blog comments:', error);
    }
  }

  private async seedProspects(): Promise<void> {
    try {
      const prospects = await this.sdk.get('prospects');
      if (prospects.length === 0) {
        await this.sdk.save('prospects', []);
        console.log('Prospects collection initialized');
      }
    } catch (error) {
      console.error('Error seeding prospects:', error);
    }
  }
}
