import { 
  BlogPost, 
  BlogComment, 
  BlogCategory, 
  Student, 
  ProspectEntry, 
  FAQ, 
  Resource,
  UniversalSDKConfig,
  UniversalSDKInterface,
  SiteSettings
} from '../types/sdk';
import UniversalSDK from '../types/sdk';

// Initialize SDK with environment variables
const sdkConfig: UniversalSDKConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'muslimjambite',
  repo: import.meta.env.VITE_GITHUB_REPO || 'data',
  token: import.meta.env.VITE_GITHUB_TOKEN || 'mock-token',
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
    },
    blog_comments: {
      required: ['postId', 'author', 'content'],
      types: {
        postId: 'string',
        author: 'string',
        content: 'text'
      }
    },
    site_settings: {
      required: ['key', 'value'],
      types: {
        key: 'string',
        value: 'string'
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
export type { BlogPost, BlogComment, BlogCategory, Student, ProspectEntry, FAQ, Resource, SiteSettings };

// Enhanced mock data with SEO-rich content
let mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Complete Guide to Islamic Education: Balancing Deen and Dunya for Modern Muslim Students',
    slug: 'complete-guide-islamic-education-balancing-deen-dunya-modern-muslim-students',
    excerpt: 'Master the art of excelling in your studies while maintaining your Islamic values. This comprehensive guide reveals time-tested strategies for academic success rooted in Islamic principles.',
    content: `# The Complete Guide to Islamic Education: Balancing Deen and Dunya

## Introduction

Education in Islam is not merely about acquiring knowledge for worldly success, but about developing a comprehensive understanding that encompasses both spiritual and intellectual growth. The Prophet Muhammad (peace be upon him) emphasized the importance of seeking knowledge, stating "Seek knowledge from the cradle to the grave."

## Core Principles of Islamic Education

### 1. Intention (Niyyah)
Start every study session with the right intention. Your pursuit of knowledge should be for Allah's pleasure and to serve humanity.

### 2. Seeking Beneficial Knowledge
Focus on knowledge that benefits you in this world and the hereafter. The Prophet (SAW) said: "O Allah, I seek refuge in You from knowledge that does not benefit."

### 3. Consistency and Persistence
Islam teaches us the value of consistent effort. Small, regular study sessions are more beneficial than sporadic intense sessions.

## Practical Study Strategies

### Time Management
- **Fajr Study Sessions**: The early morning hours after Fajr are blessed and ideal for memorization and deep study
- **Barakah in Early Rising**: Wake up early to utilize the blessed hours
- **Prayer Breaks**: Use the five daily prayers as natural study breaks

### Study Environment
- Keep your study space clean and organized
- Face the Qibla when possible during study
- Keep a mushaf (Quran) on your desk for inspiration

## Balancing Religious and Academic Studies

### Integration Approach
- Connect your academic subjects to Islamic principles
- Use Islamic examples in your studies where appropriate
- Remember that all knowledge comes from Allah

### Priority Management
- Never compromise on your five daily prayers
- Attend Jumu'ah prayers without fail
- Make time for Quran recitation daily

## Exam Preparation the Islamic Way

### Before Exams
- Make du'a asking Allah for success
- Review your notes after each prayer
- Maintain your Islamic practices

### During Exams
- Begin with "Bismillah"
- Trust in Allah while doing your best
- Stay calm and focused

## Success Stories from Islamic History

Throughout Islamic history, many scholars excelled in both religious and worldly knowledge. Ibn Sina (Avicenna), Al-Kindi, and Al-Ghazali are prime examples of balanced Islamic education.

## Conclusion

Remember that seeking knowledge is an act of worship in Islam. When you study with the right intention and maintain your Islamic values, you're not just preparing for worldly success but also earning rewards in the hereafter.

May Allah grant us all beneficial knowledge and the ability to act upon it. Ameen.`,
    author: 'Dr. Amina Hassan',
    category: 'Islamic Education',
    tags: ['Education', 'Islam', 'Spirituality', 'Academic Success', 'Student Life', 'Islamic Values', 'Study Tips'],
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    status: 'published',
    featured: true,
    views: 1250,
    likes: 89,
    bookmarks: 45,
    seoTitle: 'Complete Guide to Islamic Education: Balancing Deen and Dunya for Muslim Students',
    seoDescription: 'Master academic success while maintaining Islamic values. Comprehensive guide with proven strategies for Muslim students to excel in studies and strengthen their faith.',
    seoKeywords: ['Islamic education', 'Muslim students', 'Deen and Dunya', 'Islamic values', 'Academic success', 'Study tips Islam', 'Islamic learning methods', 'Muslim academic guide'],
    readTime: 12,
    reactions: {
      like: 89,
      heart: 156,
      thumbsUp: 67,
      celebrate: 23
    }
  },
  {
    id: '2',
    title: 'JAMB Success Stories: How Faith and Hard Work Led to 350+ Scores',
    slug: 'jamb-success-stories-faith-hard-work-350-plus-scores',
    excerpt: 'Discover inspiring stories of Muslim students who achieved exceptional JAMB scores through faith, strategic preparation, and unwavering determination.',
    content: `# JAMB Success Stories: How Faith and Hard Work Led to 350+ Scores

## Introduction

Success in JAMB requires more than just academic preparation—it demands a perfect balance of faith, strategic planning, and consistent effort. In this comprehensive guide, we share real success stories from Muslim students who scored 350+ in JAMB while maintaining their Islamic values.

## Success Story 1: Aisha's Journey to 367

### Background
Aisha from Kano State scored 367 in JAMB 2023 while maintaining her hijab and never missing a single prayer during her preparation period.

### Her Strategy
- **Pre-Fajr Study Sessions**: Studied for 2 hours before Fajr daily
- **Quranic Memorization**: Used memorization techniques from Quran to remember formulas
- **Du'a Integration**: Made specific du'as for each subject
- **Consistent Practice**: Solved past questions for 3 hours daily

### Key Lessons
"I never compromised my prayers for studies. Instead, I used them as breaks to refresh my mind," - Aisha

## Success Story 2: Muhammad's 354 Score

### Background
Muhammad from Lagos combined his passion for Islamic studies with science subjects to achieve 354 in JAMB.

### His Approach
- **Integrated Learning**: Connected scientific concepts to Quranic verses
- **Group Study**: Formed study groups with like-minded Muslim students
- **Balanced Lifestyle**: Maintained sports and social activities
- **Consistent Revision**: Daily review of previous day's work

### Key Insights
"The discipline I learned from Islamic practices helped me maintain consistency in my studies," - Muhammad

## Common Strategies from All Success Stories

### 1. Time Management
- Early morning study sessions (Fajr time)
- Using prayer times as natural study breaks
- Maintaining sleep schedule according to Sunnah

### 2. Mental Preparation
- Starting each study session with "Bismillah"
- Regular du'a and dhikr for mental clarity
- Trust in Allah while doing maximum effort

### 3. Subject-Specific Strategies

#### Mathematics
- Practice daily for at least 1 hour
- Focus on past questions and time management
- Use Islamic geometric patterns to understand concepts

#### English Language
- Read Quran translation to improve comprehension
- Practice essay writing on Islamic topics
- Build vocabulary through Islamic literature

#### Sciences
- Connect concepts to creation and Allah's design
- Use memorization techniques from Islamic education
- Regular practical application

### 4. Mock Exam Strategy
- Take weekly mock exams
- Analyze mistakes thoroughly
- Time management practice
- Stress management through dhikr

## Pre-Exam Preparation

### One Month Before
- Intensive past question practice
- Final revision of all topics
- Increased du'a and istighfar
- Maintaining regular prayers

### One Week Before
- Light revision only
- Increased sleep and rest
- Special du'as for success
- Visiting righteous people for prayers

### Day of Exam
- Wake up early for Fajr and du'a
- Eat a light, healthy breakfast
- Recite Ayatul Kursi and specific du'as
- Maintain calmness through dhikr

## Du'as for JAMB Success

### Before Studying
"Allahumma la sahla illa ma ja'altahu sahla, wa anta taj'alul hazna idha shi'ta sahla"

### During Exam
"Rabbish-radni sabiila" (My Lord, guide me to the right path)

### After Exam
"Hasbunallahu wa ni'mal wakeel" (Allah is sufficient for us and He is the best disposer of affairs)

## Overcoming Challenges

### Managing Stress
- Regular dhikr and du'a
- Maintaining connection with Allah
- Seeking support from family and friends
- Physical exercise and healthy diet

### Dealing with Difficult Topics
- Break down complex concepts
- Use Islamic examples where possible
- Seek help from teachers and peers
- Make du'a for understanding

## Post-JAMB Advice

### While Waiting for Results
- Continue making du'a
- Prepare for post-JAMB screening
- Research university choices
- Maintain good deeds

### After Results
- Be grateful regardless of the outcome
- Trust in Allah's plan
- Continue striving for excellence
- Help others with their preparation

## Conclusion

These success stories prove that with proper planning, consistent effort, and strong faith, achieving excellent JAMB scores is possible while maintaining Islamic values. Remember, success comes from Allah, but He expects us to make the effort.

The key is to trust in Allah's plan while putting in maximum effort. May Allah grant success to all Muslim students preparing for JAMB. Ameen.

## Additional Resources

- Daily du'a for students
- Islamic time management techniques
- Balancing religious and academic studies
- Building confidence through faith

Remember: "And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose." (Quran 65:3)`,
    author: 'Ustaz Ibrahim Musa',
    category: 'Success Stories',
    tags: ['JAMB', 'Success Stories', 'Faith', 'Achievement', 'Muslim Students', 'Exam Preparation', 'Academic Excellence'],
    publishedAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    status: 'published',
    featured: true,
    views: 2150,
    likes: 145,
    bookmarks: 89,
    seoTitle: 'JAMB Success Stories: Muslim Students Score 350+ Through Faith and Hard Work',
    seoDescription: 'Inspiring real success stories of Muslim students who achieved 350+ JAMB scores. Learn their strategies, preparation methods, and how faith guided their success.',
    seoKeywords: ['JAMB success stories', 'Muslim students JAMB', 'JAMB 350 plus score', 'Islamic study methods', 'JAMB preparation tips', 'Faith and academic success', 'Muslim JAMB achievers'],
    readTime: 15,
    reactions: {
      like: 145,
      heart: 203,
      thumbsUp: 178,
      celebrate: 67
    }
  },
  {
    id: '3',
    title: 'The Power of Du\'a in Academic Success: Scientific Evidence and Islamic Perspective',
    slug: 'power-of-dua-academic-success-scientific-evidence-islamic-perspective',
    excerpt: 'Explore the profound impact of du\'a on academic performance, backed by scientific research and Islamic teachings for Muslim students.',
    content: `# The Power of Du'a in Academic Success: Scientific Evidence and Islamic Perspective

## Introduction

In the pursuit of academic excellence, Muslim students often wonder about the role of du'a (supplication) in their success. This comprehensive guide explores both the Islamic perspective and scientific evidence supporting the power of du'a in academic achievement.

## Islamic Foundation of Du'a in Learning

### Quranic Guidance
The Quran provides clear guidance on seeking knowledge through du'a:

"And say: My Lord, increase me in knowledge" (Quran 20:114)

This verse, revealed about Prophet Muhammad (SAW), emphasizes the importance of constantly seeking increased knowledge through supplication.

### Prophetic Teachings
The Prophet (SAW) taught us specific du'as for learning:

"Allahumma infa'ni bima 'allamtani wa 'allimni ma yanfa'uni"
(O Allah, benefit me with what You have taught me and teach me what will benefit me)

## Scientific Evidence Supporting Du'a

### Neurological Benefits
Recent neuroscientific research has shown that regular prayer and meditation:
- Reduce cortisol levels (stress hormone)
- Improve memory consolidation
- Enhance cognitive function
- Increase neuroplasticity

### Psychological Benefits
Studies indicate that spiritual practices like du'a:
- Reduce anxiety and depression
- Improve focus and concentration
- Enhance emotional regulation
- Boost self-confidence

### Performance Enhancement
Research shows that students who engage in regular spiritual practices:
- Show improved academic performance
- Have better stress management
- Display increased resilience
- Maintain better work-life balance

## Specific Du'as for Different Academic Needs

### Before Studying
**Arabic:** "Rabbish-radni sabiila"
**Translation:** "My Lord, guide me to the right path"
**Purpose:** Seeking guidance for understanding

### During Difficult Concepts
**Arabic:** "Allahumma la sahla illa ma ja'altahu sahla"
**Translation:** "O Allah, nothing is easy except what You make easy"
**Purpose:** Seeking ease in understanding complex topics

### Before Exams
**Arabic:** "Hasbunallahu wa ni'mal wakeel"
**Translation:** "Allah is sufficient for us and He is the best disposer of affairs"
**Purpose:** Placing complete trust in Allah

### After Studying
**Arabic:** "Allahumma barik lana fima 'allamtana"
**Translation:** "O Allah, bless us in what You have taught us"
**Purpose:** Seeking blessing in acquired knowledge

## The Science Behind Spiritual Practices

### Stress Reduction
Regular du'a activates the parasympathetic nervous system, leading to:
- Reduced heart rate
- Lower blood pressure
- Decreased muscle tension
- Improved digestion

### Memory Enhancement
Spiritual practices have been shown to:
- Increase hippocampal volume
- Improve long-term memory formation
- Enhance recall ability
- Strengthen neural pathways

### Emotional Regulation
Du'a helps in:
- Balancing neurotransmitters
- Reducing negative emotions
- Increasing positive emotions
- Improving overall mental health

## Practical Implementation

### Creating a Du'a Routine
1. **Morning Du'a** (After Fajr):
   - Seek Allah's blessing for the day
   - Ask for beneficial knowledge
   - Request ease in understanding

2. **Study Session Du'a**:
   - Begin each study session with du'a
   - Ask for focus and concentration
   - Seek protection from distractions

3. **Evening Du'a** (Before Maghrib):
   - Thank Allah for the day's learning
   - Ask for retention of knowledge
   - Seek forgiveness for any shortcomings

### Combining Du'a with Study Techniques

#### Active Recall with Du'a
- Begin recall sessions with du'a
- Ask Allah for accurate memory
- Thank Allah after successful recall

#### Spaced Repetition with Spiritual Reflection
- Use du'a intervals between study sessions
- Reflect on Allah's creation while reviewing science
- Connect knowledge to Islamic principles

## Case Studies: Real Student Experiences

### Case Study 1: Fatima's Chemistry Success
Fatima struggled with organic chemistry until she started:
- Making du'a before each study session
- Connecting chemical processes to Allah's creation
- Maintaining regular prayers throughout study periods
**Result:** Improved from 45% to 85% in chemistry

### Case Study 2: Yusuf's Mathematics Breakthrough
Yusuf overcame his fear of mathematics through:
- Specific du'as for mathematical understanding
- Viewing numbers as signs of Allah's order
- Maintaining spiritual practices during exam period
**Result:** Achieved 92% in mathematics

## Common Misconceptions

### Myth 1: Du'a Replaces Hard Work
**Reality:** Du'a complements effort, not replaces it. Allah helps those who help themselves.

### Myth 2: Immediate Results Expected
**Reality:** Du'a works according to Allah's wisdom and timing, not our immediate expectations.

### Myth 3: Only Arabic Du'a Works
**Reality:** Du'a in any language is acceptable, though Arabic duas from Quran and Sunnah are preferred.

## Building a Sustainable Practice

### Weekly Schedule
- **Monday:** Focus on new learning du'as
- **Tuesday:** Revision and retention du'as
- **Wednesday:** Problem-solving du'as
- **Thursday:** Exam preparation du'as
- **Friday:** Gratitude and reflection du'as
- **Saturday:** Comprehensive review du'as
- **Sunday:** Rest and spiritual renewal

### Monthly Goals
- Memorize new du'as each month
- Track academic improvement
- Reflect on spiritual growth
- Share experiences with peers

## Integration with Modern Study Methods

### Technology and Du'a
- Use apps for du'a reminders
- Create digital du'a collections
- Set prayer alarms during study sessions
- Use Islamic study playlists

### Group Study with Spiritual Elements
- Begin group sessions with du'a
- Include spiritual discussions
- Support each other's spiritual growth
- Create accountability partnerships

## Measuring Success

### Academic Metrics
- Grade improvements
- Better understanding of concepts
- Improved exam performance
- Increased confidence

### Spiritual Metrics
- Stronger connection with Allah
- Better stress management
- Increased gratitude
- Enhanced character development

## Long-term Benefits

### Career Success
Students who maintain spiritual practices often show:
- Better leadership qualities
- Stronger ethical foundation
- Improved interpersonal skills
- Greater resilience in challenges

### Personal Development
- Enhanced self-awareness
- Better decision-making
- Stronger character
- Increased life satisfaction

## Conclusion

The integration of du'a into academic life is not just a religious practice but a scientifically supported method for enhancing learning and performance. By combining sincere supplication with dedicated effort, Muslim students can achieve both worldly success and spiritual growth.

Remember, du'a is not a magic formula but a means of seeking Allah's help while putting in sincere effort. The key is consistency, sincerity, and trust in Allah's wisdom.

May Allah grant success to all students who seek knowledge for His sake and for the benefit of humanity. Ameen.

## Resources for Further Learning

- Collection of student du'as
- Scientific studies on prayer and performance
- Islamic perspective on education
- Practical implementation guides

"And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose." (Quran 65:3)`,
    author: 'Dr. Khadijah Al-Ansari',
    category: 'Islamic Education',
    tags: ['Du\'a', 'Academic Success', 'Islamic Psychology', 'Spirituality', 'Student Life', 'Scientific Research', 'Islamic Studies'],
    publishedAt: '2024-01-05T09:00:00Z',
    updatedAt: '2024-01-05T09:00:00Z',
    status: 'published',
    featured: false,
    views: 1876,
    likes: 234,
    bookmarks: 156,
    seoTitle: 'The Power of Du\'a in Academic Success: Scientific Evidence and Islamic Perspective',
    seoDescription: 'Discover how du\'a enhances academic performance through scientific research and Islamic teachings. Complete guide for Muslim students seeking academic excellence.',
    seoKeywords: ['dua for students', 'Islamic study methods', 'academic success Islam', 'prayer and learning', 'Muslim student guidance', 'spiritual academic success', 'Islamic education psychology'],
    readTime: 18,
    reactions: {
      like: 234,
      heart: 189,
      thumbsUp: 156,
      celebrate: 45
    }
  }
];

