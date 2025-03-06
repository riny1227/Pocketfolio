import axios from 'axios';

const BASE_URL = 'https://pocketfolio.co.kr/api';

// 사용자 인증 상태 확인
export const fetchCheckStatus = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/nav/auth/status`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchCheckStatus(사용자 인증 상태 확인) 에러 발생 : ', error);
        throw error;
    }
};

// 검색 API
export const fetchSearch = async (query, type, limit = 10) => {
    try {
        const response = await axios.get(`${BASE_URL}/nav/search`, {
            params: {
                query: query, // 검색 키워드
                type: type,   // 검색 대상 ("portfolio", "user", "tag" 등)
                limit: limit  // 최대 검색 개수 (기본값 10)
            }
        });
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchSearch(검색 api) 에러 발생 : ', error);
        throw error;
    }
};

// 알람 리스트 조회
export const fetchNotifications = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/nav/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('응답 상태 코드 : ', response.status);
        return response.data;
    } catch (error) {
        console.log('fetchNotifications(알림 리스트 조회) 에러 발생 : ', error);
        throw error;
    }
};