const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// connection.connect((err) => {
//   if (err) throw err;
//   console.log("Connected to MySQL!");
// });

connection.connect((err) => {
  if (err) {
    console.error("❌ Connection error: " + err.stack);
    return;
  }
  console.log("✅ Connected to MySQL Database!");

  // 3. Paste your exact query from queries.sql here
  const myQuery = `
        SELECT 
            reviews.id AS review_id,
            reviews.reviewer_name,
            reviews.rating,
            reviews.text AS review_text,
            restaurants.name AS restaurant_name,
            addresses.street,
            addresses.city,
            types.name AS cuisine_name
        FROM reviews
        INNER JOIN restaurants ON reviews.restaurant_id = restaurants.id
        INNER JOIN addresses   ON restaurants.address_id = addresses.id
        INNER JOIN types       ON restaurants.type_id = types.id
        WHERE reviews.rating > 3;
    `;

  // 4. Execute the query
  connection.query(myQuery, (queryErr, results) => {
    if (queryErr) {
      console.error("❌ Query failed: ", queryErr);
    } else {
      console.log("\n📊 --- Query Results ---");
      console.table(results); // This prints a beautiful grid in your terminal!
    }

    // 5. Always close the connection when the query finishes
    connection.end();
  });
});
