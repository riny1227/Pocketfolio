import axios from 'axios';

const BASE_URL = 'https://pocketfolio.co.kr/api';

// 포트폴리오 좋아요 추가, 취소
export const fetchLikeToPortfoilo = async (portfolioId, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/portfoilo/${portfolioId}/like`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.error('fetchLikeToPortfoilo (포트폴리오 좋아요 추가, 취소) 에러 발생 : ', error);
        throw error;
    }
};