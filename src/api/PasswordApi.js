import axios from 'axios';

// 비밀번호 찾기: 인증 코드 전송
export const findPassword = async (email) => {
    const url = "https://pocketfolio.co.kr/api/user/send-verification-code";

    try {
        const response = await axios.post(url, { email });
        return response.data; // 성공 시 메시지 반환
    } catch (error) {
        console.error("비밀번호 찾기 오류:", error);
        throw new Error(error.response?.data?.message || "비밀번호 찾기 요청에 실패했습니다.");
    }
};

// 인증 코드 검증
export const verifyCode = async (verificationCode, token) => {
    const url = "https://pocketfolio.co.kr/api/user/verify-code";

    try {
        const response = await axios.post(
            url, 
            { verificationCode }, 
            { headers: { Authorization: `Bearer ${token}` } } // 인증 토큰을 헤더에 추가
        );
        return response.data; // 성공 시 메시지 반환
    } catch (error) {
        console.error("인증 코드 검증 오류:", error);
        throw new Error(error.response?.data?.message || "인증 코드 검증에 실패했습니다.");
    }
};

// 비밀번호 재설정
export const resetPassword = async (newPassword, passwordCheck, token) => {
    const url = "https://pocketfolio.co.kr/api/user/reset-password";

    try {
        const response = await axios.post(
            url, 
            { newPassword, passwordCheck }, 
            { headers: { Authorization: `Bearer ${token}` } } // 인증 토큰을 헤더에 추가
        );
        return response.data; // 성공 시 메시지 반환
    } catch (error) {
        console.error("비밀번호 재설정 오류:", error);
        throw new Error(error.response?.data?.message || "비밀번호 재설정에 실패했습니다.");
    }
};