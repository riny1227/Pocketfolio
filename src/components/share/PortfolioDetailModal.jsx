import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { fetchPortfolioDetails } from '../../api/Portfolio/PortfolioDetailApi';
import { deletePortfolio } from '../../api/Portfolio/PortfolioDeleteApi';
import { useAuth } from '../../context/AuthContext';
import { fetchLikeToPortfoilo } from '../../api/Portfolio/PortfolioLikesApi';
import { getPortfolioList } from '../../api/MypageApi';

// 대체 이미지 사진 사용
import exampleImg from '../../imgs/example.png';

// 모달창 뒷배경 
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    z-index: 1000;
`;

// 모달창 컨테이너
const ModalContainer = styled.div`
    width: 100%;
    height: calc(100vh - 70px);
    top: 70px;
    background: #fff;
    border-radius: 16px 16px 0px 0px;
    position: fixed;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

// 모달창 바디
const ModalBodyContainer = styled.div`
    width: 100%;
    flex-grow: 1;  /* 부모 높이를 꽉 채우도록 설정 */
    margin-top: 96px;
    background: #fff;
    position: relative; 
    overflow-y: auto;  // 스크롤 가능하도록 설정
    overflow-x: hidden;
`;

// 모달을 닫는 버튼 
const CloseButton = styled.button`
    position: absolute;
    top: 38px;
    right: 16px;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    display: flex;
`;

// 모달창 헤더 컨테이너 
const ModalHeaderContainer = styled.div`
    position: fixed;
    width: 100%;
    height: 96px;
    display: flex;
    justify-content: space-between;  // 좌우 정렬
    align-items: center;  // 세로 중앙 정렬 
    padding: 16px 120px 16px 104px;
    border-bottom: 1px solid #D5D5D5;
    background: #FFF;
    box-sizing: border-box;
    border-radius: 16px 16px 0px 0px;
    z-index: 10000;
`;

// 사용자 정보 컨테이너(프로필 아이콘 + 프로젝트명 + 사용자 정보)
const ProjectUserInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
`;

// 프로필 아이콘
const ProfileIcon = styled.button`
    display: flex;
    width: 64px;
    height: 64px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    background: #DCEAFD;   
    border: none;

    svg {
        width: 48px;
        height: 48px;
        flex-shrink: 0;
    };
`;

// 기본 정보 텍스트 컨테이너
const InfoTextContainer = styled.div`
    display: flex;  // 가로 정렬
    flex-direction: column;  // 세로 정렬
`;

// 프로젝트명 텍스트
const ProjectNameText = styled.div`
    align-self: stretch;

    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Title/Title3 */
    font-family: 'Pretendard-bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
`;

// 정보 텍스트 컨테이너(이름, 직군, 경력, 지원 기업)
const ProjectInfoContainer = styled.div`
    display: flex;  // 가로 정렬
    max-width: 480px;
    gap: 8px;
`;

// 정보 텍스트 
const InfoText = styled.div`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body2:Regular */
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`;

// 헤더 아이콘 컨테이너
const HeaderIconContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

// 공유, 북마크, 좋아요 아이콘 스타일
const SBGIconStyle = styled.button`
    display: flex;
    width: 40px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1.25px solid ${props => props.active ? "none" : "#D5D5D5"};
    background: ${props => props.active ? "#E8F1FD" : "#FFF"};
    cursor: pointer;

    svg {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
        fill: ${props => props.active ? "#1570EF" : "none"};
    };
`;

// 수정 버튼 스타일
const ModifyButton = styled.button`
    display: flex;
    padding: 8px 32px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 28px;
    border: 1px solid #E6E6E6;
    background: #FFF;
    cursor: pointer;
    box-sizing: border-box;

    // 버튼 텍스트 스타일 
    color: #464646;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body1:SemiBold */
    font-family: 'Pretendard-Semibold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */

    &:hover{
        border: 1px solid #E6E6E6;
        background: #F8F8F8;
    }
