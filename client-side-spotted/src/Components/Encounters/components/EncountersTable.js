import React from "react";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import CardBody from "../../admin/components/Card/CardBody.js";

const columns = [
  { field: "EncounterID", headerName: "ID", type: "number", width: 70 },
  {
    field: "EncounterDate",
    headerName: "Encounter Date",
    type: "date",
    width: 170,
  },

  { field: "Gender", headerName: "Gender", width: 120 },
  { field: "IsPregnant", headerName: "Pregnancy", width: 130 },
  {
    field: "Verified",
    headerName: "Verified",
    width: 130,
  },
  { field: "ReportedBy", headerName: "Reporter", width: 120 },
  { field: "MediaTypeID", headerName: "Media", width: 110 },
  { field: "SpottedCount", headerName: "Count ", width: 110 },
  { field: "SpottedCountReported", headerName: "Reported", width: 110 },
  { field: "ReporterEmail", headerName: "Email", width: 120 },
  { field: "OriginalID", headerName: "SII ID", width: 100 },
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function EncountersTable(props) {
  const { rows } = props;

  return (
    <CardBody>
      <div style={{ height: 670, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </CardBody>
  );
}
