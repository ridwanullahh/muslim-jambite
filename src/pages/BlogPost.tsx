import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { type BlogPost as BlogPostType, type BlogComment, BlogService } from '../lib/sdk';
import { Heart, MessageCircle, Share2, BookOpen, Clock, User, Eye, ChevronRight, Volume2, VolumeX, Copy, Check, ThumbsUp, Bookmark, Facebook, Twitter, Linkedin, Send, MessageSquare, Plus, Minus, Search, ArrowUp, ArrowDown, Filter, Calendar, Tag, TrendingUp, RefreshCw, Star, ChevronUp, ChevronDown, Play, Pause, SkipBack, SkipForward, Download, ExternalLink, Mail, Phone, MapPin, Home, ChevronLeft, MoreHorizontal, Zap, Target, Award, Users, Globe, Lightbulb, Code, BookmarkPlus, Share, Link, FileText, Image, Video, Headphones, PenTool, Mic, Camera, Layout, Smartphone, Tablet, Monitor, Printer, Archive, Trash2, Edit, Settings, Info, AlertCircle, CheckCircle, XCircle, HelpCircle, Bell, BellOff, Shield, Lock, Unlock, Key, Database, Server, Cloud, Wifi, WifiOff, Bluetooth, Battery, BatteryLow, Power, PowerOff, Refresh, RotateCcw, RotateCw, Maximize, Minimize, ZoomIn, ZoomOut, Move, Resize, Crop, Scissors, Palette, Brush, Eraser, Type, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered, Quote, Link2, Unlink, Table, Grid, Columns, Rows, MoreVertical, Menu, X, Plus as PlusIcon, Minus as MinusIcon, Search as SearchIcon, Filter as FilterIcon, Calendar as CalendarIcon, Tag as TagIcon, User as UserIcon, Mail as MailIcon, Phone as PhoneIcon, MapPin as MapPinIcon, Home as HomeIcon, Settings as SettingsIcon, Info as InfoIcon, HelpCircle as HelpCircleIcon, Bell as BellIcon, Shield as ShieldIcon, Lock as LockIcon, Database as DatabaseIcon, Server as ServerIcon, Cloud as CloudIcon, Wifi as WifiIcon, Battery as BatteryIcon, Power as PowerIcon, Refresh as RefreshIcon, Maximize as MaximizeIcon, ZoomIn as ZoomInIcon, Move as MoveIcon, Palette as PaletteIcon, Type as TypeIcon, Bold as BoldIcon, Italic as ItalicIcon, List as ListIcon, Quote as QuoteIcon, Link2 as Link2Icon, Table as TableIcon, Grid as GridIcon, Menu as MenuIcon, X as XIcon } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [relatedPosts, setRelatedPosts] = useState<BlogPostType[]>([]);
  const [popularPosts, setPopularPosts] = useState<BlogPostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      setError('');
      try {
        if (!slug) {
          setError('Invalid slug');
          return;
        }
        const fetchedPost = await BlogService.getPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          const fetchedComments = await BlogService.getComments(fetchedPost.id);
          setComments(fetchedComments);
          const fetchedRelatedPosts = await BlogService.getRelatedPosts(fetchedPost.id);
          setRelatedPosts(fetchedRelatedPosts);
        } else {
          setError('Post not found');
        }
      } catch (e) {
        setError('Failed to load post');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPopularPosts = async () => {
      try {
        const fetchedPopularPosts = await BlogService.getPopularPosts();
        setPopularPosts(fetchedPopularPosts);
      } catch (e) {
        console.error('Failed to load popular posts', e);
      }
    };

    fetchPost();
    fetchPopularPosts();
  }, [slug]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      if (!post) return;
      const comment = await BlogService.addComment({
        postId: post.id,
        author: 'Anonymous',
        email: 'anonymous@example.com',
        content: newComment,
        status: 'pending',
        likes: 0
      });
      setComments([...comments, comment]);
      setNewComment('');
    } catch (e) {
      console.error('Failed to add comment', e);
      setError('Failed to add comment');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-500" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <Badge>{post.category}</Badge>
            </div>
          </div>
          <p className="text-gray-700 mb-8">{post.content}</p>

          {/* Comment Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {comments.map(comment => (
              <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded-md">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="font-semibold">{comment.author}</span>
                </div>
                <p>{comment.content}</p>
              </div>
            ))}

            {/* Add Comment Form */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
              <textarea
                className="w-full p-3 border rounded-md mb-3"
                rows={4}
                placeholder="Write your comment here..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
              />
              <Button onClick={handleAddComment}>Submit Comment</Button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Related Posts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Related Posts</h2>
            {relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="mb-4">
                <h3 className="font-semibold">
                  <a href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</a>
                </h3>
                <p className="text-gray-500">{relatedPost.excerpt}</p>
              </div>
            ))}
          </div>

          {/* Popular Posts */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Popular Posts</h2>
            {popularPosts.map(popularPost => (
              <div key={popularPost.id} className="mb-4">
                <h3 className="font-semibold">
                  <a href={`/blog/${popularPost.slug}`}>{popularPost.title}</a>
                </h3>
                <div className="flex items-center space-x-2 text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{popularPost.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
