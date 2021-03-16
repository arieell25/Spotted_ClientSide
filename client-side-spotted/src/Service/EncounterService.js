import HttpService from './httpService'

export const EncounterService = {
  getEncounters,
  addEncounter,
  getEncounterById,
  // remove,
  // save
}

function getEncounters() {
  return HttpService.get(`/encounters/getAllencounters`);
}
// function query() {
//   let queryStr = '?';
//   for (const key in filterBy) {
//     queryStr += `${key}=${filterBy[key]}&`;
//   }
//   return HttpService.get(`encounters${queryStr || ''}`);
// }

function getEncounterById(encounterId) {
  return HttpService.get(`encounters/${encounterId}`)
}

// function remove(encounterId) {
//   return HttpService.delete(`encounters/${encounterId}`)
// }

async function addEncounter(encounter) {
  if (encounter.id) {
    return HttpService.put(`/encounters/getEncounter`, encounter)
  } else {
    return HttpService.post(`/encounters/addEncounter`, encounter);
  }
}