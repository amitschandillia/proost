'use strict';

// const { generateText } = require('../dummy');
//
// test('should output name and age...', () => {
//   const text = generateText('Amit', 100);
//   expect(text).toBe('Amit is 100 years old.');
// });



import { hello, add } from '../dummy';

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
