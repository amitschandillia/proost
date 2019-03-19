import { hello, add } from '../testDummy';

describe('hello', () => {
  it('Should output hello', () => {
    expect(hello()).toBe('Hello');
  });
});

describe('add', () => {
  it('Should add two numbers', () => {
    expect(add(1, 2)).toBe(3);
  });
  it('Should not add strings', () => {
    expect(add(1, '2')).toBe(null);
  });
});
