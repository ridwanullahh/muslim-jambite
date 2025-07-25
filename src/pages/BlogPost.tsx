
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { BlogService, BlogPost, BlogComment } from '../lib/sdk';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  MessageSquare,
  Share2,
  Bookmark,
  Play,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Star,
  Search,
  Menu,
  X,
  Facebook,
  Twitter,
  Linkedin,
  Send,
  Copy,
  User,
  Reply,
  MoreHorizontal,
  Volume2,
  VolumeX,
  ArrowUp,
  CheckCircle,
  AlertCircle,
  Hash,
  BookOpen,
  TrendingUp,
  Mail,
  Bell,
  Filter,
  SortDesc,
  MapPin,
  BarChart
} from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReaction, setSelectedReaction] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    if (slug) {
      loadPost();
    }
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    try {
      setLoading(true);
      const postData = await BlogService.getPostBySlug(slug!);
      setPost(postData);
      
      // Load comments
      const commentsData = await BlogService.getComments(postData.id);
      setComments(commentsData);
      
      // Load related posts
      const relatedData = await BlogService.getRelatedPosts(postData.id);
      setRelatedPosts(relatedData);
      
      // Load popular posts
      const popularData = await BlogService.getPopularPosts();
      setPopularPosts(popularData);
      
      // Update views
      await BlogService.updatePostViews(postData.id);
    } catch (error) {
      console.error('Failed to load post:', error);
      navigate('/blog');
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

  const handleLike = async () => {
    if (!post) return;
    try {
      await BlogService.likePost(post.id);
      setIsLiked(!isLiked);
      setPost(prev => prev ? { ...prev, likes: prev.likes + (isLiked ? -1 : 1) } : null);
    } catch (error) {
      console.error('Failed to like post:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage or user profile
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const filtered = bookmarks.filter((id: string) => id !== post?.id);
      localStorage.setItem('bookmarks', JSON.stringify(filtered));
    } else {
      bookmarks.push(post?.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  const handleShare = (platform: string) => {
    if (!post) return;
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !newComment.content.trim()) return;

    try {
      await BlogService.addComment({
        postId: post.id,
        author: newComment.author,
        email: newComment.email,
        content: newComment.content,
        status: 'pending',
        likes: 0,
        parentId: replyTo
      });
      
      setNewComment({ author: '', email: '', content: '' });
      setReplyTo(null);
      // Reload comments
      const commentsData = await BlogService.getComments(post.id);
      setComments(commentsData);
    } catch (error) {
      console.error('Failed to add comment:', error);
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

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    
    try {
      // Add newsletter signup logic here
      alert('Thank you for subscribing to our newsletter!');
      setNewsletterEmail('');
      setShowNewsletter(false);
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const generateTableOfContents = () => {
    if (!post) return [];
    
    const headings = post.content.match(/#{1,6}[^\n]+/g) || [];
    return headings.map((heading, index) => ({
      id: `heading-${index}`,
      text: heading.replace(/#{1,6}\s/, ''),
      level: heading.match(/^#{1,6}/)?.[0].length || 1
    }));
  };

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

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The article you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  const tableOfContents = generateTableOfContents();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <div 
          className="h-full bg-brand-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <button onClick={() => navigate('/')} className="text-brand-primary hover:text-brand-primary/80">
                Home
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <button onClick={() => navigate('/blog')} className="text-brand-primary hover:text-brand-primary/80">
                Blog
              </button>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400 truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                {/* Article Header */}
                <div className="p-8 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge variant="secondary" className="bg-brand-primary/10 text-brand-primary">
                      {post.category}
                    </Badge>
                    {post.featured && (
                      <Badge variant="default">Featured</Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    {post.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{calculateReadTime(post.content)} min read</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageSquare className="w-4 h-4" />
                          <span>{comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none dark:prose-invert prose-brand">
                    {post.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="p-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                        className="flex items-center space-x-2"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </Button>
                      
                      <Button
                        variant={isBookmarked ? "default" : "outline"}
                        size="sm"
                        onClick={handleBookmark}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTextToSpeech}
                      >
                        {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                    </div>
                    
                    <div className="relative">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowShareMenu(!showShareMenu)}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      
                      {showShareMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          <div className="p-2 space-y-1">
                            <button
                              onClick={() => handleShare('facebook')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Facebook className="w-4 h-4" />
                              <span>Facebook</span>
                            </button>
                            <button
                              onClick={() => handleShare('twitter')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Twitter className="w-4 h-4" />
                              <span>Twitter</span>
                            </button>
                            <button
                              onClick={() => handleShare('linkedin')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Linkedin className="w-4 h-4" />
                              <span>LinkedIn</span>
                            </button>
                            <button
                              onClick={() => handleShare('whatsapp')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Send className="w-4 h-4" />
                              <span>WhatsApp</span>
                            </button>
                            <button
                              onClick={() => handleShare('telegram')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Send className="w-4 h-4" />
                              <span>Telegram</span>
                            </button>
                            <button
                              onClick={() => handleShare('copy')}
                              className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            >
                              <Copy className="w-4 h-4" />
                              <span>Copy Link</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>

              {/* Comments Section */}
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Comments ({comments.length})
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowComments(!showComments)}
                  >
                    {showComments ? 'Hide' : 'Show'} Comments
                  </Button>
                </div>
                
                {showComments && (
                  <div className="space-y-6">
                    {/* Add Comment Form */}
                    <form onSubmit={handleAddComment} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          placeholder="Your name"
                          value={newComment.author}
                          onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                          required
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={newComment.email}
                          onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                      <textarea
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                        rows={4}
                        placeholder="Write your comment..."
                        value={newComment.content}
                        onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                        required
                      />
                      <Button type="submit" className="w-full md:w-auto">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Post Comment
                      </Button>
                    </form>
                    
                    <Separator />
                    
                    {/* Comments List */}
                    <div className="space-y-4">
                      {comments.filter(comment => comment.status === 'approved').map((comment) => (
                        <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-brand-primary" />
                              </div>
                              <span className="font-medium text-gray-900 dark:text-white">
                                {comment.author}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatDate(comment.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="ml-1">{comment.likes}</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Reply className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            {comment.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Related Articles
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedPosts.slice(0, 4).map((relatedPost) => (
                      <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow duration-300">
                        <CardHeader className="pb-3">
                          <Badge variant="secondary" className="w-fit mb-2">
                            {relatedPost.category}
                          </Badge>
                          <CardTitle className="text-lg line-clamp-2">
                            <button
                              onClick={() => navigate(`/blog/${relatedPost.slug}`)}
                              className="text-left hover:text-brand-primary transition-colors"
                            >
                              {relatedPost.title}
                            </button>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-3">
                            {relatedPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>{formatDate(relatedPost.publishedAt)}</span>
                            <div className="flex items-center space-x-3">
                              <span className="flex items-center space-x-1">
                                <Eye className="w-3 h-3" />
                                <span>{relatedPost.views}</span>
                              </span>
                              <span className="flex items-center space-x-1">
                                <Heart className="w-3 h-3" />
                                <span>{relatedPost.likes}</span>
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Table of Contents */}
              {tableOfContents.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white">Table of Contents</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowTOC(!showTOC)}
                    >
                      {showTOC ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                    </Button>
                  </div>
                  {showTOC && (
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <button
                          key={item.id}
                          className={`block w-full text-left text-sm hover:text-brand-primary transition-colors ${
                            item.level === 1 ? 'font-medium' : 'pl-4 text-gray-600 dark:text-gray-400'
                          }`}
                          onClick={() => {
                            const element = document.getElementById(item.id);
                            element?.scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {item.text}
                        </button>
                      ))}
                    </nav>
                  )}
                </div>
              )}

              {/* Search */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Search Blog</h4>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Popular Posts */}
              {popularPosts.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Popular Posts
                  </h4>
                  <div className="space-y-4">
                    {popularPosts.slice(0, 5).map((popularPost) => (
                      <button
                        key={popularPost.id}
                        onClick={() => navigate(`/blog/${popularPost.slug}`)}
                        className="block w-full text-left group"
                      >
                        <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                          {popularPost.title}
                        </h5>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>{formatDate(popularPost.publishedAt)}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{popularPost.views}</span>
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-r from-brand-primary to-brand-accent text-white rounded-2xl p-6">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Stay Updated
                </h4>
                <p className="text-sm mb-4 opacity-90">
                  Get the latest Islamic insights and JAMB prep tips delivered to your inbox.
                </p>
                <form onSubmit={handleNewsletterSignup} className="space-y-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    required
                  />
                  <Button type="submit" variant="secondary" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
