var User = {
  // Enforce model schema in the case of schemaless databases
  //schema: true,
  connection: 'mongodbServer',
  attributes: {
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    role : {type: 'string', enum: ['admin', 'manager', 'customer'], defaultsTo: 'customer'},
  }
};
module.exports = User;
