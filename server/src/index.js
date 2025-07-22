require("dotenv").config();
const express = require('express');
const cors = require('cors');
const initDatabase = require('./init_db');
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

    /** Placeholder API to fetch salesMix */
    app.post('/salesMix', async (req, res) => {
      try{
        const category = req.category;
        const startDate = req.startDate;
        const endDate = req.endDate;

        /**
         * Add future code to pick keywords (read from a file)
         * Use keywords to searchDB() -> have logic that'll query all data between those dates
         */

        // Hard-coded placeholder for PROTEIN category
        let query = {
          "Filets": [
            {
              "Sandwich - CFA": {
                "sold": 60,
                "promo": 2,
                "wasted": 0,
                "daypart":{"breakfast": 0, "lunch": 30, "afternoon": 5, "dinner": 25},
              },
              "Sandwich - CFA Deluxe No Cheese": {
                "sold": 60,
                "promo": 2,
                "wasted": 0,
                "daypart":{"breakfast": 0, "lunch": 30, "afternoon": 5, "dinner": 25},
              },
              "Sandwich - CFA Deluxe w/American": {
                "sold": 60,
                "promo": 2,
                "wasted": 0,
                "daypart":{"breakfast": 0, "lunch": 30, "afternoon": 5, "dinner": 25},
              },
              "Sandwich - CFA Deluxe w/Colby Jack": {
                "sold": 60,
                "promo": 2,
                "wasted": 0,
                "daypart":{"breakfast": 0, "lunch": 30, "afternoon": 5, "dinner": 25},
              },
              "Sandwich - CFA Deluxe w/Pepper Jack": {
                "sold": 60,
                "promo": 2,
                "wasted": 0,
                "daypart":{"breakfast": 0, "lunch": 30, "afternoon": 5, "dinner": 25},
              },
            }
          ]
        }

        /** JSON return */
        res.json({
          message: 'Sales Mix Retrived from DB',
          data: query
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