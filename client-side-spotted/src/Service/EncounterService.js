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
  getMediatypes,
  getUserEncounters,
  deactivateEncounter,
  getEncounterVideo,
  getEncountersCount
}

function getEncounters() {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getActiveEncounters`)
    .then(res => {
      return res.data.encounters.rows;
    } );
  }
  else{
    return HttpService
    .get(`/pub/getActiveEncounters`)
    .then(res => {
      return res.data.encounters.rows;
    } );
  }
}
function getEncountersCount() {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getActiveEncounters`)
    .then(res => {
      return res.data.encounters;
    } );
  }
}

function getUserEncounters() {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getAllUserEncounters`)
    .then(res => {
      return res.data.encounters.rows;
    } );
  }
  else{
    return ('Please login')
  }

}


function updateEncounter(id, data) {
  console.log(data);
  return HttpService
  .put(`/api/updateEncounter?id=${id}`, data)
  .then(res => {
    return res;
  } );
}

function updateEncounterPic(id, data) {
  if(data){
    const body ={ ProfilePicture: data};
    // if(userService.isLoggedIn()){
    //   return HttpService
    // .put(`/api/updateEncounter?id=${id}`, body)
    // .then(res => {
    //   return res;
    // } );
    // }
    // else{
      return HttpService
      .put(`/pub/updateEncounter?id=${id}`, body)
      .then(res => {
        return res;
      } );
    // }
    
  }else{
    return ("No data was provided");
  }

}

function deactivateEncounter(id) {
  const body = { id: id, isActive: 0 };
  return HttpService
  .put(`/api/updateEncounterIsActive`, body)
  .then(res => {
    return res;
  } );
}

function deleteEncounter(id) {
  return HttpService
  .delete(`/api/deleteEncounter?id=${id}`)
  .then(res => {
    return res;
  } );
}

function getEncounterById(encounterId) {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getEncounter?id=${encounterId}`)
    .then(res => {
      return res.data.encounter;
    } );
  }
  else{
    return  HttpService
    .get(`/pub/getEncounter?id=${encounterId}`)
    .then(res => {
      return res.data.encounter;
    } );
  }

}
function getEncounterVideo(encounterId) {
  if(userService.isLoggedIn()){
    return  HttpService
    .get(`/api/getEncounterVideos?id=${encounterId}`)
    .then(res => {
      return res.data.video;
    } );
  }
  else{
    return  HttpService
    .get(`/pub/getEncounterVideos?id=${encounterId}`)
    .then(res => {
      return res.data.video;
    } );
  }

}

function addEncounter(encounter) {
  console.log(encounter);

  if (encounter) {
    if(userService.isLoggedIn()){
      return  HttpService.post(`/api/addEncounter`, encounter)
    }
    else{
      return HttpService.post(`/pub/addEncounter`, encounter)
    }
  } else {
    console.log("no encounter data");
  }
}

function getIsraelSites() {
  return HttpService
  .get(`/pub/getAllIsraeliSites`)
  .then(res => {
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