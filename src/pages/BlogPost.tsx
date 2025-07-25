
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, 
  User, 
  Tag, 
  Share2, 
  Heart, 
  MessageCircle, 
  Bookmark,
  ChevronRight,
  Search,
  Volume2,
  VolumeX,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  Send,
  ThumbsUp,
  Eye,
  Calendar,
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Headphones,
  Download,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogService, BlogPost as BlogPostType, BlogComment } from '@/lib/sdk';
import { toast } from 'sonner';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const fetchedPost = await BlogService.getPostBySlug(slug);
        setPost(fetchedPost);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchComments = async () => {
      if (post?.id) {
        const fetchedComments = await BlogService.getCommentsByPostId(post.id);
        setComments(fetchedComments);
      }
    };

    fetchComments();
  }, [post]);

  const handleAddComment = async () => {
    if (!commentAuthor || !commentEmail || !commentContent || !post?.id) {
      toast.error('Please fill in all fields to submit a comment.');
      return;
    }

    try {
      const newComment = await BlogService.addComment({
        postId: post.id,
        author: commentAuthor,
        email: commentEmail,
        content: commentContent,
        status: 'pending',
        likes: 0
      });

      setComments(prevComments => [newComment, ...prevComments]);
      setCommentAuthor('');
      setCommentEmail('');
      setCommentContent('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Failed to add comment:', error);
      toast.error('Failed to add comment. Please try again.');
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-2 text-gray-500">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{post.views} Views</span>
            </div>
          </div>
          <Badge className="mb-4">{post.category}</Badge>
          <p className="mb-4">{post.content}</p>

          <Separator className="my-4" />

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Comments</h3>
            {comments.map(comment => (
              <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 mr-2" />
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 ml-2">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Add a Comment</h3>
              <Input
                type="text"
                placeholder="Your Name"
                value={commentAuthor}
                onChange={e => setCommentAuthor(e.target.value)}
                className="mb-2"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={commentEmail}
                onChange={e => setCommentEmail(e.target.value)}
                className="mb-2"
              />
              <Textarea
                placeholder="Your Comment"
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
                className="mb-2"
              />
              <Button onClick={handleAddComment}>Submit Comment</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogPost;
