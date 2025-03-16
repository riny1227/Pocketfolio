import axios from 'axios';

const BASE_URL = 'https://pocketfolio.co.kr/api';

// 추천 포트폴리오 조회
export const fetchRecommendPortfolios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios/recommended`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        // console.log('fetchRecommendPortfolios(추천 포트폴리오 조회) 에러 발생 : ', error);
        throw error;
    }
}

// 직군(회사) 리스트 조회
export const fetchJobList = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/companies`, {
            params: { query: query }
        });
        return response.data;
    } catch (error) {
        console.error('fetchJobList(직군 리스트 조회) 에러 발생 : ', error);
        return []; // 에러 발생 시 빈 배열 반환
    }
};

// 포트폴리오 필터링
export const fetchFilteredPortfolios = async (tag, company, dateRange) => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios/filter`, {
            params: {
                tag: tag,  // 필터링할 태그
                company: company,  // 필터링할 회사명
                dateRange: dateRange  // 기간 조건 (1주일, 1달, 6개월, 1년, 3년)
            }
        });
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        // console.log('fetchFilteredPortfolios(포트폴리오 필터링) 에러 발생 : ', error);
        throw error;
    }
}

// 정렬된 포트폴리오 조회
export const fetchPortfolios = async (sort) => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios`, {
            params: {
                sort: sort  // likes, views, createdAt(기본값)
            }
        });
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        // console.log('fetchFilteredPortfolios(포트폴리오 필터링) 에러 발생 : ', error);
        throw error;
    }
}