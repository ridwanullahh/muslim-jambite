
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Heart,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Copy,
  ThumbsUp,
  Volume2,
  Bookmark,
  ChevronRight,
  Search,
  TrendingUp,
  Eye,
  BarChart3,
  Bell,
  Play,
  Pause,
  ArrowUp,
  List,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UniversalSDK } from '@/types/sdk';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: number;
  views: number;
  likes: number;
  status: 'published' | 'draft';
}

interface BlogComment {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  status: 'approved' | 'pending' | 'rejected';
  likes: number;
  createdAt: string;
}

export const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTOC, setShowTOC] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  
  const [commentForm, setCommentForm] = useState({
    author: '',
    email: '',
    content: ''
  });

  const sdk = new UniversalSDK({
    owner: 'your-github-username',
    repo: 'your-repo-name',
    token: 'your-github-token',
    branch: 'main'
  });

  useEffect(() => {
    loadPost();
    loadComments();
    loadRelatedPosts();
    loadPopularPosts();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setReadingProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadPost = async () => {
    try {
      const posts = await sdk.get<BlogPost>('blog-posts');
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
        // Increment view count
        await sdk.update('blog-posts', id!, { views: foundPost.views + 1 });
      }
    } catch (error) {
      console.error('Error loading post:', error);
    }
  };

  const loadComments = async () => {
    try {
      const allComments = await sdk.get<BlogComment>('blog-comments');
      const postComments = allComments.filter(c => c.postId === id && c.status === 'approved');
      setComments(postComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const loadRelatedPosts = async () => {
    try {
      const posts = await sdk.get<BlogPost>('blog-posts');
      const related = posts
        .filter(p => p.id !== id && p.status === 'published')
        .slice(0, 3);
      setRelatedPosts(related);
    } catch (error) {
      console.error('Error loading related posts:', error);
    }
  };

  const loadPopularPosts = async () => {
    try {
      const posts = await sdk.get<BlogPost>('blog-posts');
      const popular = posts
        .filter(p => p.status === 'published')
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
      setPopularPosts(popular);
    } catch (error) {
      console.error('Error loading popular posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    try {
      const newLikes = isLiked ? post.likes - 1 : post.likes + 1;
      await sdk.update('blog-posts', post.id, { likes: newLikes });
      setPost({ ...post, likes: newLikes });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Save to localStorage or user preferences
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    if (isBookmarked) {
      const filtered = bookmarks.filter((b: string) => b !== id);
      localStorage.setItem('bookmarks', JSON.stringify(filtered));
    } else {
      bookmarks.push(id);
      localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
  };

  const handleShare = async (platform: string) => {
    if (!post) return;
    
    const url = window.location.href;
    const text = `${post.title} - ${post.excerpt}`;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };

    if (platform === 'copy') {
      await navigator.clipboard.writeText(url);
      // Show toast notification
      return;
    }

    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentForm.author || !commentForm.email || !commentForm.content) return;

    try {
      await sdk.insert('blog-comments', {
        postId: post.id,
        author: commentForm.author,
        email: commentForm.email,
        content: commentForm.content,
        status: 'pending',
        likes: 0
      });
      
      setCommentForm({ author: '', email: '', content: '' });
      setShowCommentForm(false);
      // Show success message
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const toggleTextToSpeech = () => {
    if (!post) return;
    
    if (isPlaying) {
      speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(post.content);
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">The blog post you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-green-500 z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 space-y-3 z-40">
        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          size="icon"
          className="rounded-full bg-green-600 hover:bg-green-700"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={() => setShowTOC(!showTOC)}
          size="icon"
          className="rounded-full bg-blue-600 hover:bg-blue-700"
        >
          <List className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={toggleTextToSpeech}
          size="icon"
          className="rounded-full bg-purple-600 hover:bg-purple-700"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <span>Blog</span>
          <ChevronRight className="w-4 h-4" />
          <span>{post.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-white">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            {post.tags.map(tag => (
              <span key={tag} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.publishDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>{post.views} views</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleLike}
                variant={isLiked ? "default" : "outline"}
                size="sm"
                className="flex items-center space-x-2"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </Button>
              
              <Button
                onClick={handleBookmark}
                variant={isBookmarked ? "default" : "outline"}
                size="sm"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              
              <Button
                onClick={toggleTextToSpeech}
                variant="outline"
                size="sm"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {/* Social Share */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share this article</h3>
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => handleShare('facebook')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Facebook className="w-4 h-4" />
                <span>Facebook</span>
              </Button>
              
              <Button
                onClick={() => handleShare('twitter')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Twitter</span>
              </Button>
              
              <Button
                onClick={() => handleShare('whatsapp')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
              
              <Button
                onClick={() => handleShare('telegram')}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </Button>
              
              <Button
                onClick={() => handleShare('copy')}
                variant="outline"
                size="sm"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Comments ({comments.length})
            </h3>
            <Button
              onClick={() => setShowCommentForm(!showCommentForm)}
              className="flex items-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Add Comment</span>
            </Button>
          </div>

          {showCommentForm && (
            <form onSubmit={handleCommentSubmit} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="author">Name *</Label>
                  <Input
                    id="author"
                    value={commentForm.author}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, author: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={commentForm.email}
                    onChange={(e) => setCommentForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <Label htmlFor="content">Comment *</Label>
                <textarea
                  id="content"
                  value={commentForm.content}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCommentForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Comment</Button>
              </div>
            </form>
          )}

          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{comment.author}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{comment.likes}</span>
                  </Button>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {relatedPost.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {relatedPost.readTime} min read
                    </span>
                    <Button variant="ghost" size="sm">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hidden lg:block">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Popular Posts</h4>
        <div className="space-y-3">
          {popularPosts.map(popularPost => (
            <div key={popularPost.id} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h5 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                  {popularPost.title}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {popularPost.views} views
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
