import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from '../components/share/Card';
import Carousel from '../components/share/Carousel';
import Filter from '../components/Filter';
import { fetchJobList, fetchFilteredPortfolios, fetchPortfolios } from '../api/HomeApi';

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
    const location = useLocation();

    // 호버 모드
    const [hoverMode, setHoverMode] = useState("home");

    // 카드 선택 
    const [selectedCard, setSelectedCard] = useState(null);

    // 카드 데이터와 북마크 상태
    const [cards, setCards] = useState([]);

    // 임시 카드 데이터
    const exampleCards = [
        {
            id: 301,
            title: "포트폴리오 A",
            thumbnail: "",
            userName: "사용자1",
            views: 320,
            likes: 50,
            isBookmarked: false
        },
        {
            id: 302,
            title: "포트폴리오 B",
            thumbnail: "",
            userName: "사용자2",
            views: 275,
            likes: 45,
            isBookmarked: false
        },
        {
            id: 303,
            title: "포트폴리오 C",
            thumbnail: "",
            userName: "사용자3",
            views: 210,
            likes: 40,
            isBookmarked: false
        },
        {
            id: 304,
            title: "포트폴리오 D",
            thumbnail: "",
            userName: "사용자4",
            views: 190,
            likes: 38,
            isBookmarked: false
        },
        {
            id: 305,
            title: "포트폴리오 E",
            thumbnail: "",
            userName: "사용자5",
            views: 200,
            likes: 35,
            isBookmarked: false
        },
        {
            id: 306,
            title: "포트폴리오 F",
            thumbnail: "",
            userName: "사용자6",
            views: 180,
            likes: 30,
            isBookmarked: false
        }
    ];

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

    // 정렬된 포트폴리오 조회 결과 가져오기 (기본 - 최신순)
    useEffect(() => {
        const getPortfolios = async () => {
            try {
                const response = await fetchPortfolios();
                const data = response?.data || []; // API 응답 구조에 맞게 수정
                setCards(data.length > 0 ? data : exampleCards); // 데이터가 없으면 예시 데이터 사용
            } catch (error) {
                // console.error("getPortfolios 에러 발생 : ", error);
                setCards(exampleCards); // API 요청 실패 시 예시 데이터 사용
            }
        }

        getPortfolios();
    }, []);

    // 검색 api 실행 결과 가져오기
    useEffect(() => {
        if (Array.isArray(location.state?.searchResults)) {
            setCards(location.state.searchResults);
            console.log("검색 api 실행 성공")
        }
    }, [location.state]);

    return (
        <HomeContainer>
            {/* 캐러셀 */}
            <Carousel />

            {/* 필터 */}
            <Filter setCards={setCards}/>

            {/* 카드 */}
            <CardsContainer>
                {cards.map((card, index) => (
                    <CardItem key={index} onClick={() => handleCardClick(card)}>
                        <Card
                            title={card.title}
                            image={card.thumbnail || exampleImg} // 썸네일 없다면 예시 이미지 사용
                            name={card.userName} // API 명세서에 맞게 변경
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