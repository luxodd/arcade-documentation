import { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

interface PostHogInstance {
  capture: (event: string, properties?: Record<string, any>) => void;
  identify: (userId: string, properties?: Record<string, any>) => void;
  reset: () => void;
}

interface PostHogNavigation {
  navigateWithTracking: (url: string, trackingData?: Record<string, any>) => void;
  createCrossDomainUrl: (url: string) => string;
  handleExternalClick: (event: React.MouseEvent, url: string, trackingData?: Record<string, any>) => void;
}

export const usePostHog = (): PostHogInstance | null => {
  const [posthog, setPosthog] = useState<PostHogInstance | null>(null);
  
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    
    // Check if PostHog is available on window
    if (window.posthog) {
      setPosthog(window.posthog);
    } else {
      // Set up a listener for when PostHog becomes available
      const checkPostHog = () => {
        if (window.posthog) {
          setPosthog(window.posthog);
        } else {
          setTimeout(checkPostHog, 100);
        }
      };
      checkPostHog();
    }
  }, []);
  
  return posthog;
};

export const usePostHogNavigation = (): PostHogNavigation => {
  const posthog = usePostHog();
  
  const navigateWithTracking = (url: string, trackingData: Record<string, any> = {}) => {
    if (ExecutionEnvironment.canUseDOM && window.posthogNavigate) {
      window.posthogNavigate(url, trackingData);
    } else {
      // Fallback navigation
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  
  const createCrossDomainUrl = (url: string): string => {
    if (ExecutionEnvironment.canUseDOM && posthog && (posthog as any).get_cross_domain_linking_url) {
      return (posthog as any).get_cross_domain_linking_url(url);
    }
    return url;
  };
  
  const handleExternalClick = (
    event: React.MouseEvent,
    url: string,
    trackingData: Record<string, any> = {}
  ) => {
    event.preventDefault();
    navigateWithTracking(url, trackingData);
  };
  
  return {
    navigateWithTracking,
    createCrossDomainUrl,
    handleExternalClick
  };
}; 