import React from "react";
import "./AboutProject.css"
function AboutProject() {
    return (
        <section className="main__about">
            <div className="main__header">
               <h2 className="main__header__subtitle">О проекте</h2>  
            </div>
           
        <div className="main__about__headers">

            <h3 className="main__about__info-subtitle">Дипломный проект включал 5 этапов</h3>
            <h3 className="main__about__info-subtitle">На выполнение диплома ушло 5 недель</h3>
</div>
<div className="main__about__info">
            <p className="main__about__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="main__about__info-text">У каждого был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
    
        </div>
        <div className="main__about__time">
            <p className="main__about__time-1">1 неделя</p>
            <p className="main__about__time-2">4 недели</p>
        </div>
        <div className="main__about__time-span">
            <p className="main__about__time-span-text">Back-end</p>
            <p className="main__about__time-span-text">Front-end</p>
        </div>
        </section>
    )
}

export default AboutProject;