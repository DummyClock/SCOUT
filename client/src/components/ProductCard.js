import React from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Paper,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CollapsibleRow } from "./CollapsibleRow";


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

export function ProductCard({productData}) {

    return (
        <>
        {/** Collapsable Cards (WIP) */}
        <Accordion style={{ 
            marginTop: 20,
            width: '95%',
            maxWidth: '600px',
            margin: '20px auto',
            boxShadow: '0 4px 2px rgba(0,0,0,0.25)' 
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <p>image here</p>
                    <Typography variant="h6">Filet</Typography>
                    <div>
                    <Typography variant="h5">TOTAL</Typography>
                    <Typography variant="h3">320</Typography>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div class = "data-dsiplay-button">
                    <ToggleButtonGroup
                    //value={salesCategory} (replace)
                    exclusive
                    //onChange={handleSalesCategory} (replace)
                    aria-label="sales-category"
                    >
                    <ToggleButton value="overview" aria-label="overview">
                        <Typography>Overview</Typography>
                    </ToggleButton>
                    <ToggleButton value="by-product" aria-label="by-product">
                        <Typography>By Product</Typography>
                    </ToggleButton>
                    </ToggleButtonGroup>



                    {/** Table (Overview)*/}
                    <TableContainer component={Paper}>
                    <Table size="small" aria-label="sales data table">
                        <TableBody>
                        {/* Example data */}
                        <TableRow>
                            <TableCell component="th" scope="row">Sold</TableCell>
                            <TableCell align="right">145</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Wasted</TableCell>
                            <TableCell align="right">175</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Promo Freed</TableCell>
                            <TableCell align="right">10</TableCell>
                        </TableRow>
                        {/** Total */}
                        <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>{145 + 175 + 10}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>

                    {/** Table (By Product)*/}
                    <TableContainer component={Paper}>
                    <Table size="small" aria-label="sales data table">
                        <TableHead  style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">Wasted</TableCell>
                            <TableCell align="right">Promo'd</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {/* Example data */}
                        <TableRow>
                            <TableCell component="th" scope="row">Sandwich - CFA</TableCell>
                            <TableCell align="right">145</TableCell>
                            <TableCell align="right">25</TableCell>
                            <TableCell align="right">5</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Sandwich - CFA Deluxe w/ American</TableCell>
                            <TableCell align="right">175</TableCell>
                            <TableCell align="right">75</TableCell>
                            <TableCell align="right">5</TableCell>
                        </TableRow>
                        {/** Total */}
                        <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>{145 + 175}</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>{25 + 75}</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>{5 + 5}</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>


                    {/** Table (Daypart- Overview)*/}
                    <TableContainer component={Paper}>
                    <Table size="small" aria-label="sales data table">
                        <TableHead style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Breakfast</TableCell>
                            <TableCell align="right">Lunch</TableCell>
                            <TableCell align="right">Afternoon</TableCell>
                            <TableCell align="right">Dinner</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Sold</TableCell>
                            <TableCell align="right">145</TableCell>
                            <TableCell align="right">-</TableCell>  
                            <TableCell align="right">70</TableCell> 
                            <TableCell align="right">25</TableCell>
                            <TableCell align="right">45</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Wasted</TableCell>
                            <TableCell align="right">175</TableCell>
                            <TableCell align="right">-</TableCell>      
                            <TableCell align="right">100</TableCell>     
                            <TableCell align="right">45</TableCell>
                            <TableCell align="right">25</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Promo Freed</TableCell>
                            <TableCell align="right">10</TableCell>
                            <TableCell align="right">-</TableCell>     
                            <TableCell align="right">4</TableCell>      
                            <TableCell align="right">3</TableCell>
                            <TableCell align="right">3</TableCell>
                        </TableRow>
                        {/* Total Row */}
                        <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>320</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>-</TableCell>   
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>145</TableCell> 
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>175</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>100</TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                    </TableContainer>

                    {/** Table (Daypart- By Product)*/}
                    <TableContainer component={Paper}>
                    <Table size="small" aria-label="collapsible sales data table">
                        <TableHead style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="right">Sold</TableCell>
                            <TableCell align="right">Wasted</TableCell>
                            <TableCell align="right">Promo'd</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {daypartByProductData.map((row) => (
                            <CollapsibleRow key={row.name} row={row} />
                        ))}

                        {/* Totals */}
                        <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                            <TableCell style={{ fontWeight: 'bold' }}>Total</TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {daypartByProductData.reduce((sum, r) => sum + r.total.sold, 0)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {daypartByProductData.reduce((sum, r) => sum + r.total.wasted, 0)}
                            </TableCell>
                            <TableCell align="right" style={{ fontWeight: 'bold' }}>
                            {daypartByProductData.reduce((sum, r) => sum + r.total.promo, 0)}
                            </TableCell>
                        </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
            </AccordionDetails>
        </Accordion>
        
        </>
    )
}