`;

// 삭제 버튼 스타일
const DeleteButton = styled.button`
    display: flex;
    padding: 8px 32px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 28px;
    border: 1px solid #FECDCA;
    background: #FFFBFA;
    cursor: pointer;
    box-sizing: border-box;

    // 버튼 텍스트 스타일 
    color: #F04438;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body1:SemiBold */
    font-family: 'Pretendard-Semibold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */

    &:hover{
        background: #FEE4E2;
    }
`;

// 모달 이미지 컨테이너
const ModalImageContainer = styled.div`
    position: relative;
    width: calc(100% - 208px);
    height: 447px;
    margin-bottom: 64px;
    flex-shrink: 0;
    left: 50%;  // 부모 요소에서 수평 중앙 정렬
    transform: translateX(-50%);  // 50%만큼 왼쪽으로 이동시켜서 정확히 중앙에 배치
    box-sizing: border-box;
    
    img {
        object-fit: cover; // 이미지 비율 유지하면서 컨테이너 채우기
    }
`;

// 사용자 정보 + 이미지 컨테이너
const UserInfoImageContainer = styled.div`
    width: 100%;
    height: 320px;
    flex-shrink: 0;
    background: #F8F8F8;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    background-size: cover;
    display: flex;
`;

// 사용자 정보 + 한줄소개 컨테이너
const UserIntroContainer = styled.div`
    position: absolute;
    display: flex;
    left: 104px;
    top: 68px;
    width: 320px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
`;

// 약간 더 큰 프로필 아이콘
const BiggerProfileIcon = styled.button`
    display: flex;
    width: 72px;
    height: 72px;
    padding: 8px;
    justify-content: center;
    align-items: center;
    border-radius: 64px;
    background: #DCEAFD;   
    border: none;

    svg {
        width: 56px;
        height: 56px;
        flex-shrink: 0;
    };
`;

// 사용자명 텍스트
const UserNameText = styled.div`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Title/Title2 */
    font-family: 'Pretendard-bold';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 125% */
`;


// 사용자명 + 채팅하기 컨테이너
const UserChatContainer = styled.div`
    margin-top: 8px;
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
`;

// 한줄소개 텍스트
const SimpleIntroText = styled.div`
    align-self: stretch;
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body2:Regular */
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
`;

// 사용자 포트폴리오 이미지 컨테이너 
const UserPortfoliosContainer = styled.div`
    width: calc(3 * 288px + 2 * 16px);
    height: 200px;
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 68px;
    margin-left: 520px;
    justify-content: flex-end;
`;

// 포트폴리오 이미지 스타일
const PortfolioImg = styled.div`
    img {
        width: 288px;
        height: 200px;
        border-radius: 8px;
        cursor: pointer;
        object-fit: cover; // 이미지 비율 유지하면서 컨테이너 채우기
    }
`;

// 비슷한 포트폴리오 이미지 컨테이너
const SimilarPortfolioContainer = styled.div`
    display: flex;
    margin: 24px 80px 96px 80px;
    width: calc(100% - 208px);
    padding: 0px 24px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    row-gap: 24px;
    flex-wrap: wrap;

    img {
        width: 288px;
        height: 200px;
        border-radius: 8px;
        cursor: pointer;
        object-fit: cover;
        flex: 0 0 calc((100% - 3 * 24px) / 4); /* 4개씩 배치되도록 계산 */
    };
