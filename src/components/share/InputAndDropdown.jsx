import React, { useState, useEffect } from "react";
import styled from "styled-components";

// input 태그와 드롭다운을 감싼 컨테이너
const InputDropdownContainer = styled.div`
    position: relative;
`;

// input 태그
const StyledInput = styled.input`
    width: ${({ $width }) => $width || '100px'}; /* 기본값 389px */
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
    display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
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

/*
    readOnly - input 태그를 읽기 전용으로 만들어주는 속성 / 텍스트 입력 불가능하면 true, 입력 가능하면 false 값 할당하기
    placeholder - input 태그의 placeholder 값 / ex. "선택"
    value, setValue - 현재 선택된 옵션값(ex. 1주일, 1개월 등등)을 저장할 state를 만들어서 연결해주시면 됩니다!
    width - input의 width값 / ex. "300px" (height 값은 모두 동일해서 추가 안함)
    data - 드롭다운에 들어갈 데이터값 리스트 (map 함수와 함께 사용되기 때문에 반드시 배열 형식이어야 함)
    iconSvg - 아이콘 <svg> 태그를 값으로 넣기 (줄바꿈 없이 한줄로 이어지게 해야 화면에 나옵니다!)
    backIcon - 디자인 중에 아이콘이 오른쪽에 배치된게 있던데 그거 만들 때 true 값 주세요 그외에는 X
    hasToggle - 디자인 중에 토글 버튼이 없는게 있던데 그거 만들 때 false 값 주세요 그외에는 X
*/

export default function InputAndDropdown ({ readOnly, placeholder, value, setValue, width, data, iconSvg, backIcon = false, hasToggle = true, placeholderSize, height, fontSize }){
    // 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [isVisible, setVisible] = useState(false);

    // input 태그가 입력 불가능 해야하면 true, 입력 가능 해야하면 false
    const [isReadOnly, setReadOnly] = useState(readOnly);

    // value가 ""가 되면 isReadOnly를 다시 readOnly 값(초기값)으로 설정
    useEffect(() => {
        if (value === "") {
            setReadOnly(readOnly);
        }
    }, [value]);

    // input 클릭하면 드롭다운 보여주거나 닫는 함수
    const clickInput = () => {
        // if (!readOnly && value === "") return; // readOnly가 false이면서, value가 비어있으면 드롭다운 열리지 않음
        setVisible((prevState) => !prevState);
    }

    // 드롭다운 옵션 선택
    const handleInputChange = (option) => {
        if (setValue) { // 선택한 옵션으로 value props 값(value에 연결한 부모 컴포넌트의 state) 갱신
            setValue(option);
        }
        if (!isReadOnly) { // 입력 가능한 input 태그면 옵션 선택 후 입력 불가능하도록 변경
            setReadOnly(true);
        }
        setVisible(false); // 옵션 선택 후 드롭다운 닫기
    };

    // 입력 가능한 input 태그일 때 값을 입력할 수 있게 해주는 함수
    const handleInputReadOnlyFalse = (e) => {
        if (!readOnly) {
            setValue(e.target.value);
        }
    };

    return (
            <InputDropdownContainer>
                <StyledInput 
                    readOnly={isReadOnly}
                    placeholder={placeholder}
                    value={value}
                    $isClicked={isVisible}
                    $width={width}
                    $hasIcon={!!iconSvg}
                    $placeholderSize={placeholderSize}  // placeholder 크기 설정
                    $height={height}  // height 값 설정
                    $fontSize={fontSize}  // 입력 텍스트 폰트 크기
                    onClick={clickInput}
                    onChange={handleInputReadOnlyFalse}
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
            <DropdownWrapper $isClicked={isVisible}>
                {data?.map((option) => (
                    <DropdownSelector 
                        key={option}
                        onClick={() => handleInputChange(option)} // 드롭다운의 옵션을 클릭했을 때
                    >
                        {option}
                    </DropdownSelector>
                    ))}
            </DropdownWrapper>
        </InputDropdownContainer>
    );
};