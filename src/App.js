import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from "./components/share/Header";
import Footer from "./components/share/Footer";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Article from './pages/Article';
import ArticleDetail from './pages/ArticleDetail';
import Mypage from './pages/Mypage';
import MyPageDetail from './pages/MypageDetail';
import UserProfile from './pages/UserProfile';
import WritePortfolio from './pages/WritePortfolio';
import Login from './pages/Login';
import FindPassword from './pages/FindPassword';

function App() {
  return (
      <Router>    
        <AuthProvider>
          <div className="App">
            <Header />
            <Routes>
              {/* 메인 페이지 */}
              <Route path="/" element={<Home />} />
              {/* 회원가입 */}
              <Route path="/signup" element={<SignUp />} />
              {/* 로그인 페이지 */}
              <Route path="/login" element={<Login />} />
              {/* 비밀번호 찾기 */}
              <Route path="/findpassword" element={<FindPassword />} />
              {/* 아티클 */}
              <Route path="/article" element={<Article />} />
              {/* 아티클 상세 페이지 */}
              <Route path="/article/:id" element={<ArticleDetail />} />
              {/* 마이페이지 */}
              <Route path="/mypage" element={<Mypage />} />
              {/* 마이페이지 프로필편집 페이지 */}
              <Route path="/mypage/:id" element={<MyPageDetail />} />
              {/* 사용자 프로필 페이지 */}
              <Route path="/user/:id" element={<UserProfile />} />
              <Route path="/userprofile" element={<UserProfile />} />
              {/* 포트폴리오 작성 페이지 */}
              <Route path="/write-portfolio" element={<WritePortfolio />} />   
            </Routes>
            <Footer />
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;