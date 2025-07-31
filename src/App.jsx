import React, { useEffect, useState } from 'react';
import { fetchData } from './services/api';
import { ChartCard } from './components/ChartCard';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    deposits: [],
    loans: [],
    atm: [],
    cards: [],
    internet_banking: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [deposits, loans, atm, cards, internetBanking] = await Promise.all([
          fetchData('deposits'),
          fetchData('loans'),
          fetchData('atm'),
          fetchData('cards'),
          fetchData('internet_banking')
        ]);

        setChartData({
          deposits,
          loans,
          atm,
          cards,
          internet_banking: internetBanking
        });
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <div className="loading-screen">Loading dashboard...</div>;
  }

  return (
    <div className="app-container">
      <NavBar />
      <div className="dashboard">
        <h1>Bank MIS Dashboard</h1>
        
        <div className="charts-grid">
          <ChartCard 
            title="Deposits" 
            data={chartData.deposits} 
            dataKey="amount" 
            color="#8884d8"
          />
          <ChartCard 
            title="Loans" 
            data={chartData.loans} 
            dataKey="amount" 
            color="#82ca9d"
          />
          <ChartCard 
            title="ATM Transactions" 
            data={chartData.atm} 
            dataKey="transactions" 
            color="#ffc658"
          />
          <ChartCard 
            title="Card Swipes" 
            data={chartData.cards} 
            dataKey="swipes" 
            color="#ff8042"
          />
          <ChartCard 
            title="Internet Banking" 
            data={chartData.internet_banking} 
            dataKey="logins" 
            color="#0088fe"
          />
        </div>
      </div>
    </div>
  );
}

export default App;