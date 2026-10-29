import '@testing-library/jest-dom';
import { beforeEach, vi } from 'vitest';

// Mock window.scrollTo for jsdom
window.scrollTo = vi.fn();

beforeEach(() => {
  window.sessionStorage.clear();
  window.history.pushState(null, '', '/');
});
