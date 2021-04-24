import HttpService from './httpService'

export const identificationService = {
  identifyPhoto,
}

async function identifyPhoto(fd, id) {
    console.log('identification service fd: ' + fd);
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/identification', fd)
    } else {
      console.log("no photo data in identification");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }