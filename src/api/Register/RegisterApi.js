import axios from 'axios';

// 회원가입 API
export const register = async (name, email, password, passwordCheck, verificationCode) => {
    const url = "https://pocketfolio.co.kr/api/user/register";
    const bodyData = {
        name,
        email,
        password,
        passwordCheck,
        verificationCode  // 이메일 인증번호
    };

    try {
        const response = await axios.post(url, bodyData);
        return response.data;  // 응답 데이터 반환
    } catch (error) {
        console.error("회원가입 에러:", error);
        if (error.response) {
            // 서버에서 반환한 에러 메시지
            throw new Error(error.response.data.message || "회원가입에 실패했습니다. 다시 시도해 주세요.");
        } else {
            // 네트워크 에러나 다른 종류의 오류
            throw new Error("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }
};

// 이메일 인증번호 요청 API
export const sendVerificationCode = async (email) => {
    const url = "https://pocketfolio.co.kr/api/user/send-verification-code";

    try {
        const response = await axios.post(url, { email });
        if (response.data.status !== 200) {
            // 실패 응답일 경우 에러를 발생시킵니다.
            throw new Error(response.data.error || "이메일 인증번호 전송에 실패했습니다.");
        }
        return response.data;  // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error("이메일 인증번호 전송 에러:", error);
        if (error.response && error.response.data) {
            // 서버에서 반환한 에러 메시지가 있는 경우
            throw new Error(error.response.data.error || "이메일 인증번호 전송에 실패했습니다.");
        } else {
            // 네트워크 에러나 다른 종류의 오류
            throw new Error("네트워크 오류가 발생했습니다. 이메일 인증번호를 다시 시도해 주세요.");
        }
    }
};

// 이메일 인증번호 검증 API
export const verifyCode = async (email, verificationCode) => {
    const url = "https://pocketfolio.co.kr/api/user/verify-code";
    const bodyData = {
        email,
        verificationCode
    };

    try {
        const response = await axios.post(url, bodyData);
        if (response.data.status !== 200) {
            // 실패 응답일 경우 에러를 발생시킵니다.
            throw new Error(response.data.error || "인증번호 확인에 실패했습니다.");
        }
        return response.data;  // 성공 시 응답 데이터 반환
    } catch (error) {
        console.error("이메일 인증번호 검증 에러:", error);
        if (error.response && error.response.data) {
            // 서버에서 반환한 에러 메시지가 있는 경우
            throw new Error(error.response.data.error || "인증번호 확인에 실패했습니다.");
        } else {
            // 네트워크 에러나 다른 종류의 오류
            throw new Error("네트워크 오류가 발생했습니다. 이메일 인증번호를 다시 시도해 주세요.");
        }
    }
};