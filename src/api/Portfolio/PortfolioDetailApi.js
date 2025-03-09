import axios from 'axios';

// 포트폴리오 상세 조회 API
export const fetchPortfolioDetails = async (portfolioId) => {
    try {
        const response = fetch(`https://example.com/api/portfolio/${portfolioId}`);
    
        if (response.ok) {
            const data = (await response).json();

            return {
                id: data.id,
                title: data.title,
                user_name: data.user_name,
                cover_image: data.cover_image,
                likes: data.likes,
                views: data.views,
                description: data.description,
                attachments: data.attachments,
                tags: data.tags,
                comments: data.comments,
            };
        } else {
            // 오류 처리
            throw new Error('Failed to fetch portfolio details');
        }
    } catch (error) {
        console.error('Error fetching portfolio details:', error);
        throw error;
    }
};