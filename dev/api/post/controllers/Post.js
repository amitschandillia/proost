'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation () to implement custom controller functions
 */

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {
    let singlePostQueried = false;
    if(ctx.query._limit && ctx.query.slug) {
      if(ctx.query._limit == 1) {
        singlePostQueried = true;
      }
    }
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.post.search(ctx.query);
    } else {
      entities = await strapi.services.post.find(ctx.query);
    }

    if(singlePostQueried) {
      const sanitized = sanitizeEntity(entities[0], { model: strapi.models.post });
      const newView = sanitized.views + 1;
      strapi.query('post').update({ id: sanitized.id }, {
        views: newView
      });
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.post })
    );
  },
};
