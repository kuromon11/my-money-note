import React from 'react';

import HouseholdAccountFilter from './HouseholdAccountFilter.tsx';
import HouseholdAccounts from './HouseholdAccounts.tsx';

const History: React.FC = () => {
  return (
    <>
      <HouseholdAccountFilter />
      <HouseholdAccounts />
    </>
  );
};

export default History;
