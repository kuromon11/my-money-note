import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MdHistory, MdHome } from 'react-icons/md';

const Header: React.FC = () => {
  const pathname = useLocation().pathname;
  const path = pathname === '/' ? 'history' : '/';
  const icon = pathname === '/' ? <MdHistory /> : <MdHome />;
  const linkText = pathname === '/' ? '履歴' : 'ホームに戻る';
  return (
    <header className="bg-blue text-white p-4 flex">
      <h1 className="text-xl font-bold">My Money Note</h1>
      <button className="bg-blue text-white rounded ml-auto hover:text-tahiti">
        <Link className="px-2 py-1 flex items-center" to={path}>
          {icon}
          <span className="ml-1">{linkText}</span>
        </Link>
      </button>
    </header>
  );
};

export default Header;
