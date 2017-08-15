const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name=$1;", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Searching ...")
    for (i in result.rows){
      var A = result.rows[i];
    console.log(`Found ${result.rows.length} person(s) by the name-${A.id}: ${A.first_name} ${A.last_name}, born ${A.birthdate}`)}; //output: 1
    client.end();
  });
});