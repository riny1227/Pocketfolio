import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Article from './pages/Article';
import Mypage from './pages/Mypage';
import WritePortfolio from './pages/WritePortfolio';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Home />} />
          {/* 아티클 */}
          <Route path="/article" element={<Article />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />
          {/* 포트폴리오 작성 페이지 */}
          <Route path="/write-portfolio" element={<WritePortfolio />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;