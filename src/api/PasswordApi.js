import axios from 'axios';

// 이메일 인증번호 요청 API
export const findPassword = async (email) => {
    const url = "https://pocketfolio.co.kr/api/user/send-verification-code";

    try {
        console.log("이메일 인증 요청 보냄", { email });

        const response = await axios.post(
            url, 
            { email },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        console.log("이메일 인증번호 전송 성공:", response.data);

        return response.data;
    } catch (error) {
        // 응답 로그 상세 출력
        console.error("이메일 인증번호 전송 에러:", error);

        if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태코드:", error.response.status);
            console.error("응답 헤더:", error.response.headers);
        } else if (error.request) {
            console.error("요청은 갔지만 응답이 없음:", error.request);
        } else {
            console.error("요청 설정 중 에러 발생:", error.message);
        }

        // 에러 메시지 구성
        const errorMessage = error.response?.data?.error || "네트워크 오류가 발생했습니다. 이메일 인증번호를 다시 시도해 주세요.";
        throw new Error(errorMessage);
    }
};

// 이메일 인증번호 검증 API
export const verifyCode = async (email, verificationCode) => {
    const url = "https://pocketfolio.co.kr/api/user/verify-code";
    const bodyData = { email, verificationCode };

    try {
        const response = await axios.post(url, bodyData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("이메일 인증번호 검증 응답:", response.data);

        return response.data;
    } catch (error) {
        console.error("이메일 인증번호 검증 에러:", error);
    
        if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태코드:", error.response.status);
        } else if (error.request) {
            console.error("요청은 갔지만 응답이 없음:", error.request);
        } else {
            console.error("요청 설정 중 에러 발생:", error.message);
        }
    
        const errorMessage = error.response?.data?.error || "네트워크 오류가 발생했습니다. 인증번호를 다시 시도해 주세요.";
        throw new Error(errorMessage);
    }
};    

// 비밀번호 재설정
export const resetPassword = async (newPassword, passwordCheck) => {
    const url = "https://pocketfolio.co.kr/api/user/reset-password";

    try {
        const response = await axios.post(
            url, 
            { newPassword, passwordCheck },
        );
        return response.data; // 성공 시 메시지 반환
    } catch (error) {
        console.error("비밀번호 재설정 오류:", error);
        throw new Error(error.response?.data?.message || "비밀번호 재설정에 실패했습니다.");
    }
};