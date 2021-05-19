import HttpService from './httpService'

export const speciesDetectionService = {
    detectSpecies,
    detectSpeciesPhotos,
    detectSpeciesVideos,
    copyEncounterImagefromBlob
}

async function detectSpecies(fd, id) {
    console.log('detection service fd: ' + fd);
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/', fd)
    } else {
      console.log("no photo data for detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  async function detectSpeciesPhotos(fd) {
    // console.log('detection service fd: ' + JSON.stringify(fd) );
    if (fd) {
      return HttpService.post('/uploadimages', fd)
    } else {
      console.log("no photos data for detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  
  async function detectSpeciesVideos(fd) {
    // console.log('detection service fd: ' + JSON.stringify(fd) );
    if (fd) {
      return HttpService.post('/uploadVideo', fd)
    } else {
      console.log("no video data for detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  async function copyEncounterImagefromBlob(src, idntId) {
    let arr_str = (src).split("/");
    if (idntId && src) {
      const body ={url: src, fileName:arr_str[5], individual_ID: idntId.toString() }
      return HttpService.post('/copyBlobImage', body)
    } else {
      return("No url or indevidual id data");
    }
  }