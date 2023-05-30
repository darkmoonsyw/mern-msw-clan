import React,{useState,useEffect,useContext} from "react";
import moment from 'moment'
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@mui/styles";
// @material-ui/icons
import Face from "@mui/icons-material/Face";
import SportsKabaddi from "@mui/icons-material/SportsKabaddi"
import EmojiEvents from "@mui/icons-material/EmojiEvents"
import Star from "@mui/icons-material/Star"
import FlashOn from "@mui/icons-material/FlashOn"
import ChildCare from "@mui/icons-material/ChildCare"

// core components
import image from "../assets/img/bg7.jpg";
import CustomTabs from "../components/CustomTabs/CustomsTabs.js"
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import styles from "../mswAssets/view/clanMemberPage"

// table components
import Table from "../components/Table/Table.js";
import CardHeader from "../components/Card/CardHeader.js";

//Avatar
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles(styles);

export default function ClanMemberPage(props) {
  const classes = useStyles();
  const [data,setData] = useState([])
  const [hulkData,setHulkData] = useState([])
  const [clan1MemberData,setClan1MemberData] = useState([])
  const [clan2MemberData,setClan2MemberData] = useState([])
  const [clan3MemberData,setClan3MemberData] = useState([])
  const [clan4MemberData,setClan4MemberData] = useState([])
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

  /*const getClanMember = (clanId)=>{
      fetch(`http://localhost:5000/clanMember/${clanId}`)
      .then(res=>res.json())
      .then(result=>{
          console.log(result)
          setClanMemberData(result.clanMember)
      })
  }*/

  const getAvatar = (colorId,avatar)=>{
      switch(colorId) {
          case 1:
              return <Avatar className={classes.orange}>{avatar}</Avatar>
          case 2:
              return <Avatar className={classes.purple}>{avatar}</Avatar>
          default:
            return <Avatar className={classes.orange}>{avatar}</Avatar>
      }
  }
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

  useEffect(()=>{
    fetch('/allUserWithDetail').then(res=>res.json())
    .then(result=>{
        setData(result.users)
    })

    fetch('/allHulkAcc').then(res=>res.json())
    .then(result=>{
        setHulkData(result.hulkAccs)
    })

    fetch(`/clanMember/1`)
      .then(res=>res.json())
      .then(result=>{
          setClan1MemberData(result.clanMember)
      })
      fetch(`/clanMember/2`)
      .then(res=>res.json())
      .then(result=>{
          setClan2MemberData(result.clanMember)
      })
      fetch(`/clanMember/3`)
      .then(res=>res.json())
      .then(result=>{
          setClan3MemberData(result.clanMember)
      })
      fetch(`/clanMember/4`)
      .then(res=>res.json())
      .then(result=>{
          setClan4MemberData(result.clanMember)
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
              <CustomTabs
                headerColor="info"
                  tabs={[
                    {
                        tabName: "Members",
                        tabIcon: Face,
                        tabContent: (
                            <GridContainer justify="flex-start" spacing={1}>
                                {
                                    data.map(item=>{
                                        return(
                                            <GridItem xs={12} sm={12} md={4} key={item._id}>
                                            <Card className={classes.textLeft}>
                                                <GridContainer>
                                                    <GridItem xs={6}>
                                                        <img className={classes.imgCardTop} src={require("../mswAssets/CharacterImage/"+item.mainCharacter+".png")} alt="Card-img-cap" /> 
                                                    </GridItem>
                                                    <GridItem xs={6}>
                                                        <CardBody> 
                                                            <h4 className={classes.cardTitle}>{item.name}</h4>
                                                            <hr/>
                                                            <h5 className={classes.cardTitle}>{item.nickname}</h5>
                                                            {item.playerAccs.map(acc=>{
                                                                return(
                                                                    <p className={classes.textMuted}> - {acc.name}</p>
                                                                )
                                                            })}
                                                            <p><small className={classes.textMuted}>Join Date:{moment(item.joinDate).format("DD MMM YYYY")}</small></p>
                                                        </CardBody> 
                                                    </GridItem>
                                                </GridContainer>
                                            </Card>
                                            </GridItem>
                                        )
                                    })
                                }
                            </GridContainer>
                        )
                      },
                    {
                      tabName: "Hulk",
                      tabIcon: SportsKabaddi,
                      tabContent: (
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card plain>
                                <CardHeader plain color="success">
                                    <h4 className={classes.cardTitleWhite}>
                                    HULK
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID", "Owner", "Hulk Name", "Clan"]}
                                        tableData={
                                            hulkData.map((item,index)=>{
                                                return(
                                                    [index+1, <Avatar className={classes.orange}>{item.owner.avatar}</Avatar>, item.name, getClanName(item.clan)]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                            </GridItem>
                            </GridContainer>
                      )
                    },
                    {
                      tabName: "Clan 1",
                      tabIcon: EmojiEvents,
                      tabContent: (
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card plain>
                                <CardHeader plain color="warning">
                                    <h4 className={classes.cardTitleWhite}>
                                    Clan 1 Member
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID", "Player", "Owner" , "Acc Name"]}
                                        tableData={
                                            clan1MemberData.map((item,index)=>{
                                                return(
                                                    [index+1, getAvatar(2,item.owner.avatar), item.owner.adminRemark, item.name]
                                                    //[index+1, <Avatar className={classes.purple}>{item.owner.avatar}</Avatar>, item.owner.adminRemark, item.name]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                            </GridItem>
                            </GridContainer>
                      )
                    },
                    {
                        tabName: "Clan 2",
                        tabIcon: Star,
                        tabContent: (
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card plain>
                                <CardHeader plain color="warning">
                                    <h4 className={classes.cardTitleWhite}>
                                    Clan 2 Member
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID", "Player", "Owner" , "Acc Name"]}
                                        tableData={
                                            clan2MemberData.map((item,index)=>{
                                                return(
                                                    [index+1, getAvatar(2,item.owner.avatar), item.owner.adminRemark, item.name]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                            </GridItem>
                            </GridContainer>
                        )
                      },
                      {
                        tabName: "Clan 3",
                        tabIcon: FlashOn,
                        tabContent: (
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card plain>
                                <CardHeader plain color="warning">
                                    <h4 className={classes.cardTitleWhite}>
                                    Clan 3 Member
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID", "Player", "Owner" , "Acc Name"]}
                                        tableData={
                                            clan3MemberData.map((item,index)=>{
                                                return(
                                                    [index+1, getAvatar(2,item.owner.avatar), item.owner.adminRemark, item.name]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                            </GridItem>
                            </GridContainer>
                        )
                      },
                      {
                        tabName: "Clan 4",
                        tabIcon: ChildCare,
                        tabContent: (
                            <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <Card plain>
                                <CardHeader plain color="warning">
                                    <h4 className={classes.cardTitleWhite}>
                                    Clan 4 Member
                                    </h4>
                                </CardHeader>
                                <CardBody>
                                    {
                                        <Table
                                        tableHeaderColor="dark"
                                        tableHead={["ID", "Player", "Owner" , "Acc Name"]}
                                        tableData={
                                            clan4MemberData.map((item,index)=>{
                                                return(
                                                    [index+1, getAvatar(2,item.owner.avatar), item.owner.adminRemark, item.name]
                                                )
                                            })
                                        }
                                        />
                                    }
                                </CardBody>
                                </Card>
                            </GridItem>
                            </GridContainer>
                        )
                      }
                  ]}
                />
              </GridItem>
            </GridContainer>
        </div>
      </div>
      </div>
    </div>
  );
}


