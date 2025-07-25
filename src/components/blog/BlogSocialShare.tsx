
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  Link, 
  MessageCircle,
  Send,
  Copy,
  Check
} from 'lucide-react';
import { BlogPost } from '../../types/sdk';

interface BlogSocialShareProps {
  post: BlogPost;
  className?: string;
  variant?: 'inline' | 'floating' | 'modal';
}

export const BlogSocialShare = ({ 
  post, 
  className = '', 
  variant = 'inline' 
}: BlogSocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://muslimjambite.com';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const postTitle = post.title;
  const postDescription = post.excerpt;
  const whatsappChannel = import.meta.env.VITE_WHATSAPP_CHANNEL;
  const telegramChannel = import.meta.env.VITE_TELEGRAM_CHANNEL;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}&via=muslimjambite`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${postTitle} - ${postUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(postTitle)}`,
    email: `mailto:?subject=${encodeURIComponent(postTitle)}&body=${encodeURIComponent(`I thought you might find this interesting: ${postTitle}\n\n${postDescription}\n\nRead more: ${postUrl}`)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(postUrl)}&description=${encodeURIComponent(postTitle)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400,resizable=yes,scrollbars=yes');
  };

  const shareButtons = [
    {
      name: 'Facebook',
      icon: Facebook,
      onClick: () => openShareWindow(shareLinks.facebook),
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      onClick: () => openShareWindow(shareLinks.twitter),
      color: 'hover:text-sky-500',
      bgColor: 'hover:bg-sky-50'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      onClick: () => openShareWindow(shareLinks.linkedin),
      color: 'hover:text-blue-700',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      onClick: () => openShareWindow(shareLinks.whatsapp),
      color: 'hover:text-green-600',
      bgColor: 'hover:bg-green-50'
    },
    {
      name: 'Telegram',
      icon: Send,
      onClick: () => openShareWindow(shareLinks.telegram),
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-50'
    },
    {
      name: 'Email',
      icon: Mail,
      onClick: () => window.open(shareLinks.email),
      color: 'hover:text-gray-600',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  if (variant === 'floating') {
    return (
      <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-40 ${className}`}>
        <Card className="w-12">
          <CardContent className="p-2 space-y-2">
            {shareButtons.slice(0, 4).map((button) => (
              <Button
                key={button.name}
                variant="ghost"
                size="sm"
                onClick={button.onClick}
                className={`w-full h-8 p-0 ${button.color} ${button.bgColor}`}
                title={`Share on ${button.name}`}
              >
                <button.icon className="w-4 h-4" />
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="w-full h-8 p-0 hover:text-brand-primary hover:bg-brand-primary/10"
              title="Copy link"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <Share2 className="w-5 h-5 mr-2" />
          Share this article
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center space-x-2"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {shareButtons.map((button) => (
          <Button
            key={button.name}
            variant="outline"
            onClick={button.onClick}
            className={`flex items-center space-x-2 ${button.color} ${button.bgColor} border-gray-200 dark:border-gray-700`}
          >
            <button.icon className="w-4 h-4" />
            <span>{button.name}</span>
          </Button>
        ))}
      </div>
      
      {/* Community Channels */}
      {(whatsappChannel || telegramChannel) && (
        <div className="mt-6 p-4 bg-brand-primary/5 rounded-lg">
          <h4 className="font-medium text-brand-primary mb-3">Join Our Community</h4>
          <div className="flex space-x-3">
            {whatsappChannel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(whatsappChannel, '_blank')}
                className="flex items-center space-x-2 border-green-500 text-green-600 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Button>
            )}
            {telegramChannel && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(telegramChannel, '_blank')}
                className="flex items-center space-x-2 border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
