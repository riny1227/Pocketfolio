import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./components/share/Header";
import Footer from "./components/share/Footer";
import Home from "./pages/Home";
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';
import Mypage from './pages/Mypage';
import UserProfile from './pages/UserProfile';
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
          {/* 아티클 상세 페이지 */}
          <Route path="/article/:id" element={<ArticleDetail />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<Mypage />} />
          {/* 사용자 프로필 페이지 */}
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          {/* 포트폴리오 작성 페이지 */}
          <Route path="/write-portfolio" element={<WritePortfolio />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;