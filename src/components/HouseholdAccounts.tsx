import React, { useState, useEffect } from 'react';

import { api } from '../api.ts';

import { Data } from '../types/api.ts';

type Order = {
  keyName: 'balance_type' | 'date' | 'item' | 'amount';
  order: 'asc' | 'desc';
};

const HouseholdAccounts: React.FC = () => {
  const [householdAccounts, setHouseholdAccounts] = useState<Data[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [order, setOrder] = useState<Order>({ keyName: 'date', order: 'desc' });

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

  return (
    <>
      <div className="p-8 flex justify-center">
        <h2 className="text-xl font-bold">合計金額: {totalBalance}円</h2>
      </div>
      <div className="overflow-x-auto p-8">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-midnight text-white">
              <th
                className="w-1/6 py-2 px-2 border-b hover:text-tahiti cursor-pointer"
                onClick={() => sortHouseholdAccounts('date')}
              >
                対象日
              </th>
              <th
                className="w-1/6 py-2 px-2 border-b hover:text-tahiti cursor-pointer"
                onClick={() => sortHouseholdAccounts('balance_type')}
              >
                種別
              </th>
              <th
                className="w-2/6 py-2 px-4 border-b hover:text-tahiti cursor-pointer"
                onClick={() => sortHouseholdAccounts('item')}
              >
                内容
              </th>
              <th
                className="w-2/6 py-2 px-4 border-b hover:text-tahiti  cursor-pointer"
                onClick={() => sortHouseholdAccounts('amount')}
              >
                金額
              </th>
            </tr>
          </thead>
          <tbody>
            {householdAccounts.map(({ balance_type, date, item, amount }) => (
              <tr>
                <td className="py-2 px-2 border-b">{date}</td>
                <td className="py-2 px-2 border-b">
                  {balance_type === 'expense' ? '支出' : '収入'}
                </td>
                <td className="py-2 px-4 border-b">{item}</td>
                <td className="py-2 px-4 border-b ">
                  {balance_type === 'expense' && (
                    <span className="text-red">{`-${amount.toLocaleString()}円`}</span>
                  )}
                  {balance_type === 'income' && (
                    <span>{`+${amount.toLocaleString()}円`}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HouseholdAccounts;
