import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { findPassword, verifyCode, resetPassword } from "../api/PasswordApi";

// 비밀번호 찾기 페이지 전체 컴포넌트
const FindPasswordContainer = styled.div`
    width: 100%;
    height: 858px;
    flex-shrink: 0;
    padding-top: 102px;
    box-sizing: border-box;
`;

// 비밀번호 찾기 페이지 가운데의 타이틀 + 안내 문구 + input 칸 + 버튼 + a 태그 등을 감싸는 컨테이너
const CenterWrapper = styled.div`
    margin-top: 198px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 기본 타이틀
const FindPasswordTitle = styled.div`
    color: #464646;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Bold';
    font-size: 32px;
    font-style: normal;
    line-height: 40px;
`;

// 기본 작은 타이틀
const FindPasswordSubtitle = styled.div`
    margin-top: 8px;
    color:  #909090;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Regular';
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
`;

// input 과 button 감싸는 컨테이너
const InputButtonWrapper = styled.div`
    display: flex;
    width: 480px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 48px;
`;

// 아이디 & 인증번호 & 비밀번호 칸
const StyledInput = styled.input`
    display: flex;
    height: 64px;
    padding: 16px 24px;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    border: 1px solid #D9D9D9;
    box-sizing: border-box;
    outline: none;

    color: #222;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    line-height: 24px;

    &::placeholder {
        color:  #909090;
    }
`;

// 인증번호 요청 & 인증번호 확인 & 비밀번호 재설정 버튼
const StyledButton = styled.button`
    display: flex;
    height: 64px;
    padding: 16px 32px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    border-radius: 12px;
    box-sizing: border-box;
    background-color: ${(props) => (props.disabled ? "#e6e6e6" : "#1570EF")};
    border: none;
    outline: none;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

    color: ${(props) => (props.disabled ? "#909090" : "#fff")};
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    font-style: normal;
    line-height: 24px;
`;

// 링크를 감싸는 컨테이너
const LinkWrapper = styled.div`
    display: flex;
    gap: 48px;
    margin-top: 32px;
`;

// 로그인 링크
const StyledLink = styled(Link)`
    text-decoration: none;
    color:  #6C6C6C;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    line-height: 24px;
`;

// 비밀번호 찾기 완료 타이틀
const SuccessTitle = styled.div`
    margin-top: 48px;
    color: #222;
    text-align: center;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Bold';
    font-size: 32px;
    font-style: normal;
    line-height: 40px /* 125% */
`;

// 버튼 묶음
const LinkButtonWrapper = styled.div`
    margin-top: 80px;
    display: flex;
    gap: 20px;
`;

// 메인으로 버튼
const MainButton = styled.button`
    display: flex;
    width: 240px;
    height: 64px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 1px solid  #6C6C6C;
    background: #FFF;
    cursor: pointer;

    text-decoration: none;
    color:  #464646;
    text-align: center;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
`;

// 로그인 버튼
const LoginButton = styled.button`
    display: flex;
    width: 240px;
    height: 64px;
    padding: 12px 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    border: 0;
    background: #DCEAFD;
    cursor: pointer;

    color:  #1570EF;
    text-align: center;
    font-family: 'Pretendard-SemiBold';
    font-size: 20px;
    font-style: normal;
    line-height: 24px;
