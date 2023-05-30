/*eslint-disable*/
import React,{useContext} from "react";
// react components for routing our app without refresh
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../../App'

// @material-ui/core components
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

// @material-ui/icons
import { Group, LocalDining,AccountBox,Description,PowerSettingsNew,WbSunny } from "@mui/icons-material";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js"
import Button from "../CustomButtons/Button.js"
//"../CustomButtons/Button.js"
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const {state,dispatch} = useContext(UserContext)
  //onst hContext = useContext()
  const renderList = ()=>{
    if (state) {
      if (state.isAdmin) {
        return [
          <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={state.adminRemark}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountBox}
            dropdownList={[
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
                onClick={()=>{
                  navigate.push('/editProfile')
                }}
              >
                <Description className={classes.icons} /> Edit Profile
              </Button>,
              <Link to="/createUser" className={classes.dropdownLink}>
                Create MSW User
              </Link>,
              <Link to="/createPlayerAccByAdmin" className={classes.dropdownLink}>
                Create Player Acc by Admin
              </Link>,
              <Link to="/createClanWarRecord" className={classes.dropdownLink}>
                Create Clan War Record
              </Link>,
              <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate.push('/signin')
              }}
            >
              <PowerSettingsNew className={classes.icons} /> Logout
            </Button>,
            ]}
          />
          </ListItem>
        ]
      } else {
        return [
          <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={state.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={AccountBox}
            dropdownList={[
              <Button
                color="transparent"
                target="_blank"
                className={classes.navLink}
                onClick={()=>{
                  navigate.push('/editProfile')
                }}
              >
                <Description className={classes.icons} /> Edit Profile
              </Button>,
              <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={()=>{
                localStorage.clear()
                dispatch({type:"CLEAR"})
                navigate.push('/signin')
              }}
            >
              <PowerSettingsNew className={classes.icons} /> Logout
            </Button>,
            ]}
          />
          </ListItem>
        ]
      }
    }else{
      return [
        <ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/signin')
            }}
          >
          <AccountBox className={classes.icons} /> 登入
        </Button>
      </ListItem>
      ]
    }
  }
  const classes = useStyles();
  const navigate = useNavigate()
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>      
        <Button
          color="transparent"
          target="_blank"
          className={classes.navLink}
          onClick={()=>{
            navigate.push('/clan-member')
          }}
        >
          <Group className={classes.icons} /> 會友
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/clan-war')
            }}
          >
          <LocalDining className={classes.icons} /> 軍團戰
        </Button>
      </ListItem>
      {/*<ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/createUser')
            }}
          >
          <LocalDining className={classes.icons} /> Admin
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/clan-event')
            }}
          >
          <EmojiEmotions className={classes.icons} /> 軍團活動
        </Button>
          </ListItem>*/}
      <ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/clan-war-ranking')
            }}
          >
          <WbSunny className={classes.icons} /> 排名
        </Button>
      </ListItem>
      {renderList()}
      {/*<ListItem className={classes.listItem}>      
        <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/signin')
            }}
          >
          <AccountBox className={classes.icons} /> 登入
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Moon"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountBox}
          dropdownList={[
            <Button
              color="transparent"
              target="_blank"
              className={classes.navLink}
              onClick={()=>{
                navigate.push('/editProfile')
              }}
            >
              <Description className={classes.icons} /> Edit Profile
            </Button>,
            <Link to="/createUser" className={classes.dropdownLink}>
              Create MSW User
            </Link>,
            <Link to="/createPlayerAccByAdmin" className={classes.dropdownLink}>
              Create Player Acc by Admin
            </Link>,
            <Link to="/createClanWarRecord" className={classes.dropdownLink}>
              Create Clan War Record
            </Link>,
            <Button
            color="transparent"
            target="_blank"
            className={classes.navLink}
            onClick={()=>{
              navigate.push('/editProfile')
            }}
          >
            <PowerSettingsNew className={classes.icons} /> Logout
          </Button>,
          ]}
        />
        </ListItem>*/}
    </List>
  );
}
