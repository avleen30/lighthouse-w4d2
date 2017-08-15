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

knex('famous_people')
  .select('*')
  .where('last_name', process.argv[2])
  .then(function(rows) {
  console.log("Searching ...");
  for (i in rows){
  let A = rows[i];
  console.log(`Found ${rows.length} person(s) by the name ${A.first_name}:
  --${A.id}: ${A.first_name} ${A.last_name}, born ${A.birthdate}`)
 }
})
  .catch(function(error){
    console.log(error);
  })

  .finally(function(result){
    knex.destroy();
})


