import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export function CollapsibleRow({ row }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.name}
        </TableCell>
        <TableCell align="right">{row.total.sold}</TableCell>
        <TableCell align="right">{row.total.wasted}</TableCell>
        <TableCell align="right">{row.total.promo}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="subtitle2" gutterBottom>Daypart Breakdown</Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Daypart</TableCell>
                    <TableCell align="right">Sold</TableCell>
                    <TableCell align="right">Wasted</TableCell>
                    <TableCell align="right">Promo'd</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.dayparts.map((part) => (
                    <TableRow key={part.name}>
                      <TableCell>{part.name}</TableCell>
                      <TableCell align="right">{part.sold}</TableCell>
                      <TableCell align="right">{part.wasted}</TableCell>
                      <TableCell align="right">{part.promo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}