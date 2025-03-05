import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Card from '../components/share/Card';
import Carousel from '../components/share/Carousel';
import Filter from '../components/Filter';
import { fetchRecommendPortfolios, fetchRecentPortfolios, fetchJobList, fetchPopularTags, fetchFilteredPortfolios } from '../api/HomeApi';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

// PortfolioDetailModal 불러오기
import PortfolioDetailModal from '../components/share/PortfolioDetailModal';

// Home 전체 컴포넌트 감싸는 컨테이너
const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 카드 컴포넌트 배치할 컨테이너
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1232px;
    margin: 0 auto;
    padding: 32px 24px 80px 24px;
    justify-content: flex-start;
    row-gap: 32px;
    column-gap: 24px;
`;

// 카드 아이템 스타일
const CardItem = styled.div`
    flex: 0 0 calc((100% - 3 * 24px) / 4); /* 4개씩 배치되도록 계산 */
    box-sizing: border-box;
    cursor: pointer;
`;

export default function Home() {
    // 호버 모드
    const [hoverMode, setHoverMode] = useState("home");

    // 카드 선택 
    const [selectedCard, setSelectedCard] = useState(null);

    // 카드 데이터와 북마크 상태
    const [cards, setCards] = useState([
        { id: 1, title: "포트폴리오 1", name: "1", views: 1234, likes: 567, isBookmarked: false },
        { id: 2, title: "포트폴리오 2", name: "2", views: 5678, likes: 890, isBookmarked: false },
        { id: 3, title: "포트폴리오 3", name: "3", views: 910, likes: 123, isBookmarked: false },
        { id: 4, title: "포트폴리오 4", name: "4", views: 1234, likes: 567, isBookmarked: false },
        { id: 5, title: "포트폴리오 5", name: "5", views: 5678, likes: 890, isBookmarked: false },
        { id: 6, title: "포트폴리오 6", name: "6", views: 910, likes: 123, isBookmarked: false },
    ]);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    };

    const closeModal = () => {
        setSelectedCard(null);
        document.body.style.overflow = 'auto'; // 배경 스크롤 활성화
    };

    const handleBookmarkToggle = (id) => {
        // 북마크 상태 토글
        setCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
            )
        );
    };

    // 추천 포트폴리오 조회 api 연결 - 테스트
    useEffect(() => {
        const getRecommendPortfolios = async () => {
            try {
                const data = await fetchRecommendPortfolios();
                console.log('추천 포트폴리오 조회 data : ', data);
            } catch (error) {
                console.error('getRecommendPortfolios 에러 발생 : ', error)
            }
        };

        getRecommendPortfolios();
    }, []);

    return (
        <HomeContainer>
            {/* 캐러셀 */}
            <Carousel />

            {/* 필터 */}
            <Filter />

            {/* 카드 */}
            <CardsContainer>
                {cards.map((card, index) => (
                    <CardItem key={index} onClick={() => handleCardClick(card)}>
                        <Card
                            title={card.title}
                            image={exampleImg} // 예시 이미지 사용
                            name={card.name}
                            views={card.views}
                            likes={card.likes}
                            hoverMode={hoverMode}
                            isBookmarked={card.isBookmarked} // 북마크 상태 전달
                            onBookmarkChange={() => handleBookmarkToggle(card.id)} // 북마크 상태 변경 함수 전달
                        />
                    </CardItem>
                ))}
            </CardsContainer>

            {/* 포트폴리오 상세 페이지 모달 */}
            {selectedCard && <PortfolioDetailModal card={selectedCard} onClose={closeModal} />}
        </HomeContainer>
    )
}