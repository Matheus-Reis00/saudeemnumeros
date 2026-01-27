export const theme = {
    colors: {
        primary: '#10B981',
        primaryHover: '#059669',
        secondary: '#3B82F6',
        secondaryHover: '#2563EB',
        background: '#F9FAFB',
        surface: '#FFFFFF',
        text: '#111827',
        textLight: '#6B7280',
        border: '#E5E7EB',
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        ads: '#FFFBEB',
    },
    fonts: {
        main: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    },
    breakpoints: {
        mobile: '576px',
        tablet: '768px',
        desktop: '1024px',
        large: '1200px',
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px',
    },
};

export type ThemeType = typeof theme;
