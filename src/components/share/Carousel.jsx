import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import example from '../../imgs/example.png';
import { fetchRecommendPortfolios } from '../../api/HomeApi';

// 캐러셀 컨테이너
const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 102px;
`;

// 슬라이드
const SlideContainer = styled.div`
    display: flex;
    transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
    width: 100%;
    flex-shrink: 0;
    height: 240px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// 점들 (순서 표시)
const DotsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
`;

const Dot = styled.button`
    background-color: ${props => (props.active ? '#fff' : '#d9d9d9')};
    border: none;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    padding: 0px;
    margin: 0px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #555;
    }
`;

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [recommendedData, setRecommendedData] = useState([]);

    // 추천 포트폴리오 조회 api 연결
    useEffect(() => {
        const getRecommendPortfolios = async () => {
            try {
                const response = await fetchRecommendPortfolios();
                if (response && response.data) {
                    setRecommendedData(response.data);
                }
            } catch (error) {
                console.error('getRecommendPortfolios 에러 발생 : ', error);
            }
        };
        getRecommendPortfolios();
    }, []);

    // 자동 슬라이드 (5초마다 변경)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % (recommendedData.length || 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [recommendedData]);

    // 슬라이드 이동 함수
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <CarouselContainer>
            <SlideContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {(recommendedData.length > 0 ? recommendedData : [{ coverImage: example }]).map((item, index) => (
                    <Slide key={index}>
                        <img src={item.coverImage || example} alt={`Slide ${index + 1}`} />
                    </Slide>
                ))}
            </SlideContainer>
            <DotsContainer>
                {(recommendedData.length > 0 ? recommendedData : [{ coverImage: example }]).map((_, index) => (
                    <Dot key={index} active={index === currentIndex} onClick={() => goToSlide(index)} />
                ))}
            </DotsContainer>
        </CarouselContainer>
    );
}
