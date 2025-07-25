
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BlogService, RegistrationService, FAQService, ResourceService } from '../lib/sdk';
import { BlogPost, BlogComment, BlogCategory, Student, ProspectEntry, FAQ, Resource } from '../types/sdk';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Search, 
  Filter,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  HelpCircle,
  Library,
  Settings,
  BarChart3,
  Calendar,
  Clock,
  Star,
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  XCircle,
  Save,
  X
} from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  
  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  
  // Registration state
  const [students, setStudents] = useState<Student[]>([]);
  const [prospects, setProspects] = useState<ProspectEntry[]>([]);
  
  // FAQ state
  const [faqs, setFAQs] = useState<FAQ[]>([]);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  
  // Resource state
  const [resources, setResources] = useState<Resource[]>([]);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'superadmin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [postsData, commentsData, categoriesData, studentsData, prospectsData, faqsData, resourcesData] = await Promise.all([
        BlogService.getPosts(),
        BlogService.getComments(''),
        BlogService.getCategories(),
        RegistrationService.getStudents(),
        RegistrationService.getProspects(),
        FAQService.getFAQs(),
        ResourceService.getResources()
      ]);
      
      setPosts(postsData);
      setComments(commentsData);
      setCategories(categoriesData);
      setStudents(studentsData);
      setProspects(prospectsData);
      setFAQs(faqsData);
      setResources(resourcesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPost = await BlogService.createPost(postData);
      setPosts([newPost, ...posts]);
      setShowPostForm(false);
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleUpdatePost = async (id: string, updates: Partial<BlogPost>) => {
    try {
      const updatedPost = await BlogService.updatePost(id, updates);
      if (updatedPost) {
        setPosts(posts.map(post => post.id === id ? updatedPost : post));
        setEditingPost(null);
      }
    } catch (error) {
      console.error('Failed to update post:', error);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await BlogService.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleCommentModeration = async (id: string, status: 'approved' | 'rejected') => {
    try {
      const updatedComment = await BlogService.updateComment(id, { status });
      if (updatedComment) {
        setComments(comments.map(comment => comment.id === id ? updatedComment : comment));
      }
    } catch (error) {
      console.error('Failed to update comment:', error);
    }
  };

  const handleCreateFAQ = async (faqData: Omit<FAQ, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newFAQ = await FAQService.createFAQ(faqData);
      setFAQs([newFAQ, ...faqs]);
      setEditingFAQ(null);
    } catch (error) {
      console.error('Failed to create FAQ:', error);
    }
  };

  const handleUpdateFAQ = async (id: string, updates: Partial<FAQ>) => {
    try {
      const updatedFAQ = await FAQService.updateFAQ(id, updates);
      if (updatedFAQ) {
        setFAQs(faqs.map(faq => faq.id === id ? updatedFAQ : faq));
        setEditingFAQ(null);
      }
    } catch (error) {
      console.error('Failed to update FAQ:', error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await FAQService.deleteFAQ(id);
        setFAQs(faqs.filter(faq => faq.id !== id));
      } catch (error) {
        console.error('Failed to delete FAQ:', error);
      }
    }
  };

  const handleCreateResource = async (resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newResource = await ResourceService.createResource(resourceData);
      setResources([newResource, ...resources]);
      setEditingResource(null);
    } catch (error) {
      console.error('Failed to create resource:', error);
    }
  };

  const handleUpdateResource = async (id: string, updates: Partial<Resource>) => {
    try {
      const updatedResource = await ResourceService.updateResource(id, updates);
      if (updatedResource) {
        setResources(resources.map(resource => resource.id === id ? updatedResource : resource));
        setEditingResource(null);
      }
    } catch (error) {
      console.error('Failed to update resource:', error);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await ResourceService.deleteResource(id);
        setResources(resources.filter(resource => resource.id !== id));
      } catch (error) {
        console.error('Failed to delete resource:', error);
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDashboardStats = () => {
    const totalPosts = posts.length;
    const publishedPosts = posts.filter(p => p.status === 'published').length;
    const totalStudents = students.length;
    const totalProspects = prospects.length;
    const pendingComments = comments.filter(c => c.status === 'pending').length;
    const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
    const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0);
    
    return {
      totalPosts,
      publishedPosts,
      totalStudents,
      totalProspects,
      pendingComments,
      totalViews,
      totalLikes
    };
  };

  const stats = getDashboardStats();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">MuslimJambite Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalPosts}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.publishedPosts} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStudents}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalProspects} prospects
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalViews}</div>
                  <p className="text-xs text-muted-foreground">
                    Across all posts
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Comments</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingComments}</div>
                  <p className="text-xs text-muted-foreground">
                    Need moderation
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {posts.slice(0, 5).map((post) => (
                      <div key={post.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">{post.title}</h4>
                          <p className="text-sm text-gray-500">{post.views} views • {post.likes} likes</p>
                        </div>
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{student.fullName}</h4>
                          <p className="text-sm text-gray-500">{student.email}</p>
                        </div>
                        <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                          {student.paymentStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Blog Management</h2>
              <Button onClick={() => setShowPostForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="grid gap-6">
              {posts
                .filter(post => 
                  post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                  (filterStatus === 'all' || post.status === filterStatus)
                )
                .map((post) => (
                <Card key={post.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                          {post.status}
                        </Badge>
                        {post.featured && (
                          <Badge variant="outline">Featured</Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingPost(post)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>By {post.author}</span>
                        <span>{post.category}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Student Management</h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{students.length} Students</Badge>
                <Badge variant="outline">{prospects.length} Prospects</Badge>
              </div>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Registered Students</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{student.fullName}</h4>
                          <p className="text-sm text-gray-500">{student.email}</p>
                          <p className="text-sm text-gray-500">Program: {student.program}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                            {student.paymentStatus}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            ₦{student.monthlyFee}/month
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Prospects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {prospects.map((prospect) => (
                      <div key={prospect.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{prospect.fullName}</h4>
                          <p className="text-sm text-gray-500">{prospect.email}</p>
                          <p className="text-sm text-gray-500">Step: {prospect.step}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={prospect.completed ? 'default' : 'secondary'}>
                            {prospect.completed ? 'Completed' : 'In Progress'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Comment Moderation</h2>
              <Badge variant="outline">{comments.filter(c => c.status === 'pending').length} Pending</Badge>
            </div>

            <div className="grid gap-6">
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-gray-500">{comment.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={
                          comment.status === 'approved' ? 'default' :
                          comment.status === 'pending' ? 'secondary' : 'destructive'
                        }>
                          {comment.status}
                        </Badge>
                        {comment.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentModeration(comment.id, 'approved')}
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentModeration(comment.id, 'rejected')}
                            >
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{comment.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Post: {posts.find(p => p.id === comment.postId)?.title}</span>
                      <span>{comment.likes} likes</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">FAQ Management</h2>
              <Button onClick={() => setEditingFAQ({} as FAQ)}>
                <Plus className="w-4 h-4 mr-2" />
                New FAQ
              </Button>
            </div>

            <div className="grid gap-6">
              {faqs.map((faq) => (
                <Card key={faq.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{faq.question}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingFAQ(faq)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteFAQ(faq.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{faq.answer}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                      <span>Category: {faq.category}</span>
                      <span>Order: {faq.order}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Resource Management</h2>
              <Button onClick={() => setEditingResource({} as Resource)}>
                <Plus className="w-4 h-4 mr-2" />
                New Resource
              </Button>
            </div>

            <div className="grid gap-6">
              {resources.map((resource) => (
                <Card key={resource.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{resource.title}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{resource.type}</Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingResource(resource)}
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteResource(resource.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Category: {resource.category}</span>
                      <span>Downloads: {resource.downloads}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Post Form Modal */}
      {(showPostForm || editingPost) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowPostForm(false);
                  setEditingPost(null);
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <PostForm
              post={editingPost}
              categories={categories}
              onSubmit={editingPost ? 
                (updates) => handleUpdatePost(editingPost.id, updates) :
                handleCreatePost
              }
              onCancel={() => {
                setShowPostForm(false);
                setEditingPost(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Post Form Component
const PostForm = ({ 
  post, 
  categories, 
  onSubmit, 
  onCancel 
}: {
  post: BlogPost | null;
  categories: BlogCategory[];
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    author: post?.author || '',
    category: post?.category || '',
    tags: post?.tags?.join(', ') || '',
    status: post?.status || 'draft',
    featured: post?.featured || false,
    seoTitle: post?.seoTitle || '',
    seoDescription: post?.seoDescription || '',
    seoKeywords: post?.seoKeywords?.join(', ') || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      seoKeywords: formData.seoKeywords.split(',').map(keyword => keyword.trim()).filter(Boolean),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      views: post?.views || 0,
      likes: post?.likes || 0
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Post Title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        <Input
          placeholder="Slug (URL)"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
        />
      </div>

      <textarea
        placeholder="Post Excerpt"
        value={formData.excerpt}
        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        rows={3}
        required
      />

      <textarea
        placeholder="Post Content"
        value={formData.content}
        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        rows={10}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
          required
        />
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select Category</option>
          {categories.map(category => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          placeholder="Tags (comma separated)"
          value={formData.tags}
          onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
          className="px-3 py-2 border border-gray-300 rounded-lg"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
        />
        <label htmlFor="featured">Featured Post</label>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-4">SEO Settings</h4>
        <div className="space-y-4">
          <Input
            placeholder="SEO Title"
            value={formData.seoTitle}
            onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
          />
          <textarea
            placeholder="SEO Description"
            value={formData.seoDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            rows={2}
          />
          <Input
            placeholder="SEO Keywords (comma separated)"
            value={formData.seoKeywords}
            onChange={(e) => setFormData(prev => ({ ...prev, seoKeywords: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          <Save className="w-4 h-4 mr-2" />
          {post ? 'Update Post' : 'Create Post'}
        </Button>
      </div>
    </form>
  );
};

export default Admin;
