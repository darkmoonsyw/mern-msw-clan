import React,{useState} from "react";
import Datetime from "react-datetime";
import {useNavigate} from 'react-router-dom'
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
import Button from "../components/CustomButtons/Button.js"
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js"
import CustomInput from "../components/CustomInput/CustomInput.js";

import FormControl from "@mui/material/FormControl";

import styles from "../mswAssets/view/createUserPage";

import image from "../assets/img/bg7.jpg";
import { InputLabel, Select, MenuItem, Snackbar } from "@mui/material";

const useStyles = makeStyles(styles);

export default function CreateUserPage(props) {
  const navigate = useNavigate()
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [adminRemark,setAdminRemark] = useState("")
  const [name,setName] = useState("")
  const [nickname,setNickname] = useState("")
  const [mainCharacter,setMainCharacter] = useState("")
  const [avatar,setAvatar] = useState("")
  const [joinDate,setJoinDate] = useState(new Date())
  const constants = require('../constants')
 
  /*const [openSuccess,setOpenSuccess] = useState(false)
  const [openFail,setOpenFail] = useState(false)
  const handleSuccess = ()=>{
      setOpenSuccess(true);
  }
  const handleSuccessClose = (event,reason) => {
      if (reason === 'clickaway') {
          return
      }
      setOpenSuccess(false)
  }

  const handleFail = ()=>{
    setOpenFail(true);
  }   
const handleFailClose = (event,reason) => {
    if (reason === 'clickaway') {
        return
    }
    setOpenFail(false)
}*/

  setTimeout(function() {
    setCardAnimation("");
  }, 300);
  const classes = useStyles();
  
  const PostData = ()=>{
      //alert(mainCharacter)
      fetch("/signup",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              username:username,
              password:password,
              adminRemark:adminRemark,
              name:name,
              nickname:nickname,
              mainCharacter:mainCharacter,
              avatar:avatar,
              joinDate:joinDate
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.error){
            alert(data.error)
          } else {
            alert(data.message)
            navigate.push('./signin')
          }
          
      }).catch(err=>{
          console.log(err)
      })
  }
  const { ...rest } = props;
  //alert("Hello")
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
        <div className={classes.container} >
          <GridContainer justify="center" styles="{{padding-top:10vh !important}}">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>New MSW User</h4>
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
                    <CustomInput
                      labelText="Admin Remark"
                      id="adminRemark"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:adminRemark,
                        onChange:event=>setAdminRemark(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Name"
                      id="name"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:name,
                        onChange:event=>setName(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Nickname"
                      id="nickname"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:nickname,
                        onChange:event=>setNickname(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Avatar"
                      id="avatar"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:avatar,
                        onChange:event=>setAvatar(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl fullWidth>
                        <InputLabel>Main Character</InputLabel>
                        <Select
                            id="mainCharacterSelect"
                            value={mainCharacter}
                            onChange={(event)=>{setMainCharacter(event.target.value)}}
                            >
                              {constants.mainCharacterList.map(mainCharacterItem=>{
                                return(
                                  <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                )
                              })}
                                {/*<MenuItem value={"ADAM WARLOCK"}>ADAM WARLOCK</MenuItem>
                    <MenuItem value={"YONDU"}>YONDU</MenuItem>*/}
                            </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl fullWidth>
                        <Datetime
                        value={joinDate}
                        format="hh:mm DD.MM.YYYY"
                        onChange={(date)=>setJoinDate(date)}
                        inputProps={{ 
                            placeholder: "Join Date",
                         }}
                        />
                    </FormControl>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={()=>PostData()}>
                      Create
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
