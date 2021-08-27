import HttpService from "./httpService";

export const speciesDetectionService = {
  detectSpecies,
  detectSpeciesPhotos,
  detectSpeciesVideos,
  copyEncounterImagefromBlob,
};

async function detectSpecies(fd, id) {
  console.log("detection service fd: " + fd);
  if (fd) {
    return HttpService.post("/", fd);
  } else {
    console.log("no photo data for detection");
  }
}

async function detectSpeciesPhotos(fd) {
  if (fd) {
    return HttpService.post("/uploadimages", fd);
  } else {
    console.log("no photos data for detection");
  }
}

async function detectSpeciesVideos(fd) {
  if (fd) {
    return HttpService.post("/uploadVideo", fd);
  } else {
    console.log("no video data for detection");
  }
}

async function copyEncounterImagefromBlob(src, idntId) {
  let arr_str = src.split("/");
  if (idntId && src) {
    const body = {
      url: src,
      fileName: arr_str[5],
      individual_ID: idntId.toString(),
    };
    return HttpService.post("/copyBlobImage", body);
  } else {
    return "No url or indevidual id data";
  }
}
