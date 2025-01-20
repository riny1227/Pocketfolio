import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../imgs/logo.png';

// 헤더 컨테이너
const HeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 102px;
    background-color: #FFF;
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
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    color: #000;

    &::placeholder {
        color: #909090;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
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
    padding: 0;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

// 아티클 텍스트
const ArticleText = styled.span`
    white-space: nowrap;
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
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
    color: #222;
    font-family: 'Pretendard-SemiBold';
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
    color: #222;
    font-family: 'Pretendard-SemiBold';
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
    color: #222;
    font-family: 'Pretendard-SemiBold';
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
    background: none; 
    border: none;
    cursor: pointer;
`;

// 알림 아이콘
const BellIcon = styled.button`
    width: 24px;
    height: 24px;
    background: none; 
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

export default function Header() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    return (
        <HeaderCarouselContainer>
            <HeaderContainer>
                {/* 로고 + 검색창 + 아티클 컨테이너 */}
                <LeftContainer>
                    {/* 로고 아이콘 -> 클릭 시 홈화면으로 이동 */}
                    <span className="logo" onClick={() => navigate('/')}>
                        <img
                            style={{ width: '160px', height: '36px' }}
                            src={logo}
                            alt="로고"
                        />
                    </span>
                    {/* 검색창 */}
                    <SearchContainer>
                        <SearchInput
                            type="text"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="검색어를 입력하세요."
                        />
                        <SearchIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0322 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.9494 18.7933 8.90908 18.3913 7.93845C17.9892 6.96782 17.3999 6.08589 16.657 5.343C15.9141 4.60011 15.0322 4.01082 14.0616 3.60877C13.0909 3.20673 12.0506 2.99979 11 2.99979C9.94942 2.99979 8.90911 3.20673 7.93848 3.60877C6.96785 4.01082 6.08591 4.60011 5.34302 5.343C3.84269 6.84333 2.99982 8.87821 2.99982 11C2.99982 13.1218 3.84269 15.1567 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SearchIcon>
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
                    <ChatIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6.077 17L4.373 18.704C4.12033 18.9567 3.82833 19.0137 3.497 18.875C3.16567 18.7363 3 18.489 3 18.133V4.616C3 4.15533 3.15433 3.771 3.463 3.463C3.77167 3.155 4.15567 3.00067 4.615 3H19.385C19.845 3 20.229 3.15433 20.537 3.463C20.845 3.77167 20.9993 4.156 21 4.616V15.385C21 15.845 20.8457 16.2293 20.537 16.538C20.2283 16.8467 19.8443 17.0007 19.385 17H6.077ZM7 13.5H13C13.142 13.5 13.2607 13.452 13.356 13.356C13.4513 13.26 13.4993 13.141 13.5 12.999C13.5007 12.857 13.4527 12.7383 13.356 12.643C13.2593 12.5477 13.1407 12.5 13 12.5H7C6.858 12.5 6.73933 12.548 6.644 12.644C6.54867 12.74 6.50067 12.859 6.5 13.001C6.49933 13.143 6.54733 13.2617 6.644 13.357C6.74067 13.4523 6.85933 13.5 7 13.5ZM7 10.5H17C17.142 10.5 17.2607 10.452 17.356 10.356C17.4513 10.26 17.4993 10.141 17.5 9.999C17.5007 9.857 17.4527 9.73833 17.356 9.643C17.2593 9.54767 17.1407 9.5 17 9.5H7C6.858 9.5 6.73933 9.548 6.644 9.644C6.54867 9.74 6.50067 9.859 6.5 10.001C6.49933 10.143 6.54733 10.2617 6.644 10.357C6.74067 10.4523 6.85933 10.5 7 10.5ZM7 7.5H17C17.142 7.5 17.2607 7.452 17.356 7.356C17.4513 7.26 17.4993 7.141 17.5 6.999C17.5007 6.857 17.4527 6.73833 17.356 6.643C17.2593 6.54767 17.1407 6.5 17 6.5H7C6.858 6.5 6.73933 6.548 6.644 6.644C6.54867 6.74 6.50067 6.859 6.5 7.001C6.49933 7.143 6.54733 7.26167 6.644 7.357C6.74067 7.45233 6.85933 7.5 7 7.5Z" fill="black"/>
                        </svg>
                    </ChatIcon>

                    {/* 알림 아이콘 */}
                    <BellIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C12.6193 22.0008 13.2235 21.8086 13.7285 21.4502C14.2335 21.0917 14.6143 20.5849 14.818 20H9.182C9.38566 20.5849 9.76648 21.0917 10.2715 21.4502C10.7765 21.8086 11.3807 22.0008 12 22ZM19 14.586V10C19 6.783 16.815 4.073 13.855 3.258C13.562 2.52 12.846 2 12 2C11.154 2 10.438 2.52 10.145 3.258C7.185 4.074 5 6.783 5 10V14.586L3.293 16.293C3.10545 16.4805 3.00006 16.7348 3 17V18C3 18.2652 3.10536 18.5196 3.29289 18.7071C3.48043 18.8946 3.73478 19 4 19H20C20.2652 19 20.5196 18.8946 20.7071 18.7071C20.8946 18.5196 21 18.2652 21 18V17C20.9999 16.7348 20.8946 16.4805 20.707 16.293L19 14.586Z" fill="black"/>
                        </svg>
                    </BellIcon>

                    {/* 프로필 아이콘 */}
                    <ProfileIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6667 9.33333C10.6667 7.91885 11.2286 6.56229 12.2288 5.5621C13.229 4.5619 14.5855 4 16 4C17.4145 4 18.771 4.5619 19.7712 5.5621C20.7714 6.56229 21.3333 7.91885 21.3333 9.33333C21.3333 10.7478 20.7714 12.1044 19.7712 13.1046C18.771 14.1048 17.4145 14.6667 16 14.6667C14.5855 14.6667 13.229 14.1048 12.2288 13.1046C11.2286 12.1044 10.6667 10.7478 10.6667 9.33333ZM10.6667 17.3333C8.89856 17.3333 7.20286 18.0357 5.95262 19.286C4.70238 20.5362 4 22.2319 4 24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24C28 22.2319 27.2976 20.5362 26.0474 19.286C24.7971 18.0357 23.1014 17.3333 21.3333 17.3333H10.6667Z" fill="black"/>
                        </svg>
                    </ProfileIcon>
                </RightContainer>
            </HeaderContainer>            
        </HeaderCarouselContainer>
    );
}
