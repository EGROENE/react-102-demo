import React from "react";
import style from "./SuperCoolBox.module.css";

const SuperCoolBox = () => {
  return (
    <div className={style.box}>
      <h2 className={style.header}>An even cooler box</h2>
      <p className={style.paragraph}>
        Vernunft fängt wieder an zu sprechen Und Hoffnung wieder an zu blühn;
        Man sehnt sich nach des Lebens goldner Baum.
      </p>
    </div>
  );
};

export default SuperCoolBox;
