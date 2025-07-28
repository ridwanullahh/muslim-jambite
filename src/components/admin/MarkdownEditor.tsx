
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Edit, Code } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export const MarkdownEditor = ({ 
  value, 
  onChange, 
  placeholder = "Write your content here...",
  height = 400 
}: MarkdownEditorProps) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={mode} onValueChange={(value) => setMode(value as 'edit' | 'preview')}>
          <TabsList>
            <TabsTrigger value="edit" className="flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Preview</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <Button variant="outline" size="sm">
          <Code className="w-4 h-4 mr-2" />
          Markdown Guide
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || '')}
          height={height}
          preview={mode === 'preview' ? 'preview' : 'edit'}
          hideToolbar={false}
          data-color-mode="light"
        />
      </div>
    </div>
  );
};
