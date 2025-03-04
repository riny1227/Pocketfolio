import { createContext, useContext, useState } from "react";
import { login as loginApi } from "../api/LoginApi";
import { logout as logoutApi } from "../api/LogoutApi";

// AuthContext 생성
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null); // 토큰 상태 추가

    // 로그인 함수
    const login = async (email, password) => {
        try {
            // 로그인 API 호출
            const response = await loginApi(email, password);

            if (response.token) {
                // 토큰 저장
                setIsLoggedIn(true);
                setToken(response.token);
                console.log("로그인 성공:", response.message);
            }
        } catch (error) {
            console.error("로그인 실패:", error.message);
            throw new Error("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            // 로그아웃 API 호출
            await logoutApi();

            // 클라이언트에서 토큰 삭제
            setIsLoggedIn(false);
            setToken(null);
            console.log("로그아웃 성공");

            // 로그인 페이지로 리다이렉트
            window.location.href = "/login";
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
            throw new Error("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
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