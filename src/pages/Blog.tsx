
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { BlogSearch } from '../components/blog/BlogSearch';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { StickyFomoBanner } from '../components/ui/StickyFomoBanner';
import { BlogService } from '../lib/sdk';
import { type BlogPost } from '../types/sdk';
import { 
  Grid, 
  List, 
  Filter, 
  Search, 
  TrendingUp, 
  Clock, 
  Star, 
  BookOpen,
  ChevronDown,
  Loader2
} from 'lucide-react';

const BlogPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedPosts, setDisplayedPosts] = useState(6);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Posts', count: 0 },
    { id: 'Islamic Education', name: 'Islamic Education', count: 0 },
    { id: 'Academic Preparation', name: 'Academic Preparation', count: 0 },
    { id: 'Technology', name: 'Technology', count: 0 },
    { id: 'Career Development', name: 'Career Development', count: 0 },
    { id: 'Personal Development', name: 'Personal Development', count: 0 }
  ];

  // Sort options
  const sortOptions = [
    { id: 'newest', name: 'Newest First', icon: Clock },
    { id: 'oldest', name: 'Oldest First', icon: Clock },
    { id: 'popular', name: 'Most Popular', icon: TrendingUp },
    { id: 'featured', name: 'Featured', icon: Star }
  ];

  useEffect(() => {
    // Check theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const postsData = await BlogService.getPosts();
        setPosts(postsData);
        setFilteredPosts(postsData);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredPosts(filtered);
    setDisplayedPosts(6); // Reset displayed posts count
  }, [posts, searchQuery, selectedCategory, sortBy]);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayedPosts(prev => prev + 6);
      setLoadingMore(false);
    }, 500);
  };

  const getFeaturedPosts = () => {
    return posts.filter(post => post.featured).slice(0, 3);
  };

  const getLayoutClass = () => {
    switch (layout) {
      case 'list':
        return 'grid grid-cols-1 gap-6';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const visiblePosts = filteredPosts.slice(0, displayedPosts);
  const hasMorePosts = displayedPosts < filteredPosts.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StickyFomoBanner />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Islamic Knowledge Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover articles that blend traditional Islamic wisdom with modern educational insights, 
              helping you excel in both Deen and Dunya.
            </p>
          </div>

          {/* Featured Posts Slider */}
          {getFeaturedPosts().length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFeaturedPosts().map((post) => (
                  <BlogPostCard key={post.id} post={post} layout="grid" />
                ))}
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
              <div className="flex-1 max-w-lg">
                <BlogSearch onSearch={handleSearch} />
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Layout Toggle */}
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1">
                  <Button
                    variant={layout === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={layout === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={layout === 'masonry' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setLayout('masonry')}
                  >
                    <BookOpen className="w-4 h-4" />
                  </Button>
                </div>

                {/* Filters Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2"
                >
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Filters Panel */}
            {showFilters && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Badge
                          key={category.id}
                          variant={selectedCategory === category.id ? 'default' : 'outline'}
                          className="cursor-pointer hover:bg-brand-primary hover:text-white"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Sort Options */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sort By</h3>
                    <div className="flex flex-wrap gap-2">
                      {sortOptions.map((option) => (
                        <Button
                          key={option.id}
                          variant={sortBy === option.id ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setSortBy(option.id)}
                          className="flex items-center space-x-2"
                        >
                          <option.icon className="w-4 h-4" />
                          <span>{option.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Posts Results */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'All Posts'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing {visiblePosts.length} of {filteredPosts.length} posts
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading posts...</p>
                </div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your search query or filters
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSortBy('newest');
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className={getLayoutClass()}>
                  {visiblePosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} layout={layout} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePosts && (
                  <div className="text-center mt-12">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="flex items-center space-x-2"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Loading...</span>
                        </>
                      ) : (
                        <>
                          <BookOpen className="w-4 h-4" />
                          <span>Load More Posts</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Islamic Knowledge</h3>
            <p className="text-lg mb-6 opacity-90">
              Subscribe to our newsletter for the latest articles, study tips, and Islamic educational content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-brand-primary"
              />
              <Button variant="secondary" className="bg-white text-brand-primary hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
