import React,{useState,useEffect} from "react";
import Datetime from "react-datetime";
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
import { InputLabel, Select, MenuItem} from "@mui/material";

const useStyles = makeStyles(styles);

export default function CreateClanWarRecordPage(props) {
////season,Week,matchDate,clan,joinedMembers,otherFighters,oppositeFighters,ourHead,oppositeHead,isWin
  const navigate = useNavigate()
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [data,setData] = useState([])
  const [season,setSeason] = useState(0)
  const [week,setWeek] = useState(0)
  const [matchDate,setMatchDate] = useState(new Date())
  const [clan,setClan] = useState(0)
  const [ourHead,setOurHead] = useState(0)
  const [oppositeHead,setOppositeHead] = useState(0)
  const [vs,setVs] = useState("")
  const [isWin, setIsWin] = useState(true)
  //const [clanWarRecord,setClanWarRecord] = useState([])
  const constants = require('../constants')

  //Player 1 - 5 : our player ; Player 6 - 10 opposite
  const [player1User,setPlayer1User] = useState("")
  const [player2User,setPlayer2User] = useState("")
  const [player3User,setPlayer3User] = useState("")
  const [player4User,setPlayer4User] = useState("")
  const [player5User,setPlayer5User] = useState("")

  const [player1Name,setPlayer1Name] = useState("")
  const [player2Name,setPlayer2Name] = useState("")
  const [player3Name,setPlayer3Name] = useState("")
  const [player4Name,setPlayer4Name] = useState("")
  const [player5Name,setPlayer5Name] = useState("")
  const [player6Name,setPlayer6Name] = useState("")
  const [player7Name,setPlayer7Name] = useState("")
  const [player8Name,setPlayer8Name] = useState("")
  const [player9Name,setPlayer9Name] = useState("")
  const [player10Name,setPlayer10Name] = useState("")

  const [player1Character,setPlayer1Character] = useState("")
  const [player2Character,setPlayer2Character] = useState("")
  const [player3Character,setPlayer3Character] = useState("")
  const [player4Character,setPlayer4Character] = useState("")
  const [player5Character,setPlayer5Character] = useState("")
  const [player6Character,setPlayer6Character] = useState("")
  const [player7Character,setPlayer7Character] = useState("")
  const [player8Character,setPlayer8Character] = useState("")
  const [player9Character,setPlayer9Character] = useState("")
  const [player10Character,setPlayer10Character] = useState("")
  
  const [users, setUsers] = useState([])

  setTimeout(function() {
    setCardAnimation("");
  }, 300);
  const classes = useStyles();

  const PostClanFighterData = (clanWarRecord)=>{
      console.log("in PostClanFighterData",clanWarRecord)
    const playerCharacterList = [player1Character,player2Character,player3Character,player4Character,player5Character,
        player6Character,player7Character,player8Character,player9Character,player10Character]
      const playerUserList = [player1User,player2User,player3User,player4User,player5User]
      const playerNameList = [player1Name,player2Name,player3Name,player4Name,player5Name,player6Name,player7Name,player8Name,player9Name,player10Name]
      fetch("/createFighter",{
         method:"post",
         headers:{
            "Content-Type":"application/json"
         },
         body:JSON.stringify({
            playerCharacterList,
            playerUserList,
            playerNameList,
            clanWarRecord
         })
     }).then(res=>res.json())
      .then(data=>{
        if(data.error){
            alert(data.error)
          } else {
            alert(data.message)
            navigate.push('./createClanWarRecord')
          }
      })
      .catch(err=>{
          console.log(err)
      })
  }
  
  const PostData = ()=>{
      if (!player1Character || !player2Character || !player3Character || !player4Character || !player5Character ||!player6Character || !player7Character || !player8Character || !player9Character || !player10Character) {
        alert("Please enter all Player Character")
        return
      }
      if (!season || !week || !clan || !vs ){
        alert("Please enter Season, week, clan, vs")
        return
      }
      if (isNaN(season)) {
        alert("Please enter Number for field of Season")
        return
      }
      if (isNaN(week)) {
        alert("Please enter Number for field of week")
        return
      }
      if (isNaN(ourHead)) {
        alert("Please enter Number for field of ourHead")
        return
      }
      if (isNaN(oppositeHead)) {
        alert("Please enter Number for field of oppositeHead")
        return
      }
       fetch("/createClanWarHist",{
          method:"post",
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({
              season,
              week,
              clan,
              vs,
              ourHead,
              oppositeHead,
              isWin,
              matchDate,
          })
      }).then(res=>res.json())
      .then(result=>{
          console.log("result",result)
          PostClanFighterData(result)
          //setClanWarRecord(result.clanWarRecord)
      }).then(result=>{
        
      })
      /*.then(res=>res.json())
      .then(data=>{
          setClanWarRecord(data)
      }).then(result=>{
          console.log(clanWarRecord)
          PostClanFighterData()
      })
      .catch(err=>{
          console.log(err)
      })*/
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
            <GridItem xs={12} sm={12} md={12}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>New Clan War Record</h4>
                  </CardHeader>
                  <CardBody>
                      <GridContainer>
                  <GridItem xs={3}>
                    <CustomInput
                      labelText="Season"
                      id="season"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:season,
                        onChange:event=>setSeason(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Week"
                      id="Week"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:week,
                        onChange:event=>setWeek(event.target.value),
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
                    <CustomInput
                      labelText="vs Clan"
                      id="vs"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:vs,
                        onChange:event=>setVs(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Our Head"
                      id="ourHead"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:ourHead,
                        onChange:event=>setOurHead(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Opposite Head"
                      id="OppositeHead"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        type: "text",
                        value:oppositeHead,
                        onChange:event=>setOppositeHead(event.target.value),
                        endAdornment: (
                          <InputAdornment position="end">
                            <EmojiPeople className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <FormControl fullWidth>
                      <InputLabel>Result</InputLabel>
                      <Select
                        id="isWin"
                        value={isWin}
                        onChange={(event)=>(setIsWin(event.target.value))}>
                          <MenuItem value={true}>Win</MenuItem>
                          <MenuItem value={false}>Lose</MenuItem>
                        </Select>
                    </FormControl>
                    <br/><br/>
                    <FormControl fullWidth>
                        <Datetime
                        value={matchDate}
                        format="hh:mm DD.MM.YYYY"
                        onChange={(date)=>setMatchDate(date)}
                        inputProps={{ 
                            placeholder: "Match Date",
                         }}
                        />
                    </FormControl>
                  </GridItem>
                  {/************************************** Player1 **************************************/}
                  <GridItem xs={9}>
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 1 Character</InputLabel>
                                <Select
                                    id="player1CharacterSelect"
                                    value={player1Character}
                                    onChange={(event)=>{setPlayer1Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 1 Name"
                                id="player1Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player1Name,
                                    onChange:event=>setPlayer1Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 1</InputLabel>
                                <Select
                                    id="player1Select"
                                    value={player1User}
                                    onChange={(event)=>setPlayer1User(event.target.value)}>
                                    {users.map(user=>{
                                        return(
                                        <MenuItem value={user}>{user.adminRemark}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                          </GridItem>
                      </GridContainer>
                    {/************************************** Player2 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 2 Character</InputLabel>
                                <Select
                                    id="player2CharacterSelect"
                                    value={player2Character}
                                    onChange={(event)=>{setPlayer2Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 2 Name"
                                id="player2Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player2Name,
                                    onChange:event=>setPlayer2Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 2</InputLabel>
                                <Select
                                    id="player2Select"
                                    value={player2User}
                                    onChange={(event)=>setPlayer2User(event.target.value)}>
                                    {users.map(user=>{
                                        return(
                                        <MenuItem value={user}>{user.adminRemark}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player3 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 3 Character</InputLabel>
                                <Select
                                    id="player3CharacterSelect"
                                    value={player3Character}
                                    onChange={(event)=>{setPlayer3Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 3 Name"
                                id="player3Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player3Name,
                                    onChange:event=>setPlayer3Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 3</InputLabel>
                                <Select
                                    id="player3Select"
                                    value={player3User}
                                    onChange={(event)=>setPlayer3User(event.target.value)}>
                                    {users.map(user=>{
                                        return(
                                        <MenuItem value={user}>{user.adminRemark}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player4 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 4 Character</InputLabel>
                                <Select
                                    id="player4CharacterSelect"
                                    value={player4Character}
                                    onChange={(event)=>{setPlayer4Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 4 Name"
                                id="player4Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player4Name,
                                    onChange:event=>setPlayer4Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 4</InputLabel>
                                <Select
                                    id="player4Select"
                                    value={player4User}
                                    onChange={(event)=>setPlayer4User(event.target.value)}>
                                    {users.map(user=>{
                                        return(
                                        <MenuItem value={user}>{user.adminRemark}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player5 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 5 Character</InputLabel>
                                <Select
                                    id="player5CharacterSelect"
                                    value={player5Character}
                                    onChange={(event)=>{setPlayer5Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 5 Name"
                                id="player5Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player5Name,
                                    onChange:event=>setPlayer5Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 5</InputLabel>
                                <Select
                                    id="player5Select"
                                    value={player5User}
                                    onChange={(event)=>setPlayer5User(event.target.value)}>
                                    {users.map(user=>{
                                        return(
                                        <MenuItem value={user}>{user.adminRemark}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player6 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 6 Character</InputLabel>
                                <Select
                                    id="player6CharacterSelect"
                                    value={player6Character}
                                    onChange={(event)=>{setPlayer6Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 6 Name"
                                id="player6Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player6Name,
                                    onChange:event=>setPlayer6Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player7 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 7 Character</InputLabel>
                                <Select
                                    id="player7CharacterSelect"
                                    value={player7Character}
                                    onChange={(event)=>{setPlayer7Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 7 Name"
                                id="player7Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player7Name,
                                    onChange:event=>setPlayer7Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player8 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 8 Character</InputLabel>
                                <Select
                                    id="player8CharacterSelect"
                                    value={player8Character}
                                    onChange={(event)=>{setPlayer8Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 8 Name"
                                id="player8Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player8Name,
                                    onChange:event=>setPlayer8Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player9 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 9 Character</InputLabel>
                                <Select
                                    id="player9CharacterSelect"
                                    value={player9Character}
                                    onChange={(event)=>{setPlayer9Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 9 Name"
                                id="player9Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player9Name,
                                    onChange:event=>setPlayer9Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                      {/************************************** Player10 **************************************/}
                      <GridContainer>
                          <GridItem xs={3}>
                            <FormControl fullWidth>
                                <InputLabel>Player 10 Character</InputLabel>
                                <Select
                                    id="player10CharacterSelect"
                                    value={player10Character}
                                    onChange={(event)=>{setPlayer10Character(event.target.value)}}
                                    >
                                    {constants.mainCharacterList.map(mainCharacterItem=>{
                                        return(
                                        <MenuItem value={mainCharacterItem}>{mainCharacterItem}</MenuItem>
                                        )
                                    })}
                                    </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={3}>
                            <CustomInput
                                labelText="Player 10 Name"
                                id="player10Name"
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "text",
                                    value:player10Name,
                                    onChange:event=>setPlayer10Name(event.target.value),
                                    endAdornment: (
                                    <InputAdornment position="end">
                                        <EmojiPeople className={classes.inputIconsColor} />
                                    </InputAdornment>
                                    )
                                }}
                            />
                          </GridItem>
                      </GridContainer>
                  </GridItem>
                  
                    
                  
                  </GridContainer>
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
