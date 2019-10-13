module.exports = {
  /**
   * Retrieve a user record by usrname.
   *
   * @return {Object}
   */

  findOneByUsername: async (ctx) => {
    let data = await strapi.plugins['users-permissions'].services.user.fetch(ctx.params);

    if (data) {
      data = _.omit(data.toJSON ? data.toJSON() : data, ['password', 'resetPasswordToken']);
    }

    // Send 200 `ok`
    ctx.send(data);
  }
};
