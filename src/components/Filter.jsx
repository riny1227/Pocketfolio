import React, { useState } from "react";
import styled from "styled-components";

// 버튼 안에 들어갈 아이콘 추가
import downArrowIcon from '../imgs/icon_downArrow.png';
import filterIcon from '../imgs/icon_filter.png';
import searchIcon from '../imgs/icon_search.png';
import companyIcon from '../imgs/icon_company.png';
import colorPaletteIcon from '../imgs/icon_colorPalette.png';

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

// 아이콘 컨테이너
const IconWrapper = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;;
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
                <DropdownButton>직군 선택<IconWrapper><img src={downArrowIcon} alt="down-arrow-icon" /></IconWrapper></DropdownButton>
                <RightButtonContainer>
                    {/* 필터 버튼 */}
                    <FilterButton onClick={clickFilterButton}>
                        {filterCount > 0 ? (
                                <FilterCount>{filterCount}</FilterCount>
                            ) : (
                                <IconWrapper><img src={filterIcon} alt="filter-icon" /></IconWrapper>
                        )}
                        필터
                    </FilterButton>
                    {/* 정렬 드롭다운 버튼 */}
                    <DropdownButton>인기순<IconWrapper><img src={downArrowIcon} alt="down-arrow-icon" /></IconWrapper></DropdownButton>
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
                        <FilterOptionIcon><img src={searchIcon} alt="search-icon" /></FilterOptionIcon>
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
                        <FilterOptionIcon><img src={companyIcon} alt="company-icon" /></FilterOptionIcon>
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
                        <FilterOptionIcon><img src={colorPaletteIcon} alt="color-palette-icon" /></FilterOptionIcon>
                    </div>
                </FilterOptionWrapper>

                {/* 날짜 필터 */}
                <FilterOptionWrapper>
                    <FilterOptionName>날짜</FilterOptionName>
                    <FilterDateDropdown>전체<IconWrapper><img src={downArrowIcon} alt="down-arrow" /></IconWrapper></FilterDateDropdown>
                </FilterOptionWrapper>
            </DetailFilterContainer>
        </>
    );
};