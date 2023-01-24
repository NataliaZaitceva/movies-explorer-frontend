import React from "react";
import "./AboutProject.css"
function AboutProject() {
    return (
        <section className="main__about">
            <div className="main__header">
               <h2 className="main__header__subtitle">О проекте</h2>  
            </div>
           
            <h3 className="main__about__info-subtitle">Дипломный проект включал 5 этапов</h3>
                        <p className="main__about__info-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>

            
            <h3 className="main__about__info-subtitle">На выполнение диплома ушло 5 недель</h3>

            <p className="main__about__info-text">У каждого был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
    
     
        <div className="main__about__time">
            <p className="main__about__time-1">1 неделя
                        <span className="main__about__time-span">Back-end
                        
                        </span>
                        </p>
            
            <p className="main__about__time-2">4 недели
                        
            <span className="main__about__time-span">Front-end</span>
            </p>

        </div>
        </section>
    )
}

export default AboutProject;