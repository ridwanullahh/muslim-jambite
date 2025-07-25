import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { type BlogPost, type BlogComment, type BlogCategory, type Student, type ProspectEntry, type FAQ, type Resource, BlogService, RegistrationService, FAQService, ResourceService } from '../types/sdk';
import { 
  Users, 
  FileText, 
  MessageSquare, 
  BookOpen, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  MoreHorizontal,
  Calendar,
  Tag,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Star,
  Heart,
  ThumbsUp,
  Share2,
  Link,
  ExternalLink,
  Archive,
  Bookmark,
  Bell,
  Shield,
  Lock,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  Battery,
  Power,
  Maximize,
  ZoomIn,
  Move,
  Palette,
  Type,
  Bold,
  Italic,
  List,
  Quote,
  Table,
  Grid,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Home,
  User,
  Info,
  HelpCircle
} from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [blogComments, setBlogComments] = useState<BlogComment[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [prospects, setProspects] = useState<ProspectEntry[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // Form states
  const [blogForm, setBlogForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    tags: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: ''
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    description: '',
    color: '#3B82F6'
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: '',
    order: 0
  });

  const [resourceForm, setResourceForm] = useState({
    title: '',
    description: '',
    type: 'pdf' as 'pdf' | 'video' | 'audio' | 'link' | 'document',
    url: '',
    category: '',
    tags: '',
    isPublic: true
  });

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [posts, categories, comments, studentsData, prospectsData, faqsData, resourcesData] = await Promise.all([
        BlogService.getPosts(),
        BlogService.getCategories(),
        BlogService.getComments(''),
        RegistrationService.getStudents(),
        RegistrationService.getProspects(),
        FAQService.getFAQs(),
        ResourceService.getResources()
      ]);

      setBlogPosts(posts);
      setBlogCategories(categories);
      setBlogComments(comments);
      setStudents(studentsData);
      setProspects(prospectsData);
      setFaqs(faqsData);
      setResources(resourcesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalStudents: students.length,
    totalPosts: blogPosts.length,
    totalComments: blogComments.length,
    totalRevenue: students.reduce((sum, student) => sum + (student.monthlyFee || 0), 0),
    publishedPosts: blogPosts.filter(post => post.status === 'published').length,
    draftPosts: blogPosts.filter(post => post.status === 'draft').length,
    pendingComments: blogComments.filter(comment => comment.status === 'pending').length,
    approvedComments: blogComments.filter(comment => comment.status === 'approved').length,
    paidStudents: students.filter(student => student.paymentStatus === 'success').length,
    pendingStudents: students.filter(student => student.paymentStatus === 'pending').length,
    completedProspects: prospects.filter(prospect => prospect.completed).length,
    activeProspects: prospects.filter(prospect => !prospect.completed).length
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalStudents}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">+{stats.paidStudents} paid</span>
            <span className="text-gray-500 ml-2">• {stats.pendingStudents} pending</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Blog Posts</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">{stats.publishedPosts} published</span>
            <span className="text-gray-500 ml-2">• {stats.draftPosts} drafts</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalComments}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">{stats.approvedComments} approved</span>
            <span className="text-orange-500 ml-2">• {stats.pendingComments} pending</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-3xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-600 font-medium">Monthly recurring</span>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Students</h3>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-brand-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{student.fullName}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
                <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                  {student.paymentStatus === 'success' ? 'Paid' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Blog Posts</h3>
          <div className="space-y-4">
            {blogPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">{post.author}</p>
                  </div>
                </div>
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderBlogManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleBlogFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={blogForm.title}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Slug</label>
                  <Input
                    value={blogForm.slug}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, slug: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={blogForm.content}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={10}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Author</label>
                  <Input
                    value={blogForm.author}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, author: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select value={blogForm.category} onValueChange={(value) => setBlogForm(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                  <Input
                    value={blogForm.tags}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, tags: e.target.value }))}
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <Select value={blogForm.status} onValueChange={handleStatusChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={blogForm.featured}
                  onChange={(e) => setBlogForm(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured Post</label>
              </div>

              <div className="space-y-4 border-t pt-4">
                <h4 className="font-medium">SEO Settings</h4>
                <div>
                  <label className="block text-sm font-medium mb-2">SEO Title</label>
                  <Input
                    value={blogForm.seoTitle}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SEO Description</label>
                  <Textarea
                    value={blogForm.seoDescription}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">SEO Keywords (comma-separated)</label>
                  <Input
                    value={blogForm.seoKeywords}
                    onChange={(e) => setBlogForm(prev => ({ ...prev, seoKeywords: e.target.value }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.excerpt}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.views} views</span>
                    <span>•</span>
                    <span>{post.likes} likes</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                  {post.status}
                </Badge>
                {post.featured && (
                  <Badge variant="outline">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStudentManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Student Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-brand-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{student.fullName}</h3>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500">{student.program || 'JAMB Prep'}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                  {student.paymentStatus === 'success' ? 'Paid' : 'Pending'}
                </Badge>
                <span className="text-sm font-medium">₦{student.monthlyFee || 1500}</span>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProspectManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Prospect Management</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search prospects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {prospects.map((prospect) => (
          <Card key={prospect.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{prospect.fullName || 'Anonymous'}</h3>
                  <p className="text-sm text-gray-600">{prospect.email}</p>
                  <p className="text-sm text-gray-500">Step {prospect.step || 1} of 4</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={prospect.completed ? 'default' : 'secondary'}>
                  {prospect.completed ? 'Completed' : 'In Progress'}
                </Badge>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderResourceManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resource Management</h2>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-gray-600">{resource.description}</p>
                  <p className="text-sm text-gray-500">{resource.type} • {resource.downloads || 0} downloads</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge variant={resource.isPublic ? 'default' : 'secondary'}>
                  {resource.isPublic ? 'Public' : 'Private'}
                </Badge>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const handleBlogFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const postData = {
        ...blogForm,
        tags: blogForm.tags.split(',').map(tag => tag.trim()),
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        views: 0,
        likes: 0,
        seoKeywords: blogForm.seoKeywords.split(',').map(keyword => keyword.trim())
      };

      await BlogService.createPost(postData);
      
      // Reset form
      setBlogForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        author: '',
        category: '',
        tags: '',
        status: 'draft' as 'draft' | 'published' | 'archived',
        featured: false,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
      });
      
      // Refresh blog posts
      const posts = await BlogService.getPosts();
      setBlogPosts(posts);
      
      alert('Blog post created successfully!');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert('Error creating blog post. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setBlogForm(prev => ({ 
      ...prev, 
      status: value as 'draft' | 'published' | 'archived' 
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your MuslimJambite platform</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Blog</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Students</span>
            </TabsTrigger>
            <TabsTrigger value="prospects" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Prospects</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="blog">
            {renderBlogManagement()}
          </TabsContent>

          <TabsContent value="students">
            {renderStudentManagement()}
          </TabsContent>

          <TabsContent value="prospects">
            {renderProspectManagement()}
          </TabsContent>

          <TabsContent value="resources">
            {renderResourceManagement()}
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Settings</h2>
              <Card className="p-6">
                <p className="text-gray-600">Settings panel coming soon...</p>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;
