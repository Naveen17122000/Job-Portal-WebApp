import React from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Home.css'
import './Hs.css'

function Home() {
 

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
  
  return (
    <main className='Hmain-container'>
      <div className='Hmain-title'>
        <h1 className='Dash'>DASHBOARD</h1>
      </div>

      <div className='Hmain-cards'>
        <div className='Hcard'>
          <div className='Hcard-inner'>
            <h3>Active Jobs</h3>
            <BsFillArchiveFill className='Hcard_icon' />
          </div>
          <h1>300</h1>
        </div>
        <div className='Hcard'>
          <div className='Hcard-inner'>
            <h3>Categorize</h3>
            <BsFillGrid3X3GapFill className='Hcard_icon' />
          </div>
          <h1>12</h1>
        </div>
        <div className='Hcard'>
          <div className='Hcard-inner'>
            <h3>New Applications</h3>
            <BsPeopleFill className='Hcard_icon' />
          </div>
          <h1>33</h1>
        </div>
        <div className='Hcard'>
          <div className='Hcard-inner'>
            <h3>Candidates to be reviewed</h3>
            <BsFillBellFill className='Hcard_icon' />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className='Hcharts'>
      <h3> Overview of Active Jobs</h3><br /><br />
        <ResponsiveContainer width="100%" height="100%">
        
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="pv" fill="#8884d8" background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className='messages'>
        <h1>Messages</h1><br /><br /><hr /> 

      </div>
    </main>
  );
}

export default Home;
