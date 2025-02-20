import styled from "styled-components";
import { useState, useEffect } from "react";

// Chat Detail 전체 컨테이너
const ChatDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
`;

// 상세 채팅의 상단바(사용자 프로필 사진, 사용자명, 알림 설정)를 감싸는 컨테이너
const TopWrapper = styled.div`
    width: 100%;
    height: 56px;
    flex-shrink: 0;
    padding: 0 24px;
    box-sizing: border-box;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 사용자 프로필 사진 + 사용자명 묶는 컨테이너
const TopLeftWrapper = styled.div`
    display: flex;
    gap: 12px;
`;

// 사용자 프로필 사진 감싸는 div
const DetailAvatarWrapper = styled.div`
    width: 18px;
    height: 18px;
    padding: 3px;
    border-radius: 50%;
    background-color: #dceafd;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* 검은색 라인 방지 */
`;

// 사용자 프로필 사진
const ChatDetailAvatar = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover; /* 이미지가 있을 때만 꽉 채움 */
    display: ${({ src }) => (src ? "block" : "none")}; /* 이미지 없으면 숨김 */
`;

// 사용자명
const ChatDetailName = styled.span`
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
`;

// 알림 설정
const ChatAlarmIcon = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    cursor: pointer;
`;

// 상세 채팅의 채팅 내역 부분을 감싸는 컨테이너
const MessageContainer = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-sizing: border-box;
    // margin-bottom: 40px;

    &::-webkit-scrollbar {
        display: none;
    }
`;

// 채팅 날짜 (yyyy년 mm월 dd일)
const Timestamp = styled.div`
    display: inline-flex;
    justify-content: center;
    margin: ${({ $isFirst }) => ($isFirst ? "0 0 24px 0" : "24px 0")}; /* 타임스탬프가 그룹의 첫 요소라면 아래 마진만 24px, 그렇지 않다면 위아래 마진 24px */
    background-color: #F8F8F8;
    padding: 0 24px;
    border-radius: 10px;

    color: #909090;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
`;

// 나 또는 상대의 채팅 묶음 컨테이너
const MessageGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isMe }) => ($isMe ? "flex-end" : "flex-start")};
    gap: 4px;
    margin-bottom: ${({ $isLastMessage }) => ($isLastMessage ? "40px" : "0px")}; /* 그룹의 마지막 메시지라면 아래 마진 40px */
`;

// 채팅 메시지 하나
const MessageBubble = styled.div`
    max-width: 240px;
    padding: 8px 16px;
    border-radius: 16px;
    word-wrap: break-word;
    box-sizing: border-box;
    background-color: ${({ $isMe }) => ($isMe ? "#1570EF" : "#F8F8F8")};
    
    color: ${({ $isMe }) => ($isMe ? "#fff" : "#222")};
    font-size: 12px;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
`;

// 상세 채팅의 하단바(입력칸, 파일첨부)를 감싸는 컨테이너
const BottomWrapper = styled.div`
    width: 100%;
    height: 76px;

    display: flex;
    justify-content: center;
    align-items: center;
`;

// 채팅 입력바
const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f8f8f8;
    border-radius: 18px;
    width: 367px;
    height: 36px;
