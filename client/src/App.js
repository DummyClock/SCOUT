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
import ScoutLogo from './assets/images/scout_logo.png';
import { ProductCard } from "./components/ProductCard";

const REACT_APP_SERVER_PORT = process.env.REACT_APP_SERVER_PORT;
const restNo = "04162";

function App() {
  // StateVariables
  const [salesCategory, setSalesCategory] = React.useState('Protein');  // default to use 'Protein'
  const [salesMixData, setSalesMixData] = React.useState(null);
  const [menuItems, setMenuItems] = React.useState(['summary']);

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
      if (response.data?.data) {  // Dynamically fill dropdown menu based on data passed in
        const items = ['summary', ...Object.keys(response.data.data)];
        setMenuItems(items);
      }
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
        <div id="banner-left">
          <img src={ScoutLogo} alt="Sales Console for Observing Usage Totals" className="banner-icon"/>
          <span className="banner-text">SCOUT</span>
        </div>
        <div id="banner-center"></div>
        <div id="banner-right">
          <h2 className="banner-text">{restNo}</h2>
          <button className="banner-icon circular"><SettingsIcon /></button>
        </div>
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
          <ToggleButton value="Prep" aria-label="Prep" disabled>
            <Typography>Prep</Typography>
          </ToggleButton>
          <ToggleButton value="Produce" aria-label="produce" disabled>
            <Typography>Produce</Typography>
          </ToggleButton>
      </ToggleButtonGroup>

      <div id="sales-data-filter">
        {/** HTML version 
        <select name="sales-data" id="sales-data">
          <option value="summary">Summary</option>
          <option value="filets">Filets</option>
          <option value="nuggets">Nuggets</option>
          <option value="spicy">Spicy</option>
          <option value="strips">Strips</option>
        </select> 
        */}

        {/** MUI version */}
        <Select id="sales-data" defaultValue="summary">
          {menuItems.map((item) => (
            <MenuItem key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </MenuItem>
          ))}
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
