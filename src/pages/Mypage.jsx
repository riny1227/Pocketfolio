import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Card from '../components/share/Card';
import FollowersModal from '../components/share/FollowersModal';
import { useAuth } from '../context/AuthContext';
import { getUserInfo, getPortfolioList, getBookmarks, getLikes } from '../api/MypageApi';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png';
import profileImage from '../imgs/Profile.png';

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
    width: 159px;
    height: 159px;
    border-radius: 50%;
    background-image: url(${profileImage});
    background-size: cover;
    background-position: center;
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

// 프로필정보 wrapper
const ProfileWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    align-self: stretch;
`;

// 활동사항 각 하나씩
const ActivityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
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

const ProfileBottomDateText = styled.text`
    color: #909090;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px;
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

// 포트폴리오 추가하기 카드
const AddPortfolioCard = styled.div`
    display: flex;
    width: 288px;
    height: 200px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 8px;
    border-radius: 8px;
    border: 1px dashed #717680;
    background: #E8F1FD;
    cursor: pointer;
    
    svg {
        width: 33px;
        height: 32px;
    }

    span {
        color: #464646;
        font-family: 'Pretendard-Regular';
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
    }

    &:hover{
        background: #DCEAFD;
    }
`;

export default function Mypage() {
    const navigate = useNavigate();
    const { token } = useAuth();

    const [name, setName] = useState("");
    const [follower, setFollowers] = useState("");
    const [following, setFollowing] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [education, setEducation] = useState([]);
    const [activities, setActivities] = useState([]);
    const [portfolioCards, setPortfolioCards] = useState([]);   // 포트폴리오 리스트
    const [bookmarkedCards, setBookmarkedCards] = useState([]); // 북마크 리스트
    const [likedCards, setLikedCards] = useState([]); // 좋아요 리스트

    // 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState("portfolio");
    // 호버 모드
    const [hoverMode, setHoverMode] = useState("mypage");
    // 카드 선택 
    const [selectedCard, setSelectedCard] = useState(null);

    useEffect(() => {
        if (token) {
            console.log("Fetched token:", token); // token 확인
            const fetchData = async () => {
                try {
                    const userData = await getUserInfo(token);
                    setName(userData.name);
                    setFollowers(userData.follower);
                    setFollowing(userData.following);
                    setIntroduce(userData.introduce);
                    setEducation(userData.education);
                    setActivities(userData.activities);

                    const portfolioList = await getPortfolioList(token);
                    setPortfolioCards(portfolioList.portfolios);

                    const bookmarkList = await getBookmarks(token);
                    setBookmarkedCards(bookmarkList.portfolios);

                    const likedList = await getLikes(token);
                    setLikedCards(likedList.portfolios);
                } catch (error) {
                    console.error("데이터 가져오기 실패", error);
                }
            };

            fetchData();
        }
    }, [token]);

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
            ? bookmarkedCards
            : likedCards;

    const handleBookmarkToggle = (id) => {
        // 북마크 상태 토글
        setBookmarkedCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
            )
        );
        
        // 좋아요 상태 토글
        setLikedCards(prevCards =>
            prevCards.map(card =>
                card.id === id ? { ...card, isBookmarked: !card.isBookmarked } : card
            )
        );
    };       
    
    // 팔로워 & 팔로잉 모달 관련
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('followers');

    const handleOpenModal = (type) => {
        setModalType(type); // 모달 타입 설정 (팔로워 또는 팔로잉)
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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
                            <ProfileImg/>
                            {/* 프로필 이름 */}
                            <ProfileName>{name}</ProfileName>
                        </Profile>
                        {/* 프로필 팔로워+팔로잉+편집부분 */}
                        <ProfileEditContainer>
                            {/* 팔로워+팔로잉 영역 */}
                            <FollowContainer>
                                <FollowItem>
                                    {/* onClick={() => handleOpenModal('followers')} */}
                                    <Label>팔로워</Label>
                                    <Number>{follower}</Number>
                                </FollowItem>
                                <FollowItem>
                                    {/* onClick={() => handleOpenModal('following')} */}
                                    <Label>팔로잉</Label>
                                    <Number>{following}</Number>
                                </FollowItem>
                            </FollowContainer>
                            {/* 프로필정보 편집하기 버튼*/}
                            <EditButton>
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 16L4 20L8 19L19.5858 7.41421C20.3668 6.63316 20.3668 5.36683 19.5858 4.58579L19.4142 4.41421C18.6332 3.63316 17.3668 3.63317 16.5858 4.41421L5 16Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5 16L4 20L8 19L18 9L15 6L5 16Z" fill="white"/>
                                        <path d="M15 6L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M13 20H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    <span onClick={() => navigate(`/mypage/edit`)}>프로필정보 편집하기</span> 
                                </div>
                            </EditButton>
                            <ProfileBottomContainer>
                                <ProfileWrapper>
                                    <ProfileTopText>소개</ProfileTopText>
                                    <ProfileBottomText>{introduce}</ProfileBottomText>
                                </ProfileWrapper>
                                {education && (
                                    <ProfileWrapper>
                                        <ProfileTopText>학력</ProfileTopText>
                                        <ProfileBottomDateText>{education.startDate} ~ {education.endDate && !isNaN(new Date(education.endDate).getTime()) ? education.endDate : "ing"}</ProfileBottomDateText>
                                        <ProfileBottomText>{education.school} ({education.status})</ProfileBottomText>
                                    </ProfileWrapper>
                                )}

                                {Array.isArray(activities) && activities.length > 0 && (
                                    <ProfileWrapper>
                                        <ProfileTopText>활동</ProfileTopText>
                                        {activities.map((act, index) => (
                                            <ActivityWrapper key={index}>
                                                <ProfileBottomDateText>{act.startDate} ~ {act.endDate}</ProfileBottomDateText>
                                                <ProfileBottomText>{act.activityName}</ProfileBottomText>
                                            </ActivityWrapper>
                                        ))}
                                    </ProfileWrapper>
                                )}
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
                                <span className="countText">{portfolioCards?.length ?? 0}</span>    
                            </div>
                        </Tap>
                        <Tap
                            active={activeTab === "bookmark"}
                            onClick={() => setActiveTab("bookmark")}
                        >
                            <span>북마크</span>
                            <div className="count">
                                <span className="countText">{bookmarkedCards?.length ?? 0}</span>
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
                        {activeTab === "portfolio" && (
                            <CardItem>
                                <AddPortfolioCard onClick={() => navigate('/write-portfolio')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
                                        <path d="M16.5 0C7.668 0 0.5 7.168 0.5 16C0.5 24.832 7.668 32 16.5 32C25.332 32 32.5 24.832 32.5 16C32.5 7.168 25.332 0 16.5 0ZM24.5 16C24.5 16.8837 23.7837 17.6 22.9 17.6H18.1V22.4C18.1 23.2837 17.3837 24 16.5 24V24C15.6163 24 14.9 23.2837 14.9 22.4V17.6H10.1C9.21635 17.6 8.5 16.8837 8.5 16V16C8.5 15.1163 9.21634 14.4 10.1 14.4H14.9V9.6C14.9 8.71635 15.6163 8 16.5 8V8C17.3837 8 18.1 8.71634 18.1 9.6V14.4H22.9C23.7837 14.4 24.5 15.1163 24.5 16V16Z" fill="#1570EF"/>
                                    </svg>
                                    <span>포트폴리오 추가하기</span>
                                </AddPortfolioCard>
                            </CardItem>
                        )}
                        
                        {Array.isArray(cards) && cards.map((card, index) => (
                            <CardItem key={index} onClick={() => handleCardClick(card)}>
                                <Card
                                    title={card.title}
                                    image={card.coverImage ? card.coverImage : exampleImg}
                                    name={card.name}
                                    views={card.views}
                                    likes={card.likes}
                                    hoverMode={activeTab === "portfolio" ? "mypage" : "home"}
                                    isBookmarked={card.isBookmarked}
                                    onBookmarkChange={() => handleBookmarkToggle(card.id)}
                                />
                            </CardItem>
                        ))}
                    </CardsContainer>

                    {/* 포트폴리오 상세 페이지 모달 */}
                    {selectedCard && <PortfolioDetailModal card={selectedCard} onClose={closeModal} />}
                </MypageRightContainer>
            </MypageItemContainer>

            
            {/* 팔로워 또는 팔로잉 모달 */}
            {isModalOpen && (
                <FollowersModal
                    type={modalType}
                    users={modalType === 'followers' ? follower : following}
                    onClose={handleCloseModal}
                    followedUsers={[1, 2, 3]}
                />
            )}
        </MypageContainer>
    )
}