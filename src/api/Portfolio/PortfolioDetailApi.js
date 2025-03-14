// 포트폴리오 상세 조회 API
export const fetchPortfolioDetails = async (portfolioId, token) => {
    try {
        console.log("Fetching portfolio details for ID:", portfolioId);

        const response = await fetch(`https://pocketfolio.co.kr/api/portfolio/${portfolioId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        console.log("API Response:", response);
    
        if (!response.ok) {
            throw new Error('포트폴리오 상세 조회에 실패했습니다. 다시 시도해 주세요.');
        }

        const data = await response.json();

        return {
            id: data.id,
            title: data.title,
            role: data.role,
            job: data.job,
            company: data.company,
            cover_image: data.cover_image,
            likes: data.likes,
            views: data.views,
            description: data.description,
            attachments: data.attachments,
            url: data.url,
            tags: data.tags,
            comments: data.comments,
        };
    } catch (error) {
        console.error('포트폴리오 상세 조회 에러:', error);
        throw error;
    }
};