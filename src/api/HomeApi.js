import axios from 'axios';

const BASE_URL = 'https://pocketfolio.co.kr/api';

// 추천 포트폴리오 조회
export const fetchRecommendPortfolios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios/recommend`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchRecommendPortfolios(추천 포트폴리오 조회) 에러 발생 : ', error);
        throw error;
    }
}

// 최근 업로드된 포트폴리오 목록 조회
export const fetchRecentPortfolios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios/recent`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchRecentPortfolios(최근 업로드된 포트폴리오 목록 조회) 에러 발생 : ', error);
        throw error;
    }
}

// 직군 리스트 조회
export const fetchJobList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/jobs`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchJobList(직군 리스트 조회) 에러 발생 : ', error);
        throw error;
    }
}

// 인기 태그 조회
export const fetchPopularTags = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/tags/popular`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchPopularTags(인기 태그 조회) 에러 발생 : ', error);
        throw error;
    }
}

// 포트폴리오 필터 및 정렬
export const fetchFilteredPortfolios = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/home/portfolios`);
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchFilteredPortfolios(포트폴리오 필터 및 정렬) 에러 발생 : ', error);
        throw error;
    }
}