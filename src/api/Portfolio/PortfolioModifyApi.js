import axios from 'axios';

// 포트폴리오 수정 API
export const modifyPortfolio = async (portfolioId, updateData, token) => {
    try {
        const response = await axios.patch(`https://pocketfolio.co.kr/api/portfolio/${portfolioId}`,
        updateData,
            {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                },
            }
        );
        
        // 성공 응답 처리 
        if (response.status === 200) {
            return { message: '포트폴리오가 수정되었습니다.' };
        }


        } catch (error) {
            if (error.response) {
            if (error.response.status === 403) {
                throw new Error('수정 권한이 없습니다.');
            } else if (error.response.status === 500) {
                throw new Error('포트폴리오 수정 중 오류가 발생했습니다.');
            }
            throw new Error('네트워크 오류가 발생했습니다.');
            }
        }
};