`;

// 채팅으로 보낼 텍스트 입력하는 input 공간
const StyledInput = styled.input`
    width: 256px;
    height: 20px;
    flex-shrink: 0;
    background: transparent;
    border: none;
    outline: none;
    padding-left: 16px;
    box-sizing: border-box;

    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
    color:  #222;

    &::placeholder {
        color:  #909090;
    }
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
`;

export default function ChatDetail({ chatId, onBack }) {
    const [chatDetailInfo, setChatDetailInfo] = useState(null); // api로 상세 채팅 정보(누구와의 채팅인지) 받아와서 이 곳에 저장
    const [isAlarmOn, setAlarmOn] = useState(false);

    useEffect(() => {
        const fetchChatDetail = async () => {
            try {
                const response = await fetch(`/mockdata/ChatDetails_${chatId}.json`);
                if (!response.ok) {
                    throw new Error("채팅 상세 데이터를 가져오는 데 실패했습니다.");
                }
                const data = await response.json();
                setChatDetailInfo(data);
                setAlarmOn(data.alarmOn);
            } catch (error) {
                console.error("채팅 상세 데이터 불러오기 오류:", error);
            }
        };

        if (chatId) { 
            fetchChatDetail(); 
        }
    }, [chatId]);

    if (!chatDetailInfo) {
        return <ChatDetailContainer>Loading...</ChatDetailContainer>;
    }

    let lastDate = null;
    let lastSender = null;
    let isFirstGroup = true; // 첫 번째 그룹인지 확인

    return (
        <ChatDetailContainer>
            <TopWrapper>
                <TopLeftWrapper>
                    {/* 채팅 상대 프로필 사진 */}
                    <DetailAvatarWrapper>
                        {chatDetailInfo.src ? (
                            <ChatDetailAvatar src={chatDetailInfo.src} alt="profile" /> // mockdata에서는 profileImage로 되어있는데 api 연결 전까지는 연동 X
                        ) : (
                            // 기본 프로필 아이콘
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M6 5.25C6 4.45435 6.31607 3.69129 6.87868 3.12868C7.44129 2.56607 8.20435 2.25 9 2.25C9.79565 2.25 10.5587 2.56607 11.1213 3.12868C11.6839 3.69129 12 4.45435 12 5.25C12 6.04565 11.6839 6.80871 11.1213 7.37132C10.5587 7.93393 9.79565 8.25 9 8.25C8.20435 8.25 7.44129 7.93393 6.87868 7.37132C6.31607 6.80871 6 6.04565 6 5.25ZM6 9.75C5.00544 9.75 4.05161 10.1451 3.34835 10.8483C2.64509 11.5516 2.25 12.5054 2.25 13.5C2.25 14.0967 2.48705 14.669 2.90901 15.091C3.33097 15.5129 3.90326 15.75 4.5 15.75H13.5C14.0967 15.75 14.669 15.5129 15.091 15.091C15.5129 14.669 15.75 14.0967 15.75 13.5C15.75 12.5054 15.3549 11.5516 14.6517 10.8483C13.9484 10.1451 12.9946 9.75 12 9.75H6Z" fill="#1570EF"/>
                            </svg>
                        )}
                    </DetailAvatarWrapper>

                    {/* 채팅 상대 사용자명 */}
                    <ChatDetailName>{chatDetailInfo.userName}</ChatDetailName>
                </TopLeftWrapper>

                {/* 채팅 알람 켜기 or 끄기 */}
                <ChatAlarmIcon onClick={ () => setAlarmOn(prev => !prev) } style={{ position: "relative" }}>
                    {isAlarmOn ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 0.667969C7.26362 0.667969 6.66667 1.26492 6.66667 2.0013C6.66667 2.06557 6.67121 2.12877 6.68 2.19061C4.74549 2.76003 3.33333 4.54908 3.33333 6.66797V12.0013H2.66667C2.29848 12.0013 2 12.2998 2 12.668C2 13.0362 2.29848 13.3346 2.66667 13.3346H4H12H13.3333C13.7015 13.3346 14 13.0362 14 12.668C14 12.2998 13.7015 12.0013 13.3333 12.0013H12.6667V6.66797C12.6667 4.54908 11.2545 2.76003 9.32 2.19061C9.32879 2.12877 9.33333 2.06557 9.33333 2.0013C9.33333 1.26492 8.73638 0.667969 8 0.667969ZM9.33333 14.668C9.33333 15.0362 9.03486 15.3346 8.66667 15.3346H7.33333C6.96514 15.3346 6.66667 15.0362 6.66667 14.668C6.66667 14.2998 6.96514 14.0013 7.33333 14.0013H8.66667C9.03486 14.0013 9.33333 14.2998 9.33333 14.668Z" fill="#292929"/>
                        </svg>
                    ) : (
                        <>
                            {/* 첫 번째 SVG (배경 아이콘) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M6.66671 1.99935C6.66671 1.26297 7.26366 0.666016 8.00004 0.666016C8.73642 0.666016 9.33337 1.26297 9.33337 1.99935C9.33337 2.06361 9.32883 2.12682 9.32004 2.18866C10.0139 2.39289 10.6405 2.75401 11.1589 3.23098L3.33337 11.0565V6.66602C3.33337 4.54713 4.74553 2.75807 6.68004 2.18866C6.67125 2.12682 6.66671 2.06361 6.66671 1.99935ZM4.27618 13.3327H12H13.3334C13.7016 13.3327 14 13.0342 14 12.666C14 12.2978 13.7016 11.9993 13.3334 11.9993H12.6667V6.66602C12.6667 6.14751 12.5821 5.64876 12.4261 5.1828L4.27618 13.3327ZM8.66671 15.3327C9.0349 15.3327 9.33337 15.0342 9.33337 14.666C9.33337 14.2978 9.0349 13.9993 8.66671 13.9993H7.33337C6.96518 13.9993 6.66671 14.2978 6.66671 14.666C6.66671 15.0342 6.96518 15.3327 7.33337 15.3327H8.66671Z" fill="#222222"/>
                            </svg>

                            {/* 두 번째 SVG (위에 겹칠 아이콘) */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="13" viewBox="0 0 12 13" fill="none"
                                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}> 
                                <path d="M11.3334 1.33398L0.666707 12.0007" stroke="#222222" strokeWidth="1.33333" strokeLinecap="round"/>
                            </svg>
                        </>
                    )}
                </ChatAlarmIcon>
            </TopWrapper>

            <MessageContainer>
                {chatDetailInfo.messages.map((message, index, array) => {
                    const messageDate = new Date(message.timestamp).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    // 날짜가 바뀌었을 때만 타임스탬프 추가
                    const showDate = messageDate !== lastDate;
                    lastDate = messageDate;

                    // 그룹의 첫 번째 요소인지 판단
                    const isFirst = index === 0 || array[index - 1].sender !== message.sender;

                    // 메시지를 보낸 사람이 '나'인지 확인
                    const isMe = message.sender === "me";

                    // 그룹의 마지막 요소인지 판단
                    const isLastMessage =
                        index === array.length - 1 || array[index + 1].sender !== message.sender;

                    lastSender = message.sender;

                    return (
                        <div key={message.messageId}>
                            {showDate && <div style={{ display: "flex", justifyContent: "center" }}><Timestamp $isFirst={isFirst}>{messageDate}</Timestamp></div>}
                            <MessageGroup $isMe={isMe} $isLastMessage={isLastMessage}>
                                <MessageBubble $isMe={isMe}>
                                    {message.content}
                                </MessageBubble>
                            </MessageGroup>
                        </div>
                    );
                })}
            </MessageContainer>

            <BottomWrapper>
                <InputContainer>
                    {/* 텍스트 입력 칸 */}
                    <StyledInput type="text" placeholder="메시지를 입력하세요" />

                    <div style={{ display: "flex", gap: "4px" }}>
                        {/* 첨부파일 버튼 */}
                        <IconButton>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M7.5 6.75V18C7.5 21 9.75 22.5 12 22.5C14.25 22.5 16.5 21 16.5 18V4.5C16.5 2.25 15 1.5 13.5 1.5C12 1.5 10.5 2.25 10.5 4.5V17.25C10.5 18 11.25 18.75 12 18.75C12.75 18.75 13.5 18 13.5 17.25V6.75" stroke="#909090" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </IconButton>

                        {/* 채팅 보내기 버튼 */}
                        <IconButton style={{ background: "#1570EF", width: "36px", height: "36px", borderRadius: "50%" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9909 6.01058L5.39895 10.5636L9.59394 12.9916L13.2929 9.29158C13.4806 9.10407 13.735 8.99878 14.0003 8.99888C14.2656 8.99897 14.5199 9.10444 14.7074 9.29208C14.895 9.47972 15.0002 9.73416 15.0001 9.99943C15.0001 10.2647 14.8946 10.5191 14.7069 10.7066L11.0069 14.4066L13.4369 18.6006L17.9909 6.01058ZM18.3139 3.76658C19.5089 3.33358 20.6669 4.49158 20.2339 5.68658L14.9519 20.2916C14.5179 21.4896 12.8819 21.6356 12.2429 20.5326L9.02594 14.9746L3.46794 11.7576C2.36494 11.1186 2.51095 9.48258 3.70895 9.04858L18.3139 3.76658Z" fill="white"/>
                            </svg>
                        </IconButton>
                    </div>
                </InputContainer>
            </BottomWrapper>
        </ChatDetailContainer>
    )
}