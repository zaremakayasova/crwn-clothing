import React from "react";
import Directory from "../../components/directory/directory.component";
import { HomePageContainer } from "./homepage.styles";


const HomePage = () => (
    <HomePageContainer>
        <Directory />
    </HomePageContainer>
);

// const HomePage = () => {
//     throw Error;
//     return (
//         <HomePageContainer>
//             <Directory />
//         </HomePageContainer>
//     );
// };

export default HomePage;