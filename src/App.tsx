import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header.tsx';
import Home from './components/Home.tsx';
import History from './components/History.tsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
