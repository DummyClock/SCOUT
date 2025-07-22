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

export function ProductCard({productName, productData}) {
    // State variables
    const [total, setTotal] = React.useState("--");
    const [sold, setSold] = React.useState("--");
    const [promo, setPromo] = React.useState("--");
    const [waste, setWaste] = React.useState("--");
    const [cardType, setCardType] = React.useState('overview');

    React.useEffect(() => {
        if (productData && productData.length > 0) {
            let totalSold = 0;
            let totalPromo = 0;
            let totalWaste = 0;

            // Loop through the array of product groups
            productData.forEach(itemGroup => {
                // Loop through each product in the group
                Object.values(itemGroup).forEach(product => {
                    totalSold += product.sold || 0;
                    totalPromo += product.promo || 0;
                    totalWaste += product.wasted || 0;
                });
            });

            setSold(totalSold);
            setPromo(totalPromo);
            setWaste(totalWaste);
            setTotal(totalSold + totalPromo + totalWaste);
        }
    }, [productData]);
    
    // Functions
    /** Change the card type , changes display */
    const changeCardType = (event, newType) => {
        if (newType !== null) {
            setCardType(newType);
        }
    };

    // Render
    return (
        <>
        {/** Collapsable Cards (WIP) */}
        <Accordion style={{ 
            marginTop: 20,
            width: '95%',
            minWidth: '420px',
            maxWidth: '600px',
            margin: '20px auto',
            boxShadow: '0 4px 2px rgba(0,0,0,0.25)',
            }}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div style={{ display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center" }}>
                    <p>image here</p>
                    <Typography variant="h6">{productName}</Typography>
                    <div>
                    <Typography variant="h5">TOTAL</Typography>
                    <Typography variant="h3">{total}</Typography>
                    </div>
                </div>
            </AccordionSummary>

            <AccordionDetails>
                <div class = "data-display">
                    <ToggleButtonGroup
                        value={cardType}
                        exclusive
                        onChange={changeCardType}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 2,
                            '& .MuiToggleButton-root': {
                                px: 3
                            }
                        }}
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
                        {cardType == 'overview' && <Table size="small" aria-label="sales-data-table">
                            <TableBody>
                            {/* Example data */}
                            <TableRow>
                                <TableCell component="th" scope="row">Sold</TableCell>
                                <TableCell align="right">{sold}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Wasted</TableCell>
                                <TableCell align="right">{waste}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Promo Freed</TableCell>
                                <TableCell align="right">{promo}</TableCell>
                            </TableRow>
                            </TableBody>
                        </Table>}

                        {cardType == 'by-product' && 
                            <Table size="small" aria-label="sales data table">
                                <TableHead style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Sold</TableCell>
                                        <TableCell align="right">Wasted</TableCell>
                                        <TableCell align="right">Promo'd</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Map through products */}
                                    {productData?.map((itemGroup) => 
                                        Object.entries(itemGroup).map(([name, data]) => (
                                            <TableRow key={name}>
                                                <TableCell component="th" scope="row">{name}</TableCell>
                                                <TableCell align="right">{data.sold}</TableCell>
                                                <TableCell align="right">{data.wasted}</TableCell>
                                                <TableCell align="right">{data.promo}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                    {/* Total Row */}
                                    <TableRow style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                                        <TableCell component="th" scope="row" style={{ fontWeight: 'bold' }}>Total</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>{sold}</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>{waste}</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>{promo}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>}
                    </TableContainer>

                    

            </div>
            </AccordionDetails>
        </Accordion>
        
        </>
    )
}