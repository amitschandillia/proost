'use strict';

const markdown = require( "markdown" ).markdown;
const h2p = require('html2plaintext');

function readTime(str) {
  let newStr = h2p(markdown.toHTML(str));
  newStr = newStr.replace(/(\W+ )|(\d+)|(\.+)/g, ' ');
  newStr = newStr.replace(/\s+/g, ' ');
  newStr = newStr.trim().split(/[\s-]+/);
  const wordCount = newStr.length;
  return Math.round(wordCount/265);
}

/**
 * Lifecycle callbacks for the `Post` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  beforeSave: async (model) => {
    if (model.slug) {
      model.slug = model.slug.replace(/ /g, '-').toLowerCase();
    }
    if (model.body) {
      model.readTime = readTime(model.body);
    }
  },

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, result) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, results) => {},

  // Fired before a `fetch` operation.
  // beforeFetch: async (model) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, result) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, result) => {},

  // Before updating a value.
  // Fired before an `update` query.
  beforeUpdate: async (model) => {
    if (model.getUpdate().slug) {
      model.update({
        slug: model.getUpdate().slug.replace(/ /g, '-').toLowerCase()
      });
    }
    if (model.getUpdate().body) {
      model.update({
        readTime:  readTime(model.getUpdate().body)
      });
    }
  },

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, result) => {},

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, result) => {}
};
