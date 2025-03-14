import styled from "styled-components";
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import exampleImage from '../imgs/example.png';
import "react-datepicker/dist/react-datepicker.css"; // CSS 파일 import
import { registerLocale, setDefaultLocale } from "react-datepicker";
import ko from "date-fns/locale/ko"; // 한국어 로케일 import
import InputAndDropdown from "../components/share/InputAndDropdown";
import { create, uploadAttachments, uploadCover } from "../api/Portfolio/PortfolioUploadApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompanies } from "../api/Portfolio/PortfolioUploadApi";
import debounce from "lodash.debounce";

// 한국어 로케일 등록
registerLocale("ko", ko);
setDefaultLocale("ko"); // 기본 로케일을 한국어로 설정

// 포트폴리오 작성 컨테이너
const WritePortfolioContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 표지 이미지
const ThumbnailImage = styled.img`
    width: 100%;
    margin-top: 102px;
    height: 240px;
    object-fit: cover; // 이미지 비율 유지하면서 컨테이너 채우기
`;

// 표지 이미지 업로드 버튼
const ImageUploadButton = styled.button`
    display: flex;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: none;
    background: #DCEAFD;

    /* 버튼 텍스트 */
    color: #1570EF;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-semibold';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    position: absolute; /* 버튼을 이미지 위에 올리기 */

    top: 146px;
    right: 104px;

    cursor: pointer;
`;

// 포트폴리오 업로드 + 게시하기 버튼 컨테이너
const UploadContainer = styled.div`
    display: flex;
    width: 1330px;
    justify-content: space-between;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 40px;
`;

// 포트폴리오 업로드 텍스트
const UploadText = styled.div`
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Title/Title3 */
    font-family: 'Pretendard-bold';
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
    border-radius: 12px;
    // 내용 입력이 완료되면 색상 변경
    background: ${({ disabled }) => (disabled ? '#e6e6e6' : '#1075EF')};
    border: none;

    // 버튼 텍스트
    // 내용 입력이 완료되면 색상 변경
    color: ${({ disabled }) => (disabled ? '#909090' : '#FFF')};
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-semibold';
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
    margin-bottom: 40px;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    border-radius: 12px;
    border: none;
    background: #FDFDFD;
    background: #FFF;
`;

// 제목 컨테이너
const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
    height: 56px;
`;

// 제목, 기간, 역할 ... 텍스트
const ContentText = styled.div`
    color: #464646;
    font-feature-settings: 'liga' off, 'clig' off;

    /* Body/Body1:SemiBold */
    font-family: 'Pretendard-semibold';
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
    box-sizing: border-box;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding: 0px 20px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: 'Pretendard-regular';
    font-size: 16px;
    line-height: 24px;
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

// 기간 컨테이너
const PeriodContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    align-self: stretch;
    width: 100%;
    height: 56px;
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
    width: 221px;
    height: 56px;
    box-sizing: border-box;
    padding: 0px 20px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: 'Pretendard-regular';
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
    right: 20px;  /* 오른쪽 여백 */
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #b1b1b1;
    cursor: pointer;
`;

// ~ 텍스트 스타일
const TildeText = styled.span`
    color: #464646;

    /* Small/Semibold 20 */
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

// 역할 컨테이너
const RoleContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
    height: 56px;
`;

// 역할 입력
const RoleInput = styled.input`
    display: flex;
    height: 56px;
    box-sizing: border-box;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding: 0px 20px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: 'Pretendard-regular';
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

// 직군 선택 
const jobOptions = ["프론트엔드 개발자", "백엔드 개발자", "게임 클라이언트 개발자",
    "서버 개발자", "AI 개발자", "UX/UI 디자이너", "로고 디자이너", "영상 디자이너",
    "그래픽 디자이너", "3D 디자이너", "일러스트 디자이너"
];

// 직군 컨테이너
const JobContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
`;

const JobWrapper = styled.div`
    position: relative;
    
    input::placeholder {
        position: absolute;
    }
`;

// 검색 아이콘 스타일
const SearchIconStyle = styled.svg`
    position: absolute;
    right: 20px;
    width: 24px;
    height: 24px;
    fill: none;
    stroke: #b1b1b1;
    cursor: pointer;
`;

// 지원 기업 컨테이너
const CompanyContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
`;

// 기업명 검색 필드 + 아이콘 컨테이너
const CompanyInputContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 561px;
`;

// 기업명 검색 필드 스타일
const CompanyInput = styled.input`
    display: flex;
    height: 56px;
    box-sizing: border-box;
    width: 100%;
    align-items: center;
    gap: 54px;
    flex: 1 0 0;
    padding-left: 20px;
    padding-right: 44px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: 'Pretendard-regular';
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

// 이미지 첨부 컨테이너
const ImageFileContainer = styled.div`
    display: flex;
    align-items: center;
    align-self: stretch;
    width: 100%;
    height: 56px;
`;

// 이미지 파일 업로드 + 버튼 컨테이너
const UploadImageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 56px;
    box-sizing: border-box;
    padding: 16px 20px;
    align-items: center;
    gap: 12px;
    flex: 1 0 0;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    background: #FFF;
    position: relative;
`;

// "이미지 파일 업로드" 텍스트
const ImageFileUploadText = styled.span`
    color: #909090;
    width: 1020px;
    font-family: "Pretendard-regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 162.5% */
    letter-spacing: -0.096px;
`;

// 업로드된 파일 이름용 컴포넌트 (파일이 있을 때)
const UploadedFileName = styled.span`
    color: #222;
    width: 1020px;
    font-family: "Pretendard-regular";
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.096px;
`;

// 업로드 버튼 스타일
const UploadButton = styled.button`
    display: absolute;
    width: 36px;
    height: 36px;
    top: 10px;
    right: 10px;
    padding: 6px;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 4px;
    border: none;
    background: #E8F1FD;
    cursor: pointer;
`;

// URL 컨테이너
const URLContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    width: 100%;
    height: 56px;
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
    box-sizing: border-box;
    align-items: center;
    flex: 1 0 0;
    padding-left: 56px;
    border-radius: 8px;
    border: 1px solid #d5d5d5;
    font-family: "Pretendard-regular";
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

// 간단설명 컨테이너
const SimpleMemoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 24px;
    align-self: stretch;
`;

// 간단설명 입력 필드 컨테이너
const MemoInputContainer = styled.div`
    height: 248px;
    box-sizing: border-box;
    display: flex;
    padding: 16px 20px;
    align-items: flex-start;
    gap: 2px;
    flex: 1 0 0;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid  #d5d5d5;
    background: #FFF;
    position: relative; /* Placeholder 위치를 위한 설정 */
`;

// 간단 설명 입력
const MemoInput = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    color: #222;

    /* Xsmall/Regular 16 */
    font-family: "Pretendard-regular";
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
        color: #909090;
    }
`;

export default function WritePortfolio() {
    const { token } = useAuth();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null); 
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const [imagePreview, setImagePreview] = useState(exampleImage); // 기본값으로 예시 이미지
    const [fileName, setFileName] = useState(''); // 파일 이름 상태 추가
    const [title, setTitle] = useState(''); 
    const [role, setRole] = useState('');
    const [job, setJob] = useState(''); // 직군 상태 추가
    const [company, setCompany] = useState('');
    const [url, setUrl] = useState('');
    const [memo, setMemo] = useState('');
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    const { portfolioData } = location.state || {}; // PortfolioDetailModal에서 전달받은 데이터

    // API 호출 (디바운스 적용)
    const fetchCompanies = debounce(async (query) => {
        if (!query) {
            setCompanyList([]); // 입력값이 없을 경우 리스트 초기화
            return;
        }
        
        try {
            const results = await getCompanies(query, token);
            setCompanyList(results);
        } catch (error) {
            console.error("기업 검색 실패:", error);
        }
    }, 300); // 300ms 지연 후 실행

    useEffect(() => {
        if (token) {
            // console.log("Fetched token:", token);
            if (portfolioData) {
                setTitle(portfolioData.title);
                setRole(portfolioData.role);
                setJob(portfolioData.job);
                setCompany(portfolioData.company);
                setUrl(portfolioData.url);
                setMemo(portfolioData.description);
                setStartDate(new Date(portfolioData.durationStart));
                setEndDate(new Date(portfolioData.durationEnd));
                setImagePreview(portfolioData.coverImage || exampleImage);
                setFileName(portfolioData.attachments?.[0]?.name || '');
                fetchCompanies(company);
                console.log("현재 기업 리스트:", companyList);
            }
        }
    }, [token, portfolioData, company, fetchCompanies, companyList]);
    
    useEffect(() => {
        // 모든 필드가 채워졌는지 확인(URL, 간단설명 제외)
        if (title && startDate && endDate && role && job && company && fileName) {
            setIsFormComplete(true);
        } else {
            setIsFormComplete(false);
        }
        if (startDate && endDate && startDate > endDate) {
            alert("시작일은 종료일보다 이전이어야 합니다.");
        }
    }, [title, startDate, endDate, role, job, company, fileName]);

    // 표지 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // 이미지 미리보기 URL 설정
                setCoverImage(file);
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    };

    // 이미지 파일 업로드 핸들러
    const handleFileUpload = (e) => {
        let files = Array.from(e.target.files);
        if (files.length > 10) {
            alert("최대 10개까지만 첨부할 수 있습니다.");
            files = files.slice(0, 10);
        }
        setAttachments(files);
        if (files.length === 1) {
            setFileName(files[0].name);
        } else if (files.length > 1) {
            setFileName(`${files[0].name} 외 ${files.length - 1}개의 파일이 선택됨`);
        } else {
            setFileName('');
        }
    };

     // 브라우저의 기본 드래그 동작 막기
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 드래그 앤 드롭으로 이미지 첨부 
    const handleDrop = (e) => {
        e.preventDefault();
        let files = Array.from(e.dataTransfer.files);
        
        if (files.length > 10) {
            alert("최대 10개까지만 첨부할 수 있습니다.");
            files = files.slice(0, 10);
        }
        
        setAttachments(files);
        if (files.length === 1) {
            setFileName(files[0].name);
        } else if (files.length > 1) {
            setFileName(`${files[0].name} 외 ${files.length - 1}개의 파일이 선택됨`);
        } else {
            setFileName('');
        }
      };

    // 제출 핸들러
    const handleSubmit = async () => {
        try {
            // 커버 이미지 
            let coverResponse = null;
            if (coverImage) {
                coverResponse = await uploadCover(coverImage, token);
            }

            // 첨부파일 
            let attachmentsResponse = null;
            if (attachments.length > 0) {
                attachmentsResponse = await uploadAttachments(attachments, token);
            }

            // 포트폴리오 내용 
            const portfolioData = {
                title,
                durationStart: startDate,
                durationEnd: endDate,
                role,
                job,
                company,
                description: memo,
                url,
                coverImage: coverResponse ? coverResponse.data : null,
                attachments: attachmentsResponse ? attachmentsResponse.data : []
            };

            const response = await create(portfolioData, token);
            alert("포트폴리오가 성공적으로 업로드 되었습니다.");
            console.log(response);

            // 포트폴리오 업로드 후 홈으로 이동
            navigate('/');
        } catch (error) {
            console.error("포트폴리오 업로드 실패:", error);
            alert(error.message);
        }
    };
    
    return (
        // 포트폴리오 작성 컨테이너 
        <WritePortfolioContainer>
            
            {/* 이미지 미리보기 */}
            <ThumbnailImage src={imagePreview} alt="Thumbnail" />

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
                <PortfolioUploadButton disabled={!isFormComplete} onClick={handleSubmit}>게시하기</PortfolioUploadButton>
            </UploadContainer>

            {/* 내용 작성칸 컨테이너 */}
            <ContentContainer>

                {/* 제목 컨테이너 */}
                <TitleContainer>
                    <ContentText style={{  }}>제목</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '50px'}}>*</ContentText>

                    {/* 제목 입력 */}
                    <TitleInput placeholder="제목 입력" onChange={(e) => setTitle(e.target.value)} />
                </TitleContainer>

                {/* 기간 컨테이너 */}
                <PeriodContainer>
                    <ContentText style={{  }}>기간</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '50px'}}>*</ContentText>

                    {/* 시작일과 완료일을 위한 DatePicker */}
                    <DatePickerContainer>
                        <StyledDatePickerWrapper>
                            {/* 시작일 */}
                            <StyledDatePicker
                                ref={startDateRef}
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                placeholderText="시작일"
                                dateFormat="yyyy/MM/dd"
                                locale="ko"
                            />
                            <IconStyle
                                onClick={() => startDateRef.current.setFocus()} // 아이콘 클릭 시 달력 열기
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 4H7.2C6.08 4 5.52 4 5.09 4.22C4.72 4.41 4.41 4.72 4.22 5.09C4 5.52 4 6.08 4 7.2V8M8 4H16M8 4V2M16 4H16.8C17.92 4 18.48 4 18.91 4.22C19.28 4.41 19.59 4.72 19.78 5.09C20 5.52 20 6.08 20 7.2V8M16 4V2M4 8V16.8C4 17.92 4 18.48 4.22 18.91C4.41 19.28 4.72 19.59 5.09 19.78C5.52 20 6.08 20 7.2 20H16.8C17.92 20 18.48 20 18.91 19.78C19.28 19.59 19.59 19.28 19.78 18.91C20 18.48 20 17.92 20 16.8V8M4 8H20" 
                                    stroke="#989BA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </IconStyle>
                        </StyledDatePickerWrapper>

                        <TildeText>~</TildeText>

                        <StyledDatePickerWrapper>
                            {/* 완료일 */}
                            <StyledDatePicker
                                ref={endDateRef}
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                placeholderText="완료일"
                                dateFormat="yyyy/MM/dd"
                                locale="ko"
                            />
                            <IconStyle
                                onClick={() => endDateRef.current.setFocus()} // 아이콘 클릭 시 달력 열기
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 4H7.2C6.08 4 5.52 4 5.09 4.22C4.72 4.41 4.41 4.72 4.22 5.09C4 5.52 4 6.08 4 7.2V8M8 4H16M8 4V2M16 4H16.8C17.92 4 18.48 4 18.91 4.22C19.28 4.41 19.59 4.72 19.78 5.09C20 5.52 20 6.08 20 7.2V8M16 4V2M4 8V16.8C4 17.92 4 18.48 4.22 18.91C4.41 19.28 4.72 19.59 5.09 19.78C5.52 20 6.08 20 7.2 20H16.8C17.92 20 18.48 20 18.91 19.78C19.28 19.59 19.59 19.28 19.78 18.91C20 18.48 20 17.92 20 16.8V8M4 8H20" 
                                    stroke="#989BA2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </IconStyle>
                        </StyledDatePickerWrapper>
                    </DatePickerContainer>
                </PeriodContainer>

                {/* 역할 컨테이너 */}
                <RoleContainer>
                    <ContentText style={{  }}>역할</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '50px'}}>*</ContentText>

                    {/* 역할 입력 */}
                    <RoleInput placeholder="역할 입력" onChange={(e) => setRole(e.target.value)} />
                </RoleContainer>

                {/* 직군 컨테이너 */}
                <JobContainer>
                    <ContentText style={{  }}>직군</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '50px'}}>*</ContentText>
                    <JobWrapper>
                        <InputAndDropdown
                            readOnly={false}
                            placeholder="직군명 검색"
                            value={job}
                            setValue={setJob}
                            width="561px"
                            data={jobOptions}
                            iconSvg={null}
                            hasToggle={false} // 토글 버튼 활성화
                            placeholderSize="16px"  // placeholder 크기를 16px로 설정
                            fontSize="16px"
                            height="56px"  // height 값을 56px로 설정
                        />
                        <IconStyle style={{top: "16px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </IconStyle>
                    </JobWrapper>
                </JobContainer>               

                {/* 지원 기업 컨테이너 */}
                <CompanyContainer>
                    <ContentText style={{  }}>지원 기업</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '15px'}}>*</ContentText>       
                    <CompanyInputContainer>
                        <CompanyInput placeholder="기업명 검색" onChange={(e) => setCompany(e.target.value)} />
                        <SearchIconStyle>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </SearchIconStyle>
                    </CompanyInputContainer>
                </CompanyContainer>

                {/* 지원 기업 컨테이너 */}
                {/* <JobContainer>
                    <ContentText style={{  }}>지원 기업</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '15px'}}>*</ContentText>
                    <JobWrapper>
                        <InputAndDropdown
                            readOnly={false}
                            placeholder="기업명 검색"
                            value={company}
                            setValue={(value) => {
                                setCompany(value);
                                fetchCompanies(value);
                            }}
                            width="561px"
                            data={companyList}
                            iconSvg={null}
                            hasToggle={false} // 토글 버튼 활성화
                            placeholderSize="16px"  // placeholder 크기를 16px로 설정
                            fontSize="16px"
                            height="56px"  // height 값을 56px로 설정
                        />
                        <IconStyle style={{top: "16px"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </IconStyle>
                    </JobWrapper>
                </JobContainer>                */}

                {/* 이미지 파일 첨부 컨테이너 */}
                <ImageFileContainer>
                    <ContentText style={{  }}>이미지</ContentText>
                    <ContentText style={{ color: '#1570EF', marginRight: '34px'}}>*</ContentText>
                    <UploadImageContainer onDragOver={handleDragOver} onDrop={handleDrop}>
                        {fileName ? (
                            <UploadedFileName>{fileName}</UploadedFileName>
                        ) : (
                            <ImageFileUploadText>이미지 파일 업로드 (이미지 파일들을 드래그 하거나 업로드 버튼을 클릭하세요)</ImageFileUploadText>
                        )}
                        <UploadButton>
                            <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M17 9L12 4M12 4L7 9M12 4L12 17" stroke="#1570EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M6 20H18" stroke="#1570EF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                accept="*/*"
                                multiple
                                onChange={(e) => {
                                    handleFileUpload(e); }}
                                style={{ display: 'none' }} // 파일 선택 버튼 숨기기
                            />
                        </UploadButton>
                    </UploadImageContainer>
                </ImageFileContainer>

                {/* URL 컨테이너 */}
                <URLContainer>
                    <ContentText style={{ marginRight: '2.8ch' }}>URL</ContentText>
                    <URLIconWrapper>
                        <URLIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M9.99996 13C10.4294 13.5741 10.9773 14.0491 11.6065 14.3929C12.2357 14.7367 12.9315 14.9411 13.6466 14.9923C14.3617 15.0435 15.0795 14.9403 15.7513 14.6897C16.4231 14.4392 17.0331 14.047 17.54 13.54L20.54 10.54C21.4507 9.59695 21.9547 8.33394 21.9433 7.02296C21.9319 5.71198 21.4061 4.45791 20.479 3.53087C19.552 2.60383 18.2979 2.07799 16.987 2.0666C15.676 2.0552 14.413 2.55918 13.47 3.46997L11.75 5.17997M14 11C13.5705 10.4258 13.0226 9.95078 12.3934 9.60703C11.7642 9.26327 11.0684 9.05885 10.3533 9.00763C9.63816 8.95641 8.92037 9.0596 8.24861 9.31018C7.57685 9.56077 6.96684 9.9529 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.542 3.52086 20.4691C4.4479 21.3961 5.70197 21.9219 7.01295 21.9333C8.32393 21.9447 9.58694 21.4408 10.53 20.53L12.24 18.82" stroke="#989BA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </URLIcon>
                        <URLInput placeholder="URL을 입력하세요" onChange={(e) => setUrl(e.target.value)} />
                    </URLIconWrapper>
                </URLContainer>

                {/* 간단 설명 컨테이너 */}
                <SimpleMemoContainer>
                    <ContentText>간단 설명</ContentText>
                    <MemoInputContainer>
                        <MemoInput placeholder="설명을 입력하세요" onChange={(e) => setMemo(e.target.value)} />
                    </MemoInputContainer>
                </SimpleMemoContainer>
            </ContentContainer>

        </WritePortfolioContainer>
    );
}