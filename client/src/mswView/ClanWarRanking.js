import React,{useState,useEffect,useContext} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@mui/styles";

// core components
import image from "../assets/img/bg7.jpg";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import styles from "../mswAssets/view/clanMemberPage";

// table components
import Table from "../components/Table/Table.js";
import CardHeader from "../components/Card/CardHeader.js";

const useStyles = makeStyles(styles);
const sortJsonArray = require('sort-json-array')

export default function ClanWarRankingPage(props) {
  const classes = useStyles();
  const [clanWarData,setClanWarData] = useState([])
  const [clanWarRankingWinData,setClanWarRankingWinData] = useState([])
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  const getWinCnt = (userId) =>{
    var winCnt = 0
    clanWarRankingWinData.forEach(element => {
        if (JSON.stringify(element._id) == JSON.stringify(userId)){
            winCnt = element.winCnt
        }
    })
    return winCnt
  }

  useEffect(()=>{
    fetch('/clanWarRanking').then(res=>res.json())
    .then(result=>{
        console.log(result)
        var rankingDataList = []
        result.clanWarRanking.forEach(element => {
          if (element.joinedFight.length > 0){
            var data = {
              _id:element._id,
              name:element.name,
              joinCnt:element.joinedFight.length
            }
            rankingDataList.push(data)
          }
        })
        
        setClanWarData(sortJsonArray(rankingDataList,'joinCnt','des'))
    })

    fetch('/clanWarRankingWin').then(res=>res.json())
    .then(result=>{
        console.log(result.clanWarRankingWin)
        setClanWarRankingWinData(result.clanWarRankingWin)
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
                                <CardHeader plain color="danger">
                                    <h4 className={classes.cardTitleWhite}>
                                    軍團戰 排名
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID","Player","Joined Times","Win Count","Win(%)"]}
                                        tableData={
                                            clanWarData.map((item,index)=>{
                                                return(
                                                    [(index+1), item.name, item.joinCnt,getWinCnt(item._id),Math.round(getWinCnt(item._id)/item.joinCnt*100)+"%"]
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


