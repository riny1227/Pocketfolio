import { createContext, useContext, useState } from "react";

// AuthContext 생성
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); // 토큰 상태 추가

    // 로그인 함수
    const login = (token) => {
        setIsLoggedIn(true);
        setToken(token); // 토큰 저장
    };

    // 로그아웃 함수
    const logout = () => {
        setIsLoggedIn(false);
        setToken(null); // 로그아웃 시 토큰 삭제
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// useAuth 훅을 통해 context 사용
export function useAuth() {
    return useContext(AuthContext);
}