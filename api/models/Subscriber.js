/**
 * Subscriber.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mongodbServer',
  attributes: {
    name : {
      type: 'string',
    },
    email : {
      type: 'string',
    },
    phoneNumber : {
      type: 'string',
    },
    lists : {
      collection: 'List',
      via: 'subscribers',
    },

    beforeDestroy: function(criteria, cb) {
      Subscriber.find(criteria).exec(function(err, subscriberToDestroy) {
        subscriberToDestroy.lists.remove();
      });
    }
  }
};

