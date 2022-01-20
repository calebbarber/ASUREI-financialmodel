var mysql = require('mysql');


/* Will only connect if run from the asurei_data server */
var con = mysql.createConnection({
    host: "hyperion.its.appstate.edu",
    user: "asurei_data",
    password: "aeceiTo6Vae5ohXu"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
