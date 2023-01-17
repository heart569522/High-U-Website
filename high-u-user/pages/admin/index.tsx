import * as React from 'react';

// IMPORT COMPONENT
import DrawerBar from "../components/DrawerBar"

// IMPORT PAGE
import Dashboard from "./Dashboard"

export default function index() {

  return (
    <div>
        <DrawerBar />
        <Dashboard />
    </div>

  )
}