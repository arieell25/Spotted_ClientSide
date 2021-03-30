import HttpService from './httpService'

export const IdntEncService = {
  getIdentifiedEncounters,
  getIdentifiedEncounter,
  updateIdentified,
  addIdentifiedEncounter,
  deleteIdentified,

}

async function addIdentifiedEncounter(identifiedEncounter) {
  console.log(identifiedEncounter);

  if (identifiedEncounter) {
    return HttpService.post(`/api/addIdentifiedEncounter`, identifiedEncounter)
  } else {
    console.log("no identifiedEncounter data");
  }
}

function getIdentifiedEncounters() {
  return HttpService
  .get(`/api/getAllIdentifiedEncounters`)
  .then(res => {
    return res.data.identifiedEncounters.rows;
  } );
}

function getIdentifiedEncounter(id) {
  return HttpService
  .get(`/api/getIdentifiedEncounter?id=${id}`)
  .then(res => {
    console.log( res.data.identifiedEncounter);
    return res.data.identifiedEncounter;
  } );
}

function updateIdentified(id, data) {
  console.log(data);
  const body ={}
  return HttpService
  .put(`/api/updateIdentifiedEncounter?id=${id}`, data)
  .then(res => {
    return res;
  } );
}

function deleteIdentified(id) {
  return HttpService
  .delete(`/api/deleteIdentifiedEncounter?id=${id}`)
  .then(res => {
    return res;
  } );
}