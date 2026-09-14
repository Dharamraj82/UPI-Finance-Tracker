export const analyzeTransactions = (transactions, platform = 'Unknown') => {
  let totalIncoming = 0;
  let totalOutgoing = 0;
  
  const timeline = {};
  const upiFrequencies = {};
  
  transactions.forEach(txn => {
    if (txn.type === 'Credit') {
      totalIncoming += txn.amount;
    } else {
      totalOutgoing += txn.amount;
    }

    if (!timeline[txn.date]) {
      timeline[txn.date] = { incoming: 0, outgoing: 0 };
    }
    if (txn.type === 'Credit') {
      timeline[txn.date].incoming += txn.amount;
    } else {
      timeline[txn.date].outgoing += txn.amount;
    }

    if (txn.upiId && txn.upiId !== 'Other') {
      if (!upiFrequencies[txn.upiId]) {
        upiFrequencies[txn.upiId] = { count: 0, totalAmount: 0 };
      }
      upiFrequencies[txn.upiId].count += 1;
      upiFrequencies[txn.upiId].totalAmount += txn.amount;
    }
  });

  const topPlaces = Object.entries(upiFrequencies)
    .map(([upiId, data]) => ({ upiId, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); 

  const pieChartData = [
    { name: 'Incoming', value: totalIncoming },
    { name: 'Outgoing', value: totalOutgoing }
  ];

  const graphData = Object.entries(timeline).map(([date, data]) => ({
    date,
    incoming: data.incoming,
    outgoing: data.outgoing
  })).sort((a, b) => new Date(a.date) - new Date(b.date));

  // Auto-detect platform from transaction descriptions
  const detectedPlatform = (() => {
    if (platform && platform !== 'Unknown') return platform;
    const hasPaidTo = transactions.some(t => (t.description || '').includes('Paid to '));
    const hasReceivedFrom = transactions.some(t => (t.description || '').includes('Received from '));
    if (hasPaidTo || hasReceivedFrom) return 'PhonePe';
    const hasUpi = transactions.some(t => (t.description || '').toLowerCase().includes('upi'));
    if (hasUpi) return 'UPI Bank Statement';
    return 'Bank Statement';
  })();

  return {
    platform: detectedPlatform,
    summary: { totalIncoming, totalOutgoing, totalTransactions: transactions.length },
    pieChartData,
    graphData,
    topPlaces,
    transactions
  };
};
