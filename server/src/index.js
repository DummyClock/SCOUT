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
      "products": [
        {
          "name": "Sandwich - CFA",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 216,
                "Tue": 148,
                "Wed": 185,
                "Thu": 153,
                "Fri": 70,
                "Sat": 154
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 97,
                "Tue": 95,
                "Wed": 89,
                "Thu": 112,
                "Fri": 27,
                "Sat": 100
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": 200,
                "Tue": 167,
                "Wed": 193,
                "Thu": 171,
                "Fri": null,
                "Sat": 130
              }
            }
          ],
          "totals_daily": {
            "Mon": 513,
            "Tue": 410,
            "Wed": 467,
            "Thu": 436,
            "Fri": 97,
            "Sat": 384
          }
        },
        {
          "name": "Sandwich - CFA Dlx No Cheese",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 2,
                "Tue": 5,
                "Wed": 9,
                "Thu": 4,
                "Fri": 3,
                "Sat": 7
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 4,
                "Tue": 2,
                "Wed": 4,
                "Thu": 5,
                "Fri": 2,
                "Sat": 3
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": null,
                "Tue": 11,
                "Wed": 5,
                "Thu": 9,
                "Fri": null,
                "Sat": 7
              }
            }
          ],
          "totals_daily": {
            "Mon": 6,
            "Tue": 18,
            "Wed": 18,
            "Thu": 18,
            "Fri": 5,
            "Sat": 17
          }
        },
        {
          "name": "Sandwich - Spicy",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 180,
                "Tue": 155,
                "Wed": 170,
                "Thu": 140,
                "Fri": 65,
                "Sat": 145
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 85,
                "Tue": 90,
                "Wed": 80,
                "Thu": 105,
                "Fri": 25,
                "Sat": 95
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": 190,
                "Tue": 160,
                "Wed": 185,
                "Thu": 165,
                "Fri": null,
                "Sat": 120
              }
            }
          ],
          "totals_daily": {
            "Mon": 455,
            "Tue": 405,
            "Wed": 435,
            "Thu": 410,
            "Fri": 90,
            "Sat": 360
          }
        },
        {
          "name": "Sandwich - Spicy Dlx No Cheese",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 5,
                "Tue": 7,
                "Wed": 6,
                "Thu": 8,
                "Fri": 4,
                "Sat": 9
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 3,
                "Tue": 4,
                "Wed": 2,
                "Thu": 6,
                "Fri": 3,
                "Sat": 5
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": null,
                "Tue": 10,
                "Wed": 7,
                "Thu": 12,
                "Fri": null,
                "Sat": 8
              }
            }
          ],
          "totals_daily": {
            "Mon": 8,
            "Tue": 21,
            "Wed": 15,
            "Thu": 26,
            "Fri": 7,
            "Sat": 22
          }
        },
        {
          "name": "Sandwich - Spicy Dlx w/ American",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 40,
                "Tue": 35,
                "Wed": 38,
                "Thu": 32,
                "Fri": 15,
                "Sat": 28
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 20,
                "Tue": 18,
                "Wed": 22,
                "Thu": 19,
                "Fri": 8,
                "Sat": 15
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": 30,
                "Tue": 25,
                "Wed": 28,
                "Thu": 26,
                "Fri": null,
                "Sat": 20
              }
            }
          ],
          "totals_daily": {
            "Mon": 90,
            "Tue": 78,
            "Wed": 88,
            "Thu": 77,
            "Fri": 23,
            "Sat": 63
          }
        },
        {
          "name": "Sandwich - Spicy Dlx w/ Colby Jack",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 35,
                "Tue": 30,
                "Wed": 33,
                "Thu": 28,
                "Fri": 12,
                "Sat": 25
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 18,
                "Tue": 15,
                "Wed": 20,
                "Thu": 17,
                "Fri": 7,
                "Sat": 13
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": 25,
                "Tue": 22,
                "Wed": 26,
                "Thu": 24,
                "Fri": null,
                "Sat": 18
              }
            }
          ],
          "totals_daily": {
            "Mon": 78,
            "Tue": 67,
            "Wed": 79,
            "Thu": 69,
            "Fri": 19,
            "Sat": 56
          }
        },
        {
          "name": "Sandwich - Spicy Dlx w/ Pepper Jack",
          "dayparts": [
            {
              "name": "Lunch",
              "time": "2 - Lunch",
              "daily_sales": {
                "Mon": 45,
                "Tue": 40,
                "Wed": 42,
                "Thu": 38,
                "Fri": 18,
                "Sat": 32
              }
            },
            {
              "name": "Afternoon",
              "time": "3 - Afternoon",
              "daily_sales": {
                "Mon": 22,
                "Tue": 20,
                "Wed": 24,
                "Thu": 21,
                "Fri": 9,
                "Sat": 17
              }
            },
            {
              "name": "Dinner",
              "time": "4 - Dinner",
              "daily_sales": {
                "Mon": 32,
                "Tue": 28,
                "Wed": 30,
                "Thu": 29,
                "Fri": null,
                "Sat": 22
              }
            }
          ],
          "totals_daily": {
            "Mon": 99,
            "Tue": 88,
            "Wed": 96,
            "Thu": 88,
            "Fri": 27,
            "Sat": 71
          }
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
})

// Run Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
