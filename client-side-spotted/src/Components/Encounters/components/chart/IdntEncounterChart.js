/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";

// core components
import Card from "../../../admin/components/Card/Card.js";
import CardHeader from "../../../admin/components/Card/CardHeader.js";
import CardBody from "../../../admin/components/Card/CardBody.js";
import CardFooter from "../../../admin/components/Card/CardFooter.js";
import Dialog from "@material-ui/core/Dialog";

import { EncounterService } from "../../../../Service/EncounterService";
import { IdntEncService } from "../../../../Service/IdentifiedEncounterService";

import { IdentEnocunterHomeRangeChart } from "../../../admin/variables/charts";

import styles from "../../../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function IdntEncounterChart(props) {
  const { onClose, id, open } = props;
  const classes = useStyles();
  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      await EncounterService.getIsraelSites().then((data) => {
        const sitesData = data.map((item) => {
          return item.SiteName;
        });
        IdentEnocunterHomeRangeChart.data.labels = sitesData;
        IdntEncService.getIdntEncounterSites(id)
          .then((res) => {
            let encounterData = [];
            for (let i = 0; i < sitesData.length; i++) {
              let count = 0;
              res.photos.rows.map((row) => {
                if (row.Encounter.Site.SiteName === sitesData[i]) {
                  count++;
                }
                if (count > 0) {
                  if (encounterData[i] && encounterData[i].count > 0) {
                    encounterData[i].count++;
                  } else {
                    encounterData[i] = {
                      meta: `Observed on ${row.Encounter.EncounterDate} at ${row.Encounter.Site.SiteName} `,
                      value: count,
                    };
                  }
                }
              });
            }
            IdentEnocunterHomeRangeChart.data.series = [encounterData];
          })
          .catch((err) => console.log(err));
      });
    };
    fetchData();
  }, [id]);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <div id="chartdiv">
        <Card chart>
          <CardHeader color="warning">
            <ChartistGraph
              className="ct-chart"
              data={IdentEnocunterHomeRangeChart.data}
              type="Line"
              options={IdentEnocunterHomeRangeChart.options}
              responsiveOptions={IdentEnocunterHomeRangeChart.responsiveOptions}
              listener={IdentEnocunterHomeRangeChart.animation}
            />
          </CardHeader>
          <CardBody>
            <h4 className={classes.cardTitle}>Individual Reports</h4>
            <p className={classes.cardCategory}>
              Individual reports per site, date is shown on hover over the white
              point
            </p>
          </CardBody>
          <CardFooter chart>
            <div className={classes.stats}>
              <AccessTime /> Updated 2 minutes ago
            </div>
          </CardFooter>
        </Card>
      </div>
    </Dialog>
  );
}
