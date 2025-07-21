import "./App.css";
import React from 'react';
import axios from "axios";
import {
  Accordion, AccordionSummary, AccordionDetails,
  Button,
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

const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const restNo = "04162";

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
              <Typography variant="h3">120</Typography>
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
              <ToggleButton value="summary" aria-label="summary">
                <Typography>Summary</Typography>
              </ToggleButton>
              <ToggleButton value="by-product" aria-label="by-product">
                <Typography>By Product</Typography>
              </ToggleButton>
            </ToggleButtonGroup>



            {/** Table (summary)*/}
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
                    <TableCell align="right">175</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/** Table (by product)*/}
            <TableContainer component={Paper}>
              <Table size="small" aria-label="sales data table">
                <TableHead  style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Sold</TableCell>
                    <TableCell align="right">Waste</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Example data */}
                  <TableRow>
                    <TableCell component="th" scope="row">Original Sandwich</TableCell>
                    <TableCell align="right">145</TableCell>
                    <TableCell align="right">25</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">Spicy Sandwich</TableCell>
                    <TableCell align="right">175</TableCell>
                    <TableCell align="right">75</TableCell>
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
