import { useState, useEffect } from 'react';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogPostMeta } from '@/components/blog/BlogPostMeta';
import { BlogService } from '../lib/sdk';
import { BlogPost, BlogCategory } from '../types/sdk';
import { Search, Grid3X3, List, LayoutGrid } from 'lucide-react';

export const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [layout, setLayout] = useState<'grid' | 'list' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular' | 'liked'>('newest');

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [postsData, categoriesData] = await Promise.all([
          BlogService.getPosts(),
          BlogService.getCategories()
        ]);
        setPosts(postsData);
        setFilteredPosts(postsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterAndSortPosts(query, selectedCategory, sortBy);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterAndSortPosts(searchQuery, category, sortBy);
  };

  const handleSortChange = (sort: 'newest' | 'oldest' | 'popular' | 'liked') => {
    setSortBy(sort);
    filterAndSortPosts(searchQuery, selectedCategory, sort);
  };

  const filterAndSortPosts = (query: string, category: string, sort: string) => {
    let filtered = [...posts];

    // Filter by search query
    if (query) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.content.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'liked':
          return (b.likes || 0) - (a.likes || 0);
        case 'newest':
        default:
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      }
    });

    setFilteredPosts(filtered);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <BlogPostMeta
          title="Blog - MuslimJambite"
          description="Discover insightful articles about Islamic education, academic preparation, and technology for Muslim students."
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-8 w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <BlogPostMeta
        title="Blog - MuslimJambite"
        description="Discover insightful articles about Islamic education, academic preparation, and technology for Muslim students."
      />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-primary to-brand-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Islamic Knowledge Hub
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Empowering Muslim students with knowledge that bridges Deen and Dunya
          </p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogSearch 
            onSearch={handleSearch}
            categories={categories}
            className="mb-6"
          />
          
          {/* Quick Filters and Layout Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Quick Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === '' 
                    ? 'bg-brand-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-brand-primary hover:text-white'
                }`}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.name 
                      ? 'bg-brand-primary text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-brand-primary hover:text-white'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Layout and Sort Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
                <option value="liked">Most Liked</option>
              </select>

              {/* Layout Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setLayout('grid')}
                  className={`p-2 rounded ${layout === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('list')}
                  className={`p-2 rounded ${layout === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLayout('masonry')}
                  className={`p-2 rounded ${layout === 'masonry' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No articles found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters.
              </p>
            </div>
          ) : (
            <>
              {/* Results Summary */}
              <div className="mb-8">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory && ` in ${selectedCategory}`}
                </p>
              </div>

              {/* Posts Grid/List */}
              <div className={
                layout === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                  : layout === 'list'
                    ? 'space-y-8'
                    : 'columns-1 md:columns-2 lg:columns-3 gap-8'
              }>
                {filteredPosts.map((post) => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    layout={layout}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};
