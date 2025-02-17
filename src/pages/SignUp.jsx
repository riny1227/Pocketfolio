import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputAndDropdown from '../components/share/InputAndDropdown';

// 전체 컴포넌트 감싸는 컨테이너
const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 내부 감싸는 컨테이너
const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 102px 0;
    gap: 80px;
`;

// 회원가입 텍스트
const SignUpText = styled.text`
    margin-top: 112px;
    color: #464646;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px;
`;

// 각 화면 컨테이너
const PageContainer = styled.div`
    display: flex;
    width: 1024px;
    flex-direction: column;
    align-items: center;
    gap: 80px;
`;

// 1-2-3 단계
const StepWrapper = styled.div`
    display: flex;
    padding-bottom: 32px;
    justify-content: center;
    align-items: center;
`;

// 각 단계를 감싸는 컨테이너 (동그라미 + 텍스트)
const StepIndicator = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 단계의 동그라미
const StepCircle = styled.div`
    display: flex;
    width: 48px;
    padding: 6px 0px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 24px;
    background-color: ${({ active }) => (active ? '#1570EF' : '#E6E6E6')};

    span {
        color: ${({ active }) => (active ? '#FFF' : '#B1B1B1')};
        text-align: center;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Bold';
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 36px;
    }
`;

// 동그라미 아래 텍스트
const StepLabel = styled.div`
    margin-top: 8px;
    text-align: center;
    color: #464646;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
`;

// 단계 사이의 라인
const StepLine = styled.div`
    display: flex;
    align-items: center;
    margin: 0 16px 30px;
`;

// 약관들 컨테이너
const TermsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
`;

// 각 약관 wrapper
const TermWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 8px;
    align-self: stretch;
`;

// 체크박스 라벨 스타일
const CheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    input {
        margin-right: 8px;
        width: 16px;
        height: 16px;
        border-radius: 2px;
        border: 2px solid #6C6C6C;

        &:hover {
            border-color: #1570EF;
        }
    }

    span {
        color: #1570EF;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-SemiBold';
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
        margin-right: 4px;
    }
`;

// 약관 내용 컨테이너 스타일
const TermsContent = styled.div`
    width: 1024px;
    height: 184px;
    flex-shrink: 0;
    border-radius: 8px;
    border: 1px solid #D5D5D5;
    padding: 20px 24px;
    overflow-y: auto;
    background-color: #fff;

    span {
        color: #6C6C6C;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
    }
`;

// 버튼들 (이전+다음)
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

// 다음 버튼
const NextButton = styled.button`
    display: flex;
    width: 240px;
    height: 64px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    background: ${({ disabled }) => (disabled ? '#E6E6E6' : '#DCEAFD')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    span {
        color: ${({ disabled }) => (disabled ? '#909090' : '#1570EF')};
        text-align: center;
        font-family: 'Pretendard-SemiBold';
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }

    &:hover {
        background: ${({ disabled }) => 
            disabled ? '#E6E6E6' : '#B9D6F9'}; /* 호버시 색상 변경 */
    }

    &:active {
        background: ${({ disabled }) => 
            disabled ? '#E6E6E6' : '#A3C7F6'}; /* 클릭시 색상 변경 */
    }
`;

// 이전 버튼
const PreviousButton = styled.button`
    display: flex;
    width: 240px;
    height: 64px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    border: 1px solid #6C6C6C;
    background: #FFF;
    cursor: pointer;

    span {
        color: #464646;
        text-align: center;
        font-family: 'Pretendard-SemiBold';
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }
`;

