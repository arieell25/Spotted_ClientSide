import HttpService from './httpService'

export const EncounterService = {
  getEncounters,
  addEncounter,
  getEncounterById,
  uploadPhoto,
  addBoundingBox,
  addPhoto
  // save
}

function getEncounters() {
  // return HttpService.get(`/api/getAllencounters`);
  return HttpService
  .get(`/api/getAllEncounters`)
  .then(res => {
    console.log('in func data: ' + JSON.stringify(res.data.encounters.rows));
    return res.data.encounters.rows;
  } );

}
// function query() {
//   let queryStr = '?';
//   for (const key in filterBy) {
//     queryStr += `${key}=${filterBy[key]}&`;
//   }
//   return HttpService.get(`encounters${queryStr || ''}`);
// }

function getEncounterById(encounterId) {
  var result = HttpService.get(`/api/getEncounter?id=${encounterId}`)
  console.log(result);
  return 0;
}

// function remove(encounterId) {
//   return HttpService.delete(`encounters/${encounterId}`)
// }

async function addEncounter(encounter) {
  console.log(encounter);

  if (encounter) {
    return HttpService.post(`/api/addEncounter`, encounter)
  } else {
    console.log("no encounter data");
    // return HttpService.post(`api/addEncounter`, encounter);
  }
}

async function uploadPhoto(fd, id) {
  console.log('photo service id: ' + id +' fd: ' + fd);
  if (fd) {
    return HttpService.post(`/api/uploadphoto?id=${id}`, fd)
  } else {
    console.log("no photo data");
    // return HttpService.post(`api/addEncounter`, encounter);
  }
}

async function addBoundingBox(data, photoId) {
  console.log('addBoundingBox id : ' + photoId+ 'data: ' + data[0][0].confidences);
  var body ;
   if (data) {
     body ={confidences: data[0][0].confidences, h: data[0][0].h, y: data[0][0].y, x: data[0][0].x, w: data[0][0].w, photoId: photoId};
    return HttpService.post(`/api/addBoundingBox`, body)
  } else {
    console.log("no addBoundingBox data");
    // return HttpService.post(`api/addEncounter`, encounter);
  }
}

async function addPhoto(id, url, count) {
  console.log('addphoto:  ' + url);
  if (id) {
    const body ={ id: id, url: url, count: count};
    return HttpService.post(`/api/addphoto`, body)
  } else {
    console.log("no addBoundingBox data");
    // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
  }
}