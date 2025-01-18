import React, { useState } from 'react';
import styled from 'styled-components';
import Rectangle2 from '../imgs/Rectangle2.png';
import iconamoon_search from '../imgs/iconamoon_search.png';
import chat from '../imgs/material-symbols-light_chat-rounded.png';
import bell from '../imgs/bxs_bell.png';
import iconamoon_profile from '../imgs/iconamoon_profile-fill.png';
import Carousel from './Carousel';

// 헤더 컨테이너
const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 102px;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
    z-index: 1000;
    box-sizing: border-box;
    overflow: hidden; // 넘치는 내용 잘리게 처리
`;

// 헤더 + 캐러셀 컨테이너
const HeaderCarouselContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 로고 + 검색창 + 아티클 컨테이너
const LeftContainer = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
`;

// 로고 아이콘
const LogoIcon = styled.a`
    width: 160px;
    height: 36px;
    background: url(${Rectangle2}) no-repeat center / cover;
    cursor: pointer;
`;

// 검색창 컨테이너
const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    padding: 12px 24px;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    border-radius: 30px;
    background: #EFEFEF;
    width: 100%;
    max-width: 400px;
    position: relative;
    box-sizing: border-box;
`;

// 검색 입력 필드
const SearchInput = styled.input`
    border: none;
    background: transparent;
    outline: none;
    width: 100%;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #000;

    &::placeholder {
        color: var(--gray-gray-500-disabled, #909090);
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: Pretendard;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
    }
`;

// 검색 아이콘
const SearchIcon = styled.button`
    width: 24px;
    height: 24px;
    background: url(${iconamoon_search}) no-repeat center / cover;
    cursor: pointer;
    border: none;
`;

// 아티클 텍스트
const ArticleText = styled.span`
    white-space: nowrap;
    color: var(--gray-gray-800-normal, #222);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        text-decoration: underline;
    }
`;

// 회원가입 + 로그인 컨테이너
const SignContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-left: auto; // 오른쪽 끝에 위치하도록
`;

// 회원가입 텍스트
const SignUpText = styled.span`
    white-space: nowrap;
    color: var(--gray-gray-800-normal, #222);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

// 로그인 버튼
const LogInButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    background: #EFEFEF;
    color: var(--gray-gray-800-normal, #222);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    border: none;
    cursor: pointer;
    white-space: nowrap; /* 줄바꿈 방지 */

    &:hover {
        background: #E0E0E0;
    }
`;

// 포트폴리오 작성 + 채팅 아이콘 + 알림 + 프로필 컨테이너
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
`;

// 포트폴리오 작성 버튼
const WriteButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    background: #EFEFEF;
    color: var(--gray-gray-800-normal, #222);
    font-family: Pretendard;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    border: none;
    cursor: pointer;
    white-space: nowrap; /* 줄바꿈 방지 */

    &:hover {
        background: #E0E0E0;
    }
`;

// 채팅 아이콘
const ChatIcon = styled.button`
    width: 24px;
    height: 24px;
    background: url(${chat}) no-repeat center / cover;
    border: none;
    cursor: pointer;
`;

// 알림 아이콘
const BellIcon = styled.button`
    width: 24px;
    height: 24px;
    background: url(${bell}) no-repeat center / cover;
    border: none;
    cursor: pointer;
`;

// 프로필 아이콘
const ProfileIcon = styled.button`
    display: flex;
    width: 48px;
    height: 48px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: #ECECEC;
    border: none;
    cursor: pointer;
`;

// 프로필 이미지
const ProfileImage = styled.img`
    width: 32px;
    height: 32px;
    flex-shrink: 0;
`;

export default function Header() {
    const [searchText, setSearchText] = useState('');

    // 로고 클릭 시 이동할 페이지 (홈화면으로 이동 -> 추후 수정)
    const handleLogoClick = () => {
        // 홈 페이지로 이동
    };

    return (
        <HeaderCarouselContainer>
            <HeaderContainer>

                {/* 로고 + 검색창 + 아티클 컨테이너 */}
                <LeftContainer>
                    {/* 로고 아이콘 -> 클릭 시 홈화면으로 이동 */}
                    <LogoIcon onClick={handleLogoClick} />

                    {/* 검색창 */}
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="검색어를 입력하세요."
                        />
                        <SearchIcon />
                    </SearchContainer>

                    {/* 아티클 */}
                    <ArticleText>아티클</ArticleText>
                </LeftContainer>

                {/* 회원가입 + 로그인 컨테이너 */}
                {/* <SignContainer> */}
                    {/* 회원가입 */}
                    {/* <SignUpText>회원가입</SignUpText> */}

                    {/* 로그인 버튼 */}
                    {/* <LogInButton>로그인</LogInButton>
                </SignContainer> */}

                {/* 포트폴리오 작성 + 채팅 아이콘 + 알림 + 프로필 컨테이너 */}
                <RightContainer>

                    {/* 포트폴리오 작성 버튼 */}
                    <WriteButton>포트폴리오 작성</WriteButton>

                    {/* 채팅 아이콘 */}
                    <ChatIcon />

                    {/* 알림 아이콘 */}
                    <BellIcon />

                    {/* 프로필 아이콘 */}
                    <ProfileIcon>
                        <ProfileImage src={iconamoon_profile} alt="Profile" />
                    </ProfileIcon>
                </RightContainer>
            </HeaderContainer>

            {/* 캐러셀 */}
            <Carousel />
            
        </HeaderCarouselContainer>
    );
}
