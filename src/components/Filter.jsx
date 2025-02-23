import React, { useState, useEffect } from "react";
import styled from "styled-components";
import InputAndDropdown from "./share/InputAndDropdown";

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
    position: relative;
    display: flex;
    justify-content: center:
    gap: 8px;
`;

// 토글 버튼 (직군 선택, 정렬 등)
const ToggleButton = styled.button`
    padding: 11px 31px;
    border-radius: 50px;
    border: 1px solid #d5d5d5;
    cursor: pointer;
    background-color: #fff;
    outline: none;
    position: relative;
    box-sizing: border-box;

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
    border: 1px solid  #D5D5D5;
    background-color: #fff;
    outline: none;
    cursor: pointer;

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
    background-color: #1570EF;

    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    font-style: normal;
    line-height: 22px;
    color: #fff;
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

// 각 상세 필터의 이름 + 검색바(+드롭다운) 감싼 컨테이너
const FilterOptionWrapper = styled.label`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

// 필터 이름 + clear 버튼 묶음
const NameAndClearBtn = styled.div`
    display: flex;
    justify-content: space-between;
`;

// 상세 필터 이름
const FilterOptionName = styled.span`
    font-family: 'Pretendard-SemiBold';
    font-size: 14px;
    line-height: 22px;
    color: #222222;
`;

// 상세 필터 clear 초기화 버튼
const FilterOptionClear = styled.button`
    cursor: pointer;
    border: none;
    background: none;

    font-family: 'Pretendard-Regular';
    font-size: 12px;
    line-height: 20px;
    color: #909090;
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
    border: 1px solid #d5d5d5; /* 상태에 따라 표시 or 숨김 */
    outline: none;
    background-color: #fff;

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
// const FilterOptionToggleIcon = styled.div`
//     width: 24px;
//     height: 24px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     top: 50%;
//     right: 16px;
//     transform: translateY(-50%);
// `;

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
// 정렬 드롭다운 전체
const SortDropdown = styled.div`
    display: ${({ $isClicked }) => ($isClicked ? 'flex' : 'none')};
    flex-direction: column;
    // justify-content: space-between;

    position: absolute;
    top: 56px;
    z-index: 1000;

    width: 100%;
    height: 168px;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.15);
    background-color: #FFF;
    box-sizing: border-box;
`;

const SortSelector = styled.button`
    padding: 8px 20px;
    border: none;
    outline: none;
    background-color: #fff;
    cursor: pointer;
    text-align: left;

    font-family: 'Pretendard-Regular';
    font-size: 14px;
    line-height: 22px;

    &:hover {
        background-color: #f8f8f8;
    }
`;

