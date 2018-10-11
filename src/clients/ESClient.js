import elasticsearch from "elasticsearch";

export const esclient =  new elasticsearch.Client({
  host: process.env.REACT_APP_ES_URL,
  // log: 'trace'
})
