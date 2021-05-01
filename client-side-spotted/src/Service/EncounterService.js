import HttpService from './httpService'
import {userService} from './UserService';

export const EncounterService = {
  getEncounters,
  addEncounter,
  getEncounterById,
  addBoundingBox,
  updateEncounter,
  deleteEncounter,
  getIsraelSites,
  updateEncounterPic,
  getMediatypes
}

function getEncounters() {
  return HttpService
  .get(`/api/getAllEncounters`)
  .then(res => {
    // console.log('in func data: ' + JSON.stringify(res.data.encounters.rows));
    return res.data.encounters.rows;
  } );

}

function updateEncounter(id, data) {
  return HttpService
  .put(`/api/updateEncounter?id:${id}`, data)
  .then(res => {
    return res;
  } );
}

function updateEncounterPic(id, data) {
  if(data){
    const body ={ url: data};
    return HttpService
    .put(`/api/updateEncounter?id=${id}`, body)
    .then(res => {
      return res;
    } );
  }else{
    return ("No data was provided");
  }

}

function deleteEncounter(id) {
  return HttpService
  .delete(`/api/deleteEncounter?id=${id}`)
  .then(res => {
    return res;
  } );
}

function getEncounterById(encounterId) {
  return HttpService.get(`/api/getEncounter?id=${encounterId}`)
  .then(res=> {
    return res.data.encounter;
  })
}

async function addEncounter(encounter) {
  console.log(encounter);

  if (encounter) {
    return HttpService.post(`/pub/addEncounter`, encounter)
  } else {
    console.log("no encounter data");
    // return HttpService.post(`api/addEncounter`, encounter);
  }
}

function getIsraelSites() {
  // console.log(userService.isLoggedIn)
  return HttpService
  .get(`/pub/getAllIsraeliSites`)
  .then(res => {
    // console.log('in func data: ' + JSON.stringify(res.data.encounters.rows));
    return res.data.sites;
  } );
}

function getMediatypes() {
  // console.log(userService.isLoggedIn)
  return HttpService
  .get(`/api/getMediaTypes`)
  .then(res => {
    // console.log('in func data: ' + JSON.stringify(res.data.encounters.rows));
    return res.data.MediaTypes.rows;
  } );
}

async function addBoundingBox(data, photoId) {
  console.log('addBoundingBox id : ' + photoId+ 'data: ' + data[0][0].confidences);
  var body ;
   if (data) {
     body ={confidences: data[0][0].confidences, h: data[0][0].h, y: data[0][0].y, x: data[0][0].x, w: data[0][0].w, photoId: photoId};
    return HttpService.post(`/api/addBoundingBox`, body)
  } else {
    console.log("no addBoundingBox data");
  }
}

// async function addPhoto(id, url, count) {
//   console.log('addphoto:  ' + url);
//   if (id) {
//     const body ={ id: id, url: url, count: count};
//     return HttpService.post(`/api/addphoto`, body)
//   } else {
//     console.log("no photo data");
//     // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
//   }
// }