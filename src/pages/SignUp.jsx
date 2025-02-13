import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 대체 이미지 사진 사용
import exampleImg from '../imgs/example.png'

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
    margin-top: 102px;
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

const StepContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px;
    max-width: 500px;
    margin: 0 auto;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StepButton = styled.button`
    padding: 12px 30px;
    background-color: #1570EF;
    color: #fff;
    border: none;
    border-radius: 30px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0f5ecf;
    }
`;

const InputField = styled.input`
    width: 100%;
    padding: 12px;
    margin: 10px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 16px;

    &:focus {
        border-color: #1570EF;
        outline: none;
    }
`;

export default function SignUp() {
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1); // 현재 단계 추적
    const [agree, setAgree] = useState(false); // 약관 동의 여부
    const [userInfo, setUserInfo] = useState({ name: '', email: '' }); // 사용자 정보

    const handleNextStep = () => {
        if (step === 1 && !agree) {
            alert('약관에 동의해주세요.');
            return;
        }
        if (step === 2 && (!userInfo.name || !userInfo.email)) {
            alert('모든 정보를 입력해주세요.');
            return;
        }
        setStep(step + 1);
    };

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    return (
        <SignUpContainer>
            <DetailContainer>
                <SignUpText>회원가입</SignUpText>
                {step === 1 && (
                    <StepContainer>
                        <h2>약관 동의</h2>
                        <p>회원가입을 위해 약관에 동의해주세요.</p>
                        <label>
                            <input 
                                type="checkbox" 
                                checked={agree}
                                onChange={() => setAgree(!agree)} 
                            />
                            약관에 동의합니다.
                        </label>
                        <StepButton onClick={handleNextStep}>다음</StepButton>
                    </StepContainer>
                )}

                {step === 2 && (
                    <StepContainer>
                        <h2>정보 입력</h2>
                        <InputField
                            type="text"
                            name="name"
                            placeholder="이름"
                            value={userInfo.name}
                            onChange={handleInputChange}
                        />
                        <InputField
                            type="email"
                            name="email"
                            placeholder="이메일"
                            value={userInfo.email}
                            onChange={handleInputChange}
                        />
                        <StepButton onClick={handleNextStep}>다음</StepButton>
                    </StepContainer>
                )}

                {step === 3 && (
                    <StepContainer>
                        <h2>가입 완료</h2>
                        <p>환영합니다, {userInfo.name}님!</p>
                        <StepButton onClick={() => navigate('/')}>홈으로</StepButton>
                    </StepContainer>
                )}
            </DetailContainer>
        </SignUpContainer>
    );
}
