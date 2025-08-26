import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './landingpage';
import JournalPage from './journalpage';
import Signup from './Signup';
import Signin from './Signin';
import Echonsultation from './Echonsultation';
import Dashboard from './Dashboard';
import Results from './AnxietyResultsPage';
import Activities from './Activities';
import ActivitiesJournal from './ActivitiesJournal';
import History from './History'; 
import EntryDetail from './EntryDetail'; 
import Statistics from './Statistics';
import NotificationPage from './NotificationPage';

import AnxietyTypes from './AnxietyTypes';
import Resources from './Resources';
import Subscription from './Subscription';
import AboutUs from './AboutUs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Results" element={<Results />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Activities-journal" element={<ActivitiesJournal />} />
        <Route path="/History" element={<History />} />
        <Route path="/Echonsultation" element={<Echonsultation />} />
        <Route path="/entry/:id" element={<EntryDetail />} /> 
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/NotificationPage" element={<NotificationPage />} />

        <Route path="/types" element={<AnxietyTypes />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;
