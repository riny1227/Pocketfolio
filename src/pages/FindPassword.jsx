import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginContainer = styled.div`
    width: 100%;
    height: 858px;
    flex-shrink: 0;
    padding-top: 102px;
    box-sizing: border-box;
`;

// 로그인 페이지 가운데의 타이틀 + input 칸 + 버튼 + a 태그 등을 감싸는 컨테이너
const CenterWrapper = styled.div`
    margin-top: 198px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

// 로그인 타이틀
const LoginTitle = styled.div`
    color: #464646;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Bold';
    font-size: 32px;
    font-style: normal;
    line-height: 40px;
`;

// 비밀번호 찾기 설명 부분
const Description = styled.div`
    color: #909090;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Regular';
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;=
`;

// 아이디 칸, 비밀번호 칸, 로그인 버튼 감싸는 컨테이너
const InputButtonWrapper = styled.div`
    display: flex;
    width: 480px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 48px;
`;

// 아이디, 비밀번호 칸
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

// 로그인 버튼
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

// 비밀번호 찾기, 회원가입 링크
const StyledLink = styled(Link)`
    text-decoration: none;
    color:  #6C6C6C;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    line-height: 24px;
`;

export default function FindPassword() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const isDisabled = id.trim() === "" || password.trim() === ""; // 공백 제외하고 입력된 문자 체크

    const handleLogin = () => {
        if (!isDisabled) {
            login(id);
            navigate("/"); // 로그인 후 메인 페이지로 이동
        }
    };

    return (
        <LoginContainer>
            <CenterWrapper>
                <LoginTitle>비밀번호를 잊으셨나요?</LoginTitle>
                <Description>비밀번호를 재설정하려면 아래에 계정 ID를 입력해주세요.</Description>
                <InputButtonWrapper>
                    {/* 아이디 입력 칸 */}
                    <StyledInput 
                        type="text"
                        placeholder="이메일을 입력해주세요"
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                    />


                    {/* 로그인 버튼 */}
                    <StyledButton disabled={isDisabled} onClick={handleLogin}>인증번호 요청</StyledButton>
                </InputButtonWrapper>
                <LinkWrapper>
                    {/* 비밀번호 찾기 링크 - 페이지 생성 이후 연결 링크 수정!!!!!!!!!!!!!!! */}
                    <StyledLink to="/login">로그인</StyledLink>
                </LinkWrapper>
            </CenterWrapper>
        </LoginContainer>
    )
};