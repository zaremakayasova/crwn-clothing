import styled from 'styled-components';

export const ContactPageContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

@media screen and ( max-width: 800px ) {
    padding: 15px;
}
`;

export const TitleContainer = styled.h1`
text-transform: uppercase;
letter-spacing: 0.1em;
`;

export const TextInfoContainer = styled.span`
font-style: italic;
letter-spacing: 0.03em;
font-size: 17px;
`;

export const CategoriesContainer = styled.h3`
text-transform: uppercase;
letter-spacing: 0.05em;
`;

export const TextContainer = styled.span`
font-size: 17px;
`;

export const ImageContentContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
`;

export const ImgContainer = styled.img`
width: 20vw;

            @media screen and ( max-width: 800px) {
                display:none;
            }
`;

export const TextBetweenContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin: 0px 20px;
`;