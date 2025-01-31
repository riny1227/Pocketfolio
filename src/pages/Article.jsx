import React from 'react';
import styled from "styled-components";
import Carousel from '../components/share/Carousel';
import ArticleCard from '../components/ArticleCard';

// 대체 이미지 사용
import exampleImg from '../imgs/example.png';

// 아티클 mockdata 사용
import articles from '../mockdata/Articles';

// Article 전체 컴포넌트 감싸는 컨테이너
const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// 아티클 타이틀
const ArticleTitle = styled.div`
    display: flex;
    margin: 40px auto 40px auto;
    width: 1232px;
    color: #000;
    font-family: 'Pretendard-SemiBold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
`;

// 카드 컴포넌트 배치할 컨테이너
const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 1232px;
    margin: 0 auto;
    padding: 0px 24px 80px 24px;
    justify-content: flex-start;
    row-gap: 32px;
    column-gap: 24px;
`;

// 카드 아이템 스타일
const CardItem = styled.div`
    flex: 0 0 calc((100% - 3 * 24px) / 4); /* 4개씩 배치되도록 계산 */
    box-sizing: border-box;
`;

export default function Article() {
    return (
        <ArticleContainer>
            {/* 캐러셀 */}
            <Carousel />

            <ArticleTitle>아티클</ArticleTitle>

            {/* 아티클 */}
            <CardsContainer>
                {articles.map((article) => (
                    <CardItem key={article.id}>
                        <ArticleCard
                            id={article.id}
                            title={article.title}
                            image={exampleImg}
                            content={article.content}
                            name={article.name}
                            date={article.date}
                        />
                    </CardItem>
                ))}
            </CardsContainer>
        </ArticleContainer>
    )
}