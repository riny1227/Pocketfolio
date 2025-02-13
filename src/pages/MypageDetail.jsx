import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styled from "styled-components";
import InputAndDropdown from '../components/share/InputAndDropdown';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

// 전체 컴포넌트 감싸는 컨테이너
const MypageDetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 편집 정보들 감싸는 컨테이너
const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 102px;
`;

// 항목 wrapper
const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 17px;
    align-self: stretch;
`;

// 항목 타이틀 텍스트
const TitleText = styled.text`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
    margin-top: 99px;
`;

// 기본사항 
const BasicContainer = styled.div`
    display: flex;
    width: 1280px;
    padding: 51px 24px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 96px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #E6E6E6;
`;

// 프로필 이미지
const ProfileImage = styled.div`
    width: 207px;
    height: 207px;
    border-radius: 50%;
    background-image: url(${exampleImg});
    background-size: cover;
    background-position: center;
`;

// 기본사항 오른쪽 텍스트 컨테이너
const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 45px;
    align-self: stretch;
    flex-direction: column;
`;

// 기본사항 각 항목별 wrapper
const RightWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 9px;
    align-self: stretch;
`;

// 기본사항 오른쪽 타이틀 텍스트
const RightTitle = styled.span`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    &::after {
        content: ' *';
        color: #F04438;
    }
`;

// 기본사항 오른쪽 입력필드
const RightInputField = styled.input`
    display: flex;
    width: 769px;
    height: 64px;
    padding: 0 20px;
    align-items: center;
    gap: 54px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #D5D5D5;
    background: #FFF; 
`;

// 학력과 활동사항 밑에 라인
const Line = styled.div`
    width: 1280px;
    height: 1px;
    background: #909090;
`;

// 학력과 활동사항 밑에 컨테이너
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
`;

// 학력과 활동사항 밑에 wrapper
const ContentOneWrapper = styled.div`
    display: flex;
    padding: 0px 36px;
    align-items: center;
    gap: 30px;
    align-self: stretch;
`;

// 학력과 활동사항 왼쪽 텍스트
const ContentTitleText = styled.text`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

// 세부내용 구분하는 선
const InfoLine = styled.div`
    width: 1280px;
    height: 1px;
    background: #E7E7E7;
`;

// 검색 부분 wrapper
const InputWrapper = styled.div`
    margin-left: 92px;
`;

// 검색 아이콘
const SearchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
        <path d="M16.893 17.004L19.973 20.084M19 11.584C19 13.5731 18.2098 15.4808 16.8033 16.8873C15.3968 18.2938 13.4891 19.084 11.5 19.084C9.51088 19.084 7.60322 18.2938 6.1967 16.8873C4.79018 15.4808 4 13.5731 4 11.584C4 9.59486 4.79018 7.68721 6.1967 6.28068C7.60322 4.87416 9.51088 4.08398 11.5 4.08398C13.4891 4.08398 15.3968 4.87416 16.8033 6.28068C18.2098 7.68721 19 9.59486 19 11.584Z" stroke="#6C6C6C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
);

// DatePicker 스타일을 위한 컨테이너
const DatePickerContainer = styled.div`
    display: flex;
    width: auto;
    position: relative;
`;

// DatePicker와 아이콘을 포함한 스타일
const StyledDatePickerWrapper = styled.div`
    position: relative;  /* 아이콘 위치를 위해 상대적인 위치 설정 */
    display: flex;
    align-items: center;
    width: 100%;
`;

// DatePicker 스타일
const StyledDatePicker = styled(DatePicker)`
    width: 234px;
    height: 64px;
    padding: 0px 20px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-weight: 400;
    color: #909090;

    &:focus {
        color: #222;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #222;
    }
`;

// 아이콘 스타일
const IconStyle = styled.svg`
    position: absolute;
    right: 16px;
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #b1b1b1;
    cursor: pointer;
`;

// ~ 텍스트 스타일
const TildeText = styled.span`
    color: #989BA2;
    font-family: "Pretendard-Semibold";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 140% */
    letter-spacing: -0.4px;
    padding: 14px 12px;
    display: flex;
    align-items: center;
`;

// 활동명 입력 필드 스타일
const StyledActivityInput = styled.input`
    flex: 1;
    width: 564px;
    margin-left: 15px;
    max-width: 564px;  // 필요에 따라 조정 가능
    height: 64px;
    padding: 0 12px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-size: 16px;
    font-family: 'Pretendard-regular';
    color: #222;
`;

