// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        event_category: 'engagement',
        event_label: 'Niyantrak Admin',
        ...parameters
      });
    }
  } catch (error) {
    // Silently handle analytics errors (ad blockers, etc.)
    console.debug('Analytics tracking blocked or failed:', error);
  }
};

export const trackPageView = (pageName: string) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-03XW3FWG7L', {
        page_title: `Niyantrak - ${pageName}`,
        page_location: window.location.href
      });
    }
  } catch (error) {
    console.debug('Analytics page view blocked or failed:', error);
  }
};

export const trackUserAction = (action: string, category: string = 'user_interaction') => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: 'Admin Panel'
      });
    }
  } catch (error) {
    console.debug('Analytics user action blocked or failed:', error);
  }
};