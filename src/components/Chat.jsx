import styled from "styled-components";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const ChatContainer = styled.div`
    position: fixed;
    top: 83px;
    right: 23px;
    z-index: 10;

    width: 400px;
    height: 640px;
    border-radius: 16px;
    border: 1px solid #E6E6E6;
    background: #FFF;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.08);

    /* 스크롤 가능하게 설정 */
    overflow-y: auto;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none; /* 크롬, 사파리에서 스크롤바 숨기기 */
    }
    -ms-overflow-style: none;  /* IE, 엣지에서 스크롤바 숨기기 */
    scrollbar-width: none;  /* 파이어폭스에서 스크롤바 숨기기 */
`;

const ChatTitle = styled.div`
    display: flex;
    padding: 16px 341px 16px 24px;
    align-items: center;

    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
`;

const ChatCard = styled.div`
    display: flex;
    padding: 16px 24px;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    cursor: pointer;

    &:hover {
        background: #F8F8F8;
    }
`;

const AvatarWrapper = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #dceafd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 검은색 라인 방지 */
`;

const ChatAvatar = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover; /* 이미지가 있을 때만 꽉 채움 */
    display: ${({ src }) => (src ? "block" : "none")}; /* 이미지 없으면 숨김 */
`;

const ChatInfo = styled.div`
    display: flex;
    width: 288px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;    
`;

const ChatName = styled.div`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
`;

const ChatTime = styled.div`
    color:  #909090;
    text-align: right;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
`;

const BottomWrapper = styled.div`
    display: flex;
    width: 288px;
    justify-content: space-between;
    align-items: center;
`;

const ChatPreview = styled.div`
    display: -webkit-box;
    width: 240px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    flex-shrink: 0;

    overflow: hidden;
    color:  #464646;
    font-feature-settings: 'liga' off, 'clig' off;
    text-overflow: ellipsis;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    line-height: 22px;
`;

const UnreadBadge = styled.div`
    display: flex;
    padding: 0px 7px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #F04438;

    color: #FFF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
`;

export default function Chat() {
    const [chatList, setChatList] = useState([]); // api로 채팅 리스트 받아와서 이 곳에 저장

    // API에서 채팅 목록 가져오는 함수
    const fetchChatList = async () => {
        try {
            const response = await fetch("/mockdata/Chats.json"); // 여기에 실제 API URL을 입력
            if (!response.ok) {
                throw new Error("(mock data)  채팅 데이터를 가져오는 데 실패했습니다.");
            }
            const data = await response.json();
            setChatList(data); // API 응답 데이터를 state에 저장
        } catch (error) {
            console.error("(mock data) 채팅 목록 불러오기 오류:", error);
        }
    };

    // 컴포넌트가 처음 렌더링될 때 API 호출
    useEffect(() => {
        fetchChatList();
    }, []);

    return createPortal(
        <ChatContainer>
            <ChatTitle>채팅</ChatTitle>

            {/* API에서 받아온 채팅 목록을 동적으로 렌더링 */}
            {chatList.map((chat, index) => (
                <ChatCard key={index}>
                    <AvatarWrapper>
                        {chat.src ? (
                            <ChatAvatar src={chat.src} alt="profile" />
                        ) : (
                            // 기본 프로필 아이콘
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5C24 12.0913 23.3679 13.6174 22.2426 14.7426C21.1174 15.8679 19.5913 16.5 18 16.5C16.4087 16.5 14.8826 15.8679 13.7574 14.7426C12.6321 13.6174 12 12.0913 12 10.5ZM12 19.5C10.0109 19.5 8.10322 20.2902 6.6967 21.6967C5.29018 23.1032 4.5 25.0109 4.5 27C4.5 28.1935 4.97411 29.3381 5.81802 30.182C6.66193 31.0259 7.80653 31.5 9 31.5H27C28.1935 31.5 29.3381 31.0259 30.182 30.182C31.0259 29.3381 31.5 28.1935 31.5 27C31.5 25.0109 30.7098 23.1032 29.3033 21.6967C27.8968 20.2902 25.9891 19.5 24 19.5H12Z" fill="#1570EF"/>
                            </svg>
                        )}
                    </AvatarWrapper>
                    <ChatInfo>
                        <TopWrapper>
                            <ChatName>{chat.name}</ChatName>
                            <ChatTime>{chat.lastMessageTime}</ChatTime>
                        </TopWrapper>
                        <BottomWrapper>
                            <ChatPreview>{chat.lastMessage}</ChatPreview>
                            {chat.unread > 0 && <UnreadBadge>{chat.unread}</UnreadBadge>}
                        </BottomWrapper>
                    </ChatInfo>
                </ChatCard>
            ))}
        </ChatContainer>,
        document.body // Header 밖에서 렌더링
    );
};