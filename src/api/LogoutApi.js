import axios from 'axios';

// 로그아웃 API
export const logout = async () => {
    const url = "https://pocketfolio.co.kr/api/user/logout";

    try {
        const response = await axios.post(url);

        const { message } = response.data;
        console.log("로그아웃 성공:", message);

        // 로그아웃 성공 시 서버에서의 응답 메시지 반환
        return { message };
    } catch (error) {
        console.error("로그아웃 에러:", error);

        // 에러 메시지
        const errorMessage = error.response?.data?.message || "로그아웃에 실패했습니다. 다시 시도해 주세요.";

        throw new Error(errorMessage);
    }
};