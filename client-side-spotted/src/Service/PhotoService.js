import HttpService from './httpService'

export const PhotoService = {
  getEncounterPhotos,
  uploadPhoto,
  uploadRawPhoto,
  addPhoto,
  deleteBlobPhoto,
  getIdntEncounterPhotos
//   updateEncounter,
//   deletephoto
}

async function addPhoto(id, url, count) {
    console.log('addphoto:  ' + url);
    if (id) {
      const body ={ id: id, url: url, count: count};
      return HttpService.post(`/api/addphoto`, body)
    } else {
      console.log("no photo data");
      // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
    }
  }

async function uploadPhoto(fd, id) {
    console.log('photo service id: ' + id +' fd: ' + fd);
    if (fd) {
      return HttpService.post(`/api/uploadphoto?id=${id}`, fd)
    } else {
      console.log("no photo data");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }

  async function uploadRawPhoto(fd, id) {
    console.log('photo service id: ' + id +' fd: ' + fd);
    if (fd) {
      return HttpService.post(`/api/uploadrawphoto?id=${id}`, fd)
    } else {
      console.log("no photo data");
    }
  }

  function getEncounterPhotos(encounterId) {
    return HttpService.get(`/api/getEncounterPhotos?id=${encounterId}`)
    .then(res=> {
      return res.data.photos;
    })
  }

  function getIdntEncounterPhotos(id) {
    return HttpService.get(`/api/getIdntEncounterPhotos?id=${id}`)
    .then(res=> {
      return res.data.photos;
    })
  }

  async function deleteBlobPhoto(id, files) {
    console.log('photo service delete id: ' + id );
    if (id) {
      const body = {encounterId: id, files: files};
      return HttpService.post(`/api/deletephotofromBlob`,body);
    } else {
      console.log("no photo data");
      // return HttpService.post(`api/addEncounter`, encounter);
    }
  }