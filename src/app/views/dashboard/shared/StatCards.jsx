import { Box, Card, Grid, Icon, IconButton, styled, Tooltip } from '@mui/material';
import apiClient from 'app/auth/apiClient';
import { Small } from 'app/components/Typography';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary },
  '& .icon': { opacity: 0.6, fontSize: '44px', color: theme.palette.primary.main },
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StatCards = () => {
  const [dashboardData, setDashboardData] = useState({});
  useEffect(() => {
    fetchDashboardData();
  }, []);
  const navigate = useNavigate();
  const fetchDashboardData = async () => {
    const response = await apiClient.get('/api/dashboard/data');
    if (response.status === 200) {
      console.log('DASH RES', response);
      setDashboardData(response.data.data);
    }
  };

  const { confirmedOrders, weeklySales, newCustomers } = dashboardData;
  const cardList = [
    { name: 'New Customers', amount: newCustomers, icon: 'group', path: null },
    { name: 'This week Sales', amount: `${weeklySales}`, icon: 'attach_money', path: null },
    { name: 'Inventory Status', amount: '8.5% Stock Surplus', icon: 'store', path: null },
    {
      name: 'Orders to deliver',
      amount: `${confirmedOrders} Orders`,
      icon: 'shopping_cart',
      path: 'orders/all',
    },
  ];
  const handleLinkNav = (path) => {
    if (path) {
      const absolutePath = path.startsWith('/') ? path : `/${path}`;
      console.log('Navigating to:', absolutePath);
      navigate(absolutePath);
    } else {
      console.log('No path provided for navigation');
    }
  };

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {cardList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <Icon className="icon">{item.icon}</Icon>
              <Box ml="12px">
                <Small>{item.name}</Small>
                <Heading>{item.amount}</Heading>
              </Box>
            </ContentBox>

            <Tooltip title="View Details" placement="top">
              {/* {item.path !== null && (
                <Link to={`${item.path}`}> */}
              <IconButton onClick={() => handleLinkNav(item.path)} disabled={!item.path}>
                <Icon>arrow_right_alt</Icon>
              </IconButton>
              {/* </Link>
              )} */}
            </Tooltip>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCards;
