
import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { List, ChevronRight, ChevronDown } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
  element: HTMLElement;
}

interface BlogTableOfContentsProps {
  content: string;
  isFloating?: boolean;
  className?: string;
}

export const BlogTableOfContents = ({ 
  content, 
  isFloating = false, 
  className = '' 
}: BlogTableOfContentsProps) => {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isVisible, setIsVisible] = useState(!isFloating);

  useEffect(() => {
    // Generate TOC from content
    const generateTOC = () => {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      
      const headings = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const items: TOCItem[] = [];
      
      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent || '';
        const id = `heading-${index}`;
        
        // Add id to heading for navigation
        heading.id = id;
        
        items.push({
          id,
          text,
          level,
          element: heading as HTMLElement
        });
      });
      
      setTocItems(items);
    };

    generateTOC();
  }, [content]);

  useEffect(() => {
    if (isFloating) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(entry.target.id);
            }
          });
        },
        {
          rootMargin: '-20% 0px -80% 0px',
        }
      );

      tocItems.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    }
  }, [tocItems, isFloating]);

  useEffect(() => {
    if (isFloating) {
      const handleScroll = () => {
        const scrolled = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Show TOC after scrolling 100px and hide near the bottom
        setIsVisible(scrolled > 100 && scrolled < documentHeight - windowHeight - 200);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isFloating]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) {
    return null;
  }

  const floatingClassName = isFloating
    ? `fixed right-4 top-1/2 transform -translate-y-1/2 z-40 w-64 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
      }`
    : '';

  return (
    <Card className={`${floatingClassName} ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center space-x-2">
            <List className="w-4 h-4" />
            <span>Table of Contents</span>
          </div>
          {isFloating && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      {(!isFloating || !isCollapsed) && (
        <CardContent className="py-0">
          <nav className="space-y-1">
            {tocItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`w-full text-left px-2 py-1 rounded text-sm transition-colors ${
                  activeId === item.id
                    ? 'bg-brand-primary/10 text-brand-primary font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                style={{ paddingLeft: `${(item.level - 1) * 12 + 8}px` }}
              >
                {item.text}
              </button>
            ))}
          </nav>
        </CardContent>
      )}
    </Card>
  );
};
