import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@mui/styles";
import MSWSectionCarousel from "./MSWSectionCarousel.js";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";

import image from "../assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center"
        }}
      >
        <MSWSectionCarousel />
      </div>
    </div>
  );
}
