
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { BlogPost } from '@/types/sdk';
import { BlogService } from '@/lib/sdk';
import { Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BlogPostSelectorProps {
  selectedPosts: string[];
  onPostsChange: (postIds: string[]) => void;
  multiple?: boolean;
  trigger?: React.ReactNode;
}

export const BlogPostSelector = ({ 
  selectedPosts, 
  onPostsChange, 
  multiple = false,
  trigger 
}: BlogPostSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadPosts();
    }
  }, [isOpen]);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const postsData = await BlogService.getPosts();
      setPosts(postsData.filter(post => post.status === 'published'));
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePostToggle = (postId: string) => {
    if (multiple) {
      if (selectedPosts.includes(postId)) {
        onPostsChange(selectedPosts.filter(id => id !== postId));
      } else {
        onPostsChange([...selectedPosts, postId]);
      }
    } else {
      onPostsChange(selectedPosts.includes(postId) ? [] : [postId]);
    }
  };

  const removePost = (postId: string) => {
    onPostsChange(selectedPosts.filter(id => id !== postId));
  };

  const getSelectedPostTitles = () => {
    return posts
      .filter(post => selectedPosts.includes(post.id))
      .map(post => post.title);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {selectedPosts.map(postId => {
          const post = posts.find(p => p.id === postId);
          return post ? (
            <Badge key={postId} variant="secondary" className="flex items-center gap-1">
              {post.title}
              <button
                onClick={() => removePost(postId)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ) : null;
        })}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {trigger || (
            <Button variant="outline" className="w-full">
              {selectedPosts.length > 0 
                ? `${selectedPosts.length} post${selectedPosts.length > 1 ? 's' : ''} selected`
                : 'Select Blog Post(s)'
              }
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[70vh]">
          <DialogHeader>
            <DialogTitle>
              Select Blog Post{multiple ? 's' : ''}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2">
              {isLoading ? (
                <div className="text-center py-4">Loading posts...</div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No posts found</div>
              ) : (
                filteredPosts.map(post => (
                  <div
                    key={post.id}
                    className={`p-3 border rounded cursor-pointer transition-colors ${
                      selectedPosts.includes(post.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePostToggle(post.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{post.title}</h3>
                        <p className="text-sm text-gray-600">
                          By {post.author} • {post.category}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handlePostToggle(post.id)}
                        className="ml-2"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
