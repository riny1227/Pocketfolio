import React from 'react';
import Card from '../components/Card';
import Filter from '../components/Filter';
import styled from "styled-components";

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
    width: 1280px;
    padding: 32px 24px 80px 24px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    row-gap: 32px;
    align-self: stretch;
    flex-wrap: wrap;
`;

export default function Home() {

    return (
        <HomeContainer>
            <Filter />
            <CardsContainer>
                <Card
                    title="포트폴리오 이름"
                    image={exampleImg} // 로컬 이미지 사용
                    name="riny"
                    views={1234}
                    likes={567}
                />
            </CardsContainer>
        </HomeContainer>
    )
}