
import { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { BlogService, BlogPost, BlogCategory } from '../lib/sdk';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { BlogPostCard } from '../components/blog/BlogPostCard';
import { BlogSearch } from '../components/blog/BlogSearch';
import { StickyFomoBanner } from '../components/ui/StickyFomoBanner';
import { 
  Grid, 
  List, 
  BookOpen,
  TrendingUp,
  Star,
  Filter,
  SortAsc,
  Calendar,
  Eye,
  Heart,
  MessageSquare,
  Share2,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Blog = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const postsPerPage = 9;

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
      setLoading(true);
      const [postsData, categoriesData, featuredData, popularData, trendingData] = await Promise.all([
        BlogService.getPosts({ 
          status: 'published',
          limit: postsPerPage,
          offset: 0,
          sortBy: 'newest'
        }),
        BlogService.getCategories(),
        BlogService.getFeaturedPosts(),
        BlogService.getPopularPosts(),
        BlogService.getTrendingPosts()
      ]);
      
      setPosts(postsData);
      setCategories(categoriesData);
      setFeaturedPosts(featuredData);
      setPopularPosts(popularData);
      setTrendingPosts(trendingData);
      setTotalPages(Math.ceil(50 / postsPerPage)); // Assuming 50 total posts
      setHasMore(postsData.length === postsPerPage);
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

  const handleSearch = async (query: string, filters: any) => {
    try {
      setLoading(true);
      const results = await BlogService.searchPosts(query, {
        category: filters.category || undefined,
        tags: filters.tags.length > 0 ? filters.tags : undefined
      });
      setPosts(results);
      setSearchQuery(query);
      setSelectedCategory(filters.category);
      setSortBy(filters.sortBy);
      setCurrentPage(1);
      setHasMore(false);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMorePosts = async () => {
    if (!hasMore || loading) return;
    
    try {
      const nextPage = currentPage + 1;
      const morePosts = await BlogService.getPosts({
        status: 'published',
        limit: postsPerPage,
        offset: (nextPage - 1) * postsPerPage,
        sortBy: sortBy as any,
        category: selectedCategory || undefined,
        search: searchQuery || undefined
      });
      
      setPosts(prevPosts => [...prevPosts, ...morePosts]);
      setCurrentPage(nextPage);
      setHasMore(morePosts.length === postsPerPage);
    } catch (error) {
      console.error('Failed to load more posts:', error);
    }
  };

  const handlePostReaction = async (postId: string, type: 'like' | 'heart' | 'thumbsUp' | 'celebrate') => {
    try {
      await BlogService.reactToPost(postId, type);
      // Update local state
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { 
                ...post, 
                reactions: { 
                  ...post.reactions, 
                  [type]: (post.reactions?.[type] || 0) + 1 
                } 
              }
            : post
        )
      );
    } catch (error) {
      console.error('Failed to react to post:', error);
    }
  };

  const handlePostBookmark = async (postId: string) => {
    try {
      await BlogService.bookmarkPost(postId);
      // Update local state
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post.id === postId 
            ? { ...post, bookmarks: (post.bookmarks || 0) + 1 }
            : post
        )
      );
    } catch (error) {
      console.error('Failed to bookmark post:', error);
    }
  };

  const handlePostShare = (post: BlogPost) => {
    // This would be handled by the BlogPostCard component
    console.log('Share post:', post.title);
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <StickyFomoBanner />
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="pt-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <StickyFomoBanner />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pt-32">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-primary to-brand-accent text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
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
                  <TrendingUp className="w-4 h-4" />
                  <span>Updated Daily</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4" />
                  <span>Expert Authors</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Slider */}
        {featuredPosts.length > 0 && (
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Featured Articles
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredPosts.slice(0, 3).map((post) => (
                  <BlogPostCard
                    key={post.id}
                    post={post}
                    onReact={handlePostReaction}
                    onBookmark={handlePostBookmark}
                    onShare={handlePostShare}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter Section */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BlogSearch 
              onSearch={handleSearch}
              categories={categories}
              className="mb-6"
            />
            
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {posts.length} articles found
                </span>
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <span>Search: {searchQuery}</span>
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-4">
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

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Posts Area */}
              <div className="lg:col-span-3">
                {posts.length === 0 ? (
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
                        ? 'grid-cols-1 md:grid-cols-2' 
                        : 'grid-cols-1'
                    }`}>
                      {posts.map((post) => (
                        <BlogPostCard
                          key={post.id}
                          post={post}
                          layout={layout}
                          onReact={handlePostReaction}
                          onBookmark={handlePostBookmark}
                          onShare={handlePostShare}
                        />
                      ))}
                    </div>

                    {hasMore && (
                      <div className="text-center mt-12">
                        <Button
                          onClick={loadMorePosts}
                          variant="outline"
                          size="lg"
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Load More Articles'}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-8">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleSearch('', { 
                          query: '', 
                          category: category.name, 
                          tags: [], 
                          sortBy: 'newest' 
                        })}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.name
                            ? 'bg-brand-primary text-white'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.postCount}
                        </Badge>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Popular Posts */}
                {popularPosts.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Popular Posts
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {popularPosts.slice(0, 5).map((post) => (
                        <div key={post.id} className="group">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-brand-primary transition-colors">
                            <a href={`/blog/${post.slug}`}>{post.title}</a>
                          </h4>
                          <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-3 h-3" />
                              <span>{post.reactions?.heart || 0}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                {/* Newsletter Signup */}
                <Card className="bg-brand-primary text-white">
                  <CardHeader>
                    <CardTitle>Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">
                      Get the latest Islamic knowledge and educational content delivered to your inbox.
                    </p>
                    <div className="space-y-2">
                      <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full px-3 py-2 bg-white text-black rounded-md text-sm"
                      />
                      <Button variant="secondary" size="sm" className="w-full">
                        Subscribe
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Blog;
