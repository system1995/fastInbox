/**
 * EmailTemplate.js
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
    category : {
      type: 'string',
      enum: ['trade','leadOpportunity','organization','task','project'],
      defaultsTo: 'trade'
    },
    description : {
      type: 'string',
    },
    templateCategory : {
      model: 'TemplateCategory'
    },
  }
};
