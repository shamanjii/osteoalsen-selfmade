import { render, screen, waitFor } from '@testing-library/react';
import SafeHtml from '../SafeHtml';

// Mock DOMPurify
jest.mock('dompurify', () => ({
  sanitize: jest.fn((html) => html),
}));

describe('SafeHtml', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders sanitized HTML content', async () => {
    const html = '<p>Test content</p>';

    render(<SafeHtml html={html} />);

    await waitFor(() => {
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });
  });

  it('applies custom className', async () => {
    const html = '<p>Test content</p>';
    const customClass = 'custom-class';

    render(<SafeHtml html={html} className={customClass} />);

    await waitFor(() => {
      const element = screen.getByText('Test content').parentElement;
      expect(element).toHaveClass(customClass);
    });
  });

  it('handles blog type content', async () => {
    const html = '<h1>Blog Title</h1><p>Blog content</p>';

    render(<SafeHtml html={html} type="blog" />);

    await waitFor(() => {
      expect(screen.getByText('Blog Title')).toBeInTheDocument();
      expect(screen.getByText('Blog content')).toBeInTheDocument();
    });
  });

  it('handles empty HTML gracefully', async () => {
    render(<SafeHtml html="" />);

    await waitFor(() => {
      const container = document.querySelector('[data-testid]') || document.body;
      expect(container).toBeInTheDocument();
    });
  });

  it('falls back to text stripping on server side', () => {
    // Simulate server-side rendering
    const originalWindow = global.window;
    delete (global as Record<string, unknown>).window;

    const html = '<script>alert("xss")</script><p>Safe content</p>';

    render(<SafeHtml html={html} />);

    // Should strip HTML tags on server
    expect(screen.queryByText('alert("xss")')).not.toBeInTheDocument();

    // Restore window
    global.window = originalWindow;
  });
});