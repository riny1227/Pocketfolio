import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { login as loginApi } from "../api/LoginApi";
import { logout as logoutApi } from "../api/LogoutApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);

    // 로그인 함수
    const login = async (email, password) => {
        try {
            const response = await loginApi(email, password);

            if (response.token) {
                setIsLoggedIn(true);
                setToken(response.token);
                console.log("로그인 성공:", response.message);
                alert("로그인에 성공하였습니다.");

                navigate("/"); // 메인 화면으로 이동
            }
        } catch (error) {
            console.error("로그인 실패:", error.message);

            if (error.message === "비밀번호가 일치하지 않습니다.") {
                alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            } else {
                alert("로그인에 실패했습니다. 다시 시도해주세요.");
            }

            throw new Error("로그인에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 로그아웃 함수
    const logout = async () => {
        try {
            await logoutApi();

            setIsLoggedIn(false);
            setToken(null);
            console.log("로그아웃 성공");

            navigate("/login"); // 로그인 화면으로 이동
        } catch (error) {
            console.error("로그아웃 실패:", error.message);
            alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}