// 회원정보 컨테이너
const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
`;

// 회원정보 텍스트
const UserInfo = styled.text`
    color: var(--gray-gray-800-normal, #222);
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
`;

// 회원정보 아래 내용들
const InfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
`;

// 회원정보 타이틀 텍스트
const Title = styled.span`
    color: #464646;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;

    &::after {
        content: ' *';
        color: #F04438;
    }
`;

// 입력 필드 스타일
const InputField = styled.input`
    display: flex;
    width: ${({ $width }) => $width || '480px'};
    height: 64px;
    padding: 0 24px;
    align-items: center;
    gap: 10px;
    border-radius: 4px;
    border: 1px solid #D5D5D5;

    span {
        color: #909090;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Regular';
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
    }
`;

// 인증번호 부분 wrapper
const SendCodeWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 16px;
`;

// 인증번호 버튼
const SendCodeButton = styled.button`
    display: flex;
    height: 64px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;    
    border: none;
    border-radius: 12px;
    background: #E6E6E6;
    cursor: pointer;

    span {
        color: #909090;
        text-align: center;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-SemiBold';
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: 24px;
    }
`;

// 3단계 환영 부분
const LastWrapper = styled.div`
    display: flex;
    width: 294px;
    flex-direction: column;
    align-items: center;
    gap: 48px;

    svg {
        width: 96px;
        height: 96px;
    }

    span {
        color: #222;
        text-align: center;
        font-feature-settings: 'liga' off, 'clig' off;
        font-family: 'Pretendard-Bold';
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        line-height: 40px;
    }
`;

export default function SignUp() {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: "",
        passwordchk: "",
    })

    // 개별 약관 동의 상태를 객체로 관리
    const [terms, setTerms] = useState({
        usage: false,        // [필수] 이용 약관
        personalInfo: false, // [필수] 개인정보 수집 및 이용 약관
        thirdParty: false,   // [필수] 제3자 개인정보 제공 동의
        marketing: false,    // [선택] 마케팅 정보 수신 동의
    });

    // 필수 약관이 모두 체크되었는지 여부
    const isAllRequiredChecked = terms.usage && terms.personalInfo && terms.thirdParty;

    // 모든 약관이 체크되었는지 여부 (필수 + 선택 모두)
    const isAllChecked =
        terms.usage && terms.personalInfo && terms.thirdParty && terms.marketing;

    // 개별 체크박스 변경 시 상태 업데이트
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setTerms((prev) => ({
        ...prev,
        [name]: checked,
        }));
    };

    // "모두 동의" 체크박스 변경 시 상태 업데이트
    const handleAllCheckboxChange = (e) => {
        const { checked } = e.target;
        setTerms({
        usage: checked,
        personalInfo: checked,
        thirdParty: checked,
        marketing: checked,
        });
    };
    
    const [step, setStep] = useState(1); // 현재 단계

    const handleNextStep = () => {
        if (step === 1 && !isAllRequiredChecked) {
            alert('필수 약관에 모두 동의해주세요.');
            return;
        }
        if (step === 2 && (!userInfo.name || !userInfo.email)) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const [verificationCode, setVerificationCode] = useState(""); // 생성된 인증번호
    const [inputCode, setInputCode] = useState(""); // 사용자가 입력한 인증번호
    const [isVerified, setIsVerified] = useState(false); // 인증 여부
    const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 전송 여부

    // 입력값 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    // 이메일 인증번호 요청
    const handleEmailCheck = () => {
        if (!userInfo.email) {
        alert("이메일을 입력하세요.");
        return;
        }

        // 6자리 랜덤 인증번호 생성
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setVerificationCode(code);
        setIsCodeSent(true);
        alert(`인증번호가 이메일로 발송되었습니다: ${code}`); // 실제로는 서버를 통해 전송해야 합니다.
    };

    // 인증번호 확인
    const handleVerifyCode = () => {
        if (inputCode === verificationCode) {
        setIsVerified(true);
        alert("이메일 인증이 완료되었습니다.");
        } else {
        alert("인증번호가 올바르지 않습니다.");
        }
    };

    // 회원가입 처리
    const handleSignUp = () => {
        if (!isVerified) {
        alert("이메일 인증을 완료하세요.");
        return;
        }

        if (userInfo.password !== userInfo.passwordchk) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
        }

        alert("회원가입 성공!");
    };

    return (
        <SignUpContainer>
            <DetailContainer>
                <SignUpText>회원가입</SignUpText>
                {/* 단계 인디케이터: 1-2-3 */}
                <StepWrapper>
                    <StepIndicator>
                        <StepCircle active={step == 1}>
                            <span>1</span>
                        </StepCircle>
                        <StepLabel active={step >= 1}>약관 동의</StepLabel>
                    </StepIndicator>
                    <StepLine>
                        <svg xmlns="http://www.w3.org/2000/svg" width="163" height="2" viewBox="0 0 163 2" fill="none">
                            <path d="M1.5 1H161.5" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </StepLine>
                    <StepIndicator>
                        <StepCircle active={step == 2}>
                            <span>2</span>
                        </StepCircle>
                        <StepLabel active={step >= 2}>정보 입력</StepLabel>
                    </StepIndicator>
                    <StepLine>
                        <svg xmlns="http://www.w3.org/2000/svg" width="163" height="2" viewBox="0 0 163 2" fill="none">
                            <path d="M1.5 1H161.5" stroke="#E6E6E6" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </StepLine>
                    <StepIndicator>
                        <StepCircle active={step == 3}>
                            <span>3</span>
                        </StepCircle>
                        <StepLabel active={step >= 3}>가입 완료</StepLabel>
                    </StepIndicator>
                </StepWrapper>
                {step === 1 && (
                    <PageContainer>
                        <TermsContainer>
                            {/* 모두 동의 */}
                            <CheckboxLabel>
                                <input
                                    type="checkbox"
                                    checked={isAllChecked}
                                    onChange={handleAllCheckboxChange}
                                />
                                <strong>이용 약관 및 전체 약관에 동의합니다.</strong>
                            </CheckboxLabel>

                            {/* [필수] 이용 약관 */}
                            <TermWrapper>
                                <CheckboxLabel>
                                    <input
                                        type="checkbox"
                                        name="usage"
                                        checked={terms.usage}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>[필수]</span>이용 약관
                                </CheckboxLabel>

                                {/* 약관 내용 */}
                                <TermsContent>
                                    <span>이용 약관에 대한 설명</span>
                                </TermsContent>                                
                            </TermWrapper>

                            {/* [필수] 개인정보 수집 및 이용 약관 */}
                            <TermWrapper>
                                <CheckboxLabel>
                                    <input
                                        type="checkbox"
                                        name="personalInfo"
                                        checked={terms.personalInfo}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>[필수]</span>개인정보 수집 및 이용 약관
                                </CheckboxLabel>

                                {/* 약관 내용 */}
                                <TermsContent>
                                    <span>개인정보 수집 및 이용 약관에 대한 설명</span>
                                </TermsContent>    
                            </TermWrapper>

                            {/* [필수] 제3자 개인정보 제공 동의 */}
                            <TermWrapper>
                                <CheckboxLabel>
                                    <input
                                        type="checkbox"
                                        name="thirdParty"
                                        checked={terms.thirdParty}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span>[필수]</span>제3자 개인정보 제공 동의
                                </CheckboxLabel>

                                {/* 약관 내용 */}
                                <TermsContent>
                                    <span>제 3자 개인정보 수집 제공에 대한 설명</span>
                                </TermsContent>   
                            </TermWrapper>

                            {/* [선택] 마케팅 정보 수신 동의 */}
                            <TermWrapper>
                                <CheckboxLabel>
                                    <input
                                        type="checkbox"
                                        name="marketing"
                                        checked={terms.marketing}
                                        onChange={handleCheckboxChange}
                                    />
                                    [선택] 마케팅 정보 수신 동의
                                </CheckboxLabel>  

                                {/* 약관 내용 */}
                                <TermsContent>
                                    <span>마케팅 정보 수신에 대한 설명</span>
                                </TermsContent>
                            </TermWrapper>                              
                        </TermsContainer>
                        <NextButton disabled={!isAllRequiredChecked} onClick={handleNextStep}>
                            <span>다음</span>
                        </NextButton>
                    </PageContainer>
                )}

                {step === 2 && (
                    <PageContainer>
                        <InfoContainer>
                            <UserInfo>회원 정보</UserInfo>
                            {/* 이름 */}
                            <InfoWrapper>
                                <Title>이름</Title>
                                <InputField
                                    type="text"
                                    name="name"
                                    placeholder="이름을 입력해 주세요"
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                />
                            </InfoWrapper>
                            {/* 이메일(아이디) */}
                            <InfoWrapper>
                                <Title>이메일(아이디)</Title>
                                <SendCodeWrapper>
                                    <InputField
                                        type="email"
                                        name="email"
                                        placeholder="이메일 주소를 입력해 주세요"
                                        value={userInfo.email}
                                        onChange={handleInputChange}
                                    />
                                    <SendCodeButton onClick={handleEmailCheck}>
                                        <span>인증번호 요청</span>
                                    </SendCodeButton>
                                </SendCodeWrapper>
                            </InfoWrapper>
                            {/* 인증번호 */}
                            <InfoWrapper>
                                <Title>인증번호</Title>
                                <SendCodeWrapper>
                                    <InputField
                                        type="number"
                                        placeholder="인증번호 6자리를 입력해 주세요"
                                        value={inputCode}
                                        onChange={(e) => setInputCode(e.target.value)} // 입력값 업데이트 추가
                                    />
                                    <SendCodeButton onClick={handleVerifyCode}>
                                        <span>인증번호 확인</span>
                                    </SendCodeButton>
                                </SendCodeWrapper>
                            </InfoWrapper>
                            {/* 비밀번호 */}
                            <InfoWrapper>
                                <Title>비밀번호</Title>
                                <InputField
                                    $width="976px"
                                    type="password"
                                    name="password"
                                    placeholder="비밀번호를 입력해 주세요"
                                    value={userInfo.password}
                                    onChange={handleInputChange}
                                />
                            </InfoWrapper>
                            {/* 비밀번호 확인 */}
                            <InfoWrapper>
                                <Title>비밀번호 확인</Title>
                                <InputField
                                    $width="976px"
                                    type="password"
                                    name="passwordchk"
                                    placeholder="비밀번호를 재입력해 주세요"
                                    value={userInfo.passwordchk}
                                    onChange={handleInputChange}
                                />
                            </InfoWrapper>
                        </InfoContainer>
                        <ButtonWrapper>
                            <PreviousButton onClick={handlePreviousStep}>
                                <span>이전</span>
                            </PreviousButton>
                            <NextButton disabled={!isVerified} onClick={handleNextStep}>
                                <span>다음</span>
                            </NextButton>
                        </ButtonWrapper>
                    </PageContainer>
                )}

                {step === 3 && (
                    <PageContainer>
                        <LastWrapper>
                            <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                                <rect width="96" height="96" rx="48" fill="#1570EF"/>
                                <path d="M32 48L44 64L64 32" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>{userInfo.name}님, 환영합니다</span>
                        </LastWrapper>
                        <ButtonWrapper>
                            <PreviousButton onClick={() => navigate('/')}><span>메인으로</span></PreviousButton>
                            <NextButton onClick={() => navigate('/login')}><span>로그인하기</span></NextButton>
                        </ButtonWrapper>
                    </PageContainer>
                )}
            </DetailContainer>
        </SignUpContainer>
    );
}
