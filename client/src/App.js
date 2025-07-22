import "./App.css";
import React from 'react';
import axios from "axios";
import {
  Drawer,
  MenuItem,
  Select,
  ToggleButton, ToggleButtonGroup,
  Typography
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { ProductCard } from "./components/ProductCard";

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

      <div id="product-cards">
        {salesMixData?.data && 
          Object.keys(salesMixData.data).map((productCategory) => (
            <ProductCard 
              key={productCategory}
              productName={productCategory}
              productData={salesMixData.data[productCategory]}
            />
          ))
        }
      </div>

    </div>
  );
}

export default App;
