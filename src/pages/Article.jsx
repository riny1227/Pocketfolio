import React from 'react';
import styled from "styled-components";
import Carousel from '../components/share/Carousel';
import ArticleCard from '../components/ArticleCard';
import { useState, useEffect } from "react";

// 대체 이미지 사용
import exampleImg from '../imgs/example.png';

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
    const [articles, setArticles] = useState([]); // API에서 가져올 데이터 저장

    // API에서 아티클 데이터 가져오기
    const fetchArticles = async () => {
        try {
            const response = await fetch("/mockdata/Articles.json"); // public 폴더 내 mockdata 불러오기
            if (!response.ok) {
                throw new Error("(mock data) 아티클 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error("(mock data) 아티클 목록 불러오기 오류:", error);
        }
    };

    // ✅ 컴포넌트 마운트 시 데이터 불러오기
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <ArticleContainer>
            {/* 캐러셀 */}
            <Carousel />

            <ArticleTitle>아티클</ArticleTitle>

            {/* 로딩 중이면 메시지 표시 */}
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
    );
}