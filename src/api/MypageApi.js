import axios from 'axios';

// 사용자 정보 가져오기
export const getUserInfo = async (token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/profile";

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;  // 사용자 정보 반환
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

// 포트폴리오 목록 불러오기
export const getPortfolioList = async (token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/portfolio";

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;  // 포트폴리오 목록 반환
    } catch (error) {
        console.error('Error fetching portfolio list:', error);
        throw error;
    }
};

// 북마크 목록 불러오기
export const getBookmarks = async (token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/bookmark";

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;  // 북마크 목록 반환
    } catch (error) {
        console.error('Error fetching bookmarks:', error);
        throw error;
    }
};

// 좋아요 항목 불러오기
export const getLikes = async (token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/like";

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(url, { headers });
        return response.data;  // 좋아요 목록 반환
    } catch (error) {
        console.error('Error fetching likes:', error);
        throw error;
    }
};

// 프로필 저장
export const saveProfile = async (userData, token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/profile/save";

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.post(url, userData, { headers });
        return response.data;  // 프로필 저장 성공 메시지 반환
    } catch (error) {
        console.error('Error saving profile:', error);
        throw error;
    }
};