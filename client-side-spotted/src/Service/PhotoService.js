import HttpService from './httpService'
import {userService} from './UserService';

export const PhotoService = {
  getEncounterPhotos,
  uploadPhoto,
  uploadRawPhoto,
  addPhoto,
  deleteBlobPhoto,
  getIdntEncounterPhotos,
  getEncounterPhotosBBox,
  getIdntEncounterProfilePic,
  updateDBPhoto,
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
  async function updateDBPhoto(id, url) {
    // console.log('addphoto:  ' + url);
    if (id) {
      const body ={ id: id, url: url};
      return HttpService.put(`/api/updateDBphoto`, body)
    } else {
      console.log("no photo data");
      // return HttpService.post(`api/addPhotos`, encounter); TODO many photos.
    }
  }

async function uploadPhoto(fd, id) {
    console.log('photo service id: ' + id +' fd: ' + fd);
    if (fd) {
      if(userService.isLoggedIn()){
        return HttpService.post(`/api/uploadphoto?id=${id}`, fd)
      }
      else{
        return HttpService.post(`/pub/uploadphoto?id=${id}`, fd)

      }
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
    if(userService.isLoggedIn()){
      return HttpService.get(`/api/getEncounterPhotos?id=${encounterId}`)
      .then(res=> {
        return res.data.photos;
      })    
    }
    else{
      return HttpService.get(`/pub/getEncounterPhotos?id=${encounterId}`)
      .then(res=> {
        return res.data.photos;
      })
    }
    // return HttpService.get(`/api/getEncounterPhotos?id=${encounterId}`)
    // .then(res=> {
    //   return res.data.photos;
    // })
  }
  
  function getIdntEncounterProfilePic(ids) {
    console.log(ids);
    const body ={ individualids: ids}
      return HttpService.post(`/api/getIdntEncountersProfilePics`, body)
      .then(res=> {
        return res.data.identEncounters;
      })    
  }
  function getIdntEncounterPhotos(id) {
    return HttpService.get(`/api/getIdntEncounterPhotos?id=${id}`)
    .then(res=> {
      return res.data.photos;
    })
  }

  function getEncounterPhotosBBox(data) {
    if(data){
      const body ={photosId: data} ;
      return HttpService.post(`/api/getPhotosBoundingBoxes`, body)
      .then(res=> {
        return res.data.boundingBoxes;
      })
    }

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