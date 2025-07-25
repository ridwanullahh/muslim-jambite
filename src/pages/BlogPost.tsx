
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { type BlogPost, type BlogComment } from '../types/sdk';
import { BlogService } from '../lib/sdk';
import { BlogPostMeta } from '../components/blog/BlogPostMeta';
import { BlogTableOfContents } from '../components/blog/BlogTableOfContents';
import { BlogSocialShare } from '../components/blog/BlogSocialShare';
import { StickyFomoBanner } from '../components/ui/StickyFomoBanner';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Eye, 
  Heart, 
  MessageSquare, 
  Share2, 
  Tag, 
  ThumbsUp, 
  Send, 
  BookOpen, 
  Star,
  Clock,
  Bookmark,
  Volume2,
  Play,
  Pause,
  ChevronRight,
  Home,
  TrendingUp,
  Coffee,
  Award,
  CheckCircle,
  Mail,
  Bell,
  Settings,
  BarChart3
} from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

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
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = await BlogService.getPostBySlug(slug);
        if (postData) {
          setPost(postData);
          
          // Load comments and related posts
          const [commentsData, relatedData] = await Promise.all([
            BlogService.getComments(postData.id),
            BlogService.getRelatedPosts(postData.id)
          ]);
          
          setComments(commentsData);
          setRelatedPosts(relatedData);
          
          // Update view count
          await BlogService.updatePostViews(postData.id);
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  useEffect(() => {
    // Reading progress tracking
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      const commentData = {
        postId: post.id,
        ...newComment,
        status: 'pending' as const,
        likes: 0
      };

      await BlogService.addComment(commentData);
      
      // Refresh comments
      const updatedComments = await BlogService.getComments(post.id);
      setComments(updatedComments);
      
      // Reset form
      setNewComment({ author: '', email: '', content: '' });
      
      alert('Comment submitted successfully! It will be reviewed before being published.');
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    }
  };

  const handleReaction = async (type: 'like' | 'heart' | 'thumbsUp' | 'celebrate') => {
    if (!post) return;
    
    try {
      await BlogService.reactToPost(post.id, type);
      setPost(prev => prev ? { 
        ...prev, 
        reactions: { 
          ...prev.reactions, 
          [type]: (prev.reactions?.[type] || 0) + 1 
        } 
      } : null);
    } catch (error) {
      console.error('Error reacting to post:', error);
    }
  };

  const handleBookmark = async () => {
    if (!post) return;
    
    try {
      await BlogService.bookmarkPost(post.id);
      setIsBookmarked(!isBookmarked);
      setPost(prev => prev ? { 
        ...prev, 
        bookmarks: (prev.bookmarks || 0) + 1 
      } : null);
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const handleTextToSpeech = () => {
    if (!post) return;
    
    if (isReading) {
      speechSynthesis.cancel();
      setIsReading(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(post.content);
      utterance.onend = () => setIsReading(false);
      speechSynthesis.speak(utterance);
      setIsReading(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <StickyFomoBanner />
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <StickyFomoBanner />
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="pt-32 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StickyFomoBanner />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* SEO Meta Tags */}
      <BlogPostMeta post={post} />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-brand-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div className="bg-white dark:bg-gray-800 shadow-sm pt-32 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-brand-primary flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-brand-primary">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">{post.category}</span>
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author}
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {post.readTime || 5} min read
                </div>
                <span>•</span>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} views
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleTextToSpeech}
                  className="flex items-center space-x-1"
                >
                  {isReading ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span>{isReading ? 'Stop' : 'Listen'}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBookmark}
                  className={`flex items-center space-x-1 ${isBookmarked ? 'text-yellow-600' : ''}`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span>{post.bookmarks || 0}</span>
                </Button>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="bg-brand-primary/10 text-brand-primary border-brand-primary">
                  {post.category}
                </Badge>
                {post.featured && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="flex items-center space-x-2">
                  {post.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={() => handleReaction('heart')}>
                  <Heart className="w-4 h-4 mr-1" />
                  {post.reactions?.heart || 0}
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleReaction('thumbsUp')}>
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {post.reactions?.thumbsUp || 0}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-8 py-6">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-6 font-medium leading-relaxed">
                {post.excerpt}
              </p>
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Article Actions */}
          <div className="px-8 py-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">Was this article helpful?</span>
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReaction('thumbsUp')}
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReaction('heart')}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleReaction('celebrate')}
                  >
                    <Award className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>Last updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Sharing */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <BlogSocialShare post={post} />
        </div>

        {/* Author Info */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-brand-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{post.author}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Islamic education expert and writer
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-8 bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-lg p-6">
          <div className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-semibold mb-2">Stay Updated with Islamic Knowledge</h3>
            <p className="mb-4 opacity-90">
              Get the latest articles and educational content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md text-black"
              />
              <Button variant="secondary" className="bg-white text-brand-primary hover:bg-gray-100">
                <Bell className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              Comments ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={newComment.author}
                    onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                <textarea
                  value={newComment.content}
                  onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              <Button type="submit">
                <Send className="w-4 h-4 mr-2" />
                Submit Comment
              </Button>
            </form>
          </div>

          {/* Comments List */}
          <div className="px-8 py-6">
            {comments.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No comments yet. Be the first to comment!
              </p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'}>
                          {comment.status === 'approved' ? <CheckCircle className="w-3 h-3 mr-1" /> : null}
                          {comment.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                    
                    {/* Nested Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-8 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-3 h-3 text-brand-primary" />
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white text-sm">{reply.author}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Related Posts
              </h2>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-brand-primary mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>{relatedPost.author}</span>
                        <div className="flex items-center space-x-2">
                          <span>{relatedPost.views} views</span>
                          <span>•</span>
                          <span>{relatedPost.reactions?.heart || 0} likes</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Floating Components */}
      <BlogTableOfContents content={post.content} isFloating={true} />
      <BlogSocialShare post={post} variant="floating" />
    </div>
  );
};

export default BlogPostPage;
