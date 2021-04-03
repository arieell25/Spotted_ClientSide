import HttpService from './httpService'

export const PhotoService = {
//   getPhotosofEncounter,
  uploadPhoto,
  addPhoto,
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