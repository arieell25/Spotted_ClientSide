import HttpService from './httpService'

export const speciesDetectionService = {
    detectSpecies,
}

async function detectSpecies(fd, id) {
    console.log('detection service fd: ' + fd);
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/', fd)
    } else {
      console.log("no photo data in detection");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }