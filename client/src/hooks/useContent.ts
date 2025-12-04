import { useState, useEffect } from 'react';

interface Content {
  site: any;
  home: any;
  services: any;
  contact: any;
  projects: any;
  shop: any;
  navigation: any;
  footer: any;
}

export function useContent() {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/content.json')
      .then(res => res.json())
      .then(data => {
        setContent(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load content:', err);
        setLoading(false);
      });
  }, []);

  return { content, loading };
}
