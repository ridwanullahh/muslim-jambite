
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Edit, Plus, FileText, Music, Video, Link, Download } from 'lucide-react';
import { ResourceService } from '../../lib/sdk';
import { toast } from 'sonner';

interface Resource {
  id: string;
  title: string;
  type: 'link' | 'pdf' | 'video' | 'audio' | 'document';
  url: string;
  isPublic: boolean;
  description: string;
  category: string;
  tags: string[];
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

const AdminResourceManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    type: 'document' as 'link' | 'pdf' | 'video' | 'audio' | 'document',
    url: '',
    isPublic: true,
    description: '',
    category: '',
    tags: [] as string[]
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await ResourceService.getResources();
      setResources(data);
    } catch (error) {
      console.error('Error loading resources:', error);
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const resourceData = {
        title: formData.title,
        type: formData.type,
        url: formData.url,
        isPublic: formData.isPublic,
        description: formData.description,
        category: formData.category,
        tags: formData.tags,
        downloads: 0
      };

      if (editingResource) {
        await ResourceService.updateResource(editingResource.id, resourceData);
        toast.success('Resource updated successfully');
      } else {
        await ResourceService.createResource(resourceData);
        toast.success('Resource created successfully');
      }

      resetForm();
      loadResources();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast.error('Failed to save resource');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: 'document',
      url: '',
      isPublic: true,
      description: '',
      category: '',
      tags: []
    });
    setEditingResource(null);
    setShowForm(false);
  };

  const handleEdit = (resource: Resource) => {
    setFormData({
      title: resource.title,
      type: resource.type,
      url: resource.url,
      isPublic: resource.isPublic,
      description: resource.description,
      category: resource.category,
      tags: resource.tags
    });
    setEditingResource(resource);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await ResourceService.deleteResource(id);
        toast.success('Resource deleted successfully');
        loadResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast.error('Failed to delete resource');
      }
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Music className="h-4 w-4" />;
      case 'link':
        return <Link className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resource Manager</h2>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: 'link' | 'pdf' | 'video' | 'audio' | 'document') => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPublic"
                  checked={formData.isPublic}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublic: checked as boolean })}
                />
                <Label htmlFor="isPublic">Make this resource public</Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit">
                  {editingResource ? 'Update Resource' : 'Create Resource'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getResourceIcon(resource.type)}
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(resource)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Category: {resource.category}</span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {resource.downloads}
                </span>
              </div>
              <div className="mt-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  resource.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {resource.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {resources.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No resources found. Create your first resource to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminResourceManager;
