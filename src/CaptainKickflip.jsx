import React from "react";
import style from "./CaptainKickflip.module.css";

class CaptainKickflip extends React.Component {
  render() {
    return (
      <div id={style.container}>
        <h1 className={style.header}>Captain Kickflip 🛹</h1>
        <p className={style.bodyText}>
          Full-Stack <strike>Developer</strike> of Pancakes
        </p>
        <div>{"⭐️".repeat(4)}</div>
      </div>
    );
  }
}

export default CaptainKickflip;
