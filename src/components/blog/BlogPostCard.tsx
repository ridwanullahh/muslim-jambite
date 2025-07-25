
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  Clock, 
  Eye, 
  Heart, 
  User, 
  ArrowRight, 
  Share2, 
  Bookmark,
  ThumbsUp,
  MessageSquare
} from 'lucide-react';
import { BlogPost } from '../../types/sdk';
import { BlogService } from '../../lib/sdk';

interface BlogPostCardProps {
  post: BlogPost;
  layout?: 'grid' | 'list' | 'masonry';
  showActions?: boolean;
  onReact?: (postId: string, type: 'like' | 'heart' | 'thumbsUp' | 'celebrate') => void;
  onBookmark?: (postId: string) => void;
  onShare?: (post: BlogPost) => void;
}

export const BlogPostCard = ({ 
  post, 
  layout = 'grid', 
  showActions = true,
  onReact,
  onBookmark,
  onShare
}: BlogPostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleReaction = async (type: 'like' | 'heart' | 'thumbsUp' | 'celebrate') => {
    try {
      await BlogService.reactToPost(post.id, type);
      onReact?.(post.id, type);
    } catch (error) {
      console.error('Error reacting to post:', error);
    }
  };

  const handleBookmark = async () => {
    try {
      await BlogService.bookmarkPost(post.id);
      onBookmark?.(post.id);
    } catch (error) {
      console.error('Error bookmarking post:', error);
    }
  };

  const handleShare = () => {
    onShare?.(post);
  };

  const cardClassName = layout === 'list' 
    ? 'flex flex-col md:flex-row overflow-hidden' 
    : 'overflow-hidden';

  return (
    <Card className={`${cardClassName} hover:shadow-lg transition-all duration-300 group`}>
      <CardHeader className={`pb-4 ${layout === 'list' ? 'md:flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Badge 
              variant="secondary" 
              className="bg-brand-primary/10 text-brand-primary border-brand-primary/20"
            >
              {post.category}
            </Badge>
            {post.featured && (
              <Badge variant="default" className="bg-yellow-500 text-white">
                Featured
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Eye className="w-3 h-3" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MessageSquare className="w-3 h-3" />
              <span>12</span>
            </div>
          </div>
        </div>
        
        <CardTitle className="line-clamp-2 group-hover:text-brand-primary transition-colors">
          <Link to={`/blog/${post.slug}`} className="text-left">
            {post.title}
          </Link>
        </CardTitle>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
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
            <span>{post.readTime || 5} min read</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-4 ${layout === 'list' ? 'md:flex-1' : ''}`}>
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 text-left">
          {post.excerpt}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        {showActions && (
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('like')}
                className="flex items-center space-x-1 hover:text-red-500"
              >
                <Heart className="w-4 h-4" />
                <span>{post.reactions?.heart || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReaction('thumbsUp')}
                className="flex items-center space-x-1 hover:text-blue-500"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.thumbsUp || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className="flex items-center space-x-1 hover:text-yellow-500"
              >
                <Bookmark className="w-4 h-4" />
                <span>{post.bookmarks || 0}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-1 hover:text-green-500"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </Button>
            </div>
            
            <Link 
              to={`/blog/${post.slug}`}
              className="flex items-center space-x-1 text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
            >
              <span>Read More</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
