import axios from 'axios';

// 사용자 정보 가져오기
export const getUserInfo = async (token) => {
    if (!token) {
        throw new Error('Token not found');
    }

    const url = "https://pocketfolio.co.kr/api/mypage/fetchInfo";

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

    const url = "https://pocketfolio.co.kr/api/mypage/likes";

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

// 학교찾기
export const schoolList = async (gubun, searchSchulNm) => {
    if (!gubun || !searchSchulNm) {
      throw new Error('학교 종류와 검색어를 입력해주세요.');
    }
  
    const url = "https://pocketfolio.co.kr/api/mypage/searchUniversity";
    
    try {
      const response = await axios.get(url, {
        params: {
          gubun: gubun,  // 학교 종류
          searchSchulNm: searchSchulNm, // 검색어
        },
      });
  
      return response.data.universities; // 반환된 학교 리스트 반환
    } catch (error) {
      console.error('Error fetching school list:', error);
      throw error;
    }
};

// 활동 삭제 API
export const deleteActivity = async (activityId, token) => {
    if (!token) {
        throw new Error('Token not found');
    }
    if (!activityId) {
        throw new Error('Activity ID is required');
    }

    const url = `https://pocketfolio.co.kr/api/mypage/activitydelete?activity_id=${activityId}`;

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.delete(url, { headers });
        return response.data;  // 삭제 성공 메시지 반환
    } catch (error) {
        console.error('Error deleting activity:', error);
        throw error;
    }
};