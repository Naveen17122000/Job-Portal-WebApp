import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ASetting.css';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Profile from '../Pages/Profile';
import Personal from '../Pages/Personal';
import Header from './Header';
import AdSidebar from './AdSidebar';
import Password from '../Pages/Password';
import Account from '../Dashboard/Accounts';
const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});
const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    // fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: '#000000',
    fontSize:"2rem",
    '&.Mui-selected': {
      color: '#0000FF',
    },
    '&.Mui-focusVisible': {
      backgroundColor: '#30c1d1',
    },
  }),
);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
   
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
   
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return ( 
  <div className='Hgrid-container'>
  <Header />
  <AdSidebar />
     <div className='Dash-Tabs'>
    <Box sx={{ width: '80%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs className='Tabs' value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="Profile" {...a11yProps(0)} />
          <StyledTab label="Personal Details" {...a11yProps(1)} />
          <StyledTab label="My Account" {...a11yProps(2)} />
          <StyledTab label="Change Password" {...a11yProps(3)} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Profile />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <Personal />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <Account />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
      <Password />
      </CustomTabPanel>
    </Box>
    </div>
    </div>
  );
}
