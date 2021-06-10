import React, {useEffect, useState} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import {Icon, IconButton } from "@material-ui/core";
// @material-ui/icons
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import AccessTime from "@material-ui/icons/AccessTime";
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
import {IdntEncService} from '../../../Service/IdentifiedEncounterService';
import {PhotoService} from '../../../Service/PhotoService';
import {userService} from '../../../Service/UserService';
import AdminAccessCard from './AdminAccessCard';
import {
  EncountersIdentChart,
  homeRangeChart,
  EncounterReportsChart,
  PhotosSidesChart
} from "../variables/charts.js";

import styles from "../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [sites, setSites] = useState([]);
  const [encountersCount, setEncountersCount] = useState(0);
  const [identCount, setIdentCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [ maxh, setmaxh ]= useState(15);
  const [time, setTime] = useState(new Date());
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {

      EncounterService.getIsraelSites().then(data => {
          const sitesData = data.map(item => {
            return item.SiteName;
          })
          homeRangeChart.data.labels = sitesData;
          // setUpdate(!update);

          setSites(sitesData);
          EncounterService.getEncountersCount().then(res => {
            setEncountersCount(res.count);
            let encounterperSite = [];
            for ( let i =0 ; i< sitesData.length ; i++ ){
              let count = 0;
              res.rows.map(row => {
                if ( row.Site.SiteName === sitesData[i]){
                  // console.log(`site: ${sitesData[i]} `)
                  count++;
                }
              })
              if (count > maxh ){
                setmaxh(count);
              }
              encounterperSite.push(count);
            }
            homeRangeChart.data.series = [encounterperSite];
            homeRangeChart.options.high = Math.max(...encounterperSite)+2;
          })
        })
        .catch(err => console.log(err));

        await EncounterService.getEnountersperMonth().then((res) =>{
            EncounterReportsChart.data.series = [res.encMonthData];
            EncounterReportsChart.data.labels = res.monthsString;
            EncounterReportsChart.options.high = Math.max(...res.encMonthData)+2;
            });
          await IdntEncService.getIdntEnountersperMonth().then((res) =>{
            console.log(res);
            EncountersIdentChart.data.series = [res.encMonthData];
            EncountersIdentChart.data.labels = res.monthsString;
            EncountersIdentChart.options.high = Math.max(...res.encMonthData)+2;
          });
          await IdntEncService.getIdntEnountersPhotosbySides().then(res => {
            // console.log(res);
            PhotosSidesChart.data.labels = res.sides;
            PhotosSidesChart.data.series = [res.IdntEncountersCount];
            PhotosSidesChart.options.high =  Math.max(...res.IdntEncountersCount)+2;
  
          })

        PhotoService.getPhotosCount().then(res => setPhotosCount(res) );
        IdntEncService.getIdentifiedEncountersCount().then(res => setIdentCount(res));
        userService.getAllUsers(1).then(res =>{
          setUserCount(res.count);
          const users = res.rows.map(row => {
            let item = [];
            item = [`${row.id}`, `${row.firstName} ${row.lastName}`, `${ row.isAdmin ? 'Admin': 'User'}`, `${(row.Encounters).length}`]
            return item;
          })
          setUsersData(users);
      } );

      
    } 
    fetchData();
    }, [update,maxh]);
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };

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
              <h3 className={classes.cardTitle}>{photosCount}<small> Photos</small></h3>
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
              <h3 className={classes.cardTitle}>{identCount} <small>BlueSpotted</small></h3>
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
              <h3 className={classes.cardTitle}>{userCount} <small>Users</small> </h3>
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
            <p className={classes.cardCategory}>Number of Ecounters per Site</p>
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
            <p className={classes.cardCategory}>Number of identified encounters per month </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />  last 12 month
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
            <p className={classes.cardCategory}>Number of reports per month </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime />  last 12 month
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
      <GridItem xs={12} sm={6}>
          <Card chart>
            <CardHeader color="rose">
              <ChartistGraph
                className="ct-chart"
                data={PhotosSidesChart.data}
                type="Bar"
                options={PhotosSidesChart.options}
                listener={PhotosSidesChart.animation}
                responsiveOptions={PhotosSidesChart.responsiveOptions}

              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Individuals Photos Sides </h4>
              <p className={classes.cardCategory}>y-axis: number of individuals</p>
              <p className={classes.cardCategory}>x-axis: side of photo </p>

            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Users Statistics
              <IconButton style={{marginLeft:20}}  onClick={handleClickOpen} aria-label="add admin" component="span">
                <PersonAddIcon/>
              </IconButton> </h4>

            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Type", "Encounters"]}
                tableData={ usersData }
              />
            </CardBody>
          </Card>
          <AdminAccessCard
      open={open}
      handleClose={handleClose}
      />
        </GridItem>
        
      </GridContainer>
     
    </div>
  );
}
