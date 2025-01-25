import styled from "styled-components";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import exampleImage from '../imgs/example.png';
import "react-datepicker/dist/react-datepicker.css"; // CSS 파일 import
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko"; // 한국어 로케일 import

// 한국어 로케일 등록
registerLocale("ko", ko);
setDefaultLocale("ko"); // 기본 로케일을 한국어로 설정

// 포트폴리오 작성 컨테이너
const WritePortfolioContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 102px;
    margin-bottom: 100px;
`;

// 표지 이미지
const ThumbnailImage = styled.img`
    width: 100%;
    height: 240px;
    object-fit: cover; // 이미지 비율 유지하면서 컨테이너 채우기
`;

// 표지 이미지 업로드 버튼
const ImageUploadButton = styled.button`
    display: inline-flex;
    padding: 12px 16px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid var(--, #9E9E9E);
    background: #636363;

    color: var(--Gray-Gray0, #FFF);
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body2:SemiBold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 150% */

    position: absolute; /* 버튼을 이미지 위에 올리기 */

    /* 버튼 상하좌우 여백 설정 */
    margin-top: 44px;
    margin-left: 1203px;
    margin-right: 80px;
    margin-bottom: 148px;

    cursor: pointer;
`;

// 포트폴리오 업로드 + 게시하기 버튼 컨테이너
const UploadContainer = styled.div`
    display: flex;
    width: 1280px;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

// 포트폴리오 업로드 텍스트
const UploadText = styled.div`
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Title/Title3 */
    font-family: Pretendard;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px; /* 150% */
`;

// 게시하기 버튼
const PortfolioUploadButton = styled.button`
    display: flex;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    background: var(--, #E0E0E0);
    border: none;

    color: #888893;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body1:SemiBold */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */

    cursor: pointer;
`;

// 내용 작성칸 컨테이너
const ContentContainer = styled.div`
    display: flex;
    width: 1280px;
    padding: 24px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    border-radius: 12px;
    border: 1px solid var(--Neutral-grayscale-80, #E7E7E7);
    background: var(--Neutral-Static-Static-100, #FFF);
`;

// 제목 컨테이너
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 64px;
    align-self: stretch;
    width: 100%;
`;

// 제목, 기간, 역할 ... 텍스트
const ContentText = styled.div`
    color: var(--Neutral-grayscale-30, #4C4F56);
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body1:SemiBold */
    font-family: Pretendard;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    display: inline-flex;
    align-items: center;
`;

// 제목 입력
const TitleInput = styled.input`
    display: flex;
    height: 56px;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding-left: 16px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 기간 컨테이너
const PeriodContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 64px;
    align-self: stretch;
    width: 100%;
`;

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
    width: 211px;
    height: 56px;
    padding-left: 16px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 아이콘 스타일
const IconStyle = styled.svg`
    position: absolute;
    right: 20px;  /* 오른쪽 여백 */
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #989BA2;
    cursor: pointer;
`;

// ~ 텍스트 스타일
const TildeText = styled.span`
    color: var(--Neutral-grayscale-45, #989BA2);

    /* Small/Semibold 20 */
    font-family: "Pretendard Variable";
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 28px; /* 140% */
    letter-spacing: -0.4px;
    padding: 14px 12px;
    display: flex;
    align-items: center;
`;

// 역할 컨테이너
const RoleContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 64px;
    align-self: stretch;
    width: 100%;
`;

// 역할 입력
const RoleInput = styled.input`
    display: flex;
    height: 56px;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding-left: 16px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 직군 컨테이너
const JobContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 64px;
    align-self: stretch;
    width: 100%;
`;

// 직군명 검색 필드 + 아이콘 컨테이너
const JobInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 480px;
`;

// 직군 입력 필드 스타일
const JobInput = styled.input`
    display: flex;
    height: 56px;
    width: 100%;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding-left: 16px;
    padding-right: 44px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 검색 아이콘 스타일
const SearchIconStyle = styled.svg`
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #989BA2;
    cursor: pointer;
`;

// 지원 기업 컨테이너
const CompanyContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 22px;
    align-self: stretch;
    width: 100%;
`;

// 기업명 검색 필드 + 아이콘 컨테이너
const CompanyInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 480px;
`;

// 기업명 검색 필드 스타일
const CompanyInput = styled.input`
    display: flex;
    height: 56px;
    width: 100%;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding-left: 16px;
    padding-right: 44px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 첨부 파일 컨테이너
const FileContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 22px;
    align-self: stretch;
    width: 100%;
`;

// 첨부 파일 업로드 + 버튼 컨테이너
const UploadFileContainer = styled.div`
    display: flex;
    width: 100%;
    height: 32px;
    padding: 14px 20px;
    align-items: center;
    gap: 12px;
    flex: 1 0 0;
    border-radius: 8px;
    border: 1px solid #E7E7E7;
    background: #FFF;
`;

// "첨부파일 업로드" 텍스트
const FileUploadText = styled.span`
    color: #989BA2;
    width: 1020px;
    font-family: "Pretendard Variable";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
    letter-spacing: -0.096px;
`;

// 업로드 버튼 스타일
const UploadButton = styled.button`
    display: flex;
    height: 32px;
    margin-right: 0px;
    padding: 12px 16px;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    background: #E0E0E0;
    border: none;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 600;
    color: #888893;
    cursor: pointer;
`;

// URL 컨테이너
const URLContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 66px;
    align-self: stretch;
    width: 100%;
`;

// 아이콘 + URL
const URLIconWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    gap: 12px;
`;

// URL 아이콘 스타일
const URLIcon = styled.svg`
    position: absolute;
    width: 24px;
    height: 24px;
    margin-left: 20px;
    margin-right: 12px;
`;

// URL 입력
const URLInput = styled.input`
    display: flex;
    width: 100%;
    height: 56px;
    align-items: center;
    flex: 1 0 0;
    padding-left: 56px;
    border-radius: 4px;
    border: 1px solid #E7E7E7;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    color: #989BA2;

    &:focus {
        color: #000;
    }

    /* 포커스를 벗어난 후에도 텍스트 색상을 검은색으로 유지 */
    &:not(:focus):valid {
        color: #000;
    }
`;

// 간단설명 컨테이너
const SimpleMemoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 22px;
    align-self: stretch;
`;

// 간단설명 입력 필드 컨테이너너
const MemoInputContainer = styled.div`
    height: 130px;
    display: flex;
    padding: 12px 16px;
    align-items: flex-start;
    gap: 2px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: var(--Radius-Small-8, 8px);
    border: 1px solid var(--Neutral-grayscale-80, #E7E7E7);
    background: var(--Neutral-Static-Static-100, #FFF);
    position: relative; /* Placeholder 위치를 위한 설정 */
`;

const MemoInput = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: var(--Neutral-grayscale-30, #4C4F56);

    /* Xsmall/Regular 16 */
    font-family: "Pretendard Variable", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
    letter-spacing: -0.096px;

    /* Placeholder를 왼쪽 상단으로 위치시키는 설정 */
    &::placeholder {
        position: absolute;
        top: 12px;
        transform: translateY(-50%);
        color: var(--Neutral-grayscale-30, #4C4F56);
    }
`;

export default function WritePortfolio() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null); 
    const [imagePreview, setImagePreview] = useState(exampleImage); // 기본값으로 예시 이미지
    const [fileName, setFileName] = useState(''); // 파일 이름 상태 추가

    // 파일 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // 이미지 미리보기 URL 설정
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

    // 파일 이름 핸들러
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // 파일 이름 설정
        }
    };
    
    return (
        // 포트폴리오 작성 컨테이너 
        <WritePortfolioContainer>
            
            {/* 이미지 미리보기 */}
            <ThumbnailImage 
            src={imagePreview} 
            alt="Thumbnail" />

            {/* 표지 이미지 업로드 버튼 */}
            <ImageUploadButton>
                <label htmlFor="file-input" style={{cursor: 'pointer'}}>표지 이미지 업로드</label>
                <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }} // 파일 선택 버튼 숨기기
                />
            </ImageUploadButton>


            {/* 포트폴리오 업로드 + 게시하기 버튼 컨테이너 */}
            <UploadContainer>
                <UploadText>포트폴리오 업로드</UploadText>
                <PortfolioUploadButton>게시하기</PortfolioUploadButton>
            </UploadContainer>

            {/* 내용 작성칸 컨테이너 */}
            <ContentContainer>

                {/* 제목 컨테이너 */}
                <TitleContainer>
                    <ContentText>제목</ContentText>

                    {/* 제목 입력 */}
                    <TitleInput placeholder="제목 입력" />
                </TitleContainer>

                {/* 기간 컨테이너 */}
                <PeriodContainer>
                    <ContentText>기간</ContentText>

                    {/* 시작일과 완료일을 위한 DatePicker */}
                    <DatePickerContainer>
                        <StyledDatePickerWrapper>
                            {/* 시작일 */}
                            <StyledDatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="시작일"
                                dateFormat="yyyy/MM/dd"
                                locale="ko"
                            />
                            <IconStyle xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </IconStyle>
                        </StyledDatePickerWrapper>

                        <TildeText>~</TildeText>

                        <StyledDatePickerWrapper>
                            {/* 완료일 */}
                            <StyledDatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="완료일"
                                dateFormat="yyyy/MM/dd"
                                locale="ko"
                            />
                            <IconStyle xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M8 4H7.2002C6.08009 4 5.51962 4 5.0918 4.21799C4.71547 4.40973 4.40973 4.71547 4.21799 5.0918C4 5.51962 4 6.08009 4 7.2002V8M8 4H16M8 4V2M16 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V8M16 4V2M4 8V16.8002C4 17.9203 4 18.4801 4.21799 18.9079C4.40973 19.2842 4.71547 19.5905 5.0918 19.7822C5.5192 20 6.07899 20 7.19691 20H16.8031C17.921 20 18.48 20 18.9074 19.7822C19.2837 19.5905 19.5905 19.2842 19.7822 18.9079C20 18.4805 20 17.9215 20 16.8036V8M4 8H20M16 16H16.002L16.002 16.002L16 16.002V16ZM12 16H12.002L12.002 16.002L12 16.002V16ZM8 16H8.002L8.00195 16.002L8 16.002V16ZM16.002 12V12.002L16 12.002V12H16.002ZM12 12H12.002L12.002 12.002L12 12.002V12ZM8 12H8.002L8.00195 12.002L8 12.002V12Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </IconStyle>
                        </StyledDatePickerWrapper>
                    </DatePickerContainer>
                </PeriodContainer>

                {/* 역할 컨테이너 */}
                <RoleContainer>
                    <ContentText>역할</ContentText>

                    {/* 역할 입력 */}
                    <RoleInput placeholder="역할 입력" />
                </RoleContainer>

                {/* 직군 컨테이너 */}
                <JobContainer>
                    <ContentText>직군</ContentText>
                    <JobInputContainer>
                        <JobInput placeholder="직군명 검색"/>
                        <SearchIconStyle>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SearchIconStyle>
                    </JobInputContainer>               
                </JobContainer>

                {/* 지원 기업 컨테이너 */}
                <CompanyContainer>
                    <ContentText>지원 기업</ContentText>
                    <CompanyInputContainer>
                        <CompanyInput placeholder="기업명 검색" />
                        <SearchIconStyle>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SearchIconStyle>
                    </CompanyInputContainer>
                </CompanyContainer>

                {/* 첨부파일 컨테이너 */}
                <FileContainer>
                    <ContentText>첨부 파일</ContentText>
                    <UploadFileContainer>
                        <FileUploadText>{fileName || '첨부파일 업로드'}</FileUploadText> {/* 업로드한 파일 이름 표시 */}
                        <UploadButton>
                            <label htmlFor="file-upload" style={{cursor: 'pointer'}}>파일 첨부</label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="*/*"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }} // 파일 선택 버튼 숨기기
                            />
                        </UploadButton>
                    </UploadFileContainer>
                </FileContainer>

                {/* URL 컨테이너 */}
                <URLContainer>
                    <ContentText>URL</ContentText>
                    <URLIconWrapper>
                        <URLIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9.99996 13C10.4294 13.5741 10.9773 14.0491 11.6065 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3617 15.0435 15.0795 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4507 9.59695 21.9547 8.33394 21.9433 7.02296C21.9319 5.71198 21.4061 4.45791 20.479 3.53087C19.552 2.60383 18.2979 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0684 9.05885 10.3533 9.00763C9.63816 8.95641 8.92037 9.0596 8.24861 9.31018C7.57685 9.56077 6.96684 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.4479 21.3961 5.70197 21.9219 7.01295 21.9333C8.32393 21.9447 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </URLIcon>
                        <URLInput placeholder="URL을 입력하세요"/>
                    </URLIconWrapper>
                </URLContainer>

                {/* 간단 설명 컨테이너 */}
                <SimpleMemoContainer>
                    <ContentText>간단 설명</ContentText>
                    <MemoInputContainer>
                        <MemoInput placeholder="설명을 입력하세요" />
                    </MemoInputContainer>
                </SimpleMemoContainer>
            </ContentContainer>

        </WritePortfolioContainer>
    );
}
