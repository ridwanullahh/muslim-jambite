
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { BlogService, BlogPost, BlogCategory } from '../lib/sdk';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2,
  BookOpen,
  User,
  ArrowRight
} from 'lucide-react';

const Blog = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [displayCount, setDisplayCount] = useState(9);

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [postsData, categoriesData] = await Promise.all([
        BlogService.getPosts({ status: 'published' }),
        BlogService.getCategories()
      ]);
      
      setPosts(postsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const filteredPosts = posts
    .filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(post => selectedCategory ? post.category === selectedCategory : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return b.views - a.views;
        case 'liked':
          return b.likes - a.likes;
        default:
          return 0;
      }
    });

  const displayedPosts = filteredPosts.slice(0, displayCount);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-primary to-brand-accent text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Islamic Knowledge Hub
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover insights, guidance, and inspiration to strengthen your Deen and excel in your studies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{posts.length} Articles</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Expert Authors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Updated Daily</span>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-full"
                />
              </div>
              
              <div className="flex items-center gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="popular">Most Popular</option>
                  <option value="liked">Most Liked</option>
                </select>

                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <Button
                    variant={layout === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={layout === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('list')}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {displayedPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <>
                <div className={`grid gap-8 ${
                  layout === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {displayedPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" style={{ backgroundColor: categories.find(c => c.name === post.category)?.color + '20' }}>
                            {post.category}
                          </Badge>
                          {post.featured && (
                            <Badge variant="default">Featured</Badge>
                          )}
                        </div>
                        <CardTitle className="line-clamp-2 hover:text-brand-primary transition-colors">
                          <a href={`/blog/${post.slug}`}>
                            {post.title}
                          </a>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{calculateReadTime(post.content)} min read</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                              <User className="w-4 h-4 text-brand-primary" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {post.author}
                            </span>
                          </div>
                          <a 
                            href={`/blog/${post.slug}`}
                            className="flex items-center space-x-1 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
                          >
                            <span>Read More</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredPosts.length > displayCount && (
                  <div className="text-center mt-12">
                    <Button
                      onClick={() => setDisplayCount(prev => prev + 9)}
                      variant="outline"
                      size="lg"
                    >
                      Load More Articles
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
