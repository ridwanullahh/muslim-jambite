
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResourceService } from '@/lib/sdk';
import { Resource } from '@/types/sdk';
import { Plus, Edit, Trash2, Download, FileText, Video, Audio, Link, File } from 'lucide-react';

export const AdminResourceManager = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf' as 'pdf' | 'video' | 'audio' | 'link' | 'document',
    url: '',
    category: '',
    tags: '',
    isPublic: true
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    setIsLoading(true);
    try {
      const resourcesData = await ResourceService.getResources();
      setResources(resourcesData);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResource = async () => {
    try {
      setIsLoading(true);
      const resourceData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()),
        downloads: 0
      };

      if (selectedResource) {
        await ResourceService.updateResource(selectedResource.id, resourceData);
      } else {
        await ResourceService.createResource(resourceData);
      }

      await loadResources();
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving resource:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResource = async (resourceId: string) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      try {
        await ResourceService.deleteResource(resourceId);
        await loadResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
      }
    }
  };

  const resetForm = () => {
    setSelectedResource(null);
    setFormData({
      title: '',
      description: '',
      type: 'pdf',
      url: '',
      category: '',
      tags: '',
      isPublic: true
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
      case 'document':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'audio':
        return <Audio className="w-5 h-5" />;
      case 'link':
        return <Link className="w-5 h-5" />;
      default:
        return <File className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
          <p className="text-gray-600">Manage downloadable resources and study materials</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedResource ? 'Edit Resource' : 'Add New Resource'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Resource title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Resource description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as any }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Category</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="Resource category"
                  />
                </div>
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="Resource URL or file path"
                />
              </div>
              <div>
                <Label>Tags (comma-separated)</Label>
                <Input
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="tag1, tag2, tag3"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <Label htmlFor="isPublic">Public Resource</Label>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveResource} disabled={isLoading}>
                  {isLoading ? 'Saving...' : selectedResource ? 'Update' : 'Add'} Resource
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    {getTypeIcon(resource.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{resource.type}</Badge>
                      <Badge variant="outline">{resource.category}</Badge>
                      <span className="text-sm text-gray-500">{resource.downloads || 0} downloads</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={resource.isPublic ? 'default' : 'secondary'}>
                    {resource.isPublic ? 'Public' : 'Private'}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSelectedResource(resource);
                    setFormData({
                      title: resource.title,
                      description: resource.description,
                      type: resource.type,
                      url: resource.url,
                      category: resource.category,
                      tags: resource.tags.join(', '),
                      isPublic: resource.isPublic
                    });
                    setIsDialogOpen(true);
                  }}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteResource(resource.id)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
