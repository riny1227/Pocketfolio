import React from 'react';
import styled from "styled-components";
import Carousel from '../components/share/Carousel';
import ArticleCard from '../components/ArticleCard';

// 대체 이미지 사용
import exampleImg from '../imgs/example.png'

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

    const articles = [
        { id: 1, title: "아티클 1", content: "아티클 내용 부분", date: "2025.01.01", name: "1"},
        { id: 2, title: "아티클 2", content: "본문 일부글이 조금 2줄정도 보이게 일종의 미리보기 본문 일부글이 조금 2줄정도 보이게 일종의 미리보기", date: "2025.02.01", name: "홍길동"},
        { id: 3, title: "아티클 3", content: "아티클 내용 부분", date: "2025.01.01", name: "1"},
        { id: 4, title: "아티클 4", content: "본문 일부글이 조금 2줄정도 보이게 일종의 미리보기 본문 일부글이 조금 2줄정도 보이게 일종의 미리보기", date: "2025.02.01", name: "홍길동"},
        { id: 5, title: "아티클 5", content: "아티클 내용 부분", date: "2025.01.01", name: "1"},
        { id: 6, title: "아티클 6", content: "본문 일부글이 조금 2줄정도 보이게 일종의 미리보기 본문 일부글이 조금 2줄정도 보이게 일종의 미리보기", date: "2025.02.01", name: "홍길동"},
    ];

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