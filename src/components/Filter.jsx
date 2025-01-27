import React, { useState } from "react";
import styled from "styled-components";

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

// 드롭다운 버튼 (직군 선택, 정렬 등)
const DropdownButton = styled.button`
    padding: ${({ clicked }) => (clicked ? '11px 31px' : '12px 32px' )}; /* 상태에 따라 표시 or 숨김 */
    border-radius: 50px;
    border: ${({ clicked }) => (clicked ? '1px solid #6C6C6C' : 'none')}; /* 상태에 따라 표시 or 숨김 */
    cursor: pointer;
    background-color: #EFEFEF;

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
    display: ${({ visible }) => (visible ? 'flex' : 'none')}; /* 상태에 따라 표시 or 숨김 */
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

// 상세 필터 검색바 (태그, 기업 등)
const FilterOptionInputBar = styled.input`
    width: 389px;
    // ****패딩 임시 설정****
    padding: 20px 24px 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    outline: none;
    background-color: #ECECEC;

    // ****폰트 임시 설정****
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    line-height: 24px;
    color: #222222;
`;

// 상세 필터 날짜 드롭다운 (날짜)
const FilterDateDropdown = styled.button`
    width: 389px;
    padding: 20px 16px 20px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background-color: #ECECEC;

    font-family: 'Pretendard-Regular';
    font-size: 18px;
    line-height: 24px;
    color: #222222;
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

export default function Filter() {
    // 각 상세 필터 값 저장하는 state
    const [filters, setFilters] = useState({
        tag: "",
        company: "",
        date: "",
    });
    
    // 상세 필터 목록 표시 state -> true일 때 보임, false일 때 안보임
    const [isFilterVisible, setFilterVisible] = useState(false);

    // 직무선택 드롭다운 표시 state -> true일 때 보임, false일 때 안보임
    const [isJopSelectorVisible, setJopSelectorVisible] = useState(false);

    // 정렬 드롭다운 표시 state -> true일 때 보임, false일 때 안보임
    const [isSortVisible, setSortVisible] = useState(false);

    // 필터 버튼 클릭하면 상세 필터 목록 나타나거나 사라지도록 하는 함수
    const clickFilterButton = () => {
        setFilterVisible((prevState) => !prevState);
    };

    // 직무선택 버튼 클릭하면 버튼 디자인 변경하고 정렬 드롭다운 보여주는 함수
    const clickJobSelectorButton = () => {
        setJopSelectorVisible((prevState) => !prevState);
    }

    // 정렬 버튼 클릭하면 버튼 디자인 변경하고 정렬 드롭다운 보여주는 함수
    const clickSortButton = () => {
        setSortVisible((prevState) => !prevState);
    }

    // 상세 필터 state 값을 관리하는 함수
    // *****추후 드롭다운 등 디자인 확정되면 수정 필요함*****
    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    // 적용된 필터 개수 계산 (빈 값은 카운트X)
    // *****추후 드롭다운 등 디자인 확정되면 수정 필요함*****
    const filterCount = Object.values(filters).filter((value) => value !== "").length;

    return (
        <>
            <FilterContainer>
                {/* 직군 선택 드롭다운 버튼 */}
                <DropdownButton clicked={isJopSelectorVisible} onClick={clickJobSelectorButton}>직군 선택
                    {isJopSelectorVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M6 15L12 9L18 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    )}
                </DropdownButton>
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
                    {/* 정렬 드롭다운 버튼 */}
                    <DropdownButton clicked={isSortVisible} onClick={clickSortButton}>인기순
                        {isSortVisible ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 15L12 9L18 15" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        )}
                    </DropdownButton>
                </RightButtonContainer>
            </FilterContainer>

            {/* 필터 버튼 클릭하면 보이는 상세 필터 */}
            <DetailFilterContainer visible={isFilterVisible}>
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
                        value={filters.company}
                        onChange={(e) => handleFilterChange("company", e.target.value)}
                        />
                        <FilterOptionIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M3 21H21M9 8H10M9 12H10M9 16H10M14 8H15M14 12H15M14 16H15M5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </FilterOptionIcon>
                    </div>
                </FilterOptionWrapper>

                {/* 날짜 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>날짜</FilterOptionName>
                    <FilterDateDropdown>전체
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </FilterDateDropdown>
                </FilterOptionWrapper>
            </DetailFilterContainer>
        </>
    );
};