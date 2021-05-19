import HttpService from './httpService'
import {userService} from './UserService';

export const VideoService = {
  getEncounterVideos,
  uploadVideo,
  addVideo,
  getIdntEncounterVideos
//   updateEncounter,
//   deletephoto
}

async function addVideo(id, fileName) {
    console.log('addvideo:  ' + fileName);
    if (id) {
      const body ={ id: id, fileName: fileName};
      if(userService.isLoggedIn()){
      return HttpService.post(`/api/addVideo`, body)
      .then(res=> {
        return res.data;
      })
      }else{
        return HttpService.post(`/pub/addVideo`, body)
        .then(res=> {
          return res.data;
        })
      }
    } else {
      console.log("no video data");
      // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
    }
  }

async function uploadVideo(fd, id) {
    console.log('video service id: ' + id +' fd: ' + fd);
    if (fd) {
      return HttpService.post(`/api/uploadvideo?id=${id}`, fd)
    } else {
      console.log("no video data");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  function getEncounterVideos(encounterId) {
    return HttpService.get(`/api/getEncounterVideos?id=${encounterId}`)
    .then(res=> {
      return res.data.videos;
    })
  }

  function getIdntEncounterVideos(id) {
    return HttpService.get(`/api/getIdntEncounterVideos?id=${id}`)
    .then(res=> {
      return res.data.videos;
    })
  }