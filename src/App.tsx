import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import HistoryPage from './pages/History/History'

import MainLayout from './layouts/Main/Main'

function App() {

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/history"></Redirect>}></Route>
          <Route path="/history" render={() => <HistoryPage />}></Route>
        </Switch>
      </MainLayout>
    </Router>
  )
}

export default App