`;

const PortfolioDetailModal = ({ portfolioId, onClose }) => {
    const { token } = useAuth();
    const [currentPortfolioId, setCurrentPortfolioId] = useState(portfolioId);
    const [portfolio, setPortfolio] = useState(null); // 포트폴리오 데이터 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 오류 상태
    const [isDeleting, setIsDeleting] = useState(false); // 삭제 상태
    const [$isLiked, setIsLiked] = useState(false); // 좋아요 상태 
    const navigate = useNavigate();

    // 포트폴리오 목록을 불러와서 currentPortfolioId를 설정
    useEffect(() => {
        const loadPortfolioList = async () => {
        try {
            const list = await getPortfolioList(token);
            // 목록의 첫 번째 포트폴리오의 ID를 사용
            if (list && list.length > 0) {
                setCurrentPortfolioId(list[0].id);
            }
        } catch (err) {
            console.error('포트폴리오 목록을 불러오는데 실패했습니다:', err);
            setError('포트폴리오 목록을 불러오는데 실패했습니다.');
        }
        };
        loadPortfolioList();
    }, [token]);

    // 포트폴리오 데이터를 API에서 불러오는 useEffect
    useEffect(() => {
        // 모달이 열릴 때 스크롤 막기
        document.body.style.overflow = "hidden";

        const loadPortfolioDetails = async () => {
            console.log('currentPortfolioId:', currentPortfolioId); // 현재 id 확인
            setIsLoading(true);  // 새로운 요청이 시작될 때 로딩 상태 초기화
            setError(null);  // 에러 메시지도 초기화

            try {
                const data = await fetchPortfolioDetails(currentPortfolioId, token);
                console.log('포트폴리오 데이터:', data);

                if (data) {
                    setPortfolio(data);
                    // 예시: likes 값이 0보다 크면 좋아요가 적용된 것으로 간주
                    setIsLiked(data.likes > 0);
                } else {
                    setError('포트폴리오 데이터가 없습니다.');
                }
            } catch (error) {
                setError('포트폴리오 상세 정보를 불러오는 데 실패했습니다.');
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        if (currentPortfolioId) { // 유효한 ID일 때만 API 호출 
            loadPortfolioDetails();
        }

        return () => {
            // 모달이 닫힐 때 스크롤 복원
            document.body.style.overflow = "auto";
        }
    }, [currentPortfolioId, token]); // portfolioId가 바뀔 때마다 실행

    // 모달 아닌 부분 눌렀을 때, 닫히도록
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
    };

    // 공유 버튼 클릭시
    const handleShareClick = async () => {
        const shareUrl = `https://pocketfolio.co.kr/api/portfolio/${currentPortfolioId}`;

        navigator.clipboard.writeText(shareUrl) // 클립보드에 URL 복사
            .then(() => {
            alert('링크가 클립보드에 복사되었습니다!');
            })
            .catch(err => {
            alert('링크 복사에 실패했습니다.');
            console.error(err);
            });
    };

    // 수정 버튼 클릭시
    const handleEditClick = () => {
        // 수정 페이지로 포트폴리오 정보를 전달하여 이동
        navigate('https://pocketfolio.co.kr/api/portfolio/write-portfolio', { state: { portfolioId: currentPortfolioId } });
    };

    // 삭제 버튼 클릭시 
    const handleDeleteClick = async () => {
        if (window.confirm('이 포트폴리오를 삭제하시겠습니까?')) {
            setIsDeleting(true);
            try {
                const response = await deletePortfolio(currentPortfolioId, token);
                if (response) {
                    alert('포트폴리오가 삭제되었습니다.');
                    window.location.reload();
                }
            } catch (error) {
                setError('포트폴리오 삭제 중 오류가 발생했습니다.');
            } finally {
                setIsDeleting(false);
            }
        }
    };

    // 좋아요 버튼 클릭시
    const handleLikeClick = async () => {
        try {
            // 좋아요 추가/취소 API 호출
            await fetchLikeToPortfoilo(currentPortfolioId, token);
            // API 호출 성공시 상태 토글
            setIsLiked(prev => !prev);
        } catch (error) {
            console.error("좋아요 처리 중 오류:", error);
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    };

    // 로딩 중, 오류 처리 및 데이터 표시
    if (isLoading) {
        return (
            <ModalOverlay onClick={handleOverlayClick}>
                <ModalContainer onClick={(e) => e.stopPropagation()}>
                    <div style={{ padding: '20px', textAlign: 'center' }}>⏳ 로딩 중...</div>
                </ModalContainer>
            </ModalOverlay>
        );
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ModalOverlay onClick={handleOverlayClick}>
            {/* 모달을 닫는 버튼 */}
            <CloseButton onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7.00005 8.3998L2.10005 13.2998C1.91672 13.4831 1.68338 13.5748 1.40005 13.5748C1.11672 13.5748 0.883382 13.4831 0.700048 13.2998C0.516715 13.1165 0.425049 12.8831 0.425049 12.5998C0.425049 12.3165 0.516715 12.0831 0.700048 11.8998L5.60005 6.9998L0.700048 2.0998C0.516715 1.91647 0.425049 1.68314 0.425049 1.3998C0.425049 1.11647 0.516715 0.883138 0.700048 0.699804C0.883382 0.516471 1.11672 0.424805 1.40005 0.424805C1.68338 0.424805 1.91672 0.516471 2.10005 0.699804L7.00005 5.5998L11.9 0.699804C12.0834 0.516471 12.3167 0.424805 12.6 0.424805C12.8834 0.424805 13.1167 0.516471 13.3 0.699804C13.4834 0.883138 13.575 1.11647 13.575 1.3998C13.575 1.68314 13.4834 1.91647 13.3 2.0998L8.40005 6.9998L13.3 11.8998C13.4834 12.0831 13.575 12.3165 13.575 12.5998C13.575 12.8831 13.4834 13.1165 13.3 13.2998C13.1167 13.4831 12.8834 13.5748 12.6 13.5748C12.3167 13.5748 12.0834 13.4831 11.9 13.2998L7.00005 8.3998Z" fill="#E6E6E6"/>
                </svg>
            </CloseButton>

            <ModalContainer onClick={(e) => e.stopPropagation()}>
                {/* 모달 헤더 컨테이너 */}
                <ModalHeaderContainer>

                    {/* 사용자 정보 컨테이너(프로필 아이콘 + 프로젝트명 + 사용자 정보) */}
                    <ProjectUserInfoContainer>
                        <ProfileIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 14C16 11.8783 16.8429 9.84344 18.3431 8.34315C19.8434 6.84285 21.8783 6 24 6C26.1217 6 28.1566 6.84285 29.6569 8.34315C31.1571 9.84344 32 11.8783 32 14C32 16.1217 31.1571 18.1566 29.6569 19.6569C28.1566 21.1571 26.1217 22 24 22C21.8783 22 19.8434 21.1571 18.3431 19.6569C16.8429 18.1566 16 16.1217 16 14ZM16 26C13.3478 26 10.8043 27.0536 8.92893 28.9289C7.05357 30.8043 6 33.3478 6 36C6 37.5913 6.63214 39.1174 7.75736 40.2426C8.88258 41.3679 10.4087 42 12 42H36C37.5913 42 39.1174 41.3679 40.2426 40.2426C41.3679 39.1174 42 37.5913 42 36C42 33.3478 40.9464 30.8043 39.0711 28.9289C37.1957 27.0536 34.6522 26 32 26H16Z" fill="#1570EF"/>
                            </svg>
                        </ProfileIcon>

                        {/* 기본 정보 텍스트 컨테이너 */}
                        <InfoTextContainer>
                            <ProjectNameText>{portfolio ? portfolio.title : '프로젝트명'}</ProjectNameText>
                            {/* 정보 텍스트 컨테이너(이름, 직군, 경력, 지원 기업) */}
                            <ProjectInfoContainer>
                                <InfoText style={{ color: '#1570ef' }}>{portfolio ? portfolio.user_name : '이름'}</InfoText>
                                <InfoText>{portfolio ? portfolio.job : '직군'}</InfoText>
                                <InfoText>{portfolio ? portfolio.experience : '경력'}</InfoText>
                                <InfoText>{portfolio ? portfolio.applied_company : '지원 기업'}</InfoText>
                            </ProjectInfoContainer>  
                        </InfoTextContainer>                 
                    </ProjectUserInfoContainer>

                    {/* 헤더 아이콘 컨테이너 */}
                    <HeaderIconContainer>
                        {/* 공유 아이콘 */}
                        <SBGIconStyle onClick={handleShareClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M3.33325 10.0003V16.667C3.33325 17.109 3.50885 17.5329 3.82141 17.8455C4.13397 18.1581 4.55789 18.3337 4.99992 18.3337H14.9999C15.4419 18.3337 15.8659 18.1581 16.1784 17.8455C16.491 17.5329 16.6666 17.109 16.6666 16.667V10.0003M13.3333 5.00033L9.99992 1.66699M9.99992 1.66699L6.66659 5.00033M9.99992 1.66699V12.5003" stroke="#909090" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SBGIconStyle>
                        {/* 북마크 아이콘 */}
                        <SBGIconStyle>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M6.2725 17.3675C5.7175 17.7283 5 17.31 5 16.6267V3.285C5 2.85167 5.28 2.5 5.625 2.5H14.375C14.72 2.5 15 2.85167 15 3.285V16.6267C15 17.31 14.2825 17.7283 13.7275 17.3683L10.4392 15.2333C10.3087 15.1477 10.1561 15.102 10 15.102C9.84394 15.102 9.69128 15.1477 9.56083 15.2333L6.2725 17.3675Z" stroke="#909090" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SBGIconStyle>
                        {/* 좋아요 아이콘 */}
                        <SBGIconStyle active = {$isLiked} onClick={handleLikeClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M17.5 6.6666C17.9444 6.6666 18.3333 6.83327 18.6666 7.1666C19 7.49994 19.1666 7.88883 19.1666 8.33327V9.99994C19.1666 10.0972 19.1561 10.2013 19.135 10.3124C19.1138 10.4235 19.0827 10.5277 19.0416 10.6249L16.5416 16.4999C16.4166 16.7777 16.2083 17.0138 15.9166 17.2083C15.625 17.4027 15.3194 17.4999 15 17.4999H8.33329C7.87496 17.4999 7.48274 17.3369 7.15663 17.0108C6.83051 16.6847 6.66718 16.2922 6.66663 15.8333V7.3541C6.66663 7.13188 6.7119 6.92022 6.80246 6.7191C6.89301 6.51799 7.0144 6.34077 7.16663 6.18744L11.6875 1.68744C11.8958 1.49299 12.1425 1.37494 12.4275 1.33327C12.7125 1.2916 12.9866 1.34022 13.25 1.4791C13.5133 1.61799 13.7044 1.81244 13.8233 2.06244C13.9422 2.31244 13.9663 2.56938 13.8958 2.83327L12.9583 6.6666H17.5ZM3.33329 17.4999C2.87496 17.4999 2.48274 17.3369 2.15663 17.0108C1.83051 16.6847 1.66718 16.2922 1.66663 15.8333V8.33327C1.66663 7.87494 1.82996 7.48272 2.15663 7.1566C2.48329 6.83049 2.87551 6.66716 3.33329 6.6666C3.79107 6.66605 4.18357 6.82938 4.51079 7.1566C4.83801 7.48383 5.00107 7.87605 4.99996 8.33327V15.8333C4.99996 16.2916 4.8369 16.6841 4.51079 17.0108C4.18468 17.3374 3.79218 17.5005 3.33329 17.4999Z" stroke="#909090" stroke-width="1.6"/>
                            </svg>
                        </SBGIconStyle>
                        {/* 수정, 삭제 버튼 */}
                        <ModifyButton onClick={handleEditClick}>수정</ModifyButton>
                        <DeleteButton
                        onClick={handleDeleteClick} 
                        disabled={isDeleting}>삭제</DeleteButton>
                    </HeaderIconContainer>
                </ModalHeaderContainer>

                {/* 모달창 바디 컨테이너 */}
                <ModalBodyContainer>
                    {/* 이미지 */}
                    <ModalImageContainer>
                        <img src={portfolio && portfolio.coverImage ? portfolio.coverImage : exampleImg} alt="썸네일" style={{ width: '100%', maxHeight: '447px' }} />
                    </ModalImageContainer>
                    
                    {/* 사용자 정보 + 이미지 컨테이너 */}
                    <UserInfoImageContainer>

                        {/* 사용자 정보 + 한줄소개 컨테이너 */}
                        <UserIntroContainer>
                            {/* 프로필 아이콘 */}
                            <BiggerProfileIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.6667 16.3333C18.6667 13.858 19.65 11.484 21.4003 9.73367C23.1507 7.98333 25.5246 7 28 7C30.4754 7 32.8493 7.98333 34.5997 9.73367C36.35 11.484 37.3333 13.858 37.3333 16.3333C37.3333 18.8087 36.35 21.1827 34.5997 22.933C32.8493 24.6833 30.4754 25.6667 28 25.6667C25.5246 25.6667 23.1507 24.6833 21.4003 22.933C19.65 21.1827 18.6667 18.8087 18.6667 16.3333ZM18.6667 30.3333C15.5725 30.3333 12.605 31.5625 10.4171 33.7504C8.22916 35.9383 7 38.9058 7 42C7 43.8565 7.7375 45.637 9.05025 46.9497C10.363 48.2625 12.1435 49 14 49H42C43.8565 49 45.637 48.2625 46.9497 46.9497C48.2625 45.637 49 43.8565 49 42C49 38.9058 47.7708 35.9383 45.5829 33.7504C43.395 31.5625 40.4275 30.3333 37.3333 30.3333H18.6667Z" fill="#1570EF"/>
                                </svg>
                            </BiggerProfileIcon>

                            {/* 사용자명 + 채팅하기 컨테이너 */}
                            <UserChatContainer>
                                <UserNameText>사용자명</UserNameText>
                                {/* <FollowChatwButton>채팅하기</FollowChatwButton> */}
                            </UserChatContainer>
                            <SimpleIntroText>어제의 나보다 오늘의 내가 1%라도 더 나은 사람이기를..</SimpleIntroText>
                        </UserIntroContainer>

                        {/* 사용자 포트폴리오 이미지 컨테이너 */}
                        <UserPortfoliosContainer>
                            {portfolio && portfolio.attachments && portfolio.attachments.length > 0 ? (
                                portfolio.attachments.slice(0, 3).map((item, index) => (
                                    <PortfolioImg 
                                        key={index}
                                        onClick={() => navigate(`https://pocketfolio.co.kr/api/portfolio/${portfolioId}`)}
                                    >
                                        <img 
                                            src={typeof item === 'object' ? item.url : item} 
                                            alt={`포트폴리오 ${index + 1}`} 
                                        />
                                    </PortfolioImg>
                                ))
                            ) : (
                                // 첨부파일이 없을 경우 기본 예시 이미지로 대체
                                <PortfolioImg onClick={() => navigate(`https://pocketfolio.co.kr/api/portfolio/${portfolioId}`)}>
                                    <img src={exampleImg} alt="포트폴리오 기본 이미지" />
                                </PortfolioImg>
                            )}
                        </UserPortfoliosContainer>
                    </UserInfoImageContainer>
                    
                    {/* 비슷한 포트폴리오 */}
                    <ProjectNameText style={{ position: 'relative', left: '104px', marginTop: '64px'}}>비슷한 포트폴리오</ProjectNameText>
                    {/* 비슷한 포트폴리오 이미지 컨테이너 */}
                    <SimilarPortfolioContainer>
                        <img src={exampleImg} alt="포트폴리오1"/>
                        <img src={exampleImg} alt="포트폴리오2"/>
                        <img src={exampleImg} alt="포트폴리오3"/>
                        <img src={exampleImg} alt="포트폴리오4"/>
                        <img src={exampleImg} alt="포트폴리오5"/>
                        <img src={exampleImg} alt="포트폴리오6"/>
                        <img src={exampleImg} alt="포트폴리오7"/>
                        <img src={exampleImg} alt="포트폴리오8"/>
                    </SimilarPortfolioContainer>
                    
                </ModalBodyContainer>
            </ModalContainer>
        </ModalOverlay>
    );
}

export default PortfolioDetailModal;