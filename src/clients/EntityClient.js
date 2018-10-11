import React from "react";
import {esclient} from "./ESClient";

export const findByEntity = (params) => {
  if ( typeof params == 'undefined' ) { 
    return {};
  }
  
  return esclient.get({
    index: 'knowledgespace',
    type: 'entity',
    id: params
  }).then( response => response._source )

}
