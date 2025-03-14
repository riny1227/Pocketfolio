import axios from 'axios';

// 포트폴리오 업로드 API
export const create = async (portfolioData, token) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/create";

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
        const response = await axios.post(url, {
            ...portfolioData,
            description: portfolioData.description || "", // 선택값 처리
            url: portfolioData.url || "" // 선택값 처리
        }, {
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
export const uploadCover = async (file, token) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/upload-cover";

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

// 포트폴리오 (이미지)첨부파일 업로드 API
export const uploadAttachments = async (files, token) => {
    const url = "https://pocketfolio.co.kr/api/portfolio/upload-attachments";

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

// 회사 조회 API
export const getCompanies = async (query = "메리츠자산운용", token) => {
    const url = "https://pocketfolio.co.kr/api/companies"; // 실제 회사 정보 조회 API URL로 변경

    try {
        const response = await axios.get(url, {
            params: { q: query }, // 검색할 회사명
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        console.log("회사의 계열회사 목록 조회 성공:", response.data);
        return response.data.companies;
    } catch (error) {
        console.error("회사 정보 조회 에러:", error);
        throw new Error(error.response?.data?.message || "회사 정보 조회에 실패했습니다. 다시 시도해 주세요.");
    }
};
