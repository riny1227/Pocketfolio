import React, { useState, useEffect } from "react";
import styled from "styled-components";

// 직군 선택 목록
const jobHierarchy = {
    개발자: ["프론트엔드", "백엔드", "게임"],
    디자이너: ["UX/UI", "로고"],
};

// 정렬 목록
const sortHierarchy = ['인기순', '최신순', '좋아요순', '조회순'];

// 날짜 목록
const dateHierarchy = ['1주일', '1개월', '6개월', '1년', '3년'];

// Filter 컴포넌트 컨테이너
const FilterContainer = styled.div`
    width: 1280px;
    height: 108px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 36px 24px 24px 24px;
    box-sizing: border-box;
`;

// 필터 버튼 + 정렬 버튼 컨테이너
const RightButtonContainer = styled.div`
    display: flex;
    gap: 16px;
`;

// 토글 버튼 + 드롭다운 감싸는 컨테이너
const ToggleDropdownWrapper = styled.div`
    display: inline-block;
    position: relative;
`;

// 토글 버튼 (직군 선택, 정렬 등)
const ToggleButton = styled.button`
    padding: ${({ $isClicked }) => ($isClicked ? '11px 31px' : '12px 32px' )}; /* 상태에 따라 표시 or 숨김 */
    border-radius: 50px;
    border: ${({ $isClicked }) => ($isClicked ? '1px solid #6C6C6C' : 'none')}; /* 상태에 따라 표시 or 숨김 */
    cursor: pointer;
    background-color: #EFEFEF;
    outline: none;
    position: relative;

    display: flex;
    gap: 8px;
    align-items: center;

    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    line-height: 24px;
    color: #222222;
`;

// 필터 버튼
const FilterButton = styled.button`
    padding: 12px 32px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background-color: #EFEFEF;
    outline: none;

    display: flex;
    gap: 8px;
    align-items: center;

    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    line-height: 24px;
    color: #222222;
`;

// 상세 필터 적용했을 때 필터 아이콘 자리에 나타나는 하얀 원모양 아이콘
const FilterCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #FFFFFF;
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    line-height: 22px;
    color: #222222;
`;

// 상세 필터 목록 컨테이너 (필터 버튼 클릭하면 보이고 다시 클릭하면 사라짐)
const DetailFilterContainer = styled.div`
    display: ${({ $visible }) => ($visible ? 'flex' : 'none')}; /* 상태에 따라 표시 or 숨김 */
    width: 1280px;
    height: 126px;
    align-items: center;
    padding: 8px 24px 24px 24px;
    box-sizing: border-box;
    gap: 32px;
`;

// 각 상세 필터의 이름 + 검색바(또는 드롭다운) 감싼 컨테이너
const FilterOptionWrapper = styled.label`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

// 상세 필터 이름
const FilterOptionName = styled.span`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    line-height: 22px;
    color: #222222;
`;

// 상세 필터 검색바 (태그, 기업, 날짜 등)
const FilterOptionInputBar = styled.input`
    width: 389px;
    padding: 19px 23px 19px 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    border: 1px solid ${({ $isClicked }) => ($isClicked ? '#6C6C6C' : 'transparent')}; /* 상태에 따라 표시 or 숨김 */
    outline: none;
    background-color: #ECECEC;

    font-family: 'Pretendard-Regular';
    font-size: 18px;
    line-height: 24px;
    color: #222222;

    &::placeholder {
    color: #222222;
    } 
`;

// 상세 필터 검색바 내부 아이콘
const FilterOptionIcon = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
`;

// 상세 필터 검색바 토글 아이콘
const FilterOptionToggleIcon = styled.div`
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

// 날짜 드롭다운
const DateDropdown = styled.div`
    display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    top: 72px;
    z-index: 1000;

    width: 100%;
    height: 256px;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    box-sizing: border-box;
`;

// 날짜 드롭다운 옵션 (1주일, 1개월 등등)
const DateSelector = styled.button`
    padding: 12px 24px;
    border: none;
    outline: none;
    background-color: #fff;
    cursor: pointer;

    display: flex;
    // justify-content: center;
    align-items: center;

    font-family: 'Pretendard-Regular';
    font-size: 16px;
    line-height: 24px;
    color: #222222;

    &:hover {
        background-color: #eee;
    }
`;

/* ------------직무선택 드롭다운 style------------ */
// 직무선택 드롭다운 전체
const JobDropdown = styled.div`
    display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    top: 56px;
    z-index: 1000;

    width: 196px;
    height: 234px;
    border-radius: 8px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    padding: 16px;
    box-sizing: border-box;
`;

const JobLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;

    user-select: none; /* 라벨 속 텍스트 선택 방지 */

    font-family: 'Pretendard-Regular';
    font-size: 14px;
    line-height: 22px;
    color: #000;
    font-feature-settings: 'liga' off, 'clig' off;
`;

const JobCheckbox = styled.input.attrs({ type: "checkbox" })`
    margin: 0;
    
    appearance: none; /* 기본 체크박스 스타일 제거 */
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid #6C6C6C;
    box-sizing: border-box;

    &:hover {
    border-color: #1570ef;
    }

    &:checked {
    border: none;
    background-color: #1570ef;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 10px;
        height: 10px;
        transform: translate(-50%, -50%);
        background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5L4 9L9 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat center;
        background-size: contain;
        }
    }
`;

const JobParentCheckbox = styled(JobCheckbox)`
    &.indeterminate {
        border: none;
        background-color: #1570ef;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 10px;
            height: 10px;
            transform: translate(-50%, -50%);
            background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none"><path d="M1 1H9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>') no-repeat center;
            background-size: contain;
        }
    }
`;

/* ------------정렬 드롭다운 style------------ */
// 직무선택 드롭다운 전체
const SortDropdown = styled.div`
    display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
    flex-direction: column;
    justify-content: space-between;

    position: absolute;
    top: 56px;
    z-index: 1000;

    width: 138px;
    height: 144px;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    box-sizing: border-box;
`;

const SortSelector = styled.button`
    padding: 5px 10px;
    border: none;
    outline: none;
    background-color: #fff;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'Pretendard-Regular';
    font-size: 14px;
    line-height: 22px;
    color: #222222;

    &:hover {
        background-color: #eee;
    }
