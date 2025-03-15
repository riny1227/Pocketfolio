import styled from "styled-components";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { fetchNotifications } from "../api/NavbarApi";

const NotifContainer = styled.div`
    position: fixed;
    top: 83px;
    right: 23px;
    z-index: 1000;

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

const HeaderWrapper = styled.div`
    padding: 16px 24px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NotifTitle = styled.div`
    color: #222;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
`;

const NotifAllRead = styled.button`
    border: 0;
    outline: none;
    background-color: #fff;
    padding: 0;
    cursor: pointer;

    color: #1570EF;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    font-style: normal;
    line-height: 22px;
    `;

const NotifCard = styled.div`
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

const NotifInfo = styled.div`
    display: flex;
    width: 288px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

const NotifTime = styled.div`
    color:  #909090;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    font-style: normal;
    line-height: 20px;
`;

const NotifMessage = styled.div`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    line-height: 24px;
`;

// 날짜 포맷 함수
const formatDate = (createdAt) => {
    const now = new Date();
    const date = new Date(createdAt);
    const diff = Math.floor((now - date) / 1000); // 초 단위 차이

    if (diff < 60) return `${diff}초 전`;
    
    const diffMinutes = Math.floor(diff / 60);
    if (diffMinutes < 60) return `${diffMinutes}분 전`;

    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}시간 전`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}일 전`;

    const diffWeeks = Math.floor(diffDays / 7);
    if (diffWeeks < 4) return `${diffWeeks}주 전`;

    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
};

export default function Notification() {
    const [notifList, setNotifList] = useState([]); // api로 채팅 리스트 받아와서 이 곳에 저장
    const [selectedNotifId, setSelectedNotifId] = useState(null); // 선택된 채팅 정보의 id 저장

    // API에서 채팅 목록 가져오는 함수
    // 서버 수정 후 이 코드로 바꾸기
    // const getNotifList = async (token) => {
    //     try {
    //         const data = await fetchNotifications(token);
    //         setNotifList(data);
    //     } catch (error) {
    //         console.error("getNotifList 에러 발생 : ", error);
    //     }
    // };

    // 컴포넌트가 처음 렌더링될 때 API 호출
    // mockdata 연결한 임시 코드
    useEffect(() => {
        const getNotifList = async () => {
            try {
                const data = await fetchNotifications();

                // 날짜 기준 내림차순 정렬
                const sortedData = data.notifications.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );

                setNotifList(sortedData);
            } catch (error) {
                // console.error("getNotifList 에러 발생 : ", error);
            }
        };

        getNotifList();
    }, []);

    return createPortal(
        <NotifContainer>
            <HeaderWrapper>
                <NotifTitle>알림</NotifTitle>
                <NotifAllRead>모두 읽음</NotifAllRead>
            </HeaderWrapper>
            {notifList?.map((notif) => (
                <NotifCard key={notif.id} onClick={() => setSelectedNotifId(notif.id)}>
                    <AvatarWrapper>
                        {notif.message.includes("좋아요") ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path d="M28.5238 13.6014C29.1841 13.6014 29.7619 13.8383 30.2571 14.3121C30.7524 14.7859 31 15.3386 31 15.9704V18.3394C31 18.4776 30.9843 18.6257 30.953 18.7836C30.9216 18.9415 30.8754 19.0896 30.8143 19.2278L27.1 27.5786C26.9143 27.9734 26.6048 28.309 26.1714 28.5854C25.7381 28.8618 25.2841 29 24.8095 29H14.9048C14.2238 29 13.6411 28.7682 13.1566 28.3047C12.6721 27.8412 12.4294 27.2832 12.4286 26.631V14.5786C12.4286 14.2627 12.4958 13.9619 12.6304 13.676C12.7649 13.3901 12.9453 13.1382 13.1714 12.9203L19.8881 6.52392C20.1976 6.24753 20.5641 6.07973 20.9875 6.0205C21.411 5.96128 21.8183 6.03037 22.2095 6.22779C22.6008 6.42521 22.8847 6.70159 23.0613 7.05695C23.238 7.4123 23.2739 7.77752 23.169 8.15262L21.7762 13.6014H28.5238ZM7.47619 29C6.79524 29 6.21251 28.7682 5.728 28.3047C5.24349 27.8412 5.00083 27.2832 5 26.631V15.9704C5 15.3189 5.24267 14.7614 5.728 14.2979C6.21333 13.8343 6.79606 13.6022 7.47619 13.6014C8.15632 13.6006 8.73946 13.8327 9.22562 14.2979C9.71178 14.763 9.95403 15.3205 9.95238 15.9704V26.631C9.95238 27.2825 9.71013 27.8404 9.22562 28.3047C8.74111 28.769 8.15797 29.0008 7.47619 29Z" fill="#1570EF"/>
                            </svg>
                        ) : notif.message.includes("팔로워") ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5C24 12.0913 23.3679 13.6174 22.2426 14.7426C21.1174 15.8679 19.5913 16.5 18 16.5C16.4087 16.5 14.8826 15.8679 13.7574 14.7426C12.6321 13.6174 12 12.0913 12 10.5ZM12 19.5C10.0109 19.5 8.10322 20.2902 6.6967 21.6967C5.29018 23.1032 4.5 25.0109 4.5 27C4.5 28.1935 4.97411 29.3381 5.81802 30.182C6.66193 31.0259 7.80653 31.5 9 31.5H27C28.1935 31.5 29.3381 31.0259 30.182 30.182C31.0259 29.3381 31.5 28.1935 31.5 27C31.5 25.0109 30.7098 23.1032 29.3033 21.6967C27.8968 20.2902 25.9891 19.5 24 19.5H12Z" fill="#1570EF"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
                                {/* 기본 아이콘 */}
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 10.5C12 8.9087 12.6321 7.38258 13.7574 6.25736C14.8826 5.13214 16.4087 4.5 18 4.5C19.5913 4.5 21.1174 5.13214 22.2426 6.25736C23.3679 7.38258 24 8.9087 24 10.5C24 12.0913 23.3679 13.6174 22.2426 14.7426C21.1174 15.8679 19.5913 16.5 18 16.5C16.4087 16.5 14.8826 15.8679 13.7574 14.7426C12.6321 13.6174 12 12.0913 12 10.5ZM12 19.5C10.0109 19.5 8.10322 20.2902 6.6967 21.6967C5.29018 23.1032 4.5 25.0109 4.5 27C4.5 28.1935 4.97411 29.3381 5.81802 30.182C6.66193 31.0259 7.80653 31.5 9 31.5H27C28.1935 31.5 29.3381 31.0259 30.182 30.182C31.0259 29.3381 31.5 28.1935 31.5 27C31.5 25.0109 30.7098 23.1032 29.3033 21.6967C27.8968 20.2902 25.9891 19.5 24 19.5H12Z" fill="#1570EF"/>
                            </svg>
                        )}
                    </AvatarWrapper>
                    <NotifInfo>
                        <NotifMessage>{notif.message}</NotifMessage>
                        <NotifTime>{formatDate(notif.createdAt)}</NotifTime>
                    </NotifInfo>
                </NotifCard>
            ))}
        </NotifContainer>,
        document.body // Header 밖에서 렌더링
    );
};