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
            throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);

        return {
            id: data.id || 0,
            title: data.title || "제목 없음",
            user_name: data.user_name || "알 수 없음",
            cover_image: data.cover_image || "",
            likes: data.likes || 0,
            views: data.views || 0,
            description: data.description || "설명이 없습니다.",
            attachments: data.attachments || [],
            tags: data.tags || [],
            comments: data.comments || []
        };
    } catch (error) {
        console.error("Error fetching portfolio details:", error);
        throw error;
    }
};