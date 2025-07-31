// // Mock API service - replace with your actual API calls
// export const fetchData = async (endpoint) => {
//   try {
//     // In a real app, this would be a fetch/axios call to your backend
//     const mockData = {
//       deposits: [
//         { date: "2025-06-01", amount: 500000 },
//         { date: "2025-06-02", amount: 420000 }
//       ],
//       loans: [
//         { date: "2025-06-01", amount: 800000 },
//         { date: "2025-06-02", amount: 300000 }
//       ],
//       atm: [
//         { date: "2025-06-01", transactions: 1200 },
//         { date: "2025-06-02", transactions: 1350 }
//       ],
//       cards: [
//         { date: "2025-06-01", swipes: 450 },
//         { date: "2025-06-02", swipes: 500 }
//       ],
//       internet_banking: [
//         { date: "2025-06-01", logins: 900 },
//         { date: "2025-06-02", logins: 950 }
//       ]
//     };

//     // Simulate network delay
//     await new Promise(resolve => setTimeout(resolve, 500));
    
//     return mockData[endpoint] || [];
//   } catch (error) {
//     console.error(`Error fetching ${endpoint}:`, error);
//     return [];
//   }
// };

// services/api.js
export const fetchData = async (endpoint) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 700));

  // Generate 30 days of data (including weekends)
  const generateTimeSeries = (baseValue, variance, trend) => {
    const result = [];
    const date = new Date();
    date.setDate(date.getDate() - 30); // Start from 30 days ago
    
    for (let i = 0; i < 30; i++) {
      date.setDate(date.getDate() + 1);
      
      // Skip weekends for some data types
      if ((endpoint === 'deposits' || endpoint === 'loans') && 
          (date.getDay() === 0 || date.getDay() === 6)) {
        continue;
      }
      
      const dayOffset = (i / 30) * trend;
      const randomFactor = 0.9 + Math.random() * 0.2;
      const value = Math.round((baseValue + dayOffset) * randomFactor * variance);
      
      result.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        ...(endpoint === 'deposits' || endpoint === 'loans' 
          ? { amount: value }
          : endpoint === 'atm'
          ? { transactions: Math.round(value / 100) }
          : endpoint === 'cards'
          ? { swipes: Math.round(value / 50) }
          : { logins: Math.round(value / 30) }
        ),
        ...(endpoint === 'deposits' && { branch: ['Dhaka', 'Chittagong', 'Sylhet'][Math.floor(Math.random() * 3)] }),
        ...(endpoint === 'loans' && { product: ['Home', 'Auto', 'Personal'][Math.floor(Math.random() * 3)] })
      });
    }
    return result;
  };

  const dataGenerators = {
    deposits: () => generateTimeSeries(500000, 1, 20000),  // Growing trend
    loans: () => generateTimeSeries(300000, 1.2, 15000),   // More volatile
    atm: () => generateTimeSeries(150000, 0.8, -5000),     // Slight downward trend
    cards: () => generateTimeSeries(25000, 0.7, 2000),     // Steady growth
    internet_banking: () => generateTimeSeries(30000, 1.5, 8000) // Rapid growth
  };

  try {
    return dataGenerators[endpoint]?.() || [];
  } catch (error) {
    console.error(`Error generating ${endpoint} data:`, error);
    return [];
  }
};