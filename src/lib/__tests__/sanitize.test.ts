// Mock DOMPurify before import
const mockSanitize = jest.fn();
jest.mock('dompurify', () => ({
  sanitize: mockSanitize,
}));

import { sanitizeHtml, sanitizeBlogContent } from '../sanitize';

describe('sanitize utilities', () => {
  beforeEach(() => {
    mockSanitize.mockClear();
    // Mock window as defined
    Object.defineProperty(global, 'window', {
      value: {},
      writable: true,
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('sanitizeHtml', () => {
    it('calls DOMPurify.sanitize with correct config', () => {
      const html = '<p>Test content</p>';
      const expectedOutput = '<p>Test content</p>';
      mockSanitize.mockReturnValue(expectedOutput);

      const result = sanitizeHtml(html);

      expect(mockSanitize).toHaveBeenCalledWith(html, expect.objectContaining({
        ALLOWED_TAGS: expect.arrayContaining(['p', 'br', 'strong', 'em', 'u', 'ol', 'ul', 'li']),
        ALLOWED_ATTR: expect.arrayContaining(['class', 'id']),
        FORBID_TAGS: expect.arrayContaining(['script', 'object', 'embed', 'form']),
        FORBID_ATTR: expect.arrayContaining(['onerror', 'onload', 'onclick']),
      }));
      expect(result).toBe(expectedOutput);
    });

    it('strips HTML tags when window is undefined (SSR)', () => {
      delete (global as any).window;

      const html = '<p>Test content</p><script>alert("xss")</script>';
      const result = sanitizeHtml(html);

      expect(result).toBe('Test contentalert("xss")');
      expect(mockSanitize).not.toHaveBeenCalled();
    });

    it('falls back to stripping tags when DOMPurify throws error', () => {
      mockSanitize.mockImplementation(() => {
        throw new Error('DOMPurify error');
      });

      const html = '<p>Test content</p>';
      const result = sanitizeHtml(html);

      expect(result).toBe('Test content');
    });
  });

  describe('sanitizeBlogContent', () => {
    it('calls DOMPurify.sanitize with extended blog config', () => {
      const html = '<h1>Title</h1><p>Content</p>';
      const expectedOutput = '<h1>Title</h1><p>Content</p>';
      mockSanitize.mockReturnValue(expectedOutput);

      const result = sanitizeBlogContent(html);

      expect(mockSanitize).toHaveBeenCalledWith(html, expect.objectContaining({
        ALLOWED_TAGS: expect.arrayContaining(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'code', 'pre']),
        ALLOWED_ATTR: expect.arrayContaining(['class', 'id', 'href', 'target', 'rel']),
      }));
      expect(result).toBe(expectedOutput);
    });

    it('allows more tags than basic sanitizeHtml', () => {
      const html = '<h1>Title</h1><blockquote>Quote</blockquote><code>code</code>';
      mockSanitize.mockReturnValue(html);

      sanitizeBlogContent(html);

      const calledConfig = mockSanitize.mock.calls[0][1];
      expect(calledConfig.ALLOWED_TAGS).toContain('h1');
      expect(calledConfig.ALLOWED_TAGS).toContain('blockquote');
      expect(calledConfig.ALLOWED_TAGS).toContain('code');
    });
  });
});