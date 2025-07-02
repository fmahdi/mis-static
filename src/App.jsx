import './App.css'
// import NavBar from './Layout/NavBar'
// import Body from './Layout/Body'
// import FootBar from './Layout/FootBar'

import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import { ChartCard } from './Component/ChartCard';
import { ExportButtons } from './Component/ExportButtons';

function App() {
  const [deposits, setDeposits] = useState([]);
  const [loans, setLoans] = useState([]);
  const [atm, setAtm] = useState([]);
  const [cards, setCards] = useState([]);
  const [internetBanking, setInternetBanking] = useState([]);

  useEffect(() => {
    fetchData('deposits').then(setDeposits);
    fetchData('loans').then(setLoans);
    fetchData('atm').then(setAtm);
    fetchData('cards').then(setCards);
    fetchData('internet_banking').then(setInternetBanking);
  }, []);

  return (
    <div id="dashboard" style={{ padding: 20 }}>
      <h1>Bank MIS Dashboard</h1>
      <div className="charts-grid">
        <ChartCard title="Deposits" data={deposits} dataKey="amount" />
        <ChartCard title="Loans" data={loans} dataKey="amount" />
        <ChartCard title="ATM Transactions" data={atm} dataKey="transactions" />
        <ChartCard title="Card Swipes" data={cards} dataKey="swipes" />
        <ChartCard title="Internet Banking Logins" data={internetBanking} dataKey="logins" />
      </div>
      <ExportButtons
        data={[
          ...deposits,
          ...loans,
          ...atm,
          ...cards,
          ...internetBanking
        ]}
        filename="bank_report"
      />
    </div>
  );
}

export default App;

