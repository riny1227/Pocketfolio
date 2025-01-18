import React from 'react';
import styled from "styled-components";
import Card from '../components/Card';
import Carousel from '../components/Carousel';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

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
        <div>
            {/* 캐러셀 */}
            <Carousel />

            <CardsContainer>
                <Card
                    title="포트폴리오 이름"
                    image={exampleImg} // 로컬 이미지 사용
                    name="riny"
                    views={1234}
                    likes={567}
                />
            </CardsContainer>
        </div>
    )
}