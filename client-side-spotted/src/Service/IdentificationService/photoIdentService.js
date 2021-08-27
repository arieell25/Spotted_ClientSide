import HttpService from "./httpService";

export const identificationService = {
  identifyPhoto,
  identifyPhotos,
  setIndividualIdentity,
  setNewIndividualIdentity,
};

async function identifyPhoto(fd) {
  if (fd) {
    return HttpService.post("/identification", fd).then((res) => {
      return res;
    });
  } else {
    console.log("no photo data.");
  }
}

async function identifyPhotos(photosUrls, boundingBoxes) {
  if (photosUrls && boundingBoxes) {
    var body = {
      photos: photosUrls,
      boundingBoxes: boundingBoxes,
    };
    return HttpService.post("/identifyPhotos", body);
  } else {
    return "no photo data in identification";
  }
}

async function setIndividualIdentity(item, src) {
  if (item) {
    let arr_str = src.split("/");
    var body = {
      individual_ID: item.value,
      value: arr_str[5],
      LeftSide: item.LeftSide,
      RightSide: item.RightSide,
      TopSide: item.TopSide,
    };
    return HttpService.post("/setIndividualIdentity", body);
  } else {
    return "no individual_ID or src data for setIndividualIdentity";
  }
}
async function setNewIndividualIdentity(id, item) {
  if (item) {
    let arr_str = item.src.split("/");
    var body = {
      individual_ID: id,
      value: arr_str[5],
      LeftSide: item.LeftSide,
      RightSide: item.RightSide,
      TopSide: item.TopSide,
    };
    return HttpService.post("/setIndividualIdentity", body);
  } else {
    return "no individual_ID or src data for setIndividualIdentity";
  }
}
