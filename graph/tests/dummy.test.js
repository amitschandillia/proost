'use strict';

// const { generateText } = require('../dummy');
//
// test('should output name and age...', () => {
//   const text = generateText('Amit', 100);
//   expect(text).toBe('Amit is 100 years old.');
// });



import { hello } from '../dummy';

describe('hello', () => {
  it('Should output hello', () => {
    expect(hello()).toBe('Hello');
  });
});
