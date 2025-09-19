// Application configuration and environment variables
// Centralizes all environment variable access for better security and maintainability

// Site configuration
export const siteConfig = {
  name: 'Osteopathie Alsen',
  description: 'Osteopathie in Hamburg-Rotherbaum & Eimsbüttel. Behandlung 45–60 Min., 150 €. Kostenerstattung möglich.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://osteoalsen.de',
  author: 'Joshua Alsen',
  location: 'Hamburg, Deutschland'
};

// API configuration
export const apiConfig = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  contactFormEndpoint: process.env.CONTACT_FORM_ENDPOINT,
  netlifyBuildHook: process.env.NETLIFY_BUILD_HOOK
};

// Analytics configuration
export const analyticsConfig = {
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_TRACKING_ID
};

// Security configuration
export const securityConfig = {
  allowedDomains: ['osteoalsen.de', 'www.osteoalsen.de'],
  allowedImageDomains: ['osteoalsen.de'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedFileTypes: ['.md', '.jpg', '.jpeg', '.png', '.webp']
};

// Validation functions
export function validateApiKey(key: string | undefined, keyName: string): boolean {
  if (!key) {
    console.warn(`${keyName} is not configured`);
    return false;
  }

  if (key.length < 10) {
    console.error(`${keyName} appears to be invalid (too short)`);
    return false;
  }

  return true;
}

export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}