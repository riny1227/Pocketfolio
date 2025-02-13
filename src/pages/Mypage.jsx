import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Card from '../components/share/Card';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

// PortfolioDetailModal 불러오기
import PortfolioDetailModal from '../components/share/PortfolioDetailModal';

// Mypage 전체 컴포넌트 감싸는 컨테이너
const MypageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 마이페이지 커버
const MypageCover = styled.div`
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

// 프로필+내용 컨테이너
const MypageItemContainer = styled.div`
    display: flex;
    padding: 35px 0px 62px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 27px;
`;

// 프로필(왼쪽) 컨테이너
const MypageLeftContainer = styled.div`
    display: flex;
    width: 293px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    opacity: 0.8;
    background: #F8F8F8;
    border: 1px solid #D5D5D5;
`;

// 프로필 내부 컨테이너
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
    margin-top: 53px;
`;

// 프로필 이미지+이름 컨테이너
const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
    align-self: stretch;
`;

// 프로필 이미지
const ProfileImg = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 17px;
    align-self: stretch;
`;

// 프로필 이름
const ProfileName = styled.div`
    display: flex;
    width: 185px;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: #000;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
`;

// 프로필 팔로워+팔로잉+편집 컨테이너
const ProfileEditContainer = styled.div`
    display: flex;
    padding: 8px 0px;
    flex-direction: column;
    align-items: center;
    align-self: stretch;
`;

// 프로필 팔로워+팔로잉
const FollowContainer = styled.div`
    display: flex;
    padding: 15px 33px;
    justify-content: space-between;
    align-items: center;
`;

// 팔로워+팔로잉 항목
const FollowItem = styled.div`
    display: flex;
    width: 50px;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
`;

// 팔로워+팔로잉 라벨
const Label = styled.div`
    color: #000;
    text-align: center;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
`;

