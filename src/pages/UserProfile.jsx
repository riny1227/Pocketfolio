import React, { useState } from 'react';
import styled from "styled-components";
import Card from '../components/share/Card';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

// UserProfile 전체 컴포넌트 감싸는 컨테이너
const UserProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 마이페이지 커버
const UserProfileCover = styled.div`
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
const UserProfileItemContainer = styled.div`
    display: flex;
    padding: 35px 0px 62px 24px;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 27px;
`;

// 프로필(왼쪽) 컨테이너
const UserProfileLeftContainer = styled.div`
    display: flex;
    width: 293px;
    height: 462px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    opacity: 0.8;
    background: #D5D5D5;
`;

// 프로필 내부 컨테이너
const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
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

// 팔로우&채팅 버튼
const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`;

// 팔로우 버튼
const FollowButton = styled.button`
    display: flex;
    width: 213px;
    height: 44px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 50px;
    border: none;
    background: #C1C1C1;

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
        color: #000;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    &:hover {
        background-color:rgb(145, 145, 145);
    }
`;

// 채팅하기 버튼
const ChatButton = styled.button`
    display: flex;
    width: 213px;
    height: 44px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: 50px;
    border: 1px solid #8E8E8E;
    background: #FFF;

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
        color: #000;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }

    &:hover {
        background-color:rgb(145, 145, 145);
    }
`;

// 내용(오른쪽) 컨테이너
const UserProfileRightContainer = styled.div`
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
        background: ${(props) => (props.active ? "#000" : "#717680")};
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
`;

export default function UserProfile() {
    // name 변수 선언
    const [name, setName] = useState("RIM YOURI"); // 임시 이름 설정
    // 팔로워, 팔로잉 변수 선언
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    // 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState("portfolio");
    // 호버 모드
    const [hoverMode, setHoverMode] = useState("mypage");

    // 샘플 데이터
    const portfolioCards = [
        { title: "포트폴리오 1", name: "1", views: 1234, likes: 567 },
        { title: "포트폴리오 2", name: "2", views: 5678, likes: 890 },
    ];

    return (
        <UserProfileContainer>
            {/* 상단 마이페이지 커버 */}
            <UserProfileCover>
                <img src={exampleImg} />
            </UserProfileCover>

            {/* 마이페이지 내용 부분 */}
            <UserProfileItemContainer>
                {/* 마이페이지 좌측 프로필 부분 */}
                <UserProfileLeftContainer>
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
                            <ButtonWrapper>
                                <FollowButton>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 5V19M5 12H12H19" stroke="#222222" stroke-width="2"/>
                                        </svg>
                                        <span>팔로우</span> 
                                    </div>
                                </FollowButton>
                                <ChatButton>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15.25 11.5V4.75C15.25 4.55109 15.171 4.36032 15.0303 4.21967C14.8897 4.07902 14.6989 4 14.5 4H4.75C4.55109 4 4.36032 4.07902 4.21967 4.21967C4.07902 4.36032 4 4.55109 4 4.75V15.25L7 12.25H14.5C14.6989 12.25 14.8897 12.171 15.0303 12.0303C15.171 11.8897 15.25 11.6989 15.25 11.5ZM18.25 7H16.75V13.75H7V15.25C7 15.4489 7.07902 15.6397 7.21967 15.7803C7.36032 15.921 7.55109 16 7.75 16H16L19 19V7.75C19 7.55109 18.921 7.36032 18.7803 7.21967C18.6397 7.07902 18.4489 7 18.25 7Z" fill="#4E4E4E"/>
                                        </svg>
                                        <span>채팅하기</span>
                                    </div>
                                </ChatButton>
                            </ButtonWrapper>
                        </ProfileEditContainer>
                    </ProfileContainer>
                </UserProfileLeftContainer>

                {/* 마이페이지 우측 내용 부분 */}
                <UserProfileRightContainer>
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
                    </Tabs>
                    <Line/>
                    {/* 카드 컴포넌트 */}
                    <CardsContainer>
                    {portfolioCards.map((card, index) => (
                        <CardItem key={index}>
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
                </UserProfileRightContainer>
            </UserProfileItemContainer>
        </UserProfileContainer>
    )
}