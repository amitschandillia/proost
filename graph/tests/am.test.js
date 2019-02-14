'use strict';

const { generateText } = require('../am');

test('should output name and age...', () => {
  const text = generateText('Amit', 100);
  expect(text).toBe('Amit is 100 years old.');
});
