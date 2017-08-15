const pg = require("pg");

const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let newPerson = {
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
};

knex.insert(newPerson).into('famous_people')
  .then(function(rows) {
    console.log(rows);
  })
  .catch(function(error){
    console.log(error);
  })
  .finally(function(result){
    knex.destroy();
})
