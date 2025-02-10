import { useParams } from 'react-router-dom';
import styled from "styled-components";

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
    gap: 130px;
    margin-top: 102px;
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
    padding: 51px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 12px;
    border: 1px solid #E6E6E6;
`;

export default function MypageDetail() {
  const { id } = useParams();

  return (
    <MypageDetailContainer>
        <DetailContainer>
            <TitleText>기본사항</TitleText>
            <BasicContainer>
                
            </BasicContainer>
            <TitleText>학력사항</TitleText>
            <TitleText>활동사항</TitleText>
        </DetailContainer>
    </MypageDetailContainer>
  )
}