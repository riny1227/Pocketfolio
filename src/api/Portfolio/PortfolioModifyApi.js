// 포트폴리오 수정 API
export const modifyPortfolio = async (portfolioId, updateData) => {
    try {
        const response = await fetch(`"https://pocketfolio.co.kr/api/portfolio/${portfolioId}"`, {
            method: 'PUT',  // 수정 요청이므로 PUT 메서드 사용
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),  // 요청 본문에 수정된 데이터 포함
        });
    
        // 응답이 성공적이면 JSON을 반환
        if (response.ok) {
            const data = await response.json();
            return {
                message: data.message,
            };
        } else {
            // 오류 처리
            throw new Error('Failed to modify portfolio');
        }
    } catch (error) {
        console.error('Error modifying portfolio:', error);
    }
};