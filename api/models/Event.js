/**
 * Event.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mongodbServer',
  attributes: {
    date : {
      type: 'datetime',
    },
    type : {
      type: 'string',
      enum: ['error','warning','information'],
      defaultsTo: 'information'
    },
    info : {
      type: 'string',
    },
  }
};
