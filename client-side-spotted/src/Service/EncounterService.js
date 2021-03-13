import HttpService from './httpService'

export const EncounterService = {
  show
  //query,
  // getById,
  // remove,
  // save
}

function show() {
  return HttpService.get(`encounters/getAllencounters`);
}
// function query() {
//   let queryStr = '?';
//   for (const key in filterBy) {
//     queryStr += `${key}=${filterBy[key]}&`;
//   }
//   return HttpService.get(`encounters${queryStr || ''}`);
// }

// function getById(encounterId) {
//   return HttpService.get(`encounters/${encounterId}`)
// }

// function remove(encounterId) {
//   return HttpService.delete(`encounters/${encounterId}`)
// }

// async function save(encounter) {
//   if (encounter.id) {
//     return HttpService.put(`encounters/${encounter.id}`, encounter)
//   } else {
//     return HttpService.post(`encounters`, encounter);
//   }
// }