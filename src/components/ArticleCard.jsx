import React from "react";
import styled from "styled-components";

// 카드 컴포넌트 컨테이너
const CardContainer = styled.div`
    display: flex;
    width: 288px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

// 상단 썸네일 컨테이너
const ImageContainer = styled.div`
    position: relative;
    width: 288px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /* 이미지 비율 유지하며 잘라내기 */
    }
`;

// 북마크 아이콘
const BookmarkIcon = styled.div`
    position: absolute;
    display: flex;
    width: 24px;
    height: 24px;
    right: 8px;
    top: 160px;
    padding: 4px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 15px;
    background: #FFF;
    
    svg {
        width: 16px;
        height: 16px;
        cursor: pointer;
    }
`;

// 하단 Info 컨테이너
const InfoContainer = styled.div`
    display: flex;
    width: 288px;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
`;

// 아티클 제목+내용 컨테이너
const ArticleTopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`;

// 아티클 제목
const ArticleTitle = styled.div`
    font-size: 16px;
    font-family: 'Pretendard-SemiBold';
    font-weight: 600;
    color: #222222;
    line-height: 24px;
    word-wrap: break-word;
`;

// 아티클 내용
const ArticleContent = styled.div`
    height: 48px;
    color: #8E8E8E;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    overflow: hidden;
`;

// 아티클 날짜+글쓴이 컨테이너
const ArticleBottomContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`;

// 아티클 하단 글씨
const ArticleBottomText = styled.div`
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
    font-family: 'Pretendard-Regular';
    color: #8E8E8E;
`;

export default function ArticleCard ({ image, title, content, date, name  }){
    return (
        <CardContainer>
            {/* 상단 부분 */}
            <ImageContainer>
                <img src={image} alt={`${name}'s image`} />
                <BookmarkIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M5.018 13.894C4.574 14.1827 4 13.848 4 13.3013V2.628C4 2.28133 4.224 2 4.5 2H11.5C11.776 2 12 2.28133 12 2.628V13.3013C12 13.848 11.426 14.1827 10.982 13.8947L8.35133 12.1867C8.24698 12.1181 8.12485 12.0816 8 12.0816C7.87515 12.0816 7.75302 12.1181 7.64867 12.1867L5.018 13.894Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </BookmarkIcon>
            </ImageContainer>

            {/* 하단 부분 */}
            <InfoContainer>
                {/* 제목+내용 부분 */}
                <ArticleTopContainer>
                    <ArticleTitle>{title}</ArticleTitle>
                    <ArticleContent>{content}</ArticleContent>
                </ArticleTopContainer>
                {/* 날짜+글쓴이 부분 */}
                <ArticleBottomContainer>
                    <ArticleBottomText>{date}</ArticleBottomText>
                    <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                        <circle cx="2" cy="2" r="2" fill="#8E8E8E"/>
                    </svg>
                    <ArticleBottomText>{name}</ArticleBottomText>
                </ArticleBottomContainer>
            </InfoContainer>
        </CardContainer>
    );
};