let mockBlogComments: BlogComment[] = [
  {
    id: '1',
    postId: '1',
    author: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    content: 'This article beautifully explains the balance between spiritual and academic growth. The practical strategies are exactly what I needed for my JAMB preparation. JazakAllahu khair for sharing this comprehensive guide.',
    status: 'approved',
    likes: 12,
    replies: [
      {
        id: '1-1',
        postId: '1',
        parentId: '1',
        author: 'Dr. Amina Hassan',
        email: 'amina@muslimjambite.com',
        content: 'Wa iyyaki sister Fatima. I\'m glad you found the strategies helpful. May Allah grant you success in your JAMB preparation. Remember to stay consistent with your du\'a and studies.',
        status: 'approved',
        likes: 8,
        createdAt: '2024-01-16T10:30:00Z',
        updatedAt: '2024-01-16T10:30:00Z'
      }
    ],
    createdAt: '2024-01-16T09:30:00Z',
    updatedAt: '2024-01-16T09:30:00Z'
  },
  {
    id: '2',
    postId: '1',
    author: 'Muhammad Ali',
    email: 'ali@example.com',
    content: 'As a student preparing for JAMB, this perspective has completely changed how I approach my studies. The integration of Islamic principles with modern study techniques is brilliant. Barakallahu feeki for this valuable resource.',
    status: 'approved',
    likes: 18,
    replies: [],
    createdAt: '2024-01-16T15:45:00Z',
    updatedAt: '2024-01-16T15:45:00Z'
  },
  {
    id: '3',
    postId: '2',
    author: 'Aisha Mustapha',
    email: 'aisha@example.com',
    content: 'I achieved 359 in JAMB last year using similar strategies! The emphasis on maintaining prayers while studying is so important. Many students think they need to choose between deen and academic success, but this shows they complement each other perfectly.',
    status: 'approved',
    likes: 25,
    replies: [],
    createdAt: '2024-01-11T08:20:00Z',
    updatedAt: '2024-01-11T08:20:00Z'
  }
];

let mockBlogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'Islamic Education',
    slug: 'islamic-education',
    description: 'Comprehensive articles about Islamic approach to learning, education, and spiritual development for Muslim students.',
    color: '#10B981',
    postCount: 15,
    featured: true
  },
  {
    id: '2',
    name: 'JAMB Preparation',
    slug: 'jamb-preparation',
    description: 'Expert tips, strategies, and comprehensive guides for excelling in JAMB examinations while maintaining Islamic values.',
    color: '#3B82F6',
    postCount: 23,
    featured: true
  },
  {
    id: '3',
    name: 'Success Stories',
    slug: 'success-stories',
    description: 'Inspiring real-life stories from Muslim students who achieved academic excellence through faith and hard work.',
    color: '#F59E0B',
    postCount: 12,
    featured: true
  },
  {
    id: '4',
    name: 'Islamic Values',
    slug: 'islamic-values',
    description: 'Guidance on living as a Muslim student in modern times, balancing faith with academic and social life.',
    color: '#8B5CF6',
    postCount: 18,
    featured: false
  },
  {
    id: '5',
    name: 'Study Techniques',
    slug: 'study-techniques',
    description: 'Proven Islamic and modern study methods, time management, and productivity tips for Muslim students.',
    color: '#EF4444',
    postCount: 20,
    featured: false
  },
  {
    id: '6',
    name: 'Career Guidance',
    slug: 'career-guidance',
    description: 'Islamic perspective on career choices, professional development, and building a successful halal career.',
    color: '#06B6D4',
    postCount: 14,
    featured: false
  }
];

