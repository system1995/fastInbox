/**
 * Activity.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'mongodbServer',
  attributes: {
    id : {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true
    },
    activity : {
      type: 'string',
    },
    dateStarted : {
      type: 'datetime',
    },
    dateFinished : {
      type: 'datetime',
    },
    status : {
      type: 'string',
      enum: ['started', 'completed', 'error'],
      defaultsTo: 'started'
    },
    info : {
      type: 'string',
    },
    user:{
      model:'User',
      columnName: 'id'
    },
  }
};

