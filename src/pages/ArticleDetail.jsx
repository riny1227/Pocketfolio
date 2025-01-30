import React from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';

// 대체 이미지 사용
import exampleImg from '../imgs/example.png'

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
    height: 227px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// 아티클 상단 부분
const ArticleTop = styled.div`
    display: flex;
    width: 1440px;
    padding: 0px 104px;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    flex-shrink: 0;
`;

const ArticleDetail = () => {
    const { id } = useParams();

    return (
        <ArticleContainer>
            {/* 상단 아티클 커버 */}
            <ArticleCover>
                <img src={exampleImg}/>
                <ArticleTop>
                    
                </ArticleTop>
            </ArticleCover>

        </ArticleContainer>
    );
};

export default ArticleDetail;