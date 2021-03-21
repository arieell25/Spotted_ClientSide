import HttpService from './httpService'

export const IdentifiedEncounterService = {
  //getEncounters,
  addIdentifiedEncounter
}

async function addIdentifiedEncounter(identifiedEncounter) {
  console.log(identifiedEncounter);

  if (identifiedEncounter) {
    return HttpService.post(`/api/addIdentifiedEncounter`, identifiedEncounter)
  } else {
    console.log("no identifiedEncounter data");
  }
}
