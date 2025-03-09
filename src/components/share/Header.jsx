import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styled from 'styled-components';
import logo from '../../imgs/logo.png';
import Chat from '../Chat';
import profileImage from '../../imgs/Profile.png';
import { fetchSearch } from "../../api/NavbarApi"; // 검색 API 불러오기

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
`;

// 로고 + 검색창 + 아티클 컨테이너
const LeftContainer = styled.div`
    width: 100%;
    height: 48px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 32px;
    margin-left: 104px;
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
    margin-right: 104px;
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
    background: #fdfdfd;
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    border: 1px solid #D5D5D5;
    cursor: pointer;
    white-space: nowrap; /* 줄바꿈 방지 */
`;

// 포트폴리오 작성 + 채팅 아이콘 + 알림 + 프로필 컨테이너
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 32px;
    margin-right: 104px;
`;

// 포트폴리오 작성 버튼
const WriteButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 28px;
    background: #fdfdfd;
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    border: 1px solid #D5D5D5;
    cursor: pointer;
    white-space: nowrap; /* 줄바꿈 방지 */
`;

// 채팅 아이콘 + 채팅창 감싸는 컨테이너
const ChatWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

// 채팅 아이콘
const ChatIcon = styled.button`
    display: flex;
    width: 28px;
    height: 28px;
    background: none; 
    border: none;
    align-items: center; /* 세로 정렬 */
    justify-content: center; /* 가로 정렬 */
    padding: 0; /* 여백 제거 */
    cursor: pointer;
`;

// 알림 아이콘
const BellIcon = styled.button`
    display: flex;
    width: 28px;
    height: 28px;
    background: none; 
    border: none;
    align-items: center; /* 세로 정렬 */
    justify-content: center; /* 가로 정렬 */
    cursor: pointer;
    padding: 0; /* 여백 제거 */
`;

// 프로필 wrapper
const ProfileWrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
`;

// 프로필 아이콘
const ProfileIcon = styled.button`
    display: flex;
    width: 44px;
    height: 44px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 24px;
    background: #E8F1FD;
    border: none;
    cursor: pointer;
    position: relative;
`;

// 드롭다운 메뉴 스타일
const DropdownMenu = styled.div`
    position: absolute;
    top: 52px;
    right: -60px;
    width: 264px;
    height: 216px;
    flex-shrink: 0;
    justify-content: center;
    flex-direction: column;
    border-radius: 16px;
    border: 1px solid #E6E6E6;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    display: ${props => (props.isVisible ? 'flex' : 'none')};
    z-index: 2000;
`;

// 프로필 이미지
const ProfileImg = styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-image: url(${profileImage});
    background-size: cover;
    background-position: center;
    cursor: pointer;
`;

// 드롭다운 메뉴 아이템 스타일
const DropdownItem = styled.span`
    padding: 8px 20px;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    text-align: left;
    line-height: 24px;
    cursor: pointer;

    &:hover {
        background-color: #F8F8F8;
    }
