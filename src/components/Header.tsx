import React from 'react';

import { MdHistory } from 'react-icons/md';

const Header: React.FC = () => {
  return (
    <header className="bg-blue text-white p-4 flex">
      <h1 className="text-xl font-bold">My Money Note</h1>
      <button className="bg-blue text-white px-2 py-1 rounded ml-auto hover:text-tahiti flex items-center">
        <MdHistory />
        <span className="ml-1">履歴</span>
      </button>
    </header>
  );
};

export default Header;
