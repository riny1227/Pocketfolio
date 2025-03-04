import axios from 'axios';

// 회원가입 API
export const register = async (name, email, password, passwordCheck, verificationCode) => {
    const url = "https://pocketfolio.co.kr/api/user/register";
    const bodyData = { name, email, password, passwordCheck, verificationCode };

    try {
        const response = await axios.post(url, bodyData);
        
        console.log("회원가입 응답:", response.data); // 서버 응답 확인용 로그

        return response.data; // 응답 구조가 맞는지 확인 필요
    } catch (error) {
        console.error("회원가입 에러:", error);
        
        throw new Error(error.response?.data?.message || error.response?.data?.error || "회원가입에 실패했습니다. 다시 시도해 주세요.");
    }
};

// 이메일 인증번호 요청 API
export const sendVerificationCode = async (email) => {
    const url = "https://pocketfolio.co.kr/api/user/send-verification-code";

    try {
        const response = await axios.post(url, { email });

        console.log("이메일 인증번호 전송 응답:", response.data);

        if (response.status !== 200) {
            throw new Error("이메일 인증번호 전송에 실패했습니다.");
        }

        return response.data;
    } catch (error) {
        console.error("이메일 인증번호 전송 에러:", error);

        throw new Error(error.response?.data?.error || "네트워크 오류가 발생했습니다. 이메일 인증번호를 다시 시도해 주세요.");
    }
};

// 이메일 인증번호 검증 API
export const verifyCode = async (email, verificationCode) => {
    const url = "https://pocketfolio.co.kr/api/user/verify-code";
    const bodyData = { email, verificationCode };

    try {
        const response = await axios.post(url, bodyData);

        console.log("이메일 인증번호 검증 응답:", response.data);

        if (response.status !== 200) {
            throw new Error(response.data?.error || "인증번호 확인에 실패했습니다.");
        }

        return response.data;
    } catch (error) {
        console.error("이메일 인증번호 검증 에러:", error);

        throw new Error(error.response?.data?.error || "네트워크 오류가 발생했습니다. 인증번호를 다시 시도해 주세요.");
    }
};