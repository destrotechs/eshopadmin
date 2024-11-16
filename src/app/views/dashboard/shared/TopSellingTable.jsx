import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import React, { useState, useEffect } from 'react';
import apiClient from 'app/auth/apiClient';
import { Link } from 'react-router-dom';
const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;
  const [topselling, setTopSelling] = useState([]);

  useEffect(() => {
    fetchTopSelling();
  }, []);
  const fetchTopSelling = async () => {
    const response = await apiClient.get('/api/dashboard/topselling');
    if (response.status === 200) {
      setTopSelling(response.data.data);
    }
  };
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>top selling products</Title>
        <Select size="small" defaultValue="this_month">
          <MenuItem value="this_month">This Month</MenuItem>
          <MenuItem value="last_month">Last Month</MenuItem>
        </Select>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Name
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Revenue
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Stock Status
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {topselling.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Avatar src={product.product.images[0].img_url} />
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  $
                  {product.product.price > 999
                    ? ((product.product.price * product.quantity) / 1000).toFixed(1) + 'k'
                    : product.product.price * product.quantity}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.product.stock ? (
                    product.product.stock < 20 ? (
                      <Small bgcolor={bgSecondary}>{product.product.stock} available</Small>
                    ) : (
                      <Small bgcolor={bgPrimary}>in stock</Small>
                    )
                  ) : (
                    <Small bgcolor={bgError}>out of stock</Small>
                  )}
                </TableCell>

                <TableCell sx={{ px: 0 }} colSpan={1}>
                  <Link to={`/edit/product/${product.product.id}`}>
                    <IconButton>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TopSellingTable;
