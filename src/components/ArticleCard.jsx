import { useState } from "react";
import { useNavigate } from 'react-router-dom';
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
    width: 36px;
    height: 36px;
    position: absolute;
    top: 16px;
    right: 12px;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
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
    font-size: 20px;
    font-family: 'Pretendard-SemiBold';
    font-weight: 600;
    color: #222222;
    line-height: 24px;
    word-wrap: break-word;
`;

// 아티클 내용
const ArticleContent = styled.div`
    height: 48px;
    color: #909090;
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
    color: #909090;
`;

export default function ArticleCard ({ id, image, title, content, date, name }){
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleClick = () => {
        navigate(`/article/${id}`); // 특정 경로로 이동
    };

    return (
        <CardContainer>
            {/* 상단 부분 */}
            <ImageContainer onClick={handleClick}>
                <img src={image} alt={`${name}'s image`} />
                <BookmarkIcon
                    onClick={(e) => {
                        e.stopPropagation(); // 북마크가 눌려도 상세페이지로 이동하지 않도록
                        setIsBookmarked(prev => !prev);
                    }}
                >
                    {isBookmarked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.51472 0 0.5 2.01472 0.5 4.5V28.5C0.5 29.0199 0.769179 29.5027 1.2114 29.776C1.65363 30.0493 2.20584 30.0741 2.67082 29.8416L11 25.6771L19.3292 29.8416C19.7942 30.0741 20.3464 30.0493 20.7886 29.776C21.2308 29.5027 21.5 29.0199 21.5 28.5V4.5C21.5 2.01472 19.4853 0 17 0H5Z" fill="#1570EF"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="30" viewBox="0 0 21 30" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333313 4.5C0.333313 2.29086 2.12417 0.5 4.33331 0.5H16.3333C18.5425 0.5 20.3333 2.29086 20.3333 4.5V28.5C20.3333 28.8466 20.1539 29.1684 19.859 29.3507C19.5642 29.5329 19.1961 29.5494 18.8861 29.3944L10.3333 25.118L1.78053 29.3944C1.47054 29.5494 1.1024 29.5329 0.807582 29.3507C0.512765 29.1684 0.333313 28.8466 0.333313 28.5V4.5ZM4.33331 2.5C3.22874 2.5 2.33331 3.39543 2.33331 4.5V26.882L9.8861 23.1056C10.1676 22.9648 10.499 22.9648 10.7805 23.1056L18.3333 26.882V4.5C18.3333 3.39543 17.4379 2.5 16.3333 2.5H4.33331Z" fill="#B1B1B1"/>
                        </svg>
                    )}
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