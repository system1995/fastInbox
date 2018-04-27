/**
 * List.js
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
    subscribers : {
      collection: 'Subscriber',
      via :'lists',
    },
    segments : {
      collection: 'Segment',
      via :'lists',
    },
    imports : {
      collection: 'Import',
      via : 'lists',
    },
    exports : {
      collection: 'Export',
      via : 'lists',
    },
    beforeDestroy: function(criteria, cb) {
      List.find(criteria).exec(function(err, listToDestroy) {
        listToDestroy.subscribers.remove();
      });
    }
  }
};



