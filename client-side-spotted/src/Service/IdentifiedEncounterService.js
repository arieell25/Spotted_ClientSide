import HttpService from './httpService'
import {userService} from './UserService';

export const IdntEncService = {
  getIdentifiedEncounters,
  getIdentifiedEncounter,
  updateIdentified,
  addIdentifiedEncounter,
  deleteIdentified,
  getLifeStages,
  getIdentifiedEncountersCount,
  getIdntEnountersperMonth,
  getIdntEnountersPhotosbySides,
  getIdntEncounterSites,
}

async function addIdentifiedEncounter(identifiedEncounter) {
  console.log(`Adding new identety:  ${identifiedEncounter}`);

  if (identifiedEncounter) {
    return HttpService.post(`/api/addIdentifiedEncounter`, identifiedEncounter)
    .then(res => res.data.newIdentifiedEncounter)
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
function getIdentifiedEncountersCount() {
  return HttpService
  .get(`/api/getAllIdentifiedEncounters`)
  .then(res => {
    return res.data.identifiedEncounters.count;
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

function getLifeStages() {
  return HttpService
  .get(`/api/getLifeStages`)
  .then(res => {
    return res.data.lifeStage.rows;
  } );
}

function getIdntEnountersperMonth() {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getIdentEncountersperMonth`)
    .then(res => {
      return res.data;
    } );
  }
}

function getIdntEnountersPhotosbySides() {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getIdntEncounterPhotosbySides`)
    .then(res => {
      return res.data;
    } );
  }
}

function getIdntEncounterSites(id) {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getIdntEncounterPhotosSites?id=${id}`)
    .then(res => {
      return res.data;
    } );
  }
}