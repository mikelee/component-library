import '@testing-library/jest-dom'

/*
    - Fixes "window.matchMedia is not a function" error in Carousel tests that use <MultipleItems /> with react-flip-toolkit.
    - The error only happened with components that used react-flip-toolkit
    - Documentation found here: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
*/
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })