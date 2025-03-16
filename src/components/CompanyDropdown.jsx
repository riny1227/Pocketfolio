import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { fetchJobList } from "../api/HomeApi";

// input 태그와 드롭다운을 감싼 컨테이너
const InputDropdownContainer = styled.div`
    position: relative;
`;

// input 태그
const StyledInput = styled.input`
    width: 389px; /* 기본값 389px */
    height: ${({ $height }) => $height || '64px'};
    padding-left: ${({ $hasIcon }) => ($hasIcon ? '48px' : '16px')}; /* **********디자인 확정 후 다시 수정 예정********** */
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid #D5D5D5;
    outline: none;
    background-color: #fff;
    cursor: pointer;

    font-family: 'Pretendard-Regular';
    font-size: ${({ $fontSize }) => $fontSize || '18px'};
    line-height: 24px;
    color: #000;

    &::placeholder {
        color: #909090;
        font-size: ${({ $placeholderSize }) => $placeholderSize || '18px'};
    } 
`;

// input 태그의 내부 아이콘
const StyledInputIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    ${({ $backIcon }) => ($backIcon ? 'right: 16px;' : 'left: 16px;')}  /* **********디자인 확정 후 다시 수정 예정********** */
    transform: translateY(-50%);
`;

// 토글 아이콘
const ToggleIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
`;

// 드롭다운 전체를 감싸는 컨테이너
const DropdownWrapper = styled.div`
    display: ${({ $isVisible }) => ($isVisible ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    top: 72px;
    z-index: 1000;

    width: 100%;
    max-height: 256px; /* 최대 높이 256px (옵션 5개까지 표시 가능) */
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.08);
    background-color: #FFF;
    box-sizing: border-box;
    overflow-y: auto;
    scrollbar-gutter: stable;

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: #D5D5D5;
        border-radius: 8px;
    }
`;

// 드롭다운 옵션 한 칸
const DropdownSelector = styled.button`
    padding: 12px 24px;
    border: none;
    outline: none;
    background-color: #fff;
    cursor: pointer;

    display: flex;
    align-items: center;

    font-family: 'Pretendard-Regular';
    font-size: 16px;
    line-height: 24px;
    color: #222222;

    &:hover {
        background-color: #F8F8F8;
    }
`;

export default function CompanyDropdown({ placeholder, value, setValue, width, iconSvg, backIcon = false, hasToggle = true, placeholderSize, height, fontSize, setCompany }) {
    const [isVisible, setVisible] = useState(false);
    const [isReadOnly, setReadOnly] = useState(false);
    const [companyOptions, setCompanyOptions] = useState([]); // API에서 받아온 직군 리스트

    // 검색어 변경 시 API 요청 (디바운스 적용)
    useEffect(() => {
        if (!value || value.trim() === "") {
            setCompanyOptions([]);
            setVisible(false);
            setReadOnly(false);
            return;
        }
    
        const delayDebounceFn = setTimeout(async () => {
            try {
                const response = await fetchJobList(value);
                const companyNames = [...new Set(response.map(company => company.corpNm))]; // 회사명만 남기고 중복 제거
                setCompanyOptions(companyNames);

                if (!isReadOnly) {
                    setVisible(companyNames.length > 0);
                }
                
            } catch (error) {
                console.error("delayDebounceFn 에러 발생 : ", error);
            }
        }, 500);
    
        return () => clearTimeout(delayDebounceFn);
    }, [value]);
    

    // 직군 선택 시 input 값을 고정
    const handleOptionSelect = (option) => {
        setValue(option);
        setCompany(option);
        setReadOnly(true);
        setVisible(false);
    };

    return (
        <InputDropdownContainer>
            <StyledInput
                readOnly={isReadOnly}
                placeholder={placeholder}
                value={value}
                $width={width}
                $hasIcon={!!iconSvg}
                $placeholderSize={placeholderSize}
                $height={height}
                $fontSize={fontSize}
                onChange={(e) => setValue(e.target.value)} // 부모 state 업데이트
            />
            {iconSvg && <StyledInputIcon $backIcon={backIcon}>{iconSvg}</StyledInputIcon>}
            {hasToggle && (
                <ToggleIcon>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        {isVisible ? (
                            <path d="M6 15L12 9L18 15" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        ) : (
                            <path d="M18 9L12 15L6 9" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        )}
                    </svg>
                </ToggleIcon>
            )}
            <DropdownWrapper $isVisible={isVisible}>
                {companyOptions.length > 0 ? (
                    companyOptions.map((option, index) => (
                        <DropdownSelector key={index} onClick={() => handleOptionSelect(option)}>
                            {option}
                        </DropdownSelector>
                    ))
                ) : (
                    <DropdownSelector>검색 결과 없음</DropdownSelector>
                )}
            </DropdownWrapper>
    </InputDropdownContainer>
    )
}