// 글자 수 표시 스타일
const CharCount = styled.span`
    margin-left: 12px;
    color: #BABABA;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 글자 수 표시 기본 스타일
const NumCount = styled.span`
    color: #1570EF;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 프로필 정보 저장 버튼
const SubmitButton = styled.button`
    display: flex;
    margin-top: 130px;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    background: ${({ disabled }) => (disabled ? '#E6E6E6' : '#1570EF')}; /* 활성화 여부에 따른 색상 변경 */
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};  /* 비활성화 상태에서는 클릭 불가 */
`;

// 버튼 내부 텍스트 스타일
const ButtonText = styled.span`
    color: ${({ disabled }) => (disabled ? '#909090' : '#FFF')};  /* 비활성화 시 텍스트 색상 변경 */
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

export default function MypageDetail() {
    const { id } = useParams();
    // 이름과 소개 필드에 대한 상태
    const [name, setName] = useState('');
    const [intro, setIntro] = useState('');
    // 날짜에 대한 부분
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 70 }, (_, i) => (currentYear - i).toString());
    const endyears = ["현재", ...Array.from({ length: 70 }, (_, i) => (currentYear - i).toString())];
    const [selectedEducation, setSelectedEducation] = useState(""); // 학력 선택 상태
    const [selectedStatus, setSelectedStatus] = useState(""); // 상태 선택 상태
    // 활동 기간 시작일과 완료일 부분
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    // 최대 글자수 지정
    const [activityName, setActivityName] = useState('');
    // 저장하기 버튼 상태 관리
    const isButtonDisabled = !name || !intro;

    return (
        <MypageDetailContainer>
            <DetailContainer>
                <DetailWrapper>
                    <TitleText>기본사항</TitleText>
                    <BasicContainer>
                        <ProfileImage/>
                        <RightContainer>
                            <RightWrapper>
                                <RightTitle>이름</RightTitle>
                                <RightInputField
                                    placeholder="이름"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </RightWrapper>
                            <RightWrapper>
                                <RightTitle>소개</RightTitle>
                                <RightInputField
                                    placeholder="짧게 나를 소개하기"
                                    value={intro}
                                    onChange={(e) => setIntro(e.target.value)}
                                />
                            </RightWrapper>   
                        </RightContainer>
                    </BasicContainer>
                </DetailWrapper>
                
                <DetailWrapper>
                    <TitleText>학력사항</TitleText>
                    <Line/>
                    <ContentContainer>
                        <ContentOneWrapper>
                            <ContentTitleText>최종학력</ContentTitleText>
                            <InputAndDropdown 
                                placeholder="학교" 
                                value={selectedEducation} 
                                setValue={setSelectedEducation} 
                                data={["중학교", "고등학교", "대학 (2,3년제)", "대학 (4년제)", "대학원"]} 
                                width="235px"
                            />
                            <InputAndDropdown 
                                placeholder="상태" 
                                value={selectedStatus} 
                                setValue={setSelectedStatus} 
                                data={["졸업", "재학", "중퇴"]} 
                                width="235px"
                            />
                        </ContentOneWrapper>
                        <InfoLine/>
                        <ContentOneWrapper>
                            <ContentTitleText>학력상세</ContentTitleText>
                            <InputAndDropdown 
                                placeholder="년도" 
                                value={selectedEducation} 
                                setValue={setSelectedEducation} 
                                data={years}
                                width="235px"
                            />
                            <TildeText>~</TildeText>
                            <InputAndDropdown 
                                placeholder="년도" 
                                value={selectedStatus} 
                                setValue={setSelectedStatus} 
                                data={endyears}
                                width="235px"
                            />
                        </ContentOneWrapper>
                        <ContentOneWrapper>
                            <InputWrapper>
                                <InputAndDropdown
                                    placeholder="학교 찾아보기"
                                    iconSvg={SearchIcon}
                                    hasToggle={false}
                                    width="502px"
                                />
                            </InputWrapper>
                        </ContentOneWrapper>
                    </ContentContainer>
                    <InfoLine/>
                </DetailWrapper>
                
                <DetailWrapper>
                    <TitleText>활동사항</TitleText>
                    <Line/>
                    <ContentContainer>
                        <ContentOneWrapper>
                            <ContentTitleText>활동기간</ContentTitleText>
                            <DatePickerContainer>
                                {/* 시작일 */}
                                <StyledDatePickerWrapper>
                                    <StyledDatePicker
                                        ref={startDateRef}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="시작일"
                                    />
                                    <IconStyle
                                        onClick={() => startDateRef.current.setFocus()} // 아이콘 클릭 시 달력 열기
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 4.16797H7.2002C6.08009 4.16797 5.51962 4.16797 5.0918 4.38596C4.71547 4.5777 4.40973 4.88344 4.21799 5.25977C4 5.68759 4 6.24806 4 7.36816V8.16797M8 4.16797H16M8 4.16797V2.16797M16 4.16797H16.8002C17.9203 4.16797 18.4796 4.16797 18.9074 4.38596C19.2837 4.5777 19.5905 4.88344 19.7822 5.25977C20 5.68717 20 6.24696 20 7.36488V8.16797M16 4.16797V2.16797M4 8.16797V16.9682C4 18.0883 4 18.648 4.21799 19.0759C4.40973 19.4522 4.71547 19.7584 5.0918 19.9502C5.5192 20.168 6.07899 20.168 7.19691 20.168H16.8031C17.921 20.168 18.48 20.168 18.9074 19.9502C19.2837 19.7584 19.5905 19.4522 19.7822 19.0759C20 18.6484 20 18.0895 20 16.9715V8.16797M4 8.16797H20M16 16.168H16.002L16.002 16.17L16 16.1699V16.168ZM12 16.168H12.002L12.002 16.17L12 16.1699V16.168ZM8 16.168H8.002L8.00195 16.17L8 16.1699V16.168ZM16.002 12.168V12.17L16 12.1699V12.168H16.002ZM12 12.168H12.002L12.002 12.17L12 12.1699V12.168ZM8 12.168H8.002L8.00195 12.17L8 12.1699V12.168Z" 
                                            stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </IconStyle>
                                </StyledDatePickerWrapper>

                                <TildeText>~</TildeText>

                                {/* 완료일 */}
                                <StyledDatePickerWrapper>
                                    <StyledDatePicker
                                        ref={endDateRef}
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        dateFormat="yyyy.MM.dd"
                                        placeholderText="완료일"
                                        minDate={startDate}
                                    />
                                    <IconStyle
                                        onClick={() => endDateRef.current.setFocus()} // 아이콘 클릭 시 달력 열기
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 4.16797H7.2002C6.08009 4.16797 5.51962 4.16797 5.0918 4.38596C4.71547 4.5777 4.40973 4.88344 4.21799 5.25977C4 5.68759 4 6.24806 4 7.36816V8.16797M8 4.16797H16M8 4.16797V2.16797M16 4.16797H16.8002C17.9203 4.16797 18.4796 4.16797 18.9074 4.38596C19.2837 4.5777 19.5905 4.88344 19.7822 5.25977C20 5.68717 20 6.24696 20 7.36488V8.16797M16 4.16797V2.16797M4 8.16797V16.9682C4 18.0883 4 18.648 4.21799 19.0759C4.40973 19.4522 4.71547 19.7584 5.0918 19.9502C5.5192 20.168 6.07899 20.168 7.19691 20.168H16.8031C17.921 20.168 18.48 20.168 18.9074 19.9502C19.2837 19.7584 19.5905 19.4522 19.7822 19.0759C20 18.6484 20 18.0895 20 16.9715V8.16797M4 8.16797H20M16 16.168H16.002L16.002 16.17L16 16.1699V16.168ZM12 16.168H12.002L12.002 16.17L12 16.1699V16.168ZM8 16.168H8.002L8.00195 16.17L8 16.1699V16.168ZM16.002 12.168V12.17L16 12.1699V12.168H16.002ZM12 12.168H12.002L12.002 12.17L12 12.1699V12.168ZM8 12.168H8.002L8.00195 12.17L8 12.1699V12.168Z" 
                                            stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </IconStyle>
                                </StyledDatePickerWrapper>
                            </DatePickerContainer>
                        </ContentOneWrapper>
                        <InfoLine/>
                        <ContentOneWrapper>
                            <ContentTitleText>활동명</ContentTitleText>
                                <StyledActivityInput
                                    type="text"
                                    value={activityName}
                                    onChange={(e) => setActivityName(e.target.value)}
                                    maxLength={25} // 최대 글자 수 지정
                                    placeholder="활동명"
                                />
                                <CharCount>
                                    <NumCount>{activityName.length}</NumCount> / 25
                                </CharCount>
                        </ContentOneWrapper>
                    </ContentContainer>
                    <InfoLine/>
                </DetailWrapper>
            </DetailContainer>

            {/* 프로필 정보 저장하기 버튼 */}
            <SubmitButton disabled={isButtonDisabled}>
                <ButtonText>프로필 정보 저장</ButtonText>
            </SubmitButton>
        </MypageDetailContainer>
    )
}