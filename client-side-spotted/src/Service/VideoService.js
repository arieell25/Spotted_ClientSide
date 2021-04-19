import HttpService from './httpService'

export const PhotoService = {
  getEncounterVideos,
  uploadVideo,
  addVideo,
  getIdntEncounterVideos
//   updateEncounter,
//   deletephoto
}

async function addVideo(id, url, count) {
    console.log('addvideo:  ' + url);
    if (id) {
      const body ={ id: id, url: url, count: count};
      return HttpService.post(`/api/addvideo`, body)
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