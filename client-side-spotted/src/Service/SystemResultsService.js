import HttpService from './httpService'
import {userService} from './UserService';

export const SystemResultsService = {
  getFirstSystemResults,
  addFirstSystemResults,
  getEncounterFirstSystemResults,
  addSecondSystemResults,
  addManualResult,
  addVideoFirstSystemResults
}

async function getFirstSystemResults(id) {
    // console.log('addphoto:  ' + url);
    if (id) {
      const body ={ id: id};
      return HttpService.get(`/api/getFirstSystemResult`, body)
    } else {
      console.log("no data");
      // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
    }
  }
  async function getEncounterFirstSystemResults(encounterid) {
    // console.log('addphoto:  ' + url);
    if (encounterid) {
      const body ={ id: encounterid};
      return HttpService.get(`/api/getEncounterFirstSystemResult`, body)
    } else {
      console.log("no encounter id data");
      // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
    }
  }

  function addFirstSystemResults(data, encounterId, photosBlboData) {
    console.log(photosBlboData);
      if(data){
          const body = {encounterId: encounterId, results: data, photosBlobData: photosBlboData}
          if(userService.isLoggedIn()){
            return HttpService.post(`/api/addEncounterFirstSystemResults`, body)
            .then(res=> {
              return res.data;
            })
          }else{
            return HttpService.post(`/pub/addEncounterFirstSystemResults`, body)
            .then(res=> {
              return res.data;
            })
          }

      }else{
        console.log("no results  data");
        return('no data was provided');
      }

  }
  function addVideoFirstSystemResults(rawdata, encounterId) {
    // console.log(rawdata);
      if(rawdata){
          const body = {encounterId: encounterId, results: rawdata.data}
          if(userService.isLoggedIn()){
            return HttpService.post(`/api/addVideoFirstSystemResults`, body)
            .then(res=> {
              return res.data;
            })
          }else{
            return HttpService.post(`/pub/addVideoFirstSystemResults`, body)
            .then(res=> {
              return res.data;
            })
          }
      }else{
        console.log("no video results data");
        return('no video data was provided');
      }

  }
  function addManualResult(originalPhoto, idvalue, encounterid) {
      if(idvalue){
          const body = {EncounterID: encounterid, IndividualID: idvalue, url: originalPhoto}
            return HttpService.post(`/api/addManualResult`, body)
            .then(res=> {
              return res.data.newResult;
            })
      }else{
        console.log("no results  data");
        return('no data was provided');
      }

  }
  function addSecondSystemResults(data) {
    // console.log(photosBlboData);
    // const {} = data;
      if(data){
          const body = {Results: data }
            return HttpService.post(`/api/addSecondSystemResults`, body)
            .then(res=> {
              return res.data.newResult;
            })
      }else{
        console.log("no results  data");
        return('no data was provided');
      }

  }

//   function getIdntEncounterPhotos(id) {
//     return HttpService.get(`/api/getIdntEncounterPhotos?id=${id}`)
//     .then(res=> {
//       return res.data.photos;
//     })
//   }