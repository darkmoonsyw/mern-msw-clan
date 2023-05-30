import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@mui/styles";
// core components
import GridContainer from "../components/Grid/GridContainer.js"
import GridItem from "../components/Grid/GridItem.js";
import Card from "../components/Card/Card.js";

import image1 from "../mswAssets/clanImage/Clan1.jpeg"
import image2 from "../mswAssets/clanImage/Clan2.jpeg";
import image3 from "../mswAssets/clanImage/Clan3.jpeg";
import image4 from "../mswAssets/clanImage/Clan4.jpeg";

import styles from "../assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false
  };
  return (
      <div className={classes.container}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
                <div>
                  <img src={image1} alt="First slide" className="slick-image" />
                  <div className="slick-caption">
                  </div>
                </div>
                <div>
                  <img
                    src={image2}
                    alt="Second slide"
                    className="slick-image"
                  />
                  <div className="slick-caption">
                  </div>
                </div>
                <div>
                  <img src={image3} alt="Third slide" className="slick-image" />
                  <div className="slick-caption">
                  </div>
                </div>
                <div>
                  <img src={image4} alt="Forth slide" className="slick-image" />
                  <div className="slick-caption">
                  </div>
                </div>
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
  );
}
