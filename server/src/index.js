require("dotenv").config();
const express = require('express');
const cors = require('cors');
const initDatabase = require('./init_db');
const db = require('./db');
const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));
console.log(`CORS enabled for: ${process.env.CLIENT_ORIGIN}`);

// Debug middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Run DB initialization and then start the server
initDatabase()
  .then(() => {
    // RESTful API Endpoints
    /** Test API */
    app.get('/hello', async (req, res) => {
      res.json({ message: 'Hello, this is the server'});
    });

    /**API to fetch salesMix */
    app.post('/salesMix', async (req, res) => {
      try{
        let { category,startDate, endDate } = req.body; // revert 'let' to 'const' later

        // TEMPORARY (DELETE LATER) --------------------
        startDate = "2025-07-23"; 
        endDate = "2025-07-23";

        // Keywords (Hardcoded for now, in the future should be read from a file)
        const keyword_collection = {
          Protein: {
            Filets: ['%Sandwich%CFA%', 'Filet - CFA'],
            Spicy: ['%Sandwich%Spicy%', 'Filet - Spicy'],
            Nuggets: ['Nuggets, %', '%Nugget Tray%'],
            Strips: ['Strips, %', '%Strips Tray%']
          },
          Prep: {}
        };

        // Get array of keys (subcategories)
        const subcategories = Object.keys(keyword_collection[category]);

        // Create Object to later convert into JSON
        // Initialize salesMixData directly as an empty object or based on the structure you desire,
        // without the outer 'category' key.
        let salesMixData = {}; // Changed this line

        // Loop through each keyword in the product_keyword_list (from the keyword collection) based on the category matched
        for (const subcategory of subcategories) {
          // Initialize subcategory array within the salesMixData
          salesMixData[subcategory] = [{}]; // Changed this line

          // Get the keywords array for this subcategory
          const keywords = keyword_collection[category][subcategory];

          // Loop through each keyword in the array
          for (const keyword of keywords) {
            console.log(` * Searching ${subcategory} - ${keyword}`);
            const daily_query = `
                  SELECT pname, sold * yield AS total_sold, promo_count * yield AS total_promo
                  FROM SALES
                  NATURAL JOIN PRODUCT
                  WHERE date BETWEEN ? AND ? AND pname LIKE ?;
              `;

            const daypart_query = `
              SELECT pname, sold_and_promo_count * yield AS total_sold_and_promo
              FROM SALES_DAYPART SD
              JOIN SALES S ON S.pid = SD.pid
              JOIN PRODUCT P ON P.pid = SD.pid
              WHERE SD.date BETWEEN  ? AND ? AND pname LIKE ?;     
            `;

            // Run queries && store result
            const result1 = await new Promise((resolve, reject) => {
              db.all(daily_query, [startDate, endDate, keyword], (err, rows) => {
                if (err){
                  reject(err);
                  console.log("Daily Query failed")
                } 
                else resolve(rows);
              });
            });
            const result2 = await new Promise((resolve, reject) => {
              db.all(daypart_query, [startDate, endDate, keyword], (err, rows) => {
                if (err){
                  reject(err);
                  console.log("Daypart Query failed")
                } 
                else resolve(rows);
              });
            });


            // Process result1 and create structured data
            for (const row of result1) {
              // Process daypart data from result2
              const daypartData = result2
                .filter(r => r.pname === row.pname)
                .reduce((acc, curr) => {
                  acc[curr.daypart_name] = curr.total_sold_and_promo;
                  return acc;
                }, {
                  breakfast: 0,
                  lunch: 0,
                  afternoon: 0,
                  dinner: 0
                });

              // Add product data to the structure
              // Access subcategory directly from salesMixData
              salesMixData[subcategory][0][row.pname] = { // Changed this line
                sold: row.total_sold || 0,
                promo: row.total_promo || 0,
                wasted: 0,                    // currently hardcoded !!!!
                daypart: daypartData
              };
            }
          }
        }
        //console.log('Sales Mix Data:', JSON.stringify(salesMixData, null, 2));

        /** JSON return */
        res.json({
          message: 'Sales Mix Retrived from DB',
          data: JSON.parse(JSON.stringify(salesMixData))
        });

      }
      catch(error){
        /* Return a bad request JSON message when salesMix API fails*/
        res.status(500)
          .json({
            status: "Failed",
            message: "Failed to fetch sales mix: " + error.message
          })
      }
    });

    // Run Server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database, server not started:', err);
    process.exit(1); // Exit the process if DB initialization fails
  });