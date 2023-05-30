import React,{useState,useContext,} from "react";
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App'
// @material-ui/core components
import { makeStyles } from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Icon from "@mui/material/Icon";
// @material-ui/icons
import EmojiPeople from "@mui/icons-material/EmojiPeople";
import Lock from "@mui/icons-material/Lock";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";

import styles from "../assets/jss/material-kit-react/views/loginPage.js"

import image from "../assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate()
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const PostData = ()=>{
    fetch("/signin",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            username:username,
            password:password,
        })
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
        if(data.error){
          alert(data.error)
        } else {
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          alert("Successfully Login")
          navigate.push('./')
        }
        
    }).catch(err=>{
        console.log(err)
    })
}
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
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Login</h4>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Username"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:username,
                        onChange : event=>setUsername(event.target.value), 
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "password",
                        value:password,
                        onChange:event=>setPassword(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                                <Lock className={classes.inputIconsColor} />
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={()=>PostData()}>
                      Get started
                    </Button>
                  </CardFooter>
                  
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
