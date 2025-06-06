// PostHog enhancements plugin for Docusaurus
// Adds error tracking and cross-domain linking to the official posthog-docusaurus plugin
export default function posthogEnhancementsPlugin() {
  return {
    name: 'posthog-enhancements-plugin',
    // Enhancements are handled by Root component wrapper
  };
} 