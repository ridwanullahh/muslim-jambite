
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navigation } from '../components/Navigation';
import { BlogService, BlogPost as BlogPostType, BlogComment } from '../lib/sdk';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  User, 
  MessageCircle,
  BookOpen,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  WhatsApp,
  Send
} from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [darkMode, setDarkMode] = useState(false);
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const [commentForm, setCommentForm] = useState({
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

    if (slug) {
      loadPost();
    }

    // Track reading progress
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (article) {
        const scrollTop = window.scrollY;
        const docHeight = article.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  const loadPost = async () => {
    try {
      if (!slug) return;
      
      const postData = await BlogService.getPostBySlug(slug);
      if (postData) {
        setPost(postData);
        
        // Load comments
        const commentsData = await BlogService.getCommentsByPostId(postData.id!);
        setComments(commentsData);
        
        // Load related posts
        const allPosts = await BlogService.getPosts({ 
          status: 'published',
          category: postData.category 
        });
        setRelatedPosts(allPosts.filter(p => p.id !== postData.id).slice(0, 3));
      }
    } catch (error) {
      console.error('Failed to load post:', error);
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Implement like functionality
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage or backend
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const updated = bookmarks.filter((id: string) => id !== post?.id);
      localStorage.setItem('bookmarks', JSON.stringify(updated));
    } else {
      bookmarks.push(post?.id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  const handleTextToSpeech = () => {
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(post?.content || '');
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    try {
      await BlogService.addComment({
        postId: post.id!,
        author: commentForm.author,
        email: commentForm.email,
        content: commentForm.content
      });
      
      setCommentForm({ author: '', email: '', content: '' });
      alert('Comment submitted for approval!');
    } catch (error) {
      console.error('Failed to submit comment:', error);
      alert('Failed to submit comment. Please try again.');
    }
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
          <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 h-1 bg-gray-200 dark:bg-gray-700">
        <div 
          className="h-full bg-brand-primary transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
            <a href="/" className="hover:text-brand-primary">Home</a>
            <ChevronRight className="w-4 h-4" />
            <a href="/blog" className="hover:text-brand-primary">Blog</a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 dark:text-white">{post.title}</span>
          </nav>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary" style={{ backgroundColor: post.category + '20' }}>
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="default">Featured</Badge>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
            </div>
          </header>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-4">
              <Button
                variant={isLiked ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center space-x-2"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes + (isLiked ? 1 : 0)}</span>
              </Button>
              
              <Button
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
                onClick={handleBookmark}
                className="flex items-center space-x-2"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleTextToSpeech}
                className="flex items-center space-x-2"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
              <Button variant="ghost" size="sm" onClick={() => handleShare('facebook')}>
                <Facebook className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('twitter')}>
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('linkedin')}>
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('whatsapp')}>
                <WhatsApp className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleShare('copy')}>
                <LinkIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Post Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-12">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Comments Section */}
          <section className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Comments ({comments.length})
            </h3>
            
            {/* Comment Form */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Leave a Comment</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <Input
                        value={commentForm.author}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input
                        type="email"
                        value={commentForm.email}
                        onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Comment</label>
                    <Textarea
                      rows={4}
                      value={commentForm.content}
                      onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="flex items-center space-x-2">
                    <Send className="w-4 h-4" />
                    <span>Submit Comment</span>
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map(comment => (
                <Card key={comment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-brand-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {comment.author}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(relatedPost => (
                  <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        <a href={`/blog/${relatedPost.slug}`} className="hover:text-brand-primary">
                          {relatedPost.title}
                        </a>
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <span>{new Date(relatedPost.publishedAt).toLocaleDateString()}</span>
                        <span>{relatedPost.readTime} min read</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </article>
      </main>
    </div>
  );
};

export default BlogPost;
