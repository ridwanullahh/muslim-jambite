
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { type BlogPost, type BlogComment } from '../types/sdk';
import { BlogService } from '../lib/sdk';
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
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newComment, setNewComment] = useState({
    author: '',
    email: '',
    content: ''
  });

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

  const handleLikePost = async () => {
    if (!post) return;
    
    try {
      await BlogService.likePost(post.id);
      setPost(prev => prev ? { ...prev, likes: prev.likes + 1 } : null);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/blog" className="inline-flex items-center text-brand-primary hover:text-brand-primary/80">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Article Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
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
                <Eye className="w-4 h-4 mr-1" />
                {post.views} views
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline">{post.category}</Badge>
                {post.featured && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <div className="flex items-center space-x-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" onClick={handleLikePost}>
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
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
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6 font-medium">{post.excerpt}</p>
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {post.content}
              </div>
            </div>
          </div>

          {/* Article Footer */}
          <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Share this article:</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Last updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageSquare className="w-6 h-6 mr-2" />
              Comments ({comments.length})
            </h2>
          </div>

          {/* Comment Form */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Leave a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newComment.author}
                    onChange={(e) => setNewComment(prev => ({ ...prev, author: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newComment.email}
                    onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comment</label>
                <textarea
                  value={newComment.content}
                  onChange={(e) => setNewComment(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
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
              <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{comment.author}</span>
                          <span className="text-sm text-gray-500 ml-2">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Badge variant={comment.status === 'approved' ? 'default' : 'secondary'}>
                        {comment.status}
                      </Badge>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.content}</p>
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Related Posts
              </h2>
            </div>
            <div className="px-8 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`} className="group">
                    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-semibold text-gray-900 group-hover:text-brand-primary mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{relatedPost.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.author}</span>
                        <div className="flex items-center space-x-2">
                          <span>{relatedPost.views} views</span>
                          <span>•</span>
                          <span>{relatedPost.likes} likes</span>
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
    </div>
  );
};

export default BlogPostPage;
