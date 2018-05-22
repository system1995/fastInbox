/**
 * Sever.js
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
    /* host : {
      type: 'string',
    },
    port : {
      type: 'integer',
    },
    userName : {
      type: 'string',
    },
    password : {
      type: 'string',
    },
    domains : {
      collection: 'string',
    },
    IPs : {
      collection: 'string',
    },
    type : {
      type: 'string',
      enum: ['own','mailJet', 'amazon', 'mailChimp'],
      defaultsTo: 'Own'
    },
    events : {
      collection: 'Event',
    }, */
  }
};


