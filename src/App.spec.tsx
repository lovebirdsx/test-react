import { render } from '@testing-library/react';
import App from './App';
import { describe } from 'vitest';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).not.toBeNull();
  });
});
