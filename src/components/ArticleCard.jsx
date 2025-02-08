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
    display: flex;
    position: absolute;
    top: 16px;
    right: 12px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;

    svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
        fill: ${(props) => (props.active ? "#1570EF" : "#909090")}; /* props에서 active를 받아 처리 */
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

export default function ArticleCard ({ id, image, title, content, date, name  }){
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
                    active={isBookmarked}
                    onClick={(e) => {
                        e.stopPropagation(); // 북마크가 눌려도 상세페이지로 이동하지 않도록
                        setIsBookmarked(prev => !prev);
                    }}
                >
                    {isBookmarked ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path 
                                fillRule="evenodd" 
                                clipRule="evenodd" 
                                d="M8.66663 2C7.00977 2 5.66663 3.34315 5.66663 5V21C5.66663 21.3466 5.84608 21.6684 6.14089 21.8507C6.43571 22.0329 6.80385 22.0494 7.11384 21.8944L12.6666 19.118L18.2194 21.8944C18.5294 22.0494 18.8975 22.0329 19.1924 21.8507C19.4872 21.6684 19.6666 21.3466 19.6666 21V5C19.6666 3.34315 18.3235 2 16.6666 2H8.66663Z" 
                                fill="#1570EF"
                            />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path 
                                fillRule="evenodd" 
                                clipRule="evenodd" 
                                d="M5 5C5 3.34315 6.34315 2 8 2H16C17.6569 2 19 3.34315 19 5V21C19 21.3466 18.8205 21.6684 18.5257 21.8507C18.2309 22.0329 17.8628 22.0494 17.5528 21.8944L12 19.118L6.44721 21.8944C6.13723 22.0494 5.76909 22.0329 5.47427 21.8507C5.17945 21.6684 5 21.3466 5 21V5ZM8 4C7.44772 4 7 4.44772 7 5V19.382L11.5528 17.1056C11.8343 16.9648 12.1657 16.9648 12.4472 17.1056L17 19.382V5C17 4.44772 16.5523 4 16 4H8Z" 
                                fill="#909090"
                            />
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