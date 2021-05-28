import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import GroupIcon from '@material-ui/icons/Group';

// core components
import GridItem from "../components/Grid/GridItem.js";
import GridContainer from "../components/Grid/GridContainer.js";
import Table from "../components/Table/Table.js";
import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardIcon from "../components/Card/CardIcon.js";
import CardBody from "../components/Card/CardBody.js";
import CardFooter from "../components/Card/CardFooter.js";

import {EncounterService} from '../../../Service/EncounterService';

import {
  EncountersIdentChart,
  homeRangeChart,
  EncounterReportsChart
} from "../variables/charts.js";

import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [sites, setSites] = useState([]);
  const [encountersCount, setEncountersCount] = useState(0);

  useEffect(() => {
    EncounterService.getIsraelSites().then(data => {
        const sitesData = data.map(item => {
          return item.SiteName;
        })
        homeRangeChart.data.labels = sitesData;

        setSites(sitesData);
      })
      .catch(err => console.log(err));
      EncounterService.getEncountersCount()
      .then(res => setEncountersCount(res))
  }, []);
  
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>Encounters</Icon>
              </CardIcon>
              <p className={classes.cardCategory}></p>
              <h3 className={classes.cardTitle}>
                {encountersCount} <small>Reports</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
            <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <ImageSearchIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Detected individuals</p>
              <h3 className={classes.cardTitle}>308<small> Photos</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Last 24 Hours
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>Individuals </Icon>
              </CardIcon>
              {/* <p className={classes.cardCategory}>Identified</p> */}
              <h3 className={classes.cardTitle}>38 <small>BlueSpotted</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Identified and Tagged 
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <GroupIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Registered Users</p>
              <h3 className={classes.cardTitle}>10</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={homeRangeChart.data}
                type="Bar"
                options={homeRangeChart.options}
                responsiveOptions={homeRangeChart.responsiveOptions}
                listener={homeRangeChart.animation}
              />
            </CardHeader>
            <CardBody>
            <h4 className={classes.cardTitle}> Home Range</h4>
            <p className={classes.cardCategory}>Encounters home range statistics</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
      <GridContainer>
        <GridItem xs={12} sm={6} >
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={EncountersIdentChart.data}
                type="Line"
                options={EncountersIdentChart.options}
                listener={EncountersIdentChart.animation}
              />
            </CardHeader>
            <CardBody>
            <h4 className={classes.cardTitle}>Identified Encounters </h4>
   
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={6}>
        <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={EncounterReportsChart.data}
                type="Line"
                options={EncounterReportsChart.options}
                listener={EncounterReportsChart.animation}
              />
            </CardHeader>
            <CardBody>
            <h4 className={classes.cardTitle}>Encounters Reports </h4>
   
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem> */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Users Statistics </h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Type", "Encounters"]}
                tableData={[
                  ["1", "Adi Barash", "Admin", "2"],
                  ["2", "Polina Polsky", "Admin", "34"],
                  ["3", "Ariel Hadad", "Admin", "92"],
                  ["4", "Chen Zaguri", "Admin", "27"],
                  ["5", "Alan Ron ", "User", "1"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

    </div>
  );
}
