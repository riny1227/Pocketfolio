import { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from 'react-router-dom';

// 대체 이미지 사용
import exampleImg from '../imgs/article_example.png';

// ArticleDetail 전체 컴포넌트 감싸는 컨테이너
const ArticleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

// 아티클 커버
const ArticleCover = styled.div`
    margin-top: 102px;
    height: 240px;
    display: flex;
    padding: 52px 0px 46px 0px;
    justify-content: center;
    align-items: center;
    align-self: stretch;
    position: relative;
    overflow: hidden; /* 이미지가 넘치지 않도록 설정 */

    // img 위에 반투명 오버레이 적용 (텍스트 등에는 적용 안하고 이미지에만 적용)
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 1;
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

// 아티클 상단 부분
const ArticleTextIcon = styled.div`
    // position: absolute;
    // top: 0;
    // left: 0;
    // display: flex;
    // width: 100%;
    // height: 240px;
    // flex-direction: column;
    // justify-content: center;
    // align-items: flex-end;

    display: flex;
    width: 1440px;
    padding: 0px 104px;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    z-index: 1;
`;

// 북마크 아이콘
const BookmarkIcon = styled.div`
    display: flex;
    width: 36px;
    height: 36px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

// 아티클 상단 이름
const ArticleName = styled.div`
    // color:  #d5d5d5;
    // font-feature-settings: 'liga' off, 'clig' off;
    // font-family: 'Pretendard-Bold';
    // font-size: 24px;
    // font-style: normal;
    // font-weight: 700;
    // line-height: 36px;

    align-self: stretch;
    color: #D5D5D5;
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Bold';
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 36px;
`;

// 아티클 제목과 날짜 부분
const TitleDate = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-self: stretch;
`;

// 아티클 상단 제목
const ArticleTitle = styled.div`
    color: #fff;
    font-feature-settings: 'liga' off, 'clig' off;
    font-family: 'Pretendard-Bold';
    font-size: 42px;
    font-style: normal;
    font-weight: 700;
    line-height: 58px;
`;

// 아티클 상단 날짜
const ArticleDate = styled.div`
    color: var(--Gray-Gray50, #FDFDFD);
    font-feature-settings: 'liga' off, 'clig' off;

    font-family: 'Pretendard-Regular';
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
`;

// 아티클 하단 컨테이너
const ArticleBottomContainer = styled.div`
    margin: 56px auto;
    padding: 0 104px;
    box-sizing: border-box;
    width: 1440px;
`;

// 아티클 하단 내용
const ArticleContent = styled.div`
    width: 1232px;

    p {
        color: #000;
        font-family: 'Pretendard-Medium';
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 160%;
    }
`;

const ArticleDetail = () => {
    const [isBookmarked, setIsBookmarked] = useState(false);

    const [article, setArticle] = useState(null);

    const { id } = useParams();

    useEffect(() => {
        fetch('/mockdata/Articles.json')
            .then((response) => response.json())
            .then((data) => {
                const foundArticle = data.find(a => a.id === Number(id)); // id로 아티클 찾기
                setArticle(foundArticle);
            });
    }, [id]);

    if (!article) {
        return <div>Article not found.</div>;
    }

    return (
        <ArticleContainer>
            {/* 상단 아티클 커버 */}
            <ArticleCover>
                <img src={exampleImg}/>
                <ArticleTextIcon>
                    {/* <TopTextContainer> */}
                    <BookmarkIcon
                        onClick={(e) => {
                            setIsBookmarked(prev => !prev);
                        }}
                    >
                        {isBookmarked ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" viewBox="0 0 22 30" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C2.51472 0 0.5 2.01472 0.5 4.5V28.5C0.5 29.0199 0.769179 29.5027 1.2114 29.776C1.65363 30.0493 2.20584 30.0741 2.67082 29.8416L11 25.6771L19.3292 29.8416C19.7942 30.0741 20.3464 30.0493 20.7886 29.776C21.2308 29.5027 21.5 29.0199 21.5 28.5V4.5C21.5 2.01472 19.4853 0 17 0H5Z" fill="#1570EF"/>
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32" fill="none">
                                <path d="M3.67082 30.8416L3.22361 29.9472L3.22361 29.9472L3.67082 30.8416ZM12 26.6771L12.4472 25.7826C12.1657 25.6419 11.8343 25.6419 11.5528 25.7826L12 26.6771ZM20.3292 30.8416L20.7764 29.9472L20.7764 29.9472L20.3292 30.8416ZM2.5 5.5C2.5 3.567 4.067 2 6 2V0C2.96243 0 0.5 2.46243 0.5 5.5H2.5ZM2.5 29.5V5.5H0.5V29.5H2.5ZM2.73713 29.9253C2.58973 29.8342 2.5 29.6733 2.5 29.5H0.5C0.5 30.3664 0.948631 31.1711 1.68567 31.6266L2.73713 29.9253ZM3.22361 29.9472C3.06861 30.0247 2.88454 30.0164 2.73713 29.9253L1.68567 31.6266C2.42271 32.0821 3.34306 32.1236 4.11804 31.7361L3.22361 29.9472ZM11.5528 25.7826L3.22361 29.9472L4.11803 31.7361L12.4472 27.5715L11.5528 25.7826ZM20.7764 29.9472L12.4472 25.7826L11.5528 27.5715L19.882 31.7361L20.7764 29.9472ZM21.2629 29.9253C21.1155 30.0164 20.9314 30.0247 20.7764 29.9472L19.882 31.7361C20.6569 32.1236 21.5773 32.0821 22.3143 31.6266L21.2629 29.9253ZM21.5 29.5C21.5 29.6733 21.4103 29.8342 21.2629 29.9253L22.3143 31.6266C23.0514 31.1711 23.5 30.3664 23.5 29.5H21.5ZM21.5 5.5V29.5H23.5V5.5H21.5ZM18 2C19.933 2 21.5 3.567 21.5 5.5H23.5C23.5 2.46243 21.0376 0 18 0V2ZM6 2H18V0H6V2Z" fill="#F8F8F8"/>
                            </svg>
                        )}
                    </BookmarkIcon>
                        <ArticleName>{article.name}</ArticleName>
                        <TitleDate>
                            <ArticleTitle>{article.title}</ArticleTitle>
                            <ArticleDate>{article.date}</ArticleDate>
                        </TitleDate>
                    {/* </TopTextContainer> */}
                </ArticleTextIcon>
            </ArticleCover>
            {/* 하단 아티클 내용 */}
            <ArticleBottomContainer>
            <ArticleContent>
                {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </ArticleContent>
            </ArticleBottomContainer>
        </ArticleContainer>
    );
};

export default ArticleDetail;