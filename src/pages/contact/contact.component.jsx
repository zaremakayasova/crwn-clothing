import React from "react";

import {
    ContactPageContainer,
    TitleContainer,
    TextInfoContainer,
    TextContainer,
    CategoriesContainer,
    ImageContentContainer,
    ImgContainer,
    TextBetweenContainer
} from './contact.styles';

const ContactPage = () => (
    <ContactPageContainer>
        <TitleContainer>We'd love to hear from you</TitleContainer>
        <TextInfoContainer>Our Customer Service teams are working hard to help you. Please note, we are experiencing longer delivery times due to extra safety precautions being taken at our warehouse. Thank you for your patience.</TextInfoContainer>
        <CategoriesContainer>Opening Hours</CategoriesContainer>
        <TextContainer>Monday - Sunday: 9 am - 11 pm (EST)</TextContainer>
        <ImageContentContainer>
            <ImgContainer src={"https://i.ibb.co/0s3pdnc/adidas-nmd.png"} alt="image" />
            <TextBetweenContainer>
                <CategoriesContainer>Call Us</CategoriesContainer>
                <TextContainer>1-705-937-9907</TextContainer>
                <TextContainer>For phone support, we are available Monday – Sunday: 9am – 11pm (EST)</TextContainer>
                <CategoriesContainer>By Message</CategoriesContainer>
                <TextContainer>Please feel free to send us a message via Facebook Messenger.</TextContainer>
                <CategoriesContainer>By Email</CategoriesContainer>
                <TextContainer>Feel free to send us an email. We aim to reply within 24 hours.</TextContainer>
            </TextBetweenContainer>
            <ImgContainer src={"https://i.ibb.co/1RcFPk0/white-nike-high-tops.png"} alt="image" />
        </ImageContentContainer>
        <CategoriesContainer>By Social Media</CategoriesContainer>
        <TextContainer>Facebook</TextContainer>
        <TextContainer>Twitter</TextContainer>
        <TextContainer>Instagram</TextContainer>
        <CategoriesContainer>Return Address</CategoriesContainer>
        <TextContainer>205 Prince Road West, Unit E,</TextContainer>
        <TextContainer>Toronto, Ontario H0A 2W8</TextContainer>
        <CategoriesContainer>Mailing Address</CategoriesContainer>
        <TextContainer>205 Prince Road West, Unit E,</TextContainer>
        <TextContainer>Toronto, Ontario H0A 2W8</TextContainer>
    </ContactPageContainer>
);

export default ContactPage;