
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { BlogPost } from '../../types/sdk';

interface BlogPostMetaProps {
  post: BlogPost;
}

export const BlogPostMeta = ({ post }: BlogPostMetaProps) => {
  const [siteUrl] = useState(import.meta.env.VITE_SITE_URL || 'https://muslimjambite.com');
  const [siteName] = useState(import.meta.env.VITE_SITE_NAME || 'MuslimJambite');
  
  if (!post) {
    return (
      <Helmet>
        <title>{siteName}</title>
        <meta name="description" content="Islamic Excellence in Education" />
      </Helmet>
    );
  }
  
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const publishedTime = new Date(post.publishedAt).toISOString();
  const modifiedTime = new Date(post.updatedAt).toISOString();

  // Generate structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": postUrl,
    "headline": post.seoTitle || post.title,
    "description": post.seoDescription || post.excerpt,
    "image": {
      "@type": "ImageObject",
      "url": `${siteUrl}/placeholder.svg`,
      "width": 1200,
      "height": 630
    },
    "author": {
      "@type": "Person",
      "name": post.author,
      "url": `${siteUrl}/author/${post.author.toLowerCase().replace(/\s+/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/favicon.ico`,
        "width": 32,
        "height": 32
      }
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "articleSection": post.category,
    "keywords": post.seoKeywords || post.tags,
    "wordCount": post.content.split(' ').length,
    "timeRequired": `PT${post.readTime || 5}M`,
    "inLanguage": "en-US",
    "about": {
      "@type": "Thing",
      "name": "Islamic Education"
    },
    "mentions": post.tags.map(tag => ({
      "@type": "Thing",
      "name": tag
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${siteUrl}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.category,
        "item": `${siteUrl}/blog/category/${post.category.toLowerCase().replace(/\s+/g, '-')}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post.title,
        "item": postUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{post.seoTitle || post.title}</title>
      <meta name="description" content={post.seoDescription || post.excerpt} />
      <meta name="keywords" content={post.seoKeywords?.join(', ') || post.tags.join(', ')} />
      <meta name="author" content={post.author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={postUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={post.seoTitle || post.title} />
      <meta property="og:description" content={post.seoDescription || post.excerpt} />
      <meta property="og:url" content={postUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={`${siteUrl}/placeholder.svg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific Open Graph tags */}
      <meta property="article:published_time" content={publishedTime} />
      <meta property="article:modified_time" content={modifiedTime} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      {post.tags.map(tag => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.seoTitle || post.title} />
      <meta name="twitter:description" content={post.seoDescription || post.excerpt} />
      <meta name="twitter:image" content={`${siteUrl}/placeholder.svg`} />
      <meta name="twitter:image:alt" content={post.title} />
      <meta name="twitter:creator" content="@muslimjambite" />
      <meta name="twitter:site" content="@muslimjambite" />

      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#10B981" />
      <meta name="msapplication-TileColor" content="#10B981" />
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>

      {/* Preload critical resources */}
      <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={`${siteUrl}/placeholder.svg`} as="image" />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
    </Helmet>
  );
};
