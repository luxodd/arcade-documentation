import React from 'react';
import PostHogProvider from '@site/src/components/PostHog/PostHogProvider';

// Root component wrapper that includes PostHog
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
    </PostHogProvider>
  );
} 