export default function Filter() {
    const [isJopVisible, setJopVisible] = useState(false); // 직군선택 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [selectedJobs, setSelectedJobs] = useState([]); // 선택된 직군들 저장
    const [parentState, setParentState] = useState([]); // 부모 input(개발자, 디자이너) 상태 저장 - checked, indeterminate, unchecked
    const [isSortVisible, setSortVisible] = useState(false); // 정렬 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    const [selectedSort, setSelectedSort] = useState(sortHierarchy[0]); // 선택된 정렬 방식 저장
    const [isFilterVisible, setFilterVisible] = useState(false); // 상세 필터 목록 표시 -> true일 때 보임, false일 때 안보임
    const [companyOptions, setCompanyOptions] = useState([]); // 필터링된 기업 리스트
    const [isCompanyVisible, setCompanyVisible] = useState(false); // 기업 드롭다운 표시 여부
    const [companyQuery, setCompanyQuery] = useState(""); // 기업 검색어 저장
    const [isCompanySelected, setCompanySelected] = useState(false); // 기업 선택 여부

    // 각 상세 필터 값 저장
    const [filters, setFilters] = useState({
        tag: "",
        company: "",
        date: "",
    });

    // 기업 드롭다운 표시 -> true일 때 보임, false일 때 안보임
    // const [isCompanyVisible, setCompanyVisible] = useState(false);

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

    // 기업 필터에서 검색어를 이용해 기업 검색
    // **********api 연결할 때는 백엔드 방식에 맞춰서 코드 변경 (현재는 프론트에서 필터링 하도록 되어있음)************
    const searchCompanies = async (query) => {
        if (!query) {
            setCompanyOptions([]); // 검색어 없으면 리스트 초기화
            setCompanyVisible(false); // 드롭다운 숨기기
            return;
        }

        try {
            const response = await fetch("/mockdata/Companies.json"); // JSON 파일에서 기업 리스트 불러오기
            const data = await response.json();

            // 검색어를 포함하는 기업 필터링
            const filteredCompanies = data.companies
                .map((company) => company.companyName) // 기업명만 추출
                .filter((name) => name.includes(query)); // 검색어 포함 여부 확인

            setCompanyOptions(filteredCompanies);
            setCompanyVisible(true); // 입력 시 드롭다운 열기
        } catch (error) {
            console.error("기업 데이터 로드 실패:", error);
            setCompanyOptions([]);
        }
    };

    // 검색어 입력 시 동작 (드롭다운 표시 + 기업 검색)
    const handleCompanyInputChange = (value) => {
        setCompanyQuery(value);
        // setCompanySelected(false); // 기업 선택 해제 (새로운 검색 가능하도록)
        searchCompanies(value);

        if (isCompanySelected === true) {
            setFilters(prev => ({ ...prev, company: value }))
        }
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
                    {/* 필터 */}
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
                    {/* 정렬 */}
                    <ToggleDropdownWrapper>
                        {/* 정렬 드롭다운의 토글 버튼 */}
                        <ToggleButton $isClicked={isSortVisible} onClick={clickSortButton}>{selectedSort}
                            {isSortVisible ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24" fill="none">
                                    <path d="M2 15L8 9L14 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 16 24" fill="none">
                                    <path d="M14 9L8 15L2 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
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
                            <path d="M16.893 16.92L19.973 20M19 11.5C19 13.4891 18.2098 15.3968 16.8033 16.8033C15.3968 18.2098 13.4891 19 11.5 19C9.51088 19 7.60322 18.2098 6.1967 16.8033C4.79018 15.3968 4 13.4891 4 11.5C4 9.51088 4.79018 7.60322 6.1967 6.1967C7.60322 4.79018 9.51088 4 11.5 4C13.4891 4 15.3968 4.79018 16.8033 6.1967C18.2098 7.60322 19 9.51088 19 11.5Z" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        </FilterOptionIcon>
                    </div>
                </FilterOptionWrapper>

                {/* 기업 필터 */}
                {/* <FilterOptionWrapper>
                    <FilterOptionName>기업</FilterOptionName>
                    <InputAndDropdown 
                        readOnly={false}
                        placeholder="선택"
                        value={filters.company}
                        setValue={(newValue) => setFilters(prev => ({ ...prev, company: newValue }))}
                        // data={dateHierarchy}
                        width="389px"
                        iconSvg={<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <path d="M3.33337 21H21.3334M9.33337 8H10.3334M9.33337 12H10.3334M9.33337 16H10.3334M14.3334 8H15.3334M14.3334 12H15.3334M14.3334 16H15.3334M5.33337 21V5C5.33337 4.46957 5.54409 3.96086 5.91916 3.58579C6.29423 3.21071 6.80294 3 7.33337 3H17.3334C17.8638 3 18.3725 3.21071 18.7476 3.58579C19.1227 3.96086 19.3334 4.46957 19.3334 5V21" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>}
                    />
                </FilterOptionWrapper> */}
                <FilterOptionWrapper>
                    <FilterOptionName>기업</FilterOptionName>
                    <InputAndDropdown 
                        readOnly={false} // 기업 선택 후 입력 불가능
                        placeholder="선택"
                        value={companyQuery} // 검색어 상태 반영
                        setValue={handleCompanyInputChange} // 검색어 변경 시 필터링
                        data={isCompanyVisible ? companyOptions : []} // 드롭다운 데이터 설정
                        width="389px"
                        iconSvg={
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                <path d="M3.33337 21H21.3334M9.33337 8H10.3334M9.33337 12H10.3334M9.33337 16H10.3334M14.3334 8H15.3334M14.3334 12H15.3334M14.3334 16H15.3334M5.33337 21V5C5.33337 4.46957 5.54409 3.96086 5.91916 3.58579C6.29423 3.21071 6.80294 3 7.33337 3H17.3334C17.8638 3 18.3725 3.21071 18.7476 3.58579C19.1227 3.96086 19.3334 4.46957 19.3334 5V21" stroke="#909090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    />
                </FilterOptionWrapper>

                {/* 날짜 필터 */}
                <FilterOptionWrapper>
                    <NameAndClearBtn>
                        <FilterOptionName>날짜</FilterOptionName>
                        <FilterOptionClear onClick={() => setFilters(prev => ({ ...prev, date: "" }))}>clear</FilterOptionClear>
                    </NameAndClearBtn>
                    <InputAndDropdown 
                        readOnly={true}
                        placeholder="선택"
                        value={filters.date}
                        setValue={(newValue) => setFilters(prev => ({ ...prev, date: newValue }))}
                        data={dateHierarchy}
                        width="389px"
                        iconSvg={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 4H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V4Z" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4 8H20" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3V5" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8 3V5" stroke="#909090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>}
                    />
                </FilterOptionWrapper>
            </DetailFilterContainer>
        </>
    );
};