// 팔로워+팔로잉 숫자
const Number = styled.div`
    color: #000;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 프로필정보 편집 버튼
const EditButton = styled.button`
    display: flex;
    width: 213px;
    height: 44px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 50px;
    border: none;
    background: #1570EF;

    div{
        display: flex;
        align-items: center;
        gap: 6px;
    }

    svg{
        width: 24px;
        height: 24px;   
    }

    span{
        color: #fff;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }
`;

// 프로필정보 보여주는 컨테이너
const ProfileBottomContainer = styled.div`
    display: flex;
    width: 213px;
    padding: 66px 40px 105px 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
`;

// 프로필정보 상단 부분
const ProfileTopText = styled.text`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

// 프로필정보 하단 부분
const ProfileBottomText = styled.text`
    color:  #464646;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 내용(오른쪽) 컨테이너
const MypageRightContainer = styled.div`
    display: flex;
    width: 936px;
    flex-direction: column;
    align-items: flex-start;
`;

// 포트폴리오/북마크/좋아요 상단 부분
const Tabs = styled.div`
    display: flex;
    align-items: flex-start;
    margin-left: 22px;
    gap: 2px;

    div{
        display: flex;
        align-items: center;
        flex-direction: row;
    }
`;

// 상단 각 탭 부분
const Tap = styled.div`
    display: flex;
    flex-direction: row;
    padding: 13px 22px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    span{
        color: ${(props) => (props.active ? "#000" : "#717680")};
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-SemiBold';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }

    .count{
        display: flex;
        padding: 0px 6px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 16px;
        background: ${(props) => (props.active ? "#1570EF" : "#717680")};
    }

    .countText{
        color: #FFF;
        font-family: 'Pretendard-SemiBold';
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: 22px;
    }
`;

const Line = styled.div`
    width: 892px;
    height: 2px;
    margin-left: 22px;
    background: #E6E6E6;
`;

// 카드 컴포넌트 배치할 컨테이너
const CardsContainer = styled.div`
    display: flex;
    padding: 32px 20px;
    align-items: flex-start;
    align-content: flex-start;
    gap: 32px 14px;
    align-self: stretch;
    flex-wrap: wrap;
`;

// 카드 아이템 스타일
const CardItem = styled.div`
    flex: 0 0 calc((100% - 2 * 24px) / 3); /* 3개씩 배치되도록 계산 */
    box-sizing: border-box;
    cursor: pointer;
`;

export default function Mypage() {
    const navigate = useNavigate();
    // 사용자 ID 변수 선언
    const userId = 1;
    // name 변수 선언
    const [name, setName] = useState("RIM YOURI"); // 임시 이름 설정
    // 팔로워, 팔로잉 변수 선언
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    // 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState("portfolio");
    // 호버 모드
    const [hoverMode, setHoverMode] = useState("mypage");

    // 카드 선택 
        const [selectedCard, setSelectedCard] = useState(null);

    // 샘플 데이터
    const portfolioCards = [
        { title: "포트폴리오 1", name: "1", views: 1234, likes: 567 },
        { title: "포트폴리오 2", name: "2", views: 5678, likes: 890 },
    ];

    const bookmarkCards = [
        { title: "북마크 1", name: "1", views: 3456, likes: 123 },
        { title: "북마크 2", name: "2", views: 7890, likes: 456 },
    ];

    const likedCards = [
        { title: "좋아요 1", name: "1", views: 2345, likes: 678 },
        { title: "좋아요 2", name: "2", views: 5678, likes: 890 },
    ];

    const handleCardClick = (card) => {
        setSelectedCard(card);
        document.body.style.overflow = 'hidden'; // 배경 스크롤 비활성화
    };

    const closeModal = () => {
        setSelectedCard(null);
        document.body.style.overflow = 'auto'; // 배경 스크롤 활성화
    };

    // 탭에 따른 카드 데이터 선택
    const cards =
    activeTab === "portfolio"
        ? portfolioCards
        : activeTab === "bookmark"
        ? bookmarkCards
        : likedCards;

    return (
        <MypageContainer>
            {/* 상단 마이페이지 커버 */}
            <MypageCover>
                <img src={exampleImg} />
            </MypageCover>

            {/* 마이페이지 내용 부분 */}
            <MypageItemContainer>
                {/* 마이페이지 좌측 프로필 부분 */}
                <MypageLeftContainer>
                    <ProfileContainer>
                        {/* 프로필 이미지+이름 */}
                        <Profile>
                            {/* 프로필 이미지 */}
                            <ProfileImg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="159" height="159" viewBox="0 0 159 159" fill="none">
                                    <circle cx="79.5" cy="79.5" r="79.5" fill="white"/>
                                </svg>
                            </ProfileImg>
                            {/* 프로필 이름 */}
                            <ProfileName>{name}</ProfileName>
                        </Profile>
                        {/* 프로필 팔로워+팔로잉+편집부분 */}
                        <ProfileEditContainer>
                            {/* 팔로워+팔로잉 영역 */}
                            <FollowContainer>
                                <FollowItem>
                                    <Label>팔로워</Label>
                                    <Number>{followers}</Number>
                                </FollowItem>
                                <FollowItem>
                                    <Label>팔로잉</Label>
                                    <Number>{following}</Number>
                                </FollowItem>
                            </FollowContainer>
                            <EditButton>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5 16L4 20L8 19L18 9L15 6L5 16Z" fill="white"/>
                                        <path d="M15 6L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13 20H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span onClick={() => navigate(`/mypage/${userId}`)}>프로필정보 편집하기</span> 
                                </div>
                            </EditButton>
                            <ProfileBottomContainer>
                                <ProfileTopText>소개</ProfileTopText>
                                <ProfileBottomText>어제의 나보다 오늘의 내가 1%로라도 더 나은 사람이기를..</ProfileBottomText>
                            </ProfileBottomContainer>
                        </ProfileEditContainer>
                    </ProfileContainer>
                </MypageLeftContainer>

                {/* 마이페이지 우측 내용 부분 */}
                <MypageRightContainer>
                    {/* 상단 탭 부분 */}
                    <Tabs>
                        <Tap
                            active={activeTab === "portfolio"}
                            onClick={() => setActiveTab("portfolio")}
                        >
                            <span>포트폴리오</span>
                            <div className="count">
                                <span className="countText">{portfolioCards.length}</span>
                            </div>
                        </Tap>
                        <Tap
                            active={activeTab === "bookmark"}
                            onClick={() => setActiveTab("bookmark")}
                        >
                            <span>북마크</span>
                            <div className="count">
                                <span className="countText">{bookmarkCards.length}</span>
                            </div>
                        </Tap>
                        <Tap
                            active={activeTab === "likes"}
                            onClick={() => setActiveTab("likes")}
                        >
                            <span>좋아요</span>
                        </Tap>
                    </Tabs>
                    <Line/>
                    {/* 각 탭에 대한 카드컴포넌트 */}
                    <CardsContainer>
                    {cards.map((card, index) => (
                        <CardItem key={index} onClick={() => handleCardClick(card)}>
                            <Card
                                title={card.title}
                                image={exampleImg} // 예시 이미지 사용
                                name={card.name}
                                views={card.views}
                                likes={card.likes}
                                hoverMode={hoverMode}
                            />
                        </CardItem>
                    ))}
                    </CardsContainer>

                    {/* 포트폴리오 상세 페이지 모달 */}
                    {selectedCard && <PortfolioDetailModal card={selectedCard} onClose={closeModal} />}
                </MypageRightContainer>
            </MypageItemContainer>
        </MypageContainer>
    )
}