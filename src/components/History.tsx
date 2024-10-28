import React, { useState, useEffect } from 'react';

import { api } from '../api.ts';

import { Data } from '../types/api.ts';

type Order = {
  keyName: 'balance_type' | 'date' | 'item' | 'amount';
  order: 'asc' | 'desc';
};

import HouseholdAccountFilter from './HouseholdAccountFilter.tsx';
import HouseholdAccounts from './HouseholdAccounts.tsx';

const History: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [householdAccounts, setHouseholdAccounts] = useState<Data[]>([]);
  const [order, setOrder] = useState<Order>({
    keyName: 'date',
    order: 'desc',
  });

  const sortHouseholdAccounts = (keyName: Order['keyName']) => {
    const prevOrder = order.order;
    const nextOrder: Order['order'] = (() => {
      if (keyName !== order.keyName) return 'desc';
      return prevOrder === 'asc' ? 'desc' : 'asc';
    })();
    const sortedData = [...householdAccounts].sort((a, b) => {
      const isAsc = nextOrder === 'asc';
      switch (keyName) {
        case 'item':
        case 'balance_type':
          return isAsc
            ? a[keyName].localeCompare(b[keyName])
            : b[keyName].localeCompare(a[keyName]);
        case 'date':
          return isAsc
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'amount':
          return isAsc
            ? (a.balance_type === 'expense' ? -a[keyName] : a[keyName]) -
                (b.balance_type === 'expense' ? -b[keyName] : b[keyName])
            : (b.balance_type === 'expense' ? -b[keyName] : b[keyName]) -
                (a.balance_type === 'expense' ? -a[keyName] : a[keyName]);
        default:
          return 0;
      }
    });
    setHouseholdAccounts(sortedData);
    setOrder({ keyName, order: nextOrder });
  };

  useEffect(() => {
    (async () => {
      const { data } = await api('GET /data');
      data.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setHouseholdAccounts(data);
      const totalBalance = data.reduce((acc, cur) => {
        return cur.balance_type === 'expense'
          ? acc - cur.amount
          : acc + cur.amount;
      }, 0);
      setTotalBalance(totalBalance);
    })();
  }, []);

  return (
    <>
      <div className="p-8 flex justify-center">
        <h2 className="text-xl font-bold">合計金額: {totalBalance}円</h2>
      </div>
      <HouseholdAccountFilter />
      <HouseholdAccounts
        householdAccounts={householdAccounts}
        keyName={order.keyName}
        sortHouseholdAccounts={(keyName: Order['keyName']) =>
          sortHouseholdAccounts(keyName)
        }
      />
    </>
  );
};

export default History;
