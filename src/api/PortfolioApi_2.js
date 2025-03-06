import axios from 'axios';

const BASE_URL = 'https://pocketfolio.co.kr/api';

// 포트폴리오 좋아요 추가 - 수정 필요
export const addLikeToPortfoilo = async (portfolioId, userId) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/portfoilos/${portfolioId}/like`,
            { user_id: userId },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('좋아요 추가 성공:', response.data);
        return response.data;
    } catch (error) {
        console.error('addLikeToPortfoilo (포트폴리오 좋아요 추가) 에러 발생 : ', error);
        throw error;
    }
};

// 포트폴리오 좋아요 삭제

// 북마크 추가

// 북마트 삭제

// 포트폴리오 조회수 증가

// 직군 리스트 조회
export const fetchJobList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/portfolios/jobs`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchJobList(직군 리스트 조회) 에러 발생 : ', error);
        throw error;
    }
}