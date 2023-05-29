import React,{useState,useEffect} from "react";
import Datetime from "react-datetime";
import {useHistory} from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import EmojiPeople from "@material-ui/icons/EmojiPeople";
import Lock from "@material-ui/icons/Lock";

// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js"
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js"
import CustomInput from "../components/CustomInput/CustomInput.js";

import FormControl from "@material-ui/core/FormControl";

import styles from "../mswAssets/view/createUserPage";

import image from "../assets/img/bg7.jpg";
import { InputLabel, Select, MenuItem, Snackbar } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CreateUserPage(props) {
  const history = useHistory()
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  //const [username,setUsername] = useState("")
  //const [password,setPassword] = useState("")
  const [userId,setUserId] = useState("")
  const [name,setName] = useState("")
  const [nickname,setNickname] = useState("")
  const [mainCharacter,setMainCharacter] = useState("")
  const [avatar,setAvatar] = useState("")
  const [currentUser,setCurrentUser] = useState("")
  const constants = require('../constants')

  setTimeout(function() {
    setCardAnimation("");
  }, 300);
  const classes = useStyles();
  
  const PostData = ()=>{
      if (name.length<2 || name.length>10){
          alert("Name length should between 2-10")
          return
      }
      if (avatar.length<1 || avatar.length>5){
          alert("Avatar length should between 1-5")
          return
      }
      if (!mainCharacter) {
        alert("Main character cannot be empty")
        return
      }
      fetch("/updateUserProfile",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              //username:username,
              //password:password,
              userId:userId,
              name:name,
              nickname:nickname,
              mainCharacter:mainCharacter,
              avatar:avatar,
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.error){
            alert(data.error)
          } else {
              //const {_id,username,isAdmin,name,nickname,avatar,mainCharacter} = savedUser
            currentUser.name = name
            currentUser.nickname = nickname
            currentUser.avatar = avatar
            currentUser.mainCharacter = mainCharacter
            localStorage.setItem("user",JSON.stringify(currentUser))
            alert(data.message)
            history.push('./')
          }
          
      }).catch(err=>{
          console.log(err)
      })
  }
  const { ...rest } = props;
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    setUserId(user._id)
    setName(user.name)
    setNickname(user.nickname)
    setAvatar(user.avatar)
    setMainCharacter(user.mainCharacter)
    setCurrentUser(user)
  },[])
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
                    <h4>Update Profile</h4>
                  </CardHeader>
                  <CardBody>
                    {/*<CustomInput
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
                    />*/}
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
                            </Select>
                    </FormControl>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={()=>PostData()}>
                      Submit
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
