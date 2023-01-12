import React from "react";
import Promo from "./Promo";
import AboutProject from "./AboutProject";
import Techs from "./Techs";
import AboutMe from "./AboutMe";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
function Main(props) {
    return (
        <section className="main">
            <Header />
           <Promo /> 
           <AboutProject />
           <Techs />
           <AboutMe />
           <Footer />
        </section>
    )
}

export default Main;