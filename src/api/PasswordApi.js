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

        alert("인증번호가 이메일로 발송되었습니다.");
        return response.data;
    } catch (error) {
        console.error("이메일 인증번호 전송 에러:", error);

        if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태코드:", error.response.status);
            if (error.response.status === 400) {
                alert(error.response.data.message || "잘못된 요청입니다. 이메일을 확인해 주세요.");
            } else if (error.response.status === 404) {
                alert("해당 이메일로 등록된 계정이 없습니다.");
            } else {
                alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            }
        } else if (error.request) {
            console.error("요청은 갔지만 응답이 없음:", error.request);
        } else {
            console.error("요청 설정 중 에러 발생:", error.message);
        }

        throw error;
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

        alert("인증번호가 확인되었습니다.");
        return response.data;
    } catch (error) {
        console.error("이메일 인증번호 검증 에러:", error);

        if (error.response) {
            console.error("응답 데이터:", error.response.data);
            console.error("응답 상태코드:", error.response.status);
            if (error.response.status === 400) {
                alert("인증번호가 올바르지 않습니다. 다시 확인해 주세요.");
            } else {
                alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
            }
        } else if (error.request) {
            console.error("요청은 갔지만 응답이 없음:", error.request);
        } else {
            console.error("요청 설정 중 에러 발생:", error.message);
        }

        throw error;
    }
}; 

// 비밀번호 재설정
export const resetPassword = async (email, newPassword, passwordCheck) => {
    const url = "https://pocketfolio.co.kr/api/user/reset-password";

    try {
        const response = await axios.post(
            url, 
            { email, newPassword, passwordCheck },
        );
        return response.data; // 성공 시 메시지 반환
    } catch (error) {
        console.error("비밀번호 재설정 오류:", error);
        throw new Error(error.response?.data?.message || "비밀번호 재설정에 실패했습니다.");
    }
};