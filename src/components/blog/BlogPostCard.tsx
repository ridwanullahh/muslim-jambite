
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { BlogPost } from '../../types/sdk';

interface BlogPostCardProps {
  post: BlogPost;
  layout?: 'grid' | 'list' | 'masonry';
}

export const BlogPostCard = ({ 
  post, 
  layout = 'grid'
}: BlogPostCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
        </div>
        
        <CardTitle className="line-clamp-2 group-hover:text-brand-primary transition-colors text-left">
          <Link to={`/blog/${post.slug}`} className="text-left">
            {post.title}
          </Link>
        </CardTitle>
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

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {formatDate(post.publishedAt)}
          </div>
          
          <Link 
            to={`/blog/${post.slug}`}
            className="text-brand-primary hover:text-brand-primary/80 text-sm font-medium"
          >
            Read More
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