`;

export default function Filter() {
    // 직군선택 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [isJopVisible, setJopVisible] = useState(false);

    // 선택된 직군들 저장
    const [selectedJobs, setSelectedJobs] = useState([]);

    // 부모 input(개발자, 디자이너) 상태 저장 - checked, indeterminate, unchecked
    const [parentState, setParentState] = useState([]);

    // 정렬 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [isSortVisible, setSortVisible] = useState(false);

    // 선택된 정렬 방식 저장
    const [selectedSort, setSelectedSort] = useState(sortHierarchy[0]);

    // 상세 필터 목록 표시 -> true일 때 보임, false일 때 안보임
    const [isFilterVisible, setFilterVisible] = useState(false);

    // 각 상세 필터 값 저장
    const [filters, setFilters] = useState({
        tag: "",
        company: "",
        date: "",
    });

    // 기업 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [isCompanyVisible, setCompanyVisible] = useState(false);

    // 날짜 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [isDateVisible, setDateVisible] = useState(false);

    // 필터 버튼 클릭하면 상세 필터 목록 나타나거나 사라지도록 하는 함수
    const clickFilterButton = () => {
        setFilterVisible((prevState) => !prevState);
    };

    // 직무선택 버튼 클릭하면 버튼 디자인 변경하고 정렬 드롭다운 보여주는 함수
    const clickJobButton = () => {
        setJopVisible((prevState) => !prevState);
    }

    // 직군 선택 시 checkbox 선택 상태 실시간 업데이트
    useEffect(() => {
        const newParentState = {};
        
        Object.keys(jobHierarchy).forEach((parent) => {
            const children = jobHierarchy[parent]; // 부모에 해당하는 자식 배열 가져오기
            const selectedChildren = children.filter((child) => selectedJobs[child]); // 체크된 자식 필터링
        
            if (selectedChildren.length === children.length) {
                newParentState[parent] = "checked"; // 모든 자식이 체크되었으면 부모도 체크됨
            } else if (selectedChildren.length > 0) {
                newParentState[parent] = "indeterminate"; // 일부 자식만 체크되었으면 '-' 상태 (부분 체크)
            } else {
                newParentState[parent] = "unchecked"; // 모든 자식이 체크 해제되었으면 부모도 체크 해제
            }
            });
            
        setParentState(newParentState);
    }, [selectedJobs]); 

    // 직군 선택 시 부모 checkbox 선택 관리하는 함수
    const handleParentChange = (parent) => {
        const newState = parentState[parent] === "checked" ? false : true; // 부모 checkbox가 checked면 체크 해제, indeterminate 또는 unchecked면 체크
        const updatedChildren = {};

        jobHierarchy[parent].forEach((child) => { // 부모 checkbox 상태 변경에 따라 자식 checkbox도 변경
            updatedChildren[child] = newState;
        });
        setSelectedJobs((prev) => ({ ...prev, ...updatedChildren })); // 선택된 직군들 목록에 반영
    };

    // 직군 선택 시 자식 checkbox 선택 관리하는 함수
    const handleChildChange = (child, parent) => {
        setSelectedJobs((prev) => ({
            ...prev,
            [child]: !prev[child],
        }));
    };

    // 직군 선택 시 버튼 텍스트 관리하는 함수
    const getButtonLabel = () => {
        const selected = Object.keys(selectedJobs).filter((key) => selectedJobs[key]);
        if (selected.length === 0) return "직군 선택";
        if (selected.length === 1) return selected[0];
        return `${selected[0]} 외 ${selected.length - 1}`;
    };

    // 정렬 버튼 클릭하면 버튼 디자인 변경하고 정렬 드롭다운 보여주는 함수
    const clickSortButton = () => {
        setSortVisible((prevState) => !prevState);
    }

    // 정렬 드롭다운에서 새 정렬 방식 선택 관리하는 함수
    const handleSortSelect = (sortOption) => {
        setSelectedSort(sortOption);
        setSortVisible(false); // 선택 후 드롭다운 닫기
    };

    // 상세 필터 state 값을 관리하는 함수
    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    // 적용된 필터 개수 계산 (빈 값은 카운트X)
    const filterCount = Object.values(filters).filter((value) => value !== "").length;

    // 날짜 input 클릭하면 드롭다운 보여주는 함수
    const clickDateInput = () => {
        setDateVisible((prevState) => !prevState);
    }

    // 날짜 옵션 선택 시 처리하는 함수
    const handleDateSelect = (dateOption) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            date: dateOption,
        }));
        setDateVisible(false); // 옵션 선택 후 드롭다운 닫기
    };

    return (
        <>
            <FilterContainer>
                {/* 직군선택 */}
                <ToggleDropdownWrapper>
                    {/* 직군선택 토글 버튼 */}
                    <ToggleButton $isClicked={isJopVisible} onClick={clickJobButton}>{getButtonLabel()}
                        {isJopVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 15L12 9L18 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        )}
                    </ToggleButton>
                    <JobDropdown $isClicked={isJopVisible}>
                    {Object.keys(jobHierarchy).map((parent) => (
                        <div key={parent} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '8px' }}>
                            <JobLabel>
                                <JobParentCheckbox
                                    className={parentState[parent] === "indeterminate" ? "indeterminate" : ""}
                                    checked={parentState[parent] === "checked"}
                                    onChange={() => handleParentChange(parent)}
                                />
                                {parent}
                            </JobLabel>
                            {jobHierarchy[parent].map((child) => (
                            <JobLabel key={child} style={{ marginLeft: "24px" }}>
                                <JobCheckbox checked={!!selectedJobs[child]} onChange={() => handleChildChange(child, parent)} />
                                {child}
                            </JobLabel>
                            ))}
                        </div>
                    ))}
                    </JobDropdown>
                </ToggleDropdownWrapper>
                <RightButtonContainer>
                    {/* 필터 버튼 */}
                    <FilterButton onClick={clickFilterButton}>
                        {filterCount > 0 ? (
                            <FilterCount>{filterCount}</FilterCount>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M21.25 12H8.895M4.534 12H2.75M4.534 12C4.534 11.4218 4.76368 10.8673 5.17251 10.4585C5.58134 10.0497 6.13583 9.82001 6.714 9.82001C7.29217 9.82001 7.84666 10.0497 8.25549 10.4585C8.66432 10.8673 8.894 11.4218 8.894 12C8.894 12.5782 8.66432 13.1327 8.25549 13.5415C7.84666 13.9503 7.29217 14.18 6.714 14.18C6.13583 14.18 5.58134 13.9503 5.17251 13.5415C4.76368 13.1327 4.534 12.5782 4.534 12ZM21.25 18.607H15.502M15.502 18.607C15.502 19.1853 15.2718 19.7404 14.8628 20.1494C14.4539 20.5583 13.8993 20.788 13.321 20.788C12.7428 20.788 12.1883 20.5573 11.7795 20.1485C11.3707 19.7397 11.141 19.1852 11.141 18.607M15.502 18.607C15.502 18.0287 15.2718 17.4746 14.8628 17.0657C14.4539 16.6567 13.8993 16.427 13.321 16.427C12.7428 16.427 12.1883 16.6567 11.7795 17.0655C11.3707 17.4743 11.141 18.0288 11.141 18.607M11.141 18.607H2.75M21.25 5.39301H18.145M13.784 5.39301H2.75M13.784 5.39301C13.784 4.81484 14.0137 4.26035 14.4225 3.85152C14.8313 3.44269 15.3858 3.21301 15.964 3.21301C16.2503 3.21301 16.5338 3.2694 16.7983 3.37896C17.0627 3.48851 17.3031 3.64909 17.5055 3.85152C17.7079 4.05395 17.8685 4.29427 17.9781 4.55876C18.0876 4.82325 18.144 5.10673 18.144 5.39301C18.144 5.67929 18.0876 5.96277 17.9781 6.22726C17.8685 6.49175 17.7079 6.73207 17.5055 6.93451C17.3031 7.13694 17.0627 7.29751 16.7983 7.40707C16.5338 7.51663 16.2503 7.57301 15.964 7.57301C15.3858 7.57301 14.8313 7.34333 14.4225 6.93451C14.0137 6.52568 13.784 5.97118 13.784 5.39301Z" stroke="#222222" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"/>
                            </svg>
                        )}
                        필터
                    </FilterButton>
                    <ToggleDropdownWrapper>
                        {/* 정렬 드롭다운의 토글 버튼 */}
                        <ToggleButton $isClicked={isSortVisible} onClick={clickSortButton}>{selectedSort}
                            {isSortVisible ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 15L12 9L18 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            )}
                        </ToggleButton>
                        <SortDropdown $isClicked={isSortVisible}>
                            {sortHierarchy.map((sortOption) => (
                                <SortSelector key={sortOption} onClick={() => handleSortSelect(sortOption)}>
                                    {sortOption}
                                </SortSelector>
                            ))}
                        </SortDropdown>
                    </ToggleDropdownWrapper>
                </RightButtonContainer>
            </FilterContainer>

            {/* 필터 버튼 클릭하면 보이는 상세 필터 */}
            <DetailFilterContainer $visible={isFilterVisible}>
                {/* 태그 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>태그</FilterOptionName>
                    <div style={{ position: 'relative' }}>
                        <FilterOptionInputBar 
                        value={filters.tag}
                        onChange={(e) => handleFilterChange("tag", e.target.value)}
                        />
                        <FilterOptionIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </FilterOptionIcon>
                    </div>
                </FilterOptionWrapper>

                {/* 기업 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>기업</FilterOptionName>
                    <div style={{ position: 'relative' }}>
                        <FilterOptionInputBar 
                        placeholder="선택"
                        value={filters.company}
                        // onClick={clickCompanyInput}
                        onChange={(e) => handleFilterChange("company", e.target.value)}
                        />
                        <FilterOptionIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </FilterOptionIcon>
                        <FilterOptionToggleIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 15 8" fill="none">
                                <path d="M13.6666 1L7.66663 7L1.66663 1" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </FilterOptionToggleIcon>
                    </div>
                </FilterOptionWrapper>

                {/* 날짜 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>날짜</FilterOptionName>
                    <div style={{ position: 'relative' }}>
                        <FilterOptionInputBar 
                        readOnly
                        placeholder="선택"
                        value={filters.date}
                        $isClicked={isDateVisible}
                        onClick={clickDateInput}
                        style={{ cursor: 'pointer' }}
                        />
                        <FilterOptionIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                <path d="M16 18H2V7H16M13 0V2H5V0H3V2H2C0.89 2 0 2.89 0 4V18C0 18.5304 0.210714 19.0391 0.585786 19.4142C0.960859 19.7893 1.46957 20 2 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V4C18 3.46957 17.7893 2.96086 17.4142 2.58579C17.0391 2.21071 16.5304 2 16 2H15V0M14 11H9V16H14V11Z" fill="#222222"/>
                            </svg>
                        </FilterOptionIcon>
                        {isDateVisible ? (
                            <FilterOptionToggleIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 15L12 9L18 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </FilterOptionToggleIcon>
                            ) : (
                            <FilterOptionToggleIcon>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </FilterOptionToggleIcon>
                        )}
                        <DateDropdown $isClicked={isDateVisible}>
                            {dateHierarchy.map((dateOption) => (
                                <DateSelector 
                                    key={dateOption}
                                    onClick={() => handleDateSelect(dateOption)}
                                >
                                    {dateOption}
                                </DateSelector>
                            ))}
                        </DateDropdown>
                    </div>
                </FilterOptionWrapper>
            </DetailFilterContainer>
        </>
    );
};