import HttpService from "./httpService";
import { userService } from "./UserService";

export const SystemResultsService = {
  getFirstSystemResults,
  addFirstSystemResults,
  getEncounterFirstSystemResults,
  addSecondSystemResults,
  addManualResult,
  addVideoFirstSystemResults,
};

//function for getting species detection results from server by ID
async function getFirstSystemResults(id) {
  if (id) {
    const body = { id: id };
    return HttpService.get(`/api/getFirstSystemResult`, body);
  } else {
    return "no id data";
  }
}
//function for getting species detection results from server by encounter ID
async function getEncounterFirstSystemResults(encounterid) {
  if (encounterid) {
    const body = { id: encounterid };
    return HttpService.get(`/api/getEncounterFirstSystemResult`, body);
  } else {
    return "no encounter id data";
  }
}

//function for sending species detection results to server
function addFirstSystemResults(data, encounterId, photosBlboData) {
  if (data) {
    const body = {
      encounterId: encounterId,
      results: data,
      photosBlobData: photosBlboData,
    };
    if (userService.isLoggedIn()) {
      return HttpService.post(`/api/addEncounterFirstSystemResults`, body).then(
        (res) => {
          return res.data;
        }
      );
    } else {
      return HttpService.post(`/pub/addEncounterFirstSystemResults`, body).then(
        (res) => {
          return res.data;
        }
      );
    }
  } else {
    return "no data was provided";
  }
}

//function for sending species detection in video results to server
function addVideoFirstSystemResults(rawdata, encounterId) {
  if (rawdata) {
    const body = { encounterId: encounterId, results: rawdata.data };
    if (userService.isLoggedIn()) {
      return HttpService.post(`/api/addVideoFirstSystemResults`, body).then(
        (res) => {
          return res.data;
        }
      );
    } else {
      return HttpService.post(`/pub/addVideoFirstSystemResults`, body).then(
        (res) => {
          return res.data;
        }
      );
    }
  } else {
    return "no video data was provided";
  }
}

//function for sending manual individual identification results to server
function addManualResult(originalPhoto, idvalue, encounterid) {
  if (idvalue) {
    const body = {
      EncounterID: encounterid,
      IndividualID: idvalue,
      url: originalPhoto,
    };
    return HttpService.post(`/api/addManualResult`, body).then((res) => {
      return res.data.newResult;
    });
  } else {
    return "no data was provided";
  }
}

//function for sending system individual identification results to server
function addSecondSystemResults(data) {
  if (data) {
    const body = { Results: data };
    return HttpService.post(`/api/addSecondSystemResults`, body).then((res) => {
      return res.data.secondSystemResults;
    });
  } else {
    return "no data was provided";
  }
}
