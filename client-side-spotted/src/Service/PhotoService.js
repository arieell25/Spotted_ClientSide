import HttpService from "./httpService";
import { userService } from "./UserService";

export const PhotoService = {
  getEncounterPhotos,
  getPhotoByUrl,
  uploadPhoto,
  uploadRawPhoto,
  addPhoto,
  deleteBlobPhoto,
  getIdntEncounterPhotos,
  getEncounterPhotosBBox,
  getIdntEncounterProfilePic,
  updateDBPhoto,
  updatePhotobyID,
  updatePhotoSide,
  getPhotosCount,
  getPhotosCountbySides,
  copyBlobImage,
  getPhotosforIdentification,
  getIdntEncountersPhotos,
};
//Functions - handeling requests about photos to API server
async function addPhoto(id, url, count) {
  if (id) {
    const body = { id: id, url: url, count: count };
    return HttpService.post(`/api/addphoto`, body);
  } else {
    console.log("no photo data");
  }
}
async function updateDBPhoto(id, item) {
  if (id) {
    const body = { id: id, url: item };
    return HttpService.put(`/api/updateDBphoto`, body);
  } else {
    console.log("no photo data");
  }
}

async function updatePhotobyID(item, data) {
  if (item) {
    const body = {};
    return HttpService.put(`/api/updatephoto?id=`, body);
  } else {
    console.log("no photo data");
  }
}
async function updatePhotoSide(item, data) {
  if (item) {
    let body;
    switch (data) {
      case "1":
      case "2":
      case "3":
        body = {
          FrontSide: 0,
          LeftSide: 0,
          RightSide: 1,
          TopSide: 0,
          BackSide: 0,
          src: item.src,
        };
        break;
      case "4":
      case "5":
      case "6":
        body = {
          FrontSide: 0,
          LeftSide: 1,
          RightSide: 0,
          TopSide: 0,
          BackSide: 0,
          src: item.src,
        };
        break;
      case "7":
        body = {
          FrontSide: 0,
          LeftSide: 0,
          RightSide: 0,
          TopSide: 1,
          BackSide: 0,
          src: item.src,
        };
        break;
      case "TopSide":
        body = {
          FrontSide: 0,
          LeftSide: 0,
          RightSide: 0,
          TopSide: 1,
          BackSide: 0,
          src: item.src,
        };
        break;
      case "BackSide":
        body = {
          FrontSide: 0,
          LeftSide: 0,
          RightSide: 0,
          TopSide: 0,
          BackSide: 1,
          src: item.src,
        };
        break;
      default:
        body = {
          FrontSide: 0,
          LeftSide: 0,
          RightSide: 0,
          TopSide: 0,
          BackSide: 0,
          src: item.src,
        };
        break;
    }
    return HttpService.put(`/api/updatePhotoSide`, body);
  } else {
    console.log("no photo data");
  }
}

async function uploadPhoto(fd, id) {
  if (fd) {
    if (userService.isLoggedIn()) {
      return HttpService.post(`/api/uploadphoto?id=${id}`, fd);
    } else {
      return HttpService.post(`/pub/uploadphoto?id=${id}`, fd);
    }
  } else {
    console.log("no photo data");
  }
}

async function uploadRawPhoto(fd, id) {
  if (fd) {
    return HttpService.post(`/api/uploadrawphoto?id=${id}`, fd);
  } else {
    console.log("no photo data");
  }
}

function getEncounterPhotos(encounterId) {
  if (userService.isLoggedIn()) {
    return HttpService.get(`/api/getEncounterPhotos?id=${encounterId}`).then(
      (res) => {
        return res.data.photos;
      }
    );
  } else {
    return HttpService.get(`/pub/getEncounterPhotos?id=${encounterId}`).then(
      (res) => {
        return res.data.photos;
      }
    );
  }
}

function getPhotosforIdentification(encounterId) {
  return HttpService.get(
    `/api/getEncounterPhotosforIdentification?id=${encounterId}`
  ).then((res) => {
    return res.data.photos;
  });
}
function getPhotosCount() {
  return HttpService.get(`/api/getAllDetectPhotosCount`).then((res) => {
    return res.data.count;
  });
}

function getPhotosCountbySides() {
  return HttpService.get(`/api/getPhotosbySides`).then((res) => {
    return res.data;
  });
}

function getIdntEncounterProfilePic(ids) {
  const body = { individualids: ids };
  return HttpService.post(`/api/getIdntEncountersProfilePics`, body).then(
    (res) => {
      return res.data.identEncounters;
    }
  );
}

function getIdntEncountersPhotos(ids) {
  const intArr = ids.map(Number);
  const body = { individualids: intArr };
  return HttpService.post(`/api/getIdntEncountersPhotos`, body).then((res) => {
    return res.data.identEncounters;
  });
}

function getIdntEncounterPhotos(id) {
  return HttpService.get(`/api/getIdntEncounterPhotos?id=${id}`).then((res) => {
    return res.data.photos;
  });
}

function getPhotoByUrl(url) {
  const body = { PhotoPath: url };
  return HttpService.put(`/api/getPhotoByUrl`, body).then((res) => {
    return res.data.photo;
  });
}
function getEncounterPhotosBBox(data) {
  if (data) {
    const body = { photosId: data };
    return HttpService.post(`/api/getPhotosBoundingBoxes`, body).then((res) => {
      return res.data.boundingBoxes;
    });
  }
}

async function deleteBlobPhoto(id, files) {
  if (id) {
    const body = { encounterId: id, files: files };
    return HttpService.post(`/api/deletephotofromBlob`, body);
  } else {
    console.log("no files data");
  }
}

async function copyBlobImage(id, urls) {
  if (id && urls) {
    const body = { id: id, urlArr: urls };
    return HttpService.post(`/api/imageBlobCopy`, body);
  } else {
    console.log("no data provided");
  }
}