let mockSiteSettings: SiteSettings[] = [
  {
    id: '1',
    key: 'banner_enabled',
    value: 'true',
    description: 'Enable or disable the sticky FOMO banner',
    type: 'boolean',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    key: 'registration_enabled',
    value: 'true',
    description: 'Enable or disable the registration form',
    type: 'boolean',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    key: 'banner_text',
    value: 'Early Bird ends:',
    description: 'Text displayed on the banner',
    type: 'string',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    key: 'early_bird_price',
    value: '₦500',
    description: 'Early bird pricing display',
    type: 'string',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }
];

let mockStudents: Student[] = [];
let mockProspects: ProspectEntry[] = [];
let mockFAQs: FAQ[] = [];
let mockResources: Resource[] = [];

// Simulate API delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Enhanced BlogService with all required features
export const BlogService = {
  async getPosts(filters?: { 
    category?: string; 
    status?: string; 
    featured?: boolean; 
    search?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'newest' | 'oldest' | 'popular' | 'liked';
  }): Promise<BlogPost[]> {
    await delay(300);
    let filteredPosts = [...mockBlogPosts];
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.author.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters?.category) {
      filteredPosts = filteredPosts.filter(post => post.category === filters.category);
    }
    
    if (filters?.status) {
      filteredPosts = filteredPosts.filter(post => post.status === filters.status);
    }
    
    if (filters?.featured !== undefined) {
      filteredPosts = filteredPosts.filter(post => post.featured === filters.featured);
    }
    
    // Sort posts
    if (filters?.sortBy) {
      filteredPosts.sort((a, b) => {
        switch (filters.sortBy) {
          case 'newest':
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
          case 'oldest':
            return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
          case 'popular':
            return b.views - a.views;
          case 'liked':
            return (b.reactions?.like || 0) - (a.reactions?.like || 0);
          default:
            return 0;
        }
      });
    }
    
    // Apply pagination
    if (filters?.limit) {
      const offset = filters.offset || 0;
      filteredPosts = filteredPosts.slice(offset, offset + filters.limit);
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

  async getRelatedPosts(postId: string, limit: number = 4): Promise<BlogPost[]> {
    await delay(300);
    const post = mockBlogPosts.find(p => p.id === postId);
    if (!post) return [];
    
    return mockBlogPosts
      .filter(p => p.id !== postId && (
        p.category === post.category || 
        p.tags.some(tag => post.tags.includes(tag))
      ))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  async getPopularPosts(limit: number = 5): Promise<BlogPost[]> {
    await delay(300);
    return mockBlogPosts
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },

  async getTrendingPosts(limit: number = 5): Promise<BlogPost[]> {
    await delay(300);
    return mockBlogPosts
      .sort((a, b) => (b.reactions?.like || 0) - (a.reactions?.like || 0))
      .slice(0, limit);
  },

  async getFeaturedPosts(): Promise<BlogPost[]> {
    await delay(300);
    return mockBlogPosts.filter(post => post.featured);
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

  async reactToPost(id: string, reactionType: 'like' | 'heart' | 'thumbsUp' | 'celebrate'): Promise<void> {
    await delay(200);
    const post = mockBlogPosts.find(p => p.id === id);
    if (post) {
      if (!post.reactions) {
        post.reactions = { like: 0, heart: 0, thumbsUp: 0, celebrate: 0 };
      }
      post.reactions[reactionType] += 1;
    }
  },

  async bookmarkPost(id: string): Promise<void> {
    await delay(200);
    const post = mockBlogPosts.find(p => p.id === id);
    if (post) {
      post.bookmarks = (post.bookmarks || 0) + 1;
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

  async approveComment(id: string): Promise<boolean> {
    await delay(300);
    const comment = mockBlogComments.find(c => c.id === id);
    if (comment) {
      comment.status = 'approved';
      comment.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
  },

  async rejectComment(id: string): Promise<boolean> {
    await delay(300);
    const comment = mockBlogComments.find(c => c.id === id);
    if (comment) {
      comment.status = 'rejected';
      comment.updatedAt = new Date().toISOString();
      return true;
    }
    return false;
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
  },

  async searchPosts(query: string, filters?: {
    category?: string;
    tags?: string[];
    dateRange?: { from: string; to: string };
  }): Promise<BlogPost[]> {
    await delay(400);
    let results = mockBlogPosts;
    
    if (query) {
      const searchTerm = query.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.author.toLowerCase().includes(searchTerm)
      );
    }
    
    if (filters?.category) {
      results = results.filter(post => post.category === filters.category);
    }
    
    if (filters?.tags?.length) {
      results = results.filter(post => 
        post.tags.some(tag => filters.tags!.includes(tag))
      );
    }
    
    if (filters?.dateRange) {
      const { from, to } = filters.dateRange;
      results = results.filter(post => 
        post.publishedAt >= from && post.publishedAt <= to
      );
    }
    
    return results;
  }
};

// Site Settings Service
export const SiteSettingsService = {
  async getSettings(): Promise<SiteSettings[]> {
    await delay(300);
    return mockSiteSettings;
  },

  async getSetting(key: string): Promise<SiteSettings | null> {
    await delay(200);
    return mockSiteSettings.find(setting => setting.key === key) || null;
  },

  async updateSetting(key: string, value: string): Promise<SiteSettings | null> {
    await delay(500);
    const index = mockSiteSettings.findIndex(setting => setting.key === key);
    if (index === -1) return null;
    
    mockSiteSettings[index] = {
      ...mockSiteSettings[index],
      value,
      updatedAt: new Date().toISOString()
    };
    return mockSiteSettings[index];
  },

  async createSetting(setting: Omit<SiteSettings, 'id' | 'createdAt' | 'updatedAt'>): Promise<SiteSettings> {
    await delay(500);
    const newSetting: SiteSettings = {
      ...setting,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockSiteSettings.push(newSetting);
    return newSetting;
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
