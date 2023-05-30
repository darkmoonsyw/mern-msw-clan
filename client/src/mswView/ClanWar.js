import React,{useState,useEffect,useContext} from "react";
import moment from 'moment'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@mui/styles";

//Avatar
import Avatar from '@mui/material/Avatar';

// core components
import image from "../assets/img/bg7.jpg";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

// table components
import Table from "../components/Table/Table.js";
import CardHeader from "../components/Card/CardHeader.js";

import styles from "../mswAssets/view/clanMemberPage";

const useStyles = makeStyles(styles);

export default function ClanMemberPage(props) {
  const classes = useStyles();
  const [clanWarData,setClanWarData] = useState([])
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const getClanName = (clanId)=>{
      switch(clanId) {
          case 1:
              return "黃色復仇圈"
          case 2:
              return "黃色復仇圈～支部"
          case 3:
              return "黃色復仇圈～叁部"
          case 4:
              return "黃色復仇圈～肆部"
          default:
              return "黃色復仇圈X"
      }
  }

  const getOurSidePlayer = (players)=>{
      var i =0
      var ourfightersList = []
      for (i=0;i<10;i++){
          if(players[i].isOurSide){
            ourfightersList.push(players[i])
          }
      }
      return (
          <GridContainer>
            {ourfightersList.map((item)=>{
                return (
                        <Avatar alt={item.name} src={require("../mswAssets/CharacterIcon/"+item.character+".png")} />
                )
            })}
        </GridContainer>
            
    )
  }
  const getOurSidePlayerName = (players)=>{
    var i =0
    var ourfightersList = []
    for (i=0;i<10;i++){
        if(players[i].isOurSide){
          ourfightersList.push(players[i])
        }
    }
    return (
        <GridContainer>
        {ourfightersList.map((item)=>{
            return (
              <p>{item.name}&nbsp;</p>
            )
        })}
      </GridContainer>
          
  )
}
  const getEnemyPlayers = (players)=>{
    var i =0
    var enemyfightersList = []
    for (i=0;i<10;i++){
        if(!players[i].isOurSide){
            enemyfightersList.push(players[i])
        }
    }
    return (
        enemyfightersList.map((item)=>{
              return (
                      <Avatar alt={item.name} src={require("../mswAssets/CharacterIcon/"+item.character+".png")} />
              )
          })
  )
}
  useEffect(()=>{
    fetch('/clanWarDetail').then(res=>res.json())
    .then(result=>{
        console.log(result)
        setClanWarData(result.clanWarDetail)
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
          <div className={classes.container}>
        <div className={classNames(classes.main, classes.mainRaised)}>

        <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12} className={classes.navWrapper}>
            <GridContainer justify="center">
                <GridItem xs={10}>
                    <Card plain>
                                <CardHeader plain color="warning">
                                    <h4 className={classes.cardTitleWhite}>
                                    軍團戰 記錄
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["Season","Clan","Players","Characters","VS","Enemies","Enemy Clan","score","Result"]}
                                        tableData={
                                            clanWarData.map((item)=>{
                                                return(
                                                    [("S"+item.season+"W"+item.week), getClanName(item.clan), getOurSidePlayerName(item.fighters),
                                                    getOurSidePlayer(item.fighters),
                                                    ,"VS",
                                                    <GridContainer>{getEnemyPlayers(item.fighters)}</GridContainer>,
                                                    ,item.vs,item.ourHead+":"+item.oppositeHead,item.isWin?"Win":"Lose"]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
        </div>
      </div>
      </div>
    </div>
  );
}


