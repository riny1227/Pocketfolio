import React from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

// 대체 이미지 사용
import exampleImg from '../imgs/example.png';

// 아티클 mockdata 사용
import articles from '../mockdata/Articles';

// ArticleDetail 전체 컴포넌트 감싸는 컨테이너
const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// 아티클 커버
const ArticleCover = styled.div`
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    margin-top: 102px;
    height: 240px;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// 아티클 상단 부분
const ArticleTop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 240px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    z-index: 1;
`;

// 북마크 아이콘
const BookmarkIcon = styled.div`
    display: flex;
    width: 28px;
    height: 29px;
    margin-left: auto;
    cursor: pointer;
    
    svg {
        width: 100%;
        height: 100%;
    }
`;

// 아티클 이름+제목+날짜 텍스트 컨테이너
const TopTextContainer = styled.div`
    display: flex;
    width: 1440px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin: 56px auto;
    padding: 0 104px;
    box-sizing: border-box;
`;

// 아티클 상단 이름
const ArticleName = styled.div`
    color:  #464646;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
`;

// 아티클 제목과 날짜 부분
const TitleDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
`;

// 아티클 상단 제목
const ArticleTitle = styled.div`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 58px;
`;

// 아티클 상단 날짜
const ArticleDate = styled.div`
    color:  #464646;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 아티클 하단 컨테이너
const ArticleBottomContainer = styled.div`
    margin: 56px auto;
    padding: 0 104px;
    box-sizing: border-box;
    width: 1440px;
`;

// 아티클 하단 내용
const ArticleContent = styled.div`
    color: #000;
    font-family: 'Pretendard-Medium';
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 160%;
`;

const ArticleDetail = () => {
    const { id } = useParams();
    const article = articles.find(article => article.id === parseInt(id)); // id를 숫자로 변환

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <ArticleContainer>
            {/* 상단 아티클 커버 */}
            <ArticleCover>
                <img src={exampleImg}/>
                <ArticleTop>
                    <TopTextContainer>
                        <BookmarkIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.018 13.894C4.574 14.1827 4 13.848 4 13.3013V2.628C4 2.28133 4.224 2 4.5 2H11.5C11.776 2 12 2.28133 12 2.628V13.3013C12 13.848 11.426 14.1827 10.982 13.8947L8.35133 12.1867C8.24698 12.1181 8.12485 12.0816 8 12.0816C7.87515 12.0816 7.75302 12.1181 7.64867 12.1867L5.018 13.894Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </BookmarkIcon>
                        <ArticleName>{article.name}</ArticleName>
                        <TitleDate>
                            <ArticleTitle>{article.title}</ArticleTitle>
                            <ArticleDate>{article.date}</ArticleDate>
                        </TitleDate>
                    </TopTextContainer>
                </ArticleTop>
            </ArticleCover>
            {/* 하단 아티클 내용 */}
            <ArticleBottomContainer>
                <ArticleContent>{article.content}</ArticleContent>
            </ArticleBottomContainer>
        </ArticleContainer>
    );
};

export default ArticleDetail;