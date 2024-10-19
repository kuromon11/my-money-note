import React, { useState } from 'react';

import { MdAddCircle, MdHistory } from 'react-icons/md';

import InputFormModal from './InputFormModal';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="h-content  bg-gray p-8">
      <div className="text-center text-xl font-bold">
        <span>本日の収支</span>
        <span className="ml-2">1件</span>
        <span className="text-red ml-2">-1,234円</span>
      </div>
      <div className="text-center text-xl font-bold mt-4">
        <span>今月の収支</span>
        <span className="ml-2">10件</span>
        <span className="text-red ml-2">-12,345円</span>
      </div>
      <div className="text-center text-3xl font-bold mt-8">
        <span>残高</span>
        <span className="ml-2">1,234,567円</span>
      </div>
      <div className="flex justify-center mt-8">
        <img
          src="src/assets/images/household_budget.png"
          className="w-52 h-52 rounded"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => setShowModal(true)}
          className="bg-midnight text-white py-2 px-4 rounded hover:text-tahiti flex items-center"
        >
          <MdAddCircle />
          <span className="ml-1">登録</span>
        </button>
        <button className="bg-metal text-white py-2 px-4 ml-8 rounded hover:text-tahiti flex items-center">
          <MdHistory />
          <span className="ml-1">履歴</span>
        </button>
      </div>
      {showModal && <InputFormModal close={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;
