'use strict';

const markdown = require( "markdown" ).markdown;
const h2p = require('html2plaintext');
const slugify = require('slugify');
const randomInt = require('random-int');

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
    // Generate read time
    if (model.body) {
      model.readTime = readTime(model.body);
    }
    // Generate slug
    if(model.title) {
      if(!model.slug) {
        model.slug = slugify(model.title).toLowerCase().trim();
      } else if(model.slug.trim().length < 1) {
        model.slug = slugify(model.title).toLowerCase().trim();
      }
    }
    model.views = randomInt(53, 119);
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
    // Generate read time
    if (model.getUpdate().body) {
      model.update({
        readTime:  readTime(model.getUpdate().body)
      });
    }
    // Generate slug
    if(model.getUpdate().title) {
      if(!model.getUpdate().slug) {
        model.update({
          slug: slugify(model.getUpdate().title).toLowerCase().trim(),
        });
      } else if(model.getUpdate().slug.trim().length < 1) {
        model.update({
          slug: slugify(model.getUpdate().title).toLowerCase().trim(),
        });
      }
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
