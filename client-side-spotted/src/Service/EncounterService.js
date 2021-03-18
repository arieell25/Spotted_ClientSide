import HttpService from './httpService'

export const EncounterService = {
  getEncounters,
  addEncounter,
  getEncounterById,
  // remove,
  // save
}

function getEncounters() {
  return HttpService.get(`/api/encounters/getAllencounters`);
}
// function query() {
//   let queryStr = '?';
//   for (const key in filterBy) {
//     queryStr += `${key}=${filterBy[key]}&`;
//   }
//   return HttpService.get(`encounters${queryStr || ''}`);
// }

function getEncounterById(encounterId) {
  return HttpService.get(`/api/encounter?id=${encounterId}`)
}

// function remove(encounterId) {
//   return HttpService.delete(`encounters/${encounterId}`)
// }

async function addEncounter(encounter) {
  console.log(encounter);
  // return HttpService.post(`/pub/addEncounter`, encounter)

  // if(localStorage.getItem('token')){
  //    return HttpService.put(`/api/addEncounter`, encounter)
  // }
  if (encounter) {
    return HttpService.post(`/api/addEncounter`, encounter)
  } else {
    console.log("no encounter data");
    // return HttpService.post(`api/addEncounter`, encounter);
  }
}