import React from "react";
import styled from "styled-components";

// 카드 컴포넌트 컨테이너
const CardContainer = styled.div`
    display: flex;
    width: 288px;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
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

// 호버 시 나타나는 컨테이너
const PortfolioInfoContainer = styled.div`
    position: absolute; /* 이미지 위에 겹치도록 설정 */
    bottom: 0; /* 이미지의 아래쪽에 배치 */
    width: 288px;
    padding: 42px 8px 16px 8px;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, rgba(34, 34, 34, 0.5) 100%);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 8px;

    /* 박스 크기 계산 방식 설정 */
    box-sizing: border-box;
    
    /* 기본적으로 숨김 처리 */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0s ease 0.3s;

    /* 부모 요소에 hover가 있을 때 */
    ${ImageContainer}:hover & {
        opacity: 1;
        visibility: visible;
        transition: opacity 0.3s ease, visibility 0s ease 0s;
    }
`;

// 포트폴리오 이름
const PortfolioName = styled.div`
    color: white;
    font-size: 16px;
    font-family: 'Pretendard-SemiBold';
    font-weight: 600;
    line-height: 24px;
    word-wrap: break-word;
`;

// 북마크 아이콘
const BookmarkIcon = styled.div`
    display: flex;
    width: 24px;
    height: 24px;
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
    align-self: stretch;
    justify-content: space-between;
    align-items: center;
    display: inline-flex;
`;

// 사용자 이름
const UserInfo = styled.div`
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: flex;

    span {
        color: #222222;
        font-size: 14px;
        font-family: 'Pretendard-SemiBold';
        font-weight: 600;
        line-height: 22px;
        word-wrap: break-word;
    }
`;

// 조회수와 좋아요를 묶는 컨테이너
const StatsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

// 조회수
const ViewsInfo = styled.div`
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: flex;

    svg {
        width: 16px;
        height: 16px;
    }

    span {
        color: #222222;
        font-size: 12px;
        font-family: 'Pretendard-Regular';
        font-weight: 400;
        line-height: 20px;
        word-wrap: break-word;
    }
`;

// 좋아요
const LikesInfo = styled.div`
    justify-content: flex-start;
    align-items: center;
    gap: 4px;
    display: flex;

    svg {
        width: 16px;
        height: 16px;
    }

    span {
        color: #222222;
        font-size: 12px;
        font-family: 'Pretendard-Regular';
        font-weight: 400;
        line-height: 20px;
        word-wrap: break-word;
    }
`;

export default function Card ({ image, title, userImage, name, views, likes, hoverMode = "home"  }){
    return (
        <CardContainer>
            {/* 상단 부분 */}
            <ImageContainer>
                <img src={image} alt={`${name}'s image`} />
                {/* 마우스 호버 시에 나타나는 부분 */}
                <PortfolioInfoContainer>
                    <PortfolioName>{title}</PortfolioName>
                    {/* 홈화면 카드 컴포넌트 */}
                    {hoverMode === "home" ? (
                        <BookmarkIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M5.018 13.894C4.574 14.1827 4 13.848 4 13.3013V2.628C4 2.28133 4.224 2 4.5 2H11.5C11.776 2 12 2.28133 12 2.628V13.3013C12 13.848 11.426 14.1827 10.982 13.8947L8.35133 12.1867C8.24698 12.1181 8.12485 12.0816 8 12.0816C7.87515 12.0816 7.75302 12.1181 7.64867 12.1867L5.018 13.894Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </BookmarkIcon>
                    ) : 
                        {/* 마이페이지 카드 컴포넌트 */}
                        (
                        <StatsContainer>
                            {/* 조회수 */}
                            <ViewsInfo>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.332 5.18665C4.486 4.22998 6.132 3.33331 8 3.33331C9.868 3.33331 11.5133 4.22998 12.668 5.18665C13.1901 5.61433 13.6592 6.10291 14.0653 6.64198C14.234 6.87131 14.3753 7.09665 14.4773 7.30665C14.5707 7.49731 14.6667 7.74531 14.6667 7.99998C14.6667 8.25465 14.57 8.50265 14.4773 8.69331C14.36 8.92666 14.2221 9.14909 14.0653 9.35798C13.6592 9.89705 13.1901 10.3856 12.668 10.8133C11.514 11.77 9.868 12.6666 8 12.6666C6.132 12.6666 4.48666 11.77 3.332 10.8133C2.80988 10.3856 2.34077 9.89705 1.93466 9.35798C1.77787 9.14909 1.64 8.92666 1.52266 8.69331C1.42933 8.50265 1.33333 8.25465 1.33333 7.99998C1.33333 7.74531 1.42999 7.49731 1.52266 7.30665C1.62466 7.09665 1.76599 6.87131 1.93466 6.64198C2.34077 6.10291 2.80988 5.61433 3.332 5.18665ZM8 9.99998C8.53043 9.99998 9.03914 9.78927 9.41421 9.41419C9.78928 9.03912 10 8.53041 10 7.99998C10 7.46955 9.78928 6.96084 9.41421 6.58577C9.03914 6.21069 8.53043 5.99998 8 5.99998C7.46956 5.99998 6.96085 6.21069 6.58578 6.58577C6.21071 6.96084 6 7.46955 6 7.99998C6 8.53041 6.21071 9.03912 6.58578 9.41419C6.96085 9.78927 7.46956 9.99998 8 9.99998Z" fill="#222222"/>
                                </svg>
                                <span>{views}</span>
                            </ViewsInfo>
                            {/* 좋아요 */}
                            <LikesInfo>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14 5.33332C14.3556 5.33332 14.6667 5.46665 14.9333 5.73332C15.2 5.99999 15.3333 6.3111 15.3333 6.66665V7.99999C15.3333 8.07776 15.3249 8.1611 15.308 8.24999C15.2911 8.33888 15.2662 8.42221 15.2333 8.49999L13.2333 13.2C13.1333 13.4222 12.9667 13.6111 12.7333 13.7667C12.5 13.9222 12.2556 14 12 14H6.66668C6.30001 14 5.98623 13.8695 5.72534 13.6087C5.46446 13.3478 5.33379 13.0338 5.33334 12.6667V5.88332C5.33334 5.70554 5.36957 5.53621 5.44201 5.37532C5.51445 5.21443 5.61157 5.07265 5.73334 4.94999L9.35001 1.34999C9.51668 1.19443 9.71401 1.09999 9.94201 1.06665C10.17 1.03332 10.3893 1.07221 10.6 1.18332C10.8107 1.29443 10.9636 1.44999 11.0587 1.64999C11.1538 1.84999 11.1731 2.05554 11.1167 2.26665L10.3667 5.33332H14ZM2.66668 14C2.30001 14 1.98623 13.8695 1.72534 13.6087C1.46445 13.3478 1.33379 13.0338 1.33334 12.6667V6.66665C1.33334 6.29999 1.46401 5.98621 1.72534 5.72532C1.98668 5.46443 2.30045 5.33376 2.66668 5.33332C3.0329 5.33288 3.3469 5.46354 3.60868 5.72532C3.87045 5.9871 4.0009 6.30088 4.00001 6.66665V12.6667C4.00001 13.0333 3.86957 13.3473 3.60868 13.6087C3.34779 13.87 3.03379 14.0004 2.66668 14Z" fill="#222222"/>
                                </svg>s
                                <span>{likes}</span>
                            </LikesInfo>
                        </StatsContainer>
                    )}
                    
                </PortfolioInfoContainer>
            </ImageContainer>

            {/* 하단 부분 */}
            <InfoContainer>
                {/* 사용자 프로필 */}
                <UserInfo>
                    {/* 프로필 이미지 사진 코드 추후에 변경 예정 */}
                    <img src={userImage} alt="user" style={{ width: '28px', height: '28px', borderRadius: '16px' }} />
                    <span>{name}</span>
                </UserInfo>
                <StatsContainer>
                    {/* 조회수 */}
                    <ViewsInfo>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.332 5.18665C4.486 4.22998 6.132 3.33331 8 3.33331C9.868 3.33331 11.5133 4.22998 12.668 5.18665C13.1901 5.61433 13.6592 6.10291 14.0653 6.64198C14.234 6.87131 14.3753 7.09665 14.4773 7.30665C14.5707 7.49731 14.6667 7.74531 14.6667 7.99998C14.6667 8.25465 14.57 8.50265 14.4773 8.69331C14.36 8.92666 14.2221 9.14909 14.0653 9.35798C13.6592 9.89705 13.1901 10.3856 12.668 10.8133C11.514 11.77 9.868 12.6666 8 12.6666C6.132 12.6666 4.48666 11.77 3.332 10.8133C2.80988 10.3856 2.34077 9.89705 1.93466 9.35798C1.77787 9.14909 1.64 8.92666 1.52266 8.69331C1.42933 8.50265 1.33333 8.25465 1.33333 7.99998C1.33333 7.74531 1.42999 7.49731 1.52266 7.30665C1.62466 7.09665 1.76599 6.87131 1.93466 6.64198C2.34077 6.10291 2.80988 5.61433 3.332 5.18665ZM8 9.99998C8.53043 9.99998 9.03914 9.78927 9.41421 9.41419C9.78928 9.03912 10 8.53041 10 7.99998C10 7.46955 9.78928 6.96084 9.41421 6.58577C9.03914 6.21069 8.53043 5.99998 8 5.99998C7.46956 5.99998 6.96085 6.21069 6.58578 6.58577C6.21071 6.96084 6 7.46955 6 7.99998C6 8.53041 6.21071 9.03912 6.58578 9.41419C6.96085 9.78927 7.46956 9.99998 8 9.99998Z" fill="#222222"/>
                        </svg>
                        <span>{views}</span>
                    </ViewsInfo>
                    {/* 좋아요 */}
                    <LikesInfo>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14 5.33332C14.3556 5.33332 14.6667 5.46665 14.9333 5.73332C15.2 5.99999 15.3333 6.3111 15.3333 6.66665V7.99999C15.3333 8.07776 15.3249 8.1611 15.308 8.24999C15.2911 8.33888 15.2662 8.42221 15.2333 8.49999L13.2333 13.2C13.1333 13.4222 12.9667 13.6111 12.7333 13.7667C12.5 13.9222 12.2556 14 12 14H6.66668C6.30001 14 5.98623 13.8695 5.72534 13.6087C5.46446 13.3478 5.33379 13.0338 5.33334 12.6667V5.88332C5.33334 5.70554 5.36957 5.53621 5.44201 5.37532C5.51445 5.21443 5.61157 5.07265 5.73334 4.94999L9.35001 1.34999C9.51668 1.19443 9.71401 1.09999 9.94201 1.06665C10.17 1.03332 10.3893 1.07221 10.6 1.18332C10.8107 1.29443 10.9636 1.44999 11.0587 1.64999C11.1538 1.84999 11.1731 2.05554 11.1167 2.26665L10.3667 5.33332H14ZM2.66668 14C2.30001 14 1.98623 13.8695 1.72534 13.6087C1.46445 13.3478 1.33379 13.0338 1.33334 12.6667V6.66665C1.33334 6.29999 1.46401 5.98621 1.72534 5.72532C1.98668 5.46443 2.30045 5.33376 2.66668 5.33332C3.0329 5.33288 3.3469 5.46354 3.60868 5.72532C3.87045 5.9871 4.0009 6.30088 4.00001 6.66665V12.6667C4.00001 13.0333 3.86957 13.3473 3.60868 13.6087C3.34779 13.87 3.03379 14.0004 2.66668 14Z" fill="#222222"/>
                        </svg>
                        <span>{likes}</span>
                    </LikesInfo>
                </StatsContainer>
            </InfoContainer>
        </CardContainer>
    );
};