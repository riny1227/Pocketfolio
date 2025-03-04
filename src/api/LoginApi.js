import axios from 'axios';

// 로그인 API
export const login = async (email, password) => {
    const url = "https://pocketfolio.co.kr/api/user/login";
    const bodyData = { email, password };

    try {
        const response = await axios.post(url, bodyData);
        
        const { message, token } = response.data;

        console.log("로그인 성공:", message);
        console.log("발급된 토큰:", token);

        // 로그인 성공 시 message와 token 반환
        return { message, token };
    } catch (error) {
        console.error("로그인 에러:", error);

        // 에러 메시지
        const errorMessage = error.response?.data?.message || "로그인에 실패했습니다. 다시 시도해 주세요.";

        throw new Error(errorMessage);
    }
};