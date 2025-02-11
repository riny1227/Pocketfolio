import React, { useState } from 'react';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Card from '../components/share/Card';
import Carousel from '../components/share/Carousel';
import Filter from '../components/Filter';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

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

// 모달창 뒷배경 
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

// 모달창 컨테이너
const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    top: 70px;
    background: #fff;
    border-radius: 16px 16px 0px 0px;
    position: relative; 
`;

// 모달을 닫는 버튼 
const CloseButton = styled.button`
    position: absolute;
    top: 38px;
    right: 16px;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
`;


export default function Home() {
    // 호버 모드
    const [hoverMode, setHoverMode] = useState("home");

    // 카드 선택 
    const [selectedCard, setSelectedCard] = useState(null);

    const cards = [
        { title: "포트폴리오 1", name: "1", views: 1234, likes: 567 },
        { title: "포트폴리오 2", name: "2", views: 5678, likes: 890 },
        { title: "포트폴리오 3", name: "3", views: 910, likes: 123 },
        { title: "포트폴리오 4", name: "4", views: 1234, likes: 567 },
        { title: "포트폴리오 5", name: "5", views: 5678, likes: 890 },
        { title: "포트폴리오 6", name: "6", views: 910, likes: 123 },
    ];

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

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
                        />
                    </CardItem>
                ))}
            </CardsContainer>

            {/* 포트폴리오 상세 페이지 모달 */}
            {selectedCard && (
                <ModalOverlay onClick={closeModal}>
                    <CloseButton onClick={closeModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7.00005 8.3998L2.10005 13.2998C1.91672 13.4831 1.68338 13.5748 1.40005 13.5748C1.11672 13.5748 0.883382 13.4831 0.700048 13.2998C0.516715 13.1165 0.425049 12.8831 0.425049 12.5998C0.425049 12.3165 0.516715 12.0831 0.700048 11.8998L5.60005 6.9998L0.700048 2.0998C0.516715 1.91647 0.425049 1.68314 0.425049 1.3998C0.425049 1.11647 0.516715 0.883138 0.700048 0.699804C0.883382 0.516471 1.11672 0.424805 1.40005 0.424805C1.68338 0.424805 1.91672 0.516471 2.10005 0.699804L7.00005 5.5998L11.9 0.699804C12.0834 0.516471 12.3167 0.424805 12.6 0.424805C12.8834 0.424805 13.1167 0.516471 13.3 0.699804C13.4834 0.883138 13.575 1.11647 13.575 1.3998C13.575 1.68314 13.4834 1.91647 13.3 2.0998L8.40005 6.9998L13.3 11.8998C13.4834 12.0831 13.575 12.3165 13.575 12.5998C13.575 12.8831 13.4834 13.1165 13.3 13.2998C13.1167 13.4831 12.8834 13.5748 12.6 13.5748C12.3167 13.5748 12.0834 13.4831 11.9 13.2998L7.00005 8.3998Z" fill="#E6E6E6"/>
                            </svg>
                        </CloseButton>
                    <ModalContainer onClick={(e) => e.stopPropagation()}>
                        
                    </ModalContainer>
                </ModalOverlay>
            )}
        </HomeContainer>
    )
}