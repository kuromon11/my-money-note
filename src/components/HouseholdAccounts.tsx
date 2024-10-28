import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

import { Data } from '../types/api.ts';

type Order = {
  keyName: 'balance_type' | 'date' | 'item' | 'amount';
  order: 'asc' | 'desc';
};

type Props = {
  householdAccounts: Data[];
  sortHouseholdAccounts: (keyName: Order['keyName']) => void;
};

const HouseholdAccounts: React.FC<Props & { keyName: string }> = ({
  householdAccounts,
  sortHouseholdAccounts,
}) => {
  return (
    <>
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
                className="w-3/12 py-2 px-4 border-b hover:text-tahiti  cursor-pointer"
                onClick={() => sortHouseholdAccounts('amount')}
              >
                金額
              </th>
              <th className="w-1/24 py-2 px-4 border-b"></th>
              <th className="w-1/24 py-2 px-4 border-b"></th>
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
                <td className="py-2 px-4 border-b">
                  <button>
                    <MdEdit />
                  </button>
                </td>
                <td className="py-2 px-4 border-b">
                  <button>
                    <MdDelete />
                  </button>
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
