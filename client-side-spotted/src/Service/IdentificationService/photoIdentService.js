import HttpService from './httpService'

export const identificationService = {
  identifyPhoto,
  identifyPhotos,
  setIndividualIdentity,
}

async function identifyPhoto(fd, id) {
    console.log('identification service fd: ' + fd);
    if (fd) {
      // var id = query.get("id");
      return HttpService.post('/identification', fd)
      .then(res => {
        return res})
    } else {
      console.log("no photo data in identification");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  async function identifyPhotos(photosUrls, boundingBoxes) {
    console.log('identification service fd: ' );
    if (photosUrls && boundingBoxes) {
      var body = { 
        photos: photosUrls, 
        boundingBoxes: boundingBoxes
      }
      return HttpService.post('/identifyPhotos', body)
    } else {
      return("no photo data in identification");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }
  
  async function setIndividualIdentity(item, src) {
    console.log(`setIndividualIdentity service data:${item} ` );
    if (item) {
      let arr_str = (src).split("/");
      // console.log(arr_str[5]);

      var body = { 
        individual_ID: item.value,
        value: arr_str[5],
        LeftSide: item.LeftSide,
        RightSide: item.RightSide,
        TopSide: item.TopSide
      }
      return HttpService.post('/setIndividualIdentity', body)
    } else {
      return("no individual_ID or src data for setIndividualIdentity");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }