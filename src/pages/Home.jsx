import React from 'react';
import styled from "styled-components";
import Card from '../components/Card';
import Carousel from '../components/Carousel';
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
`;

export default function Home() {

    const cards = [
        { title: "포트폴리오 1", name: "1", views: 1234, likes: 567 },
        { title: "포트폴리오 2", name: "2", views: 5678, likes: 890 },
        { title: "포트폴리오 3", name: "3", views: 910, likes: 123 },
        { title: "포트폴리오 4", name: "4", views: 1234, likes: 567 },
        { title: "포트폴리오 5", name: "5", views: 5678, likes: 890 },
        { title: "포트폴리오 6", name: "6", views: 910, likes: 123 },
    ];

    return (
        <HomeContainer>
            {/* 캐러셀 */}
            <Carousel />

            {/* 필터 */}
            <Filter />

            {/* 카드 */}
            <CardsContainer>
                {cards.map((card, index) => (
                    <CardItem key={index}>
                        <Card
                            title={card.title}
                            image={exampleImg} // 예시 이미지 사용
                            name={card.name}
                            views={card.views}
                            likes={card.likes}
                        />
                    </CardItem>
                ))}
            </CardsContainer>
        </HomeContainer>
    )
}