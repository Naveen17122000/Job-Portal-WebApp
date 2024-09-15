import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Overview from './Overview';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import Accounts from './Accounts';
import Setting from './Setting';

const App = () => {
  return (<>
   
      <NavBar />
       <div className="layout">
      <div className="layout-1"><Sidebar /></div>
      <div className="layout-2"> 
    <Routes>
           <Route path="/" element={<Overview />} />
           <Route path="/Dashboard/Accounts" element={<Accounts />} />
           <Route path="/Dashboard/setting" element={<Setting />} />
      {/*    <Route path="/about" element={<About />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/product" element={<Product />} />
          <Route path="/productList" element={<ProductList />} /> */}
        </Routes> 
      <Outlet />
      </div>
      </div> 
      </>
  );
};

export default App;
