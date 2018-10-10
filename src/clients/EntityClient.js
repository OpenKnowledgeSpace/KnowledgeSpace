const ES_URL = "http://nif-services.neuinfo.org/servicesv1/v1/federation/data/nlx_154697-8?q=sao862606388";

export const findByEntity = (params) => {
  return fetch(ES_URL, { mode: 'no-cors' }).then(response => {
    return {}; 
  }).then( json => {
    return { title: "Pyramidal Cell" }  
  })

}
