import React, { useState } from 'react';
import styled from 'styled-components';

// 모달 배경
const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

// 모달 컨테이너
const ModalContainer = styled.div`
    width: 480px;
    height: 544px;
    flex-shrink: 0;
    border-radius: 16px;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
`;

// 모달 헤더 부분 (팔로잉&팔로워)
const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 16px 24px;
`;

// 팔로잉&팔로워 텍스트
const Title = styled.text`
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

// 팔로잉&팔로워 리스트 컨테이너
const ListContainer = styled.div`
    overflow-y: auto;
    padding: 16px 20px;
    flex-grow: 1;
`;

// 리스트 부분
const FollowerItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding: 10px 0;
`;

// 사용자 정보
const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    
    span {
        width: 200px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;  // 텍스트가 한 줄로 유지되도록 설정
        color: #222;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-SemiBold';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }
    
    &:hover {
        span {
            color: #1365D7;
        }
    }
`;

// 사용자 프로필
const UserProfile = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-color: #D5D5D5;
`;

// 팔로잉&팔로우 버튼
const FollowButton = styled.button`
    display: flex;
    width: 80px;
    height: 24px;
    justify-content: center;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
    border-radius: 16px;
    font-size: 12px;
    line-height: 20px;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    cursor: pointer;
    
    // 기본 스타일
    span {
        font-feature-settings: 'liga' off, 'clig' off;
    }

    // 팔로잉 버튼
    ${({ variant }) => variant === 'following' && `
        border: 1px solid #E6E6E6;
        background: #FFF;
        span {
            color: #464646;
        }

        &:hover {
            border-radius: 16px;
            border: 1px solid #FECDCA;
            background: #FEF3F2;
            span{
                color: #F04438;
            }
        }

        &:active {
            border-radius: 16px;
            border: 1px solid #FECDCA;
            background: #FEE4E2;
            span {
                color: #F04438;
            }
        }
    `}

    // 팔로우 버튼
    ${({ variant }) => variant === 'follow' && `
        background: #1570EF;
        border: none;
        span {
            color: #FFF;
        }

        &:hover {
            border: none;
            border-radius: 16px;
            background: #1365D7;
        }

        &:active {
            border:none;
            border-radius: 16px;
            background: #115ABF;
        }
    `}
`;

const FollowersModal = ({ type, users, onClose, followedUsers = [] }) => {
    // 팔로우 상태 관리
    const [followStates, setFollowStates] = useState(
        users.map(user => (followedUsers.includes(user.id) ? 'following' : 'follow')) // 이미 팔로우한 사용자 '팔로잉' 상태로 설정
    );

    // hover 상태 추적
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleFollowToggle = (index) => {
        setFollowStates((prevState) => {
            const newState = [...prevState];
            newState[index] = newState[index] === 'follow' ? 'following' : 'follow'; // 상태 토글
            return newState;
        });
    };

    return (
        <ModalBackdrop onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <Title>{type === 'followers' ? `팔로워(${users.length})` : `팔로잉(${users.length})`}</Title>
                </ModalHeader>
                <ListContainer>
                    {users.map((user, index) => (
                        <FollowerItem key={user.id}>
                            <UserInfo>
                                <UserProfile />
                                <span>{user.name}</span>
                            </UserInfo>
                            <FollowButton
                                variant={followStates[index]} // 버튼 상태에 따라 'follow' 또는 'following' 상태를 전달
                                onClick={() => handleFollowToggle(index)} // 클릭 시 상태 토글
                                onMouseEnter={() => setHoveredIndex(index)} // 마우스 오버 시 hoveredIndex 설정
                                onMouseLeave={() => setHoveredIndex(null)} // 마우스 아웃 시 hoveredIndex 초기화
                            >
                                <span>
                                    {followStates[index] === 'follow' 
                                        ? '+ 팔로우' 
                                        : (hoveredIndex === index ? '- 언팔로우' : '팔로잉')}
                                </span>
                            </FollowButton>
                        </FollowerItem>
                    ))}
                </ListContainer>
            </ModalContainer>
        </ModalBackdrop>
    );
};

export default FollowersModal;
