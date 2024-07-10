import {
  buildUrl,
  addTimeStampForRefresh,
  urlToString,
} from './CustomViewUtils';

describe('CustomViewUtils', () => {
  describe('buildUrl', () => {
    it('should return a URL object with the provided value', () => {
      const value = 'https://example.com';
      const url = buildUrl(value);
      expect(url instanceof URL).toBe(true);
      expect(url.toString()).toBe('https://example.com/');
    });

    it('should return a URL object with the provided value', () => {
      const value = '/web-engines/pactl_trucking/admin/#/crossBorderRecycle';
      const url = buildUrl(value);
      expect(url instanceof URL).toBe(true);
      expect(url.toString()).toBe(
        'http://localhost/web-engines/pactl_trucking/admin/#/crossBorderRecycle',
      );
    });
  });

  describe('addTimeStampForRefresh', () => {
    it('should return a new URL object with a timestamp query parameter', () => {
      const value = new URL('https://example.com');
      const refreshedUrl = addTimeStampForRefresh(value);
      expect(refreshedUrl instanceof URL).toBe(true);
      expect(refreshedUrl.href).toMatch(
        /https:\/\/example.com\/\?iframe-refresh=\d+/,
      );
    });

    it('should return a new URL object with a timestamp query parameter', () => {
      const value = new URL(
        'https://example.com/skp-simple-landing?d=%2Fprojects',
      );
      const refreshedUrl = addTimeStampForRefresh(value);
      expect(refreshedUrl instanceof URL).toBe(true);
      expect(refreshedUrl.href).toMatch(
        /https:\/\/example.com\/skp-simple-landing\?d=%2Fprojects&iframe-refresh=\d+/,
      );
    });

    it('should return a new URL object with a timestamp query parameter', () => {
      const value = new URL(
        'https://example.com/skp-simple-landing?d=%2Fprojects#test',
      );
      const refreshedUrl = addTimeStampForRefresh(value);
      expect(refreshedUrl instanceof URL).toBe(true);
      expect(refreshedUrl.href).toMatch(
        /https:\/\/example.com\/skp-simple-landing\?d=%2Fprojects&iframe-refresh=\d+#test/,
      );
    });
  });

  describe('urlToString', () => {
    it('should return the string representation of the provided URL', () => {
      const value = new URL(
        'https://example.com/skp-simple-landing?d=%2Fprojects#test',
      );
      const urlStr = urlToString(value);
      expect(typeof urlStr).toBe('string');
      expect(urlStr).toBe(
        'https://example.com/skp-simple-landing?d=%2Fprojects#test',
      );
    });
  });
});
