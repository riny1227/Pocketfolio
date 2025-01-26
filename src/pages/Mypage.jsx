import React, { useState } from 'react';
import styled from "styled-components";
import Card from '../components/Card';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

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

export default function Mypage() {
    // name 변수 선언
    const [name, setName] = useState("RIM YOURI"); // 임시 이름 설정
    // 팔로워, 팔로잉 변수 선언
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    // 활성화된 탭 상태
    const [activeTab, setActiveTab] = useState("portfolio");

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
                                        <path d="M12 5V19M5 12H12H19" stroke="#222222" stroke-width="2"/>
                                    </svg>
                                    <span>프로필정보 편집하기</span> 
                                </div>
                            </EditButton>
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
                            <div className="count">
                                <span className="countText">{likedCards.length}</span>
                            </div>
                        </Tap>
                    </Tabs>
                    <Line/>
                    {/* 각 탭에 대한 카드컴포넌트 */}
                    <CardsContainer>
                    {cards.map((card, index) => (
                        <CardItem key={index}>
                            <Card
                                title={card.title}
                                image={exampleImg} // 예시 이미지 사용
                                name={card.name}
                                views={card.views}
                                likes={card.likes}
                            />
                        </CardItem>
                    ))}
                    </CardsContainer>
                </MypageRightContainer>
            </MypageItemContainer>
        </MypageContainer>
    )
}