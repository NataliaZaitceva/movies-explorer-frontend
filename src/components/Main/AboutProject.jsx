import React from "react";
import "./AboutProject.css";
function AboutProject() {
  return (
    <section className="main-about">
      <div className="main-about__header">
        <h2 className="main-about__subtitle">О проекте</h2>
      </div>
      <table className="main-about__table">
        <td>
          <tr>
            <h3 className="main-about__info-subtitle">
              Дипломный проект включал 5 этапов
            </h3>
          </tr>
          <tr>
            <p className="main-about__info-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </tr>
        </td>
        <td>
          <tr>
            <h3 className="main-about__info-subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
          </tr>
          <tr>
            <p className="main-about__info-text">
              У каждого был мягкий и жесткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </tr>
        </td>
      </table>
      <div className="main-about__time">
        <p className="main-about__time-1">
          1 неделя
          <span className="main-about__time-span">Back-end</span>
        </p>

        <p className="main-about__time-2">
          4 недели
          <span className="main-about__time-span">Front-end</span>
        </p>
      </div>
    </section>
  );
}

export default AboutProject;
