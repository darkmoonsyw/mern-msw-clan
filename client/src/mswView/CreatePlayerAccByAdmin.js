import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
// @material-ui/core components
import { makeStyles } from "@mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
// @material-ui/icons
import EmojiPeople from "@mui/icons-material/EmojiPeople";
// core components
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardFooter from "../components/Card/CardFooter.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import FormControl from "@mui/material/FormControl";

import styles from "../mswAssets/view/createUserPage";

import image from "../assets/img/bg7.jpg";
import { InputLabel, Select, MenuItem, Snackbar } from "@mui/material";

const useStyles = makeStyles(styles);

export default function CreateUserPage(props) {
  const navigate = useNavigate()
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [name,setName] = useState("")
  const [clan,setClan] = useState("")
  const [seq,setSeq] = useState("")
  const [owner,setOwner] = useState("")
  const [users, setUsers] = useState([])

  setTimeout(function() {
    setCardAnimation("");
  }, 300);
  const classes = useStyles();
  
  const PostData = ()=>{
      if (isNaN(seq)) {
        alert("Please enter Number for field of Seq ")
        return
      }
      fetch("/createPlayerAccByAdmin",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              name:name,
              clan,
              seq,
              owner
          })
      }).then(res=>res.json())
      .then(data=>{
          if(data.error){
            alert(data.error)
          } else {
            alert(data.message)
            navigate.push('./createPlayerAccByAdmin')
          }
          
      }).catch(err=>{
          console.log(err)
      })
  }
  const { ...rest } = props;
  useEffect(()=>{
    fetch('/allUser').then(res=>res.json())
    .then(result=>{
        console.log(result)
        setUsers(result.users)
    })
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
                    <h4>New Player Acc by Admin</h4>
                  </CardHeader>
                  <CardBody>
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
                      labelText="Seq"
                      id="Seq"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:seq,
                        onChange:event=>setSeq(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Clan</InputLabel>
                      <Select
                        id="clanSelect"
                        value={clan}
                        onChange={(event)=>(setClan(event.target.value))}>
                          <MenuItem value={1}>黃色復仇圈</MenuItem>
                          <MenuItem value={2}>黃色復仇圈～支部</MenuItem>
                          <MenuItem value={3}>黃色復仇圈～叁部</MenuItem>
                          <MenuItem value={4}>黃色復仇圈～肆部</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl fullWidth>
                      <InputLabel>Owner</InputLabel>
                      <Select
                        id="OwnerSelect"
                        value={owner}
                        onChange={(event)=>setOwner(event.target.value)}>
                          {users.map(user=>{
                            return(
                              <MenuItem value={user}>{user.adminRemark}</MenuItem>
                            )
                          })}
                        </Select>
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
