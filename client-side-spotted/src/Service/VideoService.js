import HttpService from "./httpService";
import { userService } from "./UserService";

export const VideoService = {
  getEncounterVideos,
  uploadVideo,
  addVideo,
  getIdntEncounterVideos,
};

async function addVideo(id, fileName) {
  if (id) {
    const body = { id: id, fileName: fileName };
    if (userService.isLoggedIn()) {
      return HttpService.post(`/api/addVideo`, body).then((res) => {
        return res.data;
      });
    } else {
      return HttpService.post(`/pub/addVideo`, body).then((res) => {
        return res.data;
      });
    }
  } else {
    return "no video data";
  }
}

async function uploadVideo(fd, id) {
  if (fd) {
    return HttpService.post(`/api/uploadvideo?id=${id}`, fd);
  } else {
    return "no video data";
  }
}

function getEncounterVideos(encounterId) {
  return HttpService.get(`/api/getEncounterVideos?id=${encounterId}`).then(
    (res) => {
      return res.data.videos;
    }
  );
}

function getIdntEncounterVideos(id) {
  return HttpService.get(`/api/getIdntEncounterVideos?id=${id}`).then((res) => {
    return res.data.videos;
  });
}
