import React, { useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

declare global {
  interface Window {
    posthog: any;
    posthogNavigate: (url: string, trackingData?: Record<string, any>) => string;
  }
}

const PostHogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteConfig } = useDocusaurusContext();
  
  useEffect(() => {
    if (!ExecutionEnvironment.canUseDOM) return;
    
    const customFields = siteConfig.customFields as Record<string, any>;
    const landingPageUrl = customFields?.LANDING_PAGE_URL as string;
    
    // Check if we're in staging environment
    const isStaging = landingPageUrl.toLowerCase().includes('staging') ||
                     window.location.hostname.includes('staging') ||
                     window.location.hostname.includes('localhost');
    
    // Wait for the official PostHog plugin to initialize, then add our enhancements
    const setupEnhancements = () => {
      if (!window.posthog) {
        // Wait for PostHog to be available
        setTimeout(setupEnhancements, 100);
        return;
      }
      
      // Only add enhancements if PostHog is initialized and not in staging
      if (!isStaging && window.posthog) {
        console.log('Setting up PostHog enhancements for error tracking and cross-domain linking...');
        
        // Get cross-domain URLs for session sharing
        const crossDomainUrls: string[] = [];
        
        if (landingPageUrl) {
          try {
            const landingPageDomain = new URL(landingPageUrl).hostname;
            crossDomainUrls.push(landingPageDomain);
          } catch (e) {
            console.warn('Invalid LANDING_PAGE_URL:', landingPageUrl);
          }
        }
        
        // Enable cross-domain session sharing if we have external domains
        if (crossDomainUrls.length > 0) {
          console.log('PostHog cross-domain tracking enabled for:', crossDomainUrls);
        }

        // Set up automatic exception handling
        const originalErrorHandler = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
          window.posthog.capture('$exception', {
            $exception_message: message,
            $exception_source: source,
            $exception_lineno: lineno,
            $exception_colno: colno,
            $exception_stack: error?.stack,
            $exception_type: 'javascript_error',
            $exception_url: window.location.href
          });
          
          if (originalErrorHandler) {
            return originalErrorHandler.call(this, message, source, lineno, colno, error);
          }
          return false;
        };

        // Handle unhandled promise rejections
        const originalUnhandledRejection = window.onunhandledrejection;
        window.onunhandledrejection = function(event) {
          window.posthog.capture('$exception', {
            $exception_message: event.reason?.message || 'Unhandled Promise Rejection',
            $exception_stack: event.reason?.stack,
            $exception_type: 'unhandled_promise_rejection',
            $exception_url: window.location.href
          });
          
          if (originalUnhandledRejection) {
            return originalUnhandledRejection.call(this, event);
          }
        };

        // Set up React error boundary for catching React errors
        const originalConsoleError = console.error;
        console.error = function(...args) {
          // Check if this looks like a React error
          const errorMessage = args.join(' ');
          if (errorMessage.includes('React') || errorMessage.includes('Component')) {
            window.posthog.capture('$exception', {
              $exception_message: errorMessage,
              $exception_type: 'react_error',
              $exception_url: window.location.href
            });
          }
          
          return originalConsoleError.apply(console, args);
        };
        
        // Helper function for cross-domain navigation
        window.posthogNavigate = (url: string, trackingData: Record<string, any> = {}) => {
          // Track the navigation event
          window.posthog.capture('external_navigation', {
            destination_url: url,
            new_tab: true,
            ...trackingData
          });
          
          // Add PostHog cross-domain parameters to URL
          const crossDomainUrl = window.posthog.get_cross_domain_linking_url ? 
            window.posthog.get_cross_domain_linking_url(url) : url;
          
          window.open(crossDomainUrl, '_blank', 'noopener,noreferrer');
          return crossDomainUrl;
        };
      } else {
        console.log(
          isStaging ? 'PostHog disabled in staging environment' : 'PostHog not available'
        );
        
        // Provide mock functions for development
        window.posthogNavigate = (url: string) => {
          window.open(url, '_blank', 'noopener,noreferrer');
          return url;
        };
      }
    };
    
    // Start the enhancement setup
    setupEnhancements();
  }, [siteConfig]);

  return <>{children}</>;
};

export default PostHogProvider; 