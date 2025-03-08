import axios from 'axios';

// 포트폴리오 삭제 API
export const deletePortfolio = async (portfolioId) => {
    try {
        const response = await fetch(`https://example.com/api/portfolio/${portfolioId}`, {
            method: 'DELETE',
        });
    
        if (response.ok) {
            const data = await response.json();
            return {
                message: data.message,
            };
        } else {
            // 오류 처리
            throw new Error("포트폴리오 삭제에 실패했습니다. 다시 시도해 주세요.");
        }
    } catch (error) {
        console.error('포트폴리오 삭제 에러:', error);
        throw error;
    }
    
}