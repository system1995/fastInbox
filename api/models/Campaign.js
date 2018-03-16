/**
 * Campaign.js
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
    object : {
      type: 'string',
    },
    senderName : {
      type: 'string',
    },
    /*language : {
      type: 'string',
    },*/
    tags : {
      type: 'Array',
    },
    date : {
      type: 'datetime',
    },
    state : {
      type: 'string',
      enum: ['sent','scheduled','suspended','running','arshived','drafts','deleted'], //min
      defaultsTo: 'drafts'
    },
    SMTPServer:{
      model:'SMTPServer',
      unique: true
    },
    emailTemplate:{
      model:'EmailTemplate',
      columnName: 'id'
    },
    lists : {
      collection: 'List',
    },
    segments : {
      collection: 'Segment',
    },
  }
};




