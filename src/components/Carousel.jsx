import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import example from '../imgs/example.png';

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
    height: 320px; // 고정된 높이 설정
    img {
        width: 100%;
        height: 100%; // 부모의 높이에 맞춤
        object-fit: cover; // 이미지 비율 유지하면서 컨테이너 채우기
    }
`;

// 점들 (순서 표시)
const DotsContainer = styled.div`
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 16px; // 캐러셀 하단에서 16px 위에 배치
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
    margin: 0 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #555;
    }
`;

const images = [example, example, example, example];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // 자동 슬라이드 (5초마다)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000); // 5초마다 슬라이드 변경

        return () => clearInterval(interval); // 컴포넌트가 unmount 될 때 interval 정리
    }, []);

    // 슬라이드 이동 함수
    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div>
            <CarouselContainer>
                <SlideContainer style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                    {images.map((img, index) => (
                        <Slide key={index}>
                            <img src={img} alt={`Slide ${index + 1}`} />
                        </Slide>
                    ))}
                </SlideContainer>
                <DotsContainer>
                {images.map((_, index) => (
                    <Dot
                        key={index}
                        active={index === currentIndex}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </DotsContainer>
            </CarouselContainer>
        </div>
    );
}
