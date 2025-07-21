require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
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
      CFA: {
        "Sandwich - CFA": {
          Lunch: 99.0,
          Afternoon: 49.0,
          Dinner: 80.0
        },
        "Sandwich - CFA Dlx No Cheese": {
          Lunch: 90.0,
          Afternoon: 55.0,
          Dinner: 99.0
        },
        "Sandwich - CFA Dlx w/ American": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - CFA Dlx w/ Colby Jack": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - CFA Dlx w/ Pepper Jack": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        }
      },
      Spicy: {
        "Sandwich - Spicy": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - Spicy Dlx No Cheese": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - Spicy Dlx w/ American": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - Spicy Dlx w/ Colby Jack": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Sandwich - Spicy Dlx w/ Pepper Jack": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        }
      },
      Nugget: {
        "Nuggets, 12 Count": {
          Breakfast: 1.0,
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Nuggets, 30 Count": {
          Breakfast: 1.0,
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Nuggets, 5 Count": {
          Breakfast: 1.0,
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Nuggets, 8 Count": {
          Breakfast: 1.0,
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        }
      },
      Strip: {
        "Strips, 2 Count": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Strips, 3 Count": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        },
        "Strips, 4 Count": {
          Lunch: 2.0,
          Afternoon: 3.0,
          Dinner: 4.0
        }
      }
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
})

// Run Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
