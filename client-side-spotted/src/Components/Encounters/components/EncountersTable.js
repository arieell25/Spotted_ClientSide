import  React, { useState, useEffect } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';

const columns = [
  { field: 'EncounterID', headerName: 'ID', type: 'number', width: 70 },
  { field: 'Gender', headerName: 'Gender', width: 130 },
  { field: 'IsPregnant', headerName: 'Pregnancy', type: 'number',  width: 130 },
  {
    field: 'Verified',
    headerName: 'Recercher identification approval',
    type: 'number',
    width: 90,
  },
  {
    field: 'EncounterDate',
    headerName: 'Encounter Date',
    description: 'This column has a value getter and is not sortable.',
    // sortable: false,
    type: 'date',
    width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('EncounterDate') || ''}`,
  },
]

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function EncountersTable(props) {
  const { rows } = props;
  const [data, setData] = useState();
  console.log(data);

  useEffect(() => {
    var new_arr = rows.map(row=> {
      row.id = row.EncounterID;
      return (row)
  })  ;

  console.log(new_arr);
    const object = { columns:columns , rows: new_arr};
    // console.log(object);
    setData(new_arr);

  },[])


  return (
    <div style={{ height: 250, width: '100%' }}>
    <DataGrid
      columns={[{ field: 'name' }]}
      rows={[
        { id: 1, name: 'React' },
        { id: 2, name: 'Material-UI' },
      ]}
    />
  </div>
    // <div style={{ height: 300, width: '100%' }}>
    //   <DataGrid
    //     columns={columns}
    //     rows={data}
    //     // components={{
    //     //   Toolbar: CustomToolbar,
    //     // }}
    //   />
    // </div>
  );
}