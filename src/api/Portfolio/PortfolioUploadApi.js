import axios from 'axios';
const getToken = () => localStorage.getItem("token");

// 포트폴리오 업로드 API
export const create = async (portfolioData) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/create";
    const token = getToken();

    if (!token) {
        throw new Error("유효하지 않은 토큰입니다. 로그인 후 다시 시도해 주세요.");
    }

    // 필수 입력값
    const requiredFields = ["title", "durationStart", "durationEnd",
        "role", "job", "company"
    ];
    for (const field of requiredFields) {
        if (!portfolioData[field]) {
            throw new Error(`"${field}" 필드는 필수 입력값 입니다.`);
        }
    }

    try {
        const response = await axios.post(url, portfolioData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("포트폴리오가 성공적으로 업로드되었습니다:", response.data);
        return response.data;
    } catch (error) {
        console.error("포트폴리오 업로드 에러:", error);
        throw new Error(error.response?.data?.message || "포트폴리오 업로드에 실패했습니다. 다시 시도해 주세요.");
    }
};

// 포트폴리오 표지 이미지 업로드 API
export const uploadCover = async (file) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/upload-cover";
    const token = localStorage.getItem("token");
    console.log("현재 토큰:", token);

    if (!token) {
        throw new Error("유효하지 않은 토큰입니다. 로그인 후 다시 시도해 주세요.");
    }

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("표지 이미지 업로드 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("표지 이미지 업로드 에러:", error);
        throw new Error(error.response?.data?.message || "표지 이미지 업로드에 실패하였습니다. 다시 시도해 주세요.");
    }
};

// 포트폴리오 첨부파일 업로드 API
export const uploadAttachments = async (files) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/upload-attachments";
    const token = getToken();

    if (!token) {
        throw new Error("유효하지 않은 토큰입니다. 로그인 후 다시 시도해 주세요.");
    }

    try {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("첨부파일 업로드 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("첨부파일 업로드 에러:", error);
        throw new Error(error.response?.data?.message || "첨부파일 업로드에 실패했습니다. 다시 시도해 주세요.");
    }
};
