import React from 'react';
import styled from 'styled-components';
import logoF from '../../imgs/logoF.png'; // 이거 이미 되어있어서 그대로 활용!

// 푸터 컨테이너
const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 80px;
  background: #F8F8F8;
  padding: 64px 24px;
`;

const LogoImage = styled.img`
  width: 160px;
  height: 36px;
  margin-left: 104px;
`;

const FooterTextGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
  margin-left: 104px;
`;

const FooterText = styled.span`
  color: #909090;
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'Pretendard-Regular';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <LogoImage src={logoF} alt="PocketFolio" />
      <FooterTextGroup>
        <FooterText>포켓폴리오</FooterText>
        <FooterText>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="8" viewBox="0 0 2 8" fill="none">
            <path d="M1 0V8" stroke="#909090" strokeWidth="0.5"/>
          </svg>
        </FooterText>
        <FooterText>서울여자대학교 디지털미디어학과 UXUI 소학회 SWUX & 소프트웨어융합학과 웹개발 소학회 SWUWEB</FooterText>
      </FooterTextGroup>
    </FooterContainer>
  );
}