`;

export default function Header() {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth(); 
    const [searchText, setSearchText] = useState('');
    const [isChatOpen, setChatOpen] = useState(false);

    // 드롭다운 상태 관리
    const [isVisible, setIsVisible] = useState(false);  

    // 타이머 관리
    const closeTimer = useRef(null);

    const handleMouseEnter = () => {
        // 타이머가 있다면 취소
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        // 드롭다운 메뉴에 마우스가 벗어났을 때만 닫기
        if (!isVisible) return;
        closeTimer.current = setTimeout(() => {
            setIsVisible(false);
        }, 400);
    };

    // 드롭다운 메뉴에 마우스를 올려도 메뉴가 사라지지 않게 하기
    const handleDropdownMouseEnter = () => {
        // 메뉴 내부로 마우스를 이동했을 때 메뉴 닫히지 않도록 함
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const handleDropdownMouseLeave = () => {
        closeTimer.current = setTimeout(() => {
            setIsVisible(false);
        }, 300);
    };

    // 로그아웃 함수
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // 검색 실행 함수
    const handleSearch = async (event) => {
        if (event.key === "Enter" && searchText.trim() !== "") {
            try {
                const result = await fetchSearch(searchText, "portfolio", 10); // 포트폴리오 검색 (type = "portfolio", limit = 10으로 고정)
                navigate("/", { state: { searchResults: result, searchText } }); // 검색 결과를 Home으로 전달
            } catch (error) {
                console.error("handleSearch 에러 발생 : ", error);
            }
        }
    };

    return (
        <HeaderContainer>
            {/* 로고 + 검색창 + 아티클 컨테이너 */}
            <LeftContainer>
                {/* 로고 아이콘 -> 클릭 시 홈화면으로 이동 */}
                <span
                    className="logo"
                    onClick={() => navigate('/')}
                    style={{ cursor: 'pointer' }}>
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
                        onKeyDown={handleSearch} // 엔터 입력 시 검색 api 실행
                        placeholder="검색어를 입력하세요."
                    />
                    <SearchIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 21L16.657 16.657M16.657 16.657C17.3999 15.9141 17.9892 15.0322 18.3912 14.0615C18.7933 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.9494 18.7933 8.90908 18.3913 7.93845C17.9892 6.96782 17.3999 6.08589 16.657 5.343C15.9141 4.60011 15.0322 4.01082 14.0616 3.60877C13.0909 3.20673 12.0506 2.99979 11 2.99979C9.94942 2.99979 8.90911 3.20673 7.93848 3.60877C6.96785 4.01082 6.08591 4.60011 5.34302 5.343C3.84269 6.84333 2.99982 8.87821 2.99982 11C2.99982 13.1218 3.84269 15.1567 5.34302 16.657C6.84335 18.1573 8.87824 19.0002 11 19.0002C13.1218 19.0002 15.1567 18.1573 16.657 16.657Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </SearchIcon>
                </SearchContainer>

                {/* 아티클 */}
                <ArticleText onClick={() => navigate('/article')}>아티클</ArticleText>
            </LeftContainer>

            {/* 로그인 여부에 따른 헤더 */}
            {isLoggedIn ? (
                <RightContainer>
                    {/* 포트폴리오 작성 버튼 */}
                    <WriteButton onClick={() => navigate('/write-portfolio')}>포트폴리오 작성</WriteButton>

                    <ChatWrapper>
                        {/* 채팅 아이콘 클릭 시 채팅창이 열리고 닫히도록 토글 */}
                        <ChatIcon onClick={() => setChatOpen(prev => !prev)}>
                            {isChatOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46197 4.66728C3.47465 4.66686 3.48737 4.66666 3.50012 4.66666H24.5001C24.7626 4.66666 25.0107 4.75461 25.2103 4.9077C25.31 4.98419 25.3976 5.07693 25.4688 5.18308C25.5672 5.32939 25.6334 5.49921 25.657 5.68235C25.6643 5.73783 25.6675 5.79352 25.6667 5.849V19.8333C25.6667 21.7663 24.0997 23.3333 22.1667 23.3333H5.83338C3.90038 23.3333 2.33337 21.7663 2.33337 19.8333V5.83333C2.33337 5.20174 2.83526 4.68737 3.46197 4.66728ZM4.66671 8.64983V19.8333C4.66671 20.4777 5.18904 21 5.83338 21H22.1667C22.811 21 23.3334 20.4777 23.3334 19.8333V8.64998L14.8251 17.1583C14.3695 17.6139 13.6308 17.6139 13.1752 17.1583L4.66671 8.64983Z" fill="#1570EF"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.46197 4.66728C3.47465 4.66686 3.48737 4.66666 3.50012 4.66666H24.5001C24.7626 4.66666 25.0107 4.75461 25.2103 4.9077C25.31 4.98419 25.3976 5.07693 25.4688 5.18308C25.5672 5.32939 25.6334 5.49921 25.657 5.68235C25.6643 5.73783 25.6675 5.79352 25.6667 5.849V19.8333C25.6667 21.7663 24.0997 23.3333 22.1667 23.3333H5.83338C3.90038 23.3333 2.33337 21.7663 2.33337 19.8333V5.83333C2.33337 5.20174 2.83526 4.68737 3.46197 4.66728ZM4.66671 8.64983V19.8333C4.66671 20.4777 5.18904 21 5.83338 21H22.1667C22.811 21 23.3334 20.4777 23.3334 19.8333V8.64998L14.8251 17.1583C14.3695 17.6139 13.6308 17.6139 13.1752 17.1583L4.66671 8.64983Z" fill="#222222"/>
                                </svg>
                            )}
                        </ChatIcon>

                        {/* isChatOpen이 true일 때만 Chat 컴포넌트 표시 */}
                        {isChatOpen && <Chat />}
                    </ChatWrapper>

                    {/* 알림 아이콘 */}
                    <BellIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 1.16666C12.7113 1.16666 11.6667 2.21133 11.6667 3.49999C11.6667 3.61245 11.6746 3.72306 11.69 3.83128C8.30461 4.82776 5.83333 7.9586 5.83333 11.6667V21H4.66667C4.02233 21 3.5 21.5223 3.5 22.1667C3.5 22.811 4.02233 23.3333 4.66667 23.3333H7H21H23.3333C23.9777 23.3333 24.5 22.811 24.5 22.1667C24.5 21.5223 23.9777 21 23.3333 21H22.1667V11.6667C22.1667 7.95861 19.6954 4.82776 16.31 3.83128C16.3254 3.72306 16.3333 3.61245 16.3333 3.49999C16.3333 2.21133 15.2887 1.16666 14 1.16666ZM16.3333 25.6667C16.3333 26.311 15.811 26.8333 15.1667 26.8333H12.8333C12.189 26.8333 11.6667 26.311 11.6667 25.6667C11.6667 25.0223 12.189 24.5 12.8333 24.5H15.1667C15.811 24.5 16.3333 25.0223 16.3333 25.6667Z" fill="#222222"/>
                        </svg>
                    </BellIcon>

                    {/* 프로필 아이콘 */}
                    <ProfileWrapper
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={handleMouseLeave} 
                    >
                        <ProfileIcon onClick={() => navigate('/mypage')} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.33333 8.16664C9.33333 5.58931 11.4227 3.49997 14 3.49997C16.5773 3.49997 18.6667 5.58931 18.6667 8.16664C18.6667 10.744 16.5773 12.8333 14 12.8333C11.4227 12.8333 9.33333 10.744 9.33333 8.16664ZM9.33333 15.1666C6.11167 15.1666 3.5 17.7783 3.5 21C3.5 22.933 5.067 24.5 7 24.5H21C22.933 24.5 24.5 22.933 24.5 21C24.5 17.7783 21.8883 15.1666 18.6667 15.1666H9.33333Z" fill="#1570EF"/>
                            </svg>
                        </ProfileIcon>

                        {/* 드롭다운 메뉴 */}
                        <DropdownMenu 
                            isVisible={isVisible}
                            onMouseEnter={handleDropdownMouseEnter}
                            onMouseLeave={handleDropdownMouseLeave}
                        >
                            <ProfileImg onClick={() => navigate('/mypage')}/>
                            <DropdownItem onClick={() => navigate('/mypage/edit')}>프로필 편집</DropdownItem>
                            <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                        </DropdownMenu>
                    </ProfileWrapper>
                </RightContainer>
            ) : (
                <SignContainer>
                    {/* 회원가입 */}
                    <SignUpText onClick={() => navigate('/signup')}>회원가입</SignUpText>
                    {/* 로그인 */}
                    <LogInButton onClick={() => navigate('/login')}>로그인</LogInButton>
                </SignContainer>
            )}
        </HeaderContainer>        
    );
}
