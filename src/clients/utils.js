import {toString, omitBy, isEmpty, has, map, flatten} from "lodash";

// Pass an object { category: Set([ 'cells' ]) } 
export const filterBuilder = (filters) => {
  return flatten(Object.keys(filters).map( key => {
    return map( Array.from(filters[key]), val => {
      return { term: { [key]: val } };
    })
   }));
}
