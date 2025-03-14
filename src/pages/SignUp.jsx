import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { register, sendVerificationCode, verifyCode } from '../api/RegisterApi';

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
            disabled ? '#E6E6E6' : '#B6D3FA'};
        
        span {
            color: ${({ disabled }) => 
                disabled ? '#909090' : '#115ABF'};  /* 호버 시 텍스트 색상 변경 */
        }
    }

    &:active {
        background: ${({ disabled }) => 
            disabled ? '#E6E6E6' : '#1570EF'};

        span {
            color: ${({ disabled }) => 
                disabled ? '#909090' : '#FFFFFF'};  /* 클릭 시 텍스트 색상 변경 */
        }
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
    background: ${({ disabled }) => (disabled ? '#E6E6E6' : '#DCEAFD')};
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

    span {
        color: ${({ disabled }) => (disabled ? '#909090' : '#1570EF')};
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
    });

    // 필수 약관이 모두 체크되었는지 여부
    const isAllRequiredChecked = terms.usage && terms.personalInfo;

    // 모든 약관이 체크되었는지 여부 (필수 + 선택 모두)
    const isAllChecked =
        terms.usage && terms.personalInfo;

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

    // 이메일 인증 관련 상태
    const [serverCode, setServerCode] = useState(""); // 서버에서 받은 인증번호
    const [inputCode, setInputCode] = useState(""); // 사용자가 입력한 인증번호
    const [isVerified, setIsVerified] = useState(false); // 최종 인증 여부

    // 이메일 유효성 검사 함수
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isEmailValid = userInfo.email && isValidEmail(userInfo.email);
    const isCodeValid = inputCode.length === 6;

    // 비밀번호 검사 정규식 - 최소 8자 이상이어야 하고 영어 대/소문자, 숫자, 특수기호가 각각 1개 이상 포함되어야 함
    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    // 이메일 인증번호 요청
    const handleEmailCheck = async () => {
        if (!userInfo.email) {
            alert("이메일을 입력하세요.");
            return;
        }

        try {
            console.log("인증번호 요청 이메일:", userInfo.email);
            const response = await sendVerificationCode(userInfo.email);
            console.log("인증번호 응답:", response);
            setServerCode(response.code);
            alert("인증번호가 이메일로 발송되었습니다.");
        } catch (error) {
            alert(error.message);
        }
    };

    // 인증번호 확인
    const handleVerifyCode = async () => {
        try {
            const response = await verifyCode(userInfo.email, inputCode);
            if (response.message === "인증 코드가 확인되었습니다.") {
                setIsVerified(true);
                alert("이메일 인증이 완료되었습니다.");
            } else {
                alert("인증번호가 올바르지 않습니다.");
            }            
        } catch (error) {
            console.error("인증 코드 검증 에러:", error);
            alert("인증번호 검증 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };    

    // 회원가입 처리
    const handleSignUp = async () => {
        if (!isVerified) {
            alert("먼저 이메일 인증을 완료하세요.");
            return;
        }

        const { password, passwordchk } = userInfo;

        // 비밀번호 조건 체크
        if (!isValidPassword(password)) {
            alert("비밀번호는 8자 이상, 영어 대/소문자, 숫자, 특수기호를 각각 1개 이상 포함해야 합니다.");
            return;
        }

        if (password !== passwordchk) {
            alert("비밀번호가 서로 일치하지 않습니다.");
            return;
        }

        try {
            const response = await register(
                userInfo.name,
                userInfo.email,
                userInfo.password,
                userInfo.passwordchk,
            );
            console.log("회원가입 응답:", response);
            // 회원가입 성공 시 step3으로 이동
            setStep(3);
        } catch (error) {
            alert(error.message);
        }
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
                                    <span>제 1 장 총칙</span><br/><br/>
                                    <span>제 1 조 (목적)</span><br/>
                                    <span>본 약관은 포켓폴리오(이하 "본 사이트")에서 제공하는 모든 서비스(이하 "서비스")의 이용조건 및 절차, 사용자와 본 사이트의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다.</span><br/>
                                    <br/><span>제2조 (약관의 효력과 변경)</span><br/>
                                    <span>① 본 사이트는 사용자가 본 약관 내용에 동의하는 것을 조건으로 사용자에게 서비스를 제공하며, 본 사이트의 서비스 제공 행위 및 사용자의 서비스 사용 행위에는 본 약관을 우선적으로 적용합니다. ② 본 사이트는 본 약관을 사전 고지 없이 변경할 수 있으며, 약관을 개정할 경우 개정 사유를 명시하여 본 사이트 초기 서비스 화면에 게시합니다. 사용자가 변경된 약관에 동의하지 않는 경우 회원등록을 취소(회원 탈퇴)할 수 있으며, 계속 사용할 경우에는 약관 변경에 대한 암묵적 동의로 간주됩니다. 변경된 약관은 공지와 동시에 그 효력을 발휘합니다.</span><br/>
                                    <br/><span>제3조 (약관 외 준칙)</span><br/>
                                    <span>본 약관에 명시되지 않은 사항은 전기통신기본법, 전기통신사업법, 정보통신윤리위원회심의규정, 정보통신윤리강령, 저작권법 및 기타 관련 법령의 규정에 의합니다.</span><br/>
                                    <br/><span>제4조 (용어의 정의)</span><br/>
                                    <span>① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다. 1. 사용자 : 본 약관에 따라 본 사이트가 제공하는 서비스를 받는 자 2. 회원 : 본 사이트에 필요한 개인 정보를 제공하여 회원 등록을 한 자로서, 본 사이트의 정보 및 서비스를 이용할 수 있는 자 3. 아이디 : 이용고객의 식별과 사용자가 서비스 이용을 위하여 사용자가 정하고 본 사이트가 승인하는 이메일 4. 비밀번호 : 아이디에 대한 본인 여부를 확인하기 위하여 사용되는 문자, 숫자, 특수문자 등의 조합 5. 탈퇴 : 서비스 또는 회원이 이용계약을 종료하는 행위 ② 본 약관에서 정의하지 않은 용어는 개별서비스에 대한 별도 약관 및 이용규정에서 정의합니다.</span><br/>
                                    <span>제 2 장 서비스 제공 및 이용</span><br/>
                                    <br/><span>제 5 조 (이용 계약의 성립)</span><br/>
                                    <span>① 이용계약은 사용자가 온라인으로 본 사이트에서 제공하는 이용계약 신청서를 작성하여 가입을 완료하는 것으로 성립됩니다. ② 본 사이트는 다음 각 호에 해당하는 경우에 가입을 취소할 수 있습니다. 1. 다른 사람의 명의를 사용하여 신청하였을 때 2. 이용 계약 신청서의 내용을 허위로 기재하였거나 신청하였을 때 3. 사회의 안녕 질서 혹은 미풍양속을 저해할 목적으로 신청하였을 때 4. 다른 사람의 본 사이트 서비스 이용을 방해하거나 그 정보를 도용하는 등의 행위를 하였을 때 5. 본 사이트를 이용하여 법령과 본 약관이 금지하는 행위를 하는 경우 6. 기타 본 사이트가 정한 이용신청요건이 미비 되었을 때 ③ 본 사이트는 다음 각 호에 해당하는 경우 그 사유가 소멸될 때까지 이용계약 성립을 유보할 수 있습니다. 1. 서비스 관련 제반 용량이 부족한 경우 2. 기술상 장애 사유가 있는 경우 ④ 본 사이트가 제공하는 서비스는 자체 개발하거나 다른 기관과의 협의 등을 통해 제공하는 일체의 서비스를 말하는 것이며, 그 내용을 변경할 경우에는 사용자에게 공지한 후 변경하여 제공할 수 있습니다.</span><br/>
                                    <br/><span>제 6 조 (회원정보 사용에 대한 동의)</span><br/>
                                    <span>① 회원의 개인정보는 공공기관의 개인정보보호법에 의해 보호되며 본 사이트의 개인정보처리방침이 적용됩니다. ② 본 사이트의 회원 정보는 다음과 같이 수집, 사용, 관리, 보호됩니다. 1. 개인정보의 수집 : 본 사이트는 회원 가입시 회원이 제공하는 정보를 수집합니다. 2. 개인정보의 사용 : 본 사이트는 서비스 제공과 관련해서 수집된 회원정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않습니다. 단, 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가 있는 경우, 범죄에 대한 수사상의 목적이 있거나 방송통신심의위원회의 요청이 있는 경우 또는 기타 관계법령에서 정한 절차에 따른 요청이 있는 경우, 회원이 본 사이트에 제공한 개인정보를 스스로 공개한 경우에는 그러하지 않습니다. 3. 개인정보의 관리 : 회원은 개인정보의 보호 및 관리를 위하여 서비스의 개인정보관리에서 수시로 회원의 개인정보를 수정/삭제할 수 있습니다. 수신되는 정보 중 불필요하다고 생각되는 부분도 변경/조정할 수 있습니다. 개인정보의 이용기간은 사용자가 가입을 완료하고 개인정보관리에서 회원가입을 탈퇴하는 시점이며 보호기간도 동일합니다. 4. 개인정보의 보호 : 회원의 개인정보는 오직 회원만이 열람/수정/삭제 할 수 있으며, 이는 전적으로 회원의 아이디와 비밀번호에 의해 관리되고 있습니다. 따라서 타인에게 본인의 아이디와 비밀번호를 알려주어서는 아니 되며, 작업 종료 시에는 반드시 로그아웃 해주시고, 웹 브라우저의 창을 닫아주시기 바랍니다(이는 타인과 컴퓨터를 공유하는 인터넷 카페나 도서관 같은 공공장소에서 컴퓨터를 사용하는 경우에 회원의 정보의 보호를 위하여 필요한 사항입니다.)</span><br/>
                                    <br/><span>제 7 조 (회원의 정보 보안)</span><br/>
                                    <span>① 가입 신청자가 본 사이트 서비스 가입 절차를 완료하는 순간부터 회원은 입력한 정보의 비밀을 유지할 책임이 있으며, 회원의 아이디와 비밀번호를 타인에게 제공하여 발생하는 모든 결과에 대한 책임은 회원 본인에게 있습니다. ② 아이디와 비밀번호에 관한 모든 관리의 책임은 회원에게 있으며, 회원의 아이디나 비밀번호가 부정하게 사용되었다는 사실을 발견한 경우에는 즉시 본 사이트에 신고하여야 합니다. 신고를 하지 않음으로 인한 모든 책임은 회원 본인에게 있습니다. ③ 회원은 본 사이트 서비스의 사용 종료 시마다 정확히 접속을 종료하도록 해야 하며, 정확히 종료하지 아니함으로써 제3자가 사용자 또는 회원에 관한 정보를 이용하게 되는 등의 결과로 인해 발생하는 손해 및 손실에 대하여 본 사이트는 책임을 부담하지 아니합니다.</span><br/>
                                    <br/><span>제 8 조 (서비스 이용시간)</span><br/>
                                    <span>① 서비스 이용시간은 본 사이트의 업무상 또는 기술상 특별한 지장이 없는 한 연중무휴, 1일 24시간을 원칙으로 합니다. ② 제1항의 이용시간은 정기점검 등의 필요로 인하여 본 사이트가 정한 날 또는 시간 및 예기치 않은 사건사고로 인한 시간은 예외로 합니다.</span><br/>
                                    <br/><span>제 9 조 (서비스의 중지 및 정보의 저장과 사용)</span><br/>
                                    <span>① 본 사이트 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 국가의 비상사태, 정전, 본 사이트의 관리 범위 외의 서비스 설비 장애 및 기타 불가항력에 의하여 보관되지 못하였거나 삭제된 경우, 전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 본 사이트는 관련 책임을 부담하지 아니합니다. ② 본 사이트가 정상적인 서비스 제공의 어려움으로 인하여 일시적으로 서비스를 중지하여야 할 경우에는 서비스 중지 1주일 전의 고지 후 서비스를 중지할 수 있으며, 이 기간 동안 사용자가 고지내용을 인지하지 못한 데 대하여 본 사이트는 책임을 부담하지 아니합니다. 부득이한 사정이 있을 경우 위 사전 고지기간은 감축되거나 생략될 수 있습니다. 또한 위 서비스 중지에 의하여 본 서비스에 보관되거나 전송된 메시지 및 기타 통신 메시지 등의 내용이 보관되지 못하였거나 삭제․전송되지 못한 경우 및 기타 통신 데이터의 손실이 있을 경우에 대하여도 본 사이트는 책임을 부담하지 아니합니다. ③ 본 사이트의 사정으로 서비스를 영구적으로 중단하여야 할 경우 제2항에 의거합니다. 다만, 이 경우 사전 고지기간은 1개월로 합니다. ④ 본 사이트는 사전 고지 후 서비스를 일시적으로 수정, 변경 및 중단할 수 있으며, 이에 대하여 사용자 또는 제3자에게 어떠한 책임도 부담하지 아니합니다. ⑤ 본 사이트는 사용자가 본 약관의 내용에 위배되는 행동을 한 경우, 임의로 서비스 사용을 제한 및 중지할 수 있습니다. 이 경우 본 사이트는 위 사용자의 접속을 금지할 수 있습니다. ⑥ 장기간 휴면 회원인 경우 안내 메일 또는 공지사항 발표 후 1주일간의 통지 기간을 거쳐 서비스 사용을 중지할 수 있습니다.</span><br/>
                                    <br/><span>제 10 조 (서비스의 변경 및 해지)</span><br/>
                                    <span>① 본 사이트는 사용자가 서비스를 이용하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않으며, 회원이 본 서비스에 게재한 정보, 자료, 사실의 신뢰도, 정확성 등 내용에 관하여는 책임을 지지 않습니다. ② 본 사이트는 서비스 이용과 관련하여 가입자에게 발생한 손해 중 가입자의 고의, 과실에 의한 손해에 대하여 책임을 부담하지 아니합니다. ③ 회원을 탈퇴하고자 하는 경우에는 본 사이트 로그인 후 회원탈퇴 절차에 따라 해지할 수 있습니다.</span><br/>
                                    <br/><span>제 11 조 (정보 제공 및 홍보물 게재)</span><br/>
                                    <span>① 본 사이트는 서비스를 운영함에 있어서 각종 정보를 서비스에 게재하는 방법 등으로 회원에게 제공할 수 있습니다. ② 본 사이트는 서비스에 적절하다고 판단되거나 활용 가능성 있는 홍보물을 게재할 수 있습니다.</span><br/>
                                    <br/><span>제 12 조 (게시물의 저작권)</span><br/>
                                    <span>① 사용자가 게시한 게시물의 내용에 대한 권리는 사용자에게 있습니다. ② 본 사이트는 게시된 내용을 사전 통지 없이 편집, 이동할 수 있는 권리를 보유하며, 다음의 경우 사전 통지 없이 삭제할 수 있습니다. 1. 본 이용약관에 위배되거나 상용 또는 불법, 음란, 저속하다고 판단되는 게시물을 게시한 경우 2. 다른 사용자 또는 제 3자를 비방하거나 중상모략으로 명예를 손상시키는 내용인 경우 3. 공공질서 및 미풍양속에 위반되는 내용인 경우 4. 범죄적 행위에 결부된다고 인정되는 내용일 경우 5. 제3자의 저작권 등 기타 권리를 침해하는 내용인 경우 6. 기타 관계 법령에 위배되는 경우 ③ 사용자의 게시물이 타인의 저작권을 침해함으로써 발생하는 민․형사상의 책임은 전적으로 사용자가 부담하여야 합니다.</span><br/>
                                    <br/><span>제 13 조 (사용자의 행동규범 및 서비스 이용제한)</span><br/>
                                    <span>① 사용자가 제공하는 정보의 내용이 허위인 것으로 판명되거나, 그러하다고 의심할 만한 합리적인 사유가 발생할 경우 본 사이트는 사용자의 본 서비스 사용을 일부 또는 전부 중지할 수 있으며, 이로 인해 발생하는 불이익에 대해 책임을 부담하지 아니합니다. ② 사용자가 본 사이트 서비스를 통하여 게시, 전송, 입수하였거나 전자메일 기타 다른 수단에 의하여 게시, 전송 또는 입수한 모든 형태의 정보에 대하여는 사용자가 모든 책임을 부담하며 본 사이트는 어떠한 책임도 부담하지 아니합니다. ③ 본 사이트는 본 사이트가 제공한 서비스가 아닌 가입자 또는 기타 유관기관이 제공하는 서비스의 내용상의 정확성, 완전성 및 질에 대하여 보장하지 않습니다. 따라서 본 사이트는 사용자가 위 내용을 이용함으로 인하여 입게 된 모든 종류의 손실이나 손해에 대하여 책임을 부담하지 아니합니다. ④ 사용자는 본 서비스를 통하여 다음과 같은 행동을 하지 않는데 동의합니다. 1. 타인의 아이디와 비밀번호를 도용하는 행위 2. 저속, 음란, 모욕적, 위협적이거나 타인의 사생활을 침해할 수 있는 내용을 전송, 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위 3. 서비스를 통하여 전송된 내용의 출처를 위장하는 행위 4. 법률, 계약에 의하여 이용할 수 없는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위 5. 타인의 특허, 상표, 영업비밀, 저작권, 기타 지적재산권을 침해하는 내용을 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위 6. 본 사이트의 승인을 받지 아니한 광고, 판촉물, 정크메일, 스팸, 행운의 편지, 피라미드 조직 기타 다른 형태의 권유를 게시, 게재, 전자메일 또는 기타의 방법으로 전송하는 행위 7. 다른 사용자의 개인정보를 수집 또는 저장하는 행위 ⑤ 본 사이트는 회원이 본 약관을 위배했다고 판단되면 서비스와 관련된 모든 정보를 사용자의 동의 없이 삭제할 수 있습니다. ⑥ 제1항의 규정에 의하여 서비스의 제한을 받게 된 사용자가 위 조치에 대한 이의가 있을 경우에는 이의신청을 할 수 있으나 서비스 제한 시 삭제된 사용자의 데이터에 대해서는 책임지지 아니합니다. ⑦ 본 사이트는 제6항의 규정에 의한 이의신청에 대하여 그 확인이 완료될 때까지 이용제한을 연기할 수 있습니다.</span><br/>
                                    <br/><span>제 3 장 의무 및 책임</span><br/>
                                    <br/><span>제 14 조 (본 사이트의 의무)</span><br/>
                                    <span>① 본 사이트는 법령과 본 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 지속적이고 안정적으로 서비스를 제공하기 위해 노력할 의무가 있습니다. ② 본 사이트는 회원의 개인 신상 정보를 본인의 승낙 없이 타인에게 누설, 배포하지 않습니다. 다만, 전기통신관련법령 등 관계법령에 의하여 관계 국가기관 등의 요구가 있는 경우에는 그러하지 아니합니다. ③ 본 사이트는 사용자가 안전하게 본 사이트 서비스를 이용할 수 있도록 사용자의 개인정보 (신용정보 포함) 보호를 위한 보안시스템을 갖추어야 합니다. ④ 본 사이트는 사용자의 귀책사유로 인한 서비스 이용 장애에 대하여 책임을 지지 않습니다.</span><br/>
                                    <br/><span>제 15 조 (회원의 의무)</span><br/>
                                    <span>① 회원 가입시에 요구되는 정보는 정확하게 기입하여야 합니다. 또한 이미 제공된 회원에 대한 정보가 정확한 정보가 되도록 유지, 갱신하여야 하며, 회원은 자신의 아이디 및 비밀번호를 제3자에게 이용하게 해서는 안 됩니다. ② 회원은 본 사이트의 사전 승낙 없이 서비스를 이용하여 어떠한 영리행위도 할 수 없습니다. ③ 회원은 본 사이트 서비스를 이용하여 얻은 정보를 본 사이트의 사전승낙 없이 복사, 복제, 변경, 번역, 출판·방송 기타의 방법으로 사용하거나 이를 타인에게 제공할 수 없습니다. ④ 사용자는 본 사이트 서비스 이용과 관련하여 다음 각 호의 행위를 하여서는 안 됩니다. 1. 다른 회원의 아이디를 부정 사용하는 행위 2. 범죄행위를 목적으로 하거나 기타 범죄행위와 관련된 행위 3. 선량한 풍속, 기타 사회질서를 해하는 행위 4. 타인의 명예를 훼손하거나 모욕하는 행위 5. 타인의 지적재산권 등의 권리를 침해하는 행위 6. 해킹행위 또는 컴퓨터바이러스의 유포행위 7. 타인의 의사에 반하여 광고성 정보 등 일정한 내용을 지속적으로 전송하는 행위 8. 서비스의 안전적인 운영에 지장을 주거나 줄 우려가 있는 일체의 행위 9. 본 사이트에 게시된 정보의 변경</span><br/>
                                    <br/><span>제 4 장 기 타</span><br/>
                                    <br/><span>제 16 조 (본 사이트의 소유권)</span><br/>
                                    <span>① 본 사이트가 제공하는 서비스, 그에 필요한 소프트웨어, 이미지, 마크, 로고, 디자인, 서비스명칭, 정보 및 상표 등과 관련된 지적재산권 및 기타 권리는 본 사이트에 소유권이 있습니다. ② 사용자는 본 사이트가 명시적으로 승인한 경우를 제외하고는 전항의 소정의 각 재산에 대한 전부 또는 일부의 수정, 대여, 대출, 판매, 배포, 제작, 양도, 재라이센스, 담보권 설정 행위, 상업적 이용 행위를 할 수 없으며, 제3자로 하여금 이와 같은 행위를 하도록 허락할 수 없습니다.</span><br/>
                                    <br/><span>제 17 조 (양도금지)</span><br/>
                                    <span>회원이 서비스의 이용권한, 기타 이용계약 상 지위를 타인에게 양도, 증여할 수 없으며, 이를 담보로 제공할 수 없습니다.</span><br/>
                                    <br/><span>제 18 조 (손해배상)</span><br/>
                                    <span>본 사이트는 무료로 제공되는 서비스와 관련하여 회원에게 어떠한 손해가 발생하더라도 본 사이트가 고의로 행한 범죄행위를 제외하고 이에 대하여 책임을 부담하지 아니합니다.</span><br/>
                                    <br/><span>제 19 조 (면책조항)</span><br/>
                                    <span>① 본 사이트는 서비스에 표출된 어떠한 의견이나 정보에 대해 확신이나 대표할 의무가 없으며 회원이나 제3자에 의해 표출된 의견을 승인하거나 반대하거나 수정하지 않습니다. 본 사이트는 어떠한 경우라도 회원이 서비스에 담긴 정보에 의존해 얻은 이득이나 입은 손해에 대해 책임이 없습니다. ② 본 사이트는 회원간 또는 회원과 제3자간에 서비스를 매개로 하여 물품거래 혹은 금전적 거래 등과 관련하여 어떠한 책임도 부담하지 아니하고, 회원이 서비스의 이용과 관련하여 기대하는 이익에 관하여 책임을 부담하지 않습니다.</span><br/>
                                    <br/><span>제 20 조 (관할법원)</span><br/>
                                    <span>본 서비스 이용과 관련하여 발생한 분쟁에 대해 소송이 제기될 경우 대전지방법원을 전속적 관할 법원으로 합니다.</span><br/>
                                    <br/><span>부 칙 (시행일)</span><br/><br/>
                                    <span>본 약관은 2025년 3월 1일부터 시행됩니다. 개정된 약관의 적용일자 이전 사용자 또는 회원은 개정된 이용약관의 적용을 받습니다.</span><br/>
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
                                    <span>1. 개인정보의 수집항목 및 수집 방법</span><br/>
                                    <span> 포켓폴리오에서는 기본적인 회원 서비스 제공을 위한 필수정보로 다음의 정보를 수집하고 있습니다. 필수정보를 입력해주셔야 회원 서비스를 이용 가능합니다.</span><br/>
                                    <br/><span>가. 수집하는 개인정보의 항목</span><br/>
                                    <span>- 이름, 이메일 주소</span><br/>
                                    <br/><span>[컴퓨터에 의해 자동으로 수집되는 정보]</span><br/>
                                    <span>인터넷 서비스 이용과정에서 아래 개인정보 항목이 자동으로 생성되어 수집될 수 있습니다.</span><br/>
                                    <span>- IP주소, 서비스 이용기록, 방문기록 등</span><br/>
                                    <br/><span>나. 개인정보 수집방법 홈페이지 회원가입을 통한 수집</span><br/>
                                    <br/><span>2. 개인정보의 수집/이용목적 및 보유/이용 기간</span><br/>
                                    <span>포켓폴리오에서는 정보주체의 회원 가입일로부터 서비스를 제공하는 기간 동안에 한하여 포켓폴리오 서비스를 이용하기 위한 최소한의 개인정보를 보유 및 이용 하게 됩니다. 회원가입 등을 통해 개인정보의 수집·이용, 제공 등에 대해 동의하신 내용은 언제든지 철회하실 수 있습니다. 회원 탈퇴를 요청하거나 수집/이용목적을 달성하거나 보유/이용기간이 종료한 경우, 사업 폐지 등의 사유발생시 개인 정보를 지체없이 파기합니다.</span><br/>
                                    <br/><span>수집하는 개인정보항목</span><br/>
                                    <span>- 이름, 이메일 주소(아이디)</span><br/>
                                    <br/><span>개인정보의 수집·이용목적</span><br/>
                                    <span>- 홈페이지 이용에 따른 본인 식별/인증절차에 이용, 홈페이지 서비스 이용 및 회원관리, 불량회원의 부정 이용방지, 민원신청 및 처리</span><br/>
                                    <br/><span>개인정보의 보유 및 이용기간</span><br/>
                                    <span>- 2년 정보주체는 개인정보의 수집·이용목적에 대한 동의를 거부할 수 있으며, 동의 거부시 포켓폴리오에 회원가입이 되지 않으며, 통계청 통계정보사이트 에서 제공하는 서비스를 이용할 수 없습니다.</span>
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
                                    <SendCodeButton onClick={handleEmailCheck} disabled={!isEmailValid}>
                                        <span>인증번호 요청</span>
                                    </SendCodeButton>
                                </SendCodeWrapper>
                            </InfoWrapper>
                            {/* 인증번호 */}
                            <InfoWrapper>
                                <Title>인증번호</Title>
                                <SendCodeWrapper>
                                    <InputField
                                        type="text"
                                        placeholder="인증번호 6자리를 입력해 주세요"
                                        maxLength={6}
                                        value={inputCode}
                                        onChange={(e) => {
                                            // 숫자만 입력되도록 처리
                                            const value = e.target.value.replace(/[^0-9]/g, '');
                                            setInputCode(value);
                                        }}
                                    />
                                    <SendCodeButton onClick={handleVerifyCode} disabled={!isCodeValid}>
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
                            <NextButton disabled={!isVerified && !isValidPassword} onClick={handleSignUp}>
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
