import React, {Component} from "react";
import { isArray, keys, has } from 'lodash';

const Detail = ({details}) => {
  const list = keys(details)
                  .filter( k => k != 'tree' )
                  .map( k => {  
                      let v = details[k]; 
                      if (isArray(v)) {
                          v = v.join("<br />"); 
                      }; 
                      return (<li key={k} >{k}  :  {v}</li>);
                  });
  return (<ul>{list}</ul>);
};

export default Detail;
