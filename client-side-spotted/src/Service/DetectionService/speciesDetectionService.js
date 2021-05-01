import HttpService from './httpService'

export const speciesDetectionService = {
    detectSpecies,
    detectSpeciesPhotos,
    detectSpeciesVideos
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

  async function detectSpeciesPhotos(fd, id) {
    console.log('detection service fd: ' + JSON.stringify(fd) );
    // const images
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/uploadimages', fd)
    } else {
      console.log("no photos data for detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  
  async function detectSpeciesVideos(fd, id) {
    console.log('detection service fd: ' + JSON.stringify(fd) );
    // const images
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/uploadVideo', fd)
    } else {
      console.log("no video data for detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }