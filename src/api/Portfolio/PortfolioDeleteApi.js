import axios from 'axios';

export const deletePortfolio = async (portfolioId, token) => {
    try {
        const response = await axios.delete(`https://pocketfolio.co.kr/api/portfolio/${portfolioId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        
        // 성공 응답 처리
        if (response.status === 200) {
            console.log('포트폴리오가 삭제 되었습니다.', response.data.message);
            return response.data;
        }
    } catch (error) {
        // 오류 응답 처리
        if (error.response) {
            // 서버에서 받은 응답에 따른 오류 처리
            if (error.response.status === 403) {
                console.error('삭제 권한이 없습니다.', error.response.data.message);
            } else if (error.response.status === 500) {
                console.error('포트폴리오 삭제 중 오류가 발생했습니다.', error.response.data.message);
            } 
        }
    }
};