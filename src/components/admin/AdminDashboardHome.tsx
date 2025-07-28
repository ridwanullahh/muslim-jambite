
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, MessageSquare, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { BlogService, RegistrationService } from '@/lib/sdk';
import { BlogPost, Student } from '@/types/sdk';

export const AdminDashboardHome = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalPosts: 0,
    totalRevenue: 0,
    paidStudents: 0,
    pendingStudents: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [recentStudents, setRecentStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [posts, students] = await Promise.all([
        BlogService.getPosts(),
        RegistrationService.getStudents()
      ]);

      const calculatedStats = {
        totalStudents: students.length,
        totalPosts: posts.length,
        totalRevenue: students.reduce((sum, student) => sum + (student.monthlyFee || 0), 0),
        paidStudents: students.filter(student => student.paymentStatus === 'success').length,
        pendingStudents: students.filter(student => student.paymentStatus === 'pending').length,
        publishedPosts: posts.filter(post => post.status === 'published').length,
        draftPosts: posts.filter(post => post.status === 'draft').length
      };

      setStats(calculatedStats);
      setRecentPosts(posts.slice(0, 5));
      setRecentStudents(students.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your MuslimJambite platform</p>
        </div>
        <Button onClick={loadDashboardData}>
          <Activity className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.paidStudents} paid • {stats.pendingStudents} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground">
              {stats.publishedPosts} published • {stats.draftPosts} drafts
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.paidStudents} paying students
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12%</div>
            <p className="text-xs text-muted-foreground">
              Student growth this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
            <CardDescription>Latest posts from your blog</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.author}</p>
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
            <CardDescription>New student registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{student.fullName}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge variant={student.paymentStatus === 'success' ? 'default' : 'secondary'}>
                    {student.paymentStatus === 'success' ? 'Paid' : 'Pending'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
