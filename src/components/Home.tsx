import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { MdAddCircle, MdHistory } from 'react-icons/md';

import { api } from '../api.ts';

import { Data } from '../types/api.ts';

import InputFormModal from './InputFormModal';

const fetchDisplayData = (householdAccounts: Data[]) => {
  const today = new Date().toLocaleDateString('ja-JP').split('/').join('-');
  const thisMonth = new Date()
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
    })
    .split('/')
    .join('-');

  const todayData = householdAccounts.filter((data) => data.date === today);
  const todayBalance = todayData.reduce((acc, cur) => {
    return cur.balance_type === 'expense' ? acc - cur.amount : acc + cur.amount;
  }, 0);
  const todayBalanceNumber = todayData.length;

  const thisMonthData = householdAccounts.filter(
    (data) => data.date.slice(0, 7) === thisMonth
  );
  const thisMonthBalance = thisMonthData.reduce((acc, cur) => {
    return cur.balance_type === 'expense' ? acc - cur.amount : acc + cur.amount;
  }, 0);
  const thisMonthBalanceNumber = thisMonthData.length;

  const totalBalance = householdAccounts.reduce((acc, cur) => {
    return cur.balance_type === 'expense' ? acc - cur.amount : acc + cur.amount;
  }, 0);
  return {
    todayBalance,
    todayBalanceNumber,
    thisMonthBalance,
    thisMonthBalanceNumber,
    totalBalance,
  };
};

const Home: React.FC = () => {
  const [todayBalance, setTodayBalance] = useState(0);
  const [todayBalanceNumber, setTodayBalanceNumber] = useState(0);
  const [thisMonthBalance, setThisMonthBalance] = useState(0);
  const [thisMonthBalanceNumber, setThisMonthBalanceNumber] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    (async () => {
      const { data } = await api('GET /data');
      const displayData = fetchDisplayData(data);
      setTodayBalance(displayData.todayBalance);
      setTodayBalanceNumber(displayData.todayBalanceNumber);
      setThisMonthBalance(displayData.thisMonthBalance);
      setThisMonthBalanceNumber(displayData.thisMonthBalanceNumber);
      setTotalBalance(displayData.totalBalance);
    })();
  }, []);
  return (
    <div className="h-content  bg-gray p-8">
      <div className="text-center text-xl font-bold">
        <span>本日の収支</span>
        <span className="ml-2">{todayBalanceNumber.toLocaleString()}件</span>
        <span className={todayBalance < 0 ? 'text-red ml-2' : 'ml-2'}>
          {todayBalance.toLocaleString()}円
        </span>
      </div>
      <div className="text-center text-xl font-bold mt-4">
        <span>今月の収支</span>
        <span className="ml-2">
          {thisMonthBalanceNumber.toLocaleString()}件
        </span>
        <span className={thisMonthBalance < 0 ? 'text-red ml-2' : 'ml-2'}>
          {thisMonthBalance.toLocaleString()}円
        </span>
      </div>
      <div className="text-center text-3xl font-bold mt-8">
        <span>残高</span>
        <span className={totalBalance < 0 ? 'text-red ml-2' : 'ml-2'}>
          {totalBalance.toLocaleString()}円
        </span>
      </div>
      <div className="flex justify-center mt-8">
        {todayBalanceNumber > 0 && totalBalance > 0 && (
          <img
            src="src/assets/images/oksign_man.png"
            className="w-52 h-52 rounded"
          />
        )}
        {todayBalanceNumber > 0 && totalBalance < 0 && (
          <img
            src="src/assets/images/negarive_man.png"
            className="w-52 h-52 rounded"
          />
        )}
        {todayBalanceNumber === 0 && (
          <img
            src="src/assets/images/sleep_man.png"
            className="w-52 h-52 rounded"
          />
        )}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-midnight text-white py-2 px-4 rounded hover:text-tahiti flex items-center"
        >
          <MdAddCircle />
          <span className="ml-1">登録</span>
        </button>
        <button className="bg-metal text-white  ml-8 rounded hover:text-tahiti">
          <Link className="py-2 px-4 flex items-center" to="history">
            <MdHistory />
            <span className="ml-1">履歴</span>
          </Link>
        </button>
      </div>
      {showModal && (
        <InputFormModal
          id=""
          balance_type=""
          date={new Date().toLocaleDateString('ja-JP')}
          amount={0}
          item=""
          isDisabled={false}
          close={() => setShowModal(false)}
          addData={() => {
            (async () => {
              const { data } = await api('GET /data');
              const displayData = fetchDisplayData(data);
              setTodayBalance(displayData.todayBalance);
              setTodayBalanceNumber(displayData.todayBalanceNumber);
              setThisMonthBalance(displayData.thisMonthBalance);
              setThisMonthBalanceNumber(displayData.thisMonthBalanceNumber);
              setTotalBalance(displayData.totalBalance);
            })();
          }}
        />
      )}
    </div>
  );
};

export default Home;
