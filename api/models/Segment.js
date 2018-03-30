/**
 * Segment.js
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
    /* Json Object
      [{"gender":'male',"age":'22',"device":'iphone'}] */
    filtres:{
      type:'json',
    },
    lists : {
      collection: 'List',
    },
    exports : {
      collection: 'Export',
      via : 'segments',
    },

  }
};
