import React from 'react';

import { MdAddCircle, MdHistory } from 'react-icons/md';

import InputModal from './InputModal';

const Home: React.FC = () => {
  return (
    <div className="h-content  bg-gray p-8">
      <div className="text-center text-xl font-bold">
        <span>本日の収支</span>
        <span className="ml-2">1件</span>
        <span className="ml-2">-1,000円</span>
      </div>
      <div className="text-center text-xl font-bold mt-4">
        <span>今月の収支</span>
        <span className="ml-2">10件</span>
        <span className="ml-2">+100,000円</span>
      </div>
      <div className="text-center text-3xl font-bold mt-8">
        <span>残高</span>
        <span className="ml-2">1,000,000円</span>
      </div>
      <div className="flex justify-center mt-8">
        <img
          src="src/assets/images/oksign_man.png"
          className="w-52 h-52 rounded"
        />
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-midnight text-white py-2 px-4 rounded hover:text-tahiti flex items-center">
          <MdAddCircle />
          <span className="ml-1">登録</span>
        </button>
        <button className="bg-metal text-white py-2 px-4 ml-8 rounded hover:text-tahiti flex items-center">
          <MdHistory />
          <span className="ml-1">履歴</span>
        </button>
      </div>
      <InputModal />
    </div>
  );
};

export default Home;
