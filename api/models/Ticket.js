/**
 * Ticket.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
module.exports = {
  connection:'mongodbServer',
  attributes: {
    title : {
      type: 'string',
    },
    txt : {
      type: 'string',
    },
    status : {
      type: 'boolean',
    },
    user:{
      model:'User',
      columnName: 'id'
    },

    /* array of json Object
     [{"idUsr":28,"txt":"text","Date":"21/11/2010"},{"idUsr":28,"txt":"text","Date":"21/11/2010"}]
     */
    historique:{
      type:'array',
    },

  }
};

