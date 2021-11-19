import React from "react";
import ReactDOM from "react-dom";
import { Router, ReactLocation, Link, Outlet } from "react-location";
import { Box, NailsApp } from "react-nails";

import StarterPage from './pages/start/StarterPage'

import InsertPage from "./pages/insert/InsertPage";
import ScoringPage from "./pages/scoring/ScoringPage";

// Set up a ReactLocation instance
const location = new ReactLocation();

const routes = [{ path: '/', element: <StarterPage /> }, { path: '/insert', element: <InsertPage /> }, { path: '/scoring', element: <ScoringPage /> }]

const App = () => (
  <NailsApp theme={{}}>
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <Router location={location}
        routes={routes}>
        <Box>
          <Link
            to="/"
            getActiveProps={getActiveProps}
            activeOptions={{ exact: true }}
          >Home</Link>
          {' '}
          <Link
            to="/insert"
            getActiveProps={getActiveProps}
            activeOptions={{ exact: true }}
          >Insert</Link>
          {' '}
           <Link
            to="/scoring"
            getActiveProps={getActiveProps}
            activeOptions={{ exact: true }}
          >Bewertung</Link>
        </Box>
        <hr />
        <br/>
        <Outlet />
      </Router>
    </div>
  </NailsApp>
);

function getActiveProps() {
  return {
    style: {
      fontWeight: "bold",
    },
  };
}

export default App