`;

export default function FindPassword() {
    const [step, setStep] = useState(0);
    const [id, setId] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");

    // 이메일 형식 검사 정규식
    const isValidEmail = (email) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    // 6자리 숫자 확인 정규식
    const isValidCode = (code) => /^\d{6}$/.test(code.trim());

    // 비밀번호 검사 정규식 - 최소 8자 이상이어야 하고 영어 대/소문자, 숫자, 특수기호가 각각 1개 이상 포함되어야 함
    const isValidPassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
    };

    // 이메일 인증번호 요청
    const handleFindPassword = async () => {
        if (!isValidEmail(id.trim())) {
            alert("유효한 이메일을 입력해주세요.");
            return;
        }

        try {
            const data = await findPassword(id);
            alert(data.message); // 서버에서 보내주는 성공 메시지
            setStep(1); // 인증번호 입력 단계로 이동
        } catch (error) {
            alert(error.message || "이메일 인증 요청 중 오류가 발생했습니다.");
        }
    };

    // 인증번호 확인
    const handleVerifyCode = async () => {
        if (!isValidCode(code.trim())) {
            alert("유효한 인증번호를 입력해주세요.");
            return;
        }

        try {
            const data = await verifyCode(id, code);
            alert(data.message); // 인증 성공 메시지
            setStep(2); // 비밀번호 입력 화면으로 이동
        } catch (error) {
            alert(error.message);
        }
    };

    // 비밀번호 재설정
    const handleResetPassword = async () => {
        if (!isValidPassword(newPassword.trim())) {
            alert("비밀번호는 최소 8자 이상, 영문 대소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다.");
            return;
        }
    
        if (newPassword !== checkPassword) {
            alert("비밀번호가 서로 일치하지 않습니다.");
            return;
        }
    
        try {
            const data = await resetPassword(id, newPassword, checkPassword);
            alert(data.message); // 비밀번호 재설정 성공 메시지
            setStep(3); // 완료 단계로 이동
        } catch (error) {
            alert(error.message || "비밀번호 재설정 중 오류가 발생했습니다.");
        }
    };
    
    const renderStep = () => {
        switch (step) {
            case 0: // 아이디 입력
                return (
                    <CenterWrapper>
                        <FindPasswordTitle>비밀번호 찾기</FindPasswordTitle>
                        <FindPasswordSubtitle>비밀번호를 재설정하려면 아래에 계정 ID를 입력해주세요.</FindPasswordSubtitle>
                        <InputButtonWrapper>
                            {/* 아이디 입력 칸 */}
                            <StyledInput 
                                type="email" 
                                placeholder="아이디를 입력해주세요" 
                                value={id} 
                                onChange={(e) => setId(e.target.value)} 
                            />
                            {/* 인증번호 찾기 버튼 */}
                            <StyledButton disabled={!isValidEmail(id.trim())} onClick={handleFindPassword}>인증번호 요청</StyledButton>
                        </InputButtonWrapper>
                        <LinkWrapper>
                            {/* 로그인 링크 */}
                            <StyledLink to="/login">로그인</StyledLink>
                        </LinkWrapper>
                    </CenterWrapper>
                );
            case 1: // 인증번호 입력
                return (
                    <CenterWrapper>
                        <FindPasswordTitle>이메일 인증</FindPasswordTitle>
                        <FindPasswordSubtitle>이메일을 확인해주세요.</FindPasswordSubtitle>
                        <InputButtonWrapper>
                            {/* 인증번호 입력 칸 */}
                            <StyledInput 
                                type="password" 
                                placeholder="인증번호 6자리를 입력해주세요" 
                                value={code} 
                                onChange={(e) => setCode(e.target.value)} 
                            />
                            {/* 인증번호 확인 버튼 */}
                            <StyledButton disabled={!isValidCode(code.trim())} onClick={handleVerifyCode}>인증번호 확인</StyledButton>
                        </InputButtonWrapper>
                    </CenterWrapper>
                );
            case 2: // 새로운 비밀번호 입력
                return (
                    <CenterWrapper>
                        <FindPasswordTitle>비밀번호 재설정</FindPasswordTitle>
                        <FindPasswordSubtitle>새 비밀번호를 입력해주세요.</FindPasswordSubtitle>
                        <InputButtonWrapper>
                            {/* 아이디 입력 칸 */}
                            <StyledInput 
                                type="password" 
                                placeholder="새 비밀번호를 입력해주세요" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                            <StyledInput 
                                type="password" 
                                placeholder="비밀번호를 확인해주세요" 
                                value={checkPassword} 
                                onChange={(e) => setCheckPassword(e.target.value)} 
                            />
                            {/* 인증번호 찾기 버튼 */}
                            <StyledButton onClick={handleResetPassword}>비밀번호 재설정</StyledButton>
                        </InputButtonWrapper>
                    </CenterWrapper>
                );
            case 3: // 완료!
                return (
                    <CenterWrapper>
                        <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
                            <rect width="96" height="96" rx="48" fill="#1570EF"/>
                            <path d="M32 48L44 64L64 32" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <SuccessTitle>비밀번호 설정이 완료되었습니다.</SuccessTitle>
                        <LinkButtonWrapper>
                            <Link to="/" style={{ textDecoration: 'none' }}><MainButton>메인으로</MainButton></Link>
                            <Link to="/login" style={{ textDecoration: 'none' }}><LoginButton>로그인하기</LoginButton></Link>
                        </LinkButtonWrapper>
                    </CenterWrapper>
                );
            default:
                return null;
        }
    };

    return (
        <FindPasswordContainer>
            {renderStep(step)}
        </FindPasswordContainer>
    )
};