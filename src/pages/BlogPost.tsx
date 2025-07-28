
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { SharedLayout } from '@/components/layout/SharedLayout';
import { BlogService } from '@/lib/sdk';
import { BlogPost as BlogPostType } from '@/types/sdk';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, Heart, Share2 } from 'lucide-react';
import { PollCard } from '@/components/poll/PollCard';
import { QuizCard } from '@/components/quiz/QuizCard';
import 'highlight.js/styles/github.css';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    setIsLoading(true);
    try {
      const posts = await BlogService.getPosts();
      const foundPost = posts.find(p => p.slug === postSlug);
      setPost(foundPost || null);
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <SharedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
        </div>
      </SharedLayout>
    );
  }

  if (!post) {
    return (
      <SharedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </SharedLayout>
    );
  }

  return (
    <SharedLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
          <header className="space-y-4">
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{post.category}</Badge>
              {post.featured && <Badge>Featured</Badge>}
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
            <p className="text-xl text-gray-600">{post.excerpt}</p>
            
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span>{post.likes} likes</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </header>

          <Card>
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                  className="markdown-content"
                >
                  {post.content}
                </ReactMarkdown>
              </div>
            </CardContent>
          </Card>

          {/* Example embedded poll */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Poll</h3>
            <PollCard
              poll={{
                id: 'sample-poll',
                postId: post.id,
                question: 'How would you rate this article?',
                options: [
                  { id: '1', text: 'Excellent', votes: 15, percentage: 50 },
                  { id: '2', text: 'Good', votes: 10, percentage: 33 },
                  { id: '3', text: 'Average', votes: 5, percentage: 17 }
                ],
                totalVotes: 30,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              }}
              onVote={(optionId) => console.log('Voted for:', optionId)}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </article>
      </div>
    </SharedLayout>
  );
};

export default BlogPost;
