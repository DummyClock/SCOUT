import "./App.css";
import React from 'react';
import axios from "axios";
import {
  Accordion, AccordionSummary, AccordionDetails,
  Drawer,
  MenuItem,
  Paper,
  Select,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  ToggleButton, ToggleButtonGroup,
  Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { CollapsibleRow } from "./CollapsibleRow";

const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const restNo = "04162";
const daypartByProductData = [
  {
    name: "Sandwich - CFA",
    total: { sold: 145, wasted: 25, promo: 5 },
    dayparts: [
      { name: "Breakfast", sold: 40, wasted: 5, promo: 1 },
      { name: "Lunch", sold: 60, wasted: 10, promo: 2 },
      { name: "Afternoon", sold: 25, wasted: 5, promo: 1 },
      { name: "Dinner", sold: 20, wasted: 5, promo: 1 }
    ]
  },
  {
    name: "Sandwich - CFA Deluxe w/ American",
    total: { sold: 175, wasted: 75, promo: 5 },
    dayparts: [
      { name: "Breakfast", sold: 50, wasted: 15, promo: 1 },
      { name: "Lunch", sold: 70, wasted: 30, promo: 2 },
      { name: "Afternoon", sold: 35, wasted: 20, promo: 1 },
      { name: "Dinner", sold: 20, wasted: 10, promo: 1 }
    ]
  }
];


function App() {
  // StateVariables
  const [salesCategory, setSalesCategory] = React.useState('Protein');  // default to use 'Protein'
  const [salesMixData, setSalesMixData] = React.useState(null);

  // State functions
  const handleSalesCategory = (e, newCategory) => {
    setSalesCategory(newCategory);
  };

  

  // Run functions after components mount
  React.useEffect(() => {
    console.log("Selected category: ", salesCategory)
  const fetchData = async () => {
    try {
      const response = await axios.post(`http://localhost:${REACT_APP_SERVER_PORT}/salesMix`, {
        category: salesCategory,
        startDate: "", // Update later
        endDate: "",   // Update later
      });

      setSalesMixData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching sales mix data:", error);
    }
  };

  fetchData();
}, [salesCategory]); // Runs only when category changes


  // Render function
  return (
    <div id='parent' style={{ paddingLeft: 0, paddingRight: 0}}>
      <div id="banner">
        <p>SCOUT</p>
        <h2>{restNo}</h2>
        <button><SettingsIcon /></button>
      </div>

      <ToggleButtonGroup id = "sales-category-filter"
          value={salesCategory}
          exclusive
          onChange={handleSalesCategory}
          aria-label="sales-category"
        >
          <ToggleButton value="Protein" aria-label="protein">
            <Typography>Protein</Typography>
          </ToggleButton>
          <ToggleButton value="Prep" aria-label="Prep">
            <Typography>Prep</Typography>
          </ToggleButton>
          <ToggleButton value="Produce" aria-label="produce">
            <Typography>Produce</Typography>
          </ToggleButton>
      </ToggleButtonGroup>

      <div id="sales-data-filter">
        {/** HTML version */}
        <select name="sales-data" id="sales-data">
          <option value="summary">Summary</option>
          <option value="filets">Filets</option>
          <option value="nuggets">Nuggets</option>
          <option value="spicy">Spicy</option>
          <option value="strips">Strips</option>
        </select> 

        {/** MUI version */}
        <Select id="sales-data" defaultValue="summary">
          <MenuItem value="summary">Summary</MenuItem>
          <MenuItem value="filets">Filets</MenuItem>
          <MenuItem value="nuggets">Nuggets</MenuItem>
          <MenuItem value="spicy">Spicy</MenuItem>
          <MenuItem value="strips">Strips</MenuItem>
        </Select>
      </div>

      {/** Collapsable Cards (WIP) */}
      <Accordion 
        style={{ 
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
                <TableHead  style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">Breakfast</TableCell>
                    <TableCell align="right">Lunch</TableCell>
                    <TableCell align="right">Afternoon</TableCell>
                    <TableCell align="right">Dinner</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Example data */}
                  <TableRow>
                    <TableCell component="th" scope="row">Sold</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">70</TableCell>
                    <TableCell align="right">25</TableCell>
                    <TableCell align="right">45</TableCell>
                    <TableCell align="right">145</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Wasted</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">100</TableCell>
                    <TableCell align="right">45</TableCell>
                    <TableCell align="right">25</TableCell>
                    <TableCell align="right">175</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Promo Freed</TableCell>
                    <TableCell align="right">-</TableCell>
                    <TableCell align="right">4</TableCell>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">3</TableCell>
                    <TableCell align="right">10</TableCell>
                  </TableRow>
                  {/** Total */}
                  <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Total</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>-</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>{145}</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>{175}</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>{10}</TableCell>
                    <TableCell align="right" style={{ fontWeight: 'bold' }}>{}</TableCell>
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
    </div>
  );
}

export default App;
