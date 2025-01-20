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

// 드롭다운 버튼 (직군 선택, 정렬)
const DropdownButton = styled.button`
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
    display: ${({ visible }) => (visible ? 'flex' : 'none')}; /* 상태에 따라 표시/숨김 */
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

// 상세 필터 검색바 (태그, 기업, 색상 등)
const FilterOptionInputBar = styled.input`
    width: 284px;
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
    width: 284px;
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
    // 상세 필터 목록 표시 state -> true일 때 보임, false일 때 안보임
    const [isFilterVisible, setFilterVisible] = useState(false);

    // 각 상세 필터 값 저장하는 state
    // *****추후 드롭다운 등 디자인 확정되면 수정 필요함*****
    const [filters, setFilters] = useState({
        tag: "",
        company: "",
        color: "",
        date: "",
    });

    // 필터 버튼 클릭하면 상세 필터 목록 나타나거나 사라지도록 하는 함수
    const clickFilterButton = () => {
        setFilterVisible((prevState) => !prevState);
    };

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
                <DropdownButton>직군 선택
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
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
                    <DropdownButton>인기순
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 9L12 15L6 9" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
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

                {/* 색상 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>색상</FilterOptionName>
                    <div style={{ position: 'relative' }}>
                        <FilterOptionInputBar 
                        value={filters.color}
                        onChange={(e) => handleFilterChange("color", e.target.value)}
                        />
                        <FilterOptionIcon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.5 12C17.1022 12 16.7206 11.842 16.4393 11.5607C16.158 11.2794 16 10.8978 16 10.5C16 10.1022 16.158 9.72064 16.4393 9.43934C16.7206 9.15804 17.1022 9 17.5 9C17.8978 9 18.2794 9.15804 18.5607 9.43934C18.842 9.72064 19 10.1022 19 10.5C19 10.8978 18.842 11.2794 18.5607 11.5607C18.2794 11.842 17.8978 12 17.5 12ZM14.5 8C14.1022 8 13.7206 7.84196 13.4393 7.56066C13.158 7.27936 13 6.89782 13 6.5C13 6.10218 13.158 5.72064 13.4393 5.43934C13.7206 5.15804 14.1022 5 14.5 5C14.8978 5 15.2794 5.15804 15.5607 5.43934C15.842 5.72064 16 6.10218 16 6.5C16 6.89782 15.842 7.27936 15.5607 7.56066C15.2794 7.84196 14.8978 8 14.5 8ZM9.5 8C9.10218 8 8.72064 7.84196 8.43934 7.56066C8.15804 7.27936 8 6.89782 8 6.5C8 6.10218 8.15804 5.72064 8.43934 5.43934C8.72064 5.15804 9.10218 5 9.5 5C9.89782 5 10.2794 5.15804 10.5607 5.43934C10.842 5.72064 11 6.10218 11 6.5C11 6.89782 10.842 7.27936 10.5607 7.56066C10.2794 7.84196 9.89782 8 9.5 8ZM6.5 12C6.10218 12 5.72064 11.842 5.43934 11.5607C5.15804 11.2794 5 10.8978 5 10.5C5 10.1022 5.15804 9.72064 5.43934 9.43934C5.72064 9.15804 6.10218 9 6.5 9C6.89782 9 7.27936 9.15804 7.56066 9.43934C7.84196 9.72064 8 10.1022 8 10.5C8 10.8978 7.84196 11.2794 7.56066 11.5607C7.27936 11.842 6.89782 12 6.5 12ZM12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21C12.3978 21 12.7794 20.842 13.0607 20.5607C13.342 20.2794 13.5 19.8978 13.5 19.5C13.5 19.11 13.35 18.76 13.11 18.5C12.88 18.23 12.73 17.88 12.73 17.5C12.73 17.1022 12.888 16.7206 13.1693 16.4393C13.4506 16.158 13.8322 16 14.23 16H16C17.3261 16 18.5979 15.4732 19.5355 14.5355C20.4732 13.5979 21 12.3261 21 11C21 6.58 16.97 3 12 3Z" fill="#222222"/>
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