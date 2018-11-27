import React from "react";
import { Link } from "react-router-dom";
import { keys, isEmpty, isString, isArray, join, get } from 'lodash';

const LiteratureResults = ({hits}) => (
  <div>
    <span>{hits.total || 0} records found</span>  
      <ul>
          { hits.hits.map( hit =>  <LiteratureResult hit={hit._source} key={hit._id} /> )}
      </ul>
  </div>
);
  
const goToLiterature = ({target}) => {
    const link = 'https://www.ncbi.nlm.nih.gov/pubmed/' + target.dataset.pubid; 
    window.open(link, '_blank'); 
}

const LiteratureResult = ({hit}) => (
  <li data-pubid={hit.pub_id} onClick={goToLiterature} >
    {hit.title} <br/>
    { ( hit.authors || [] ).map(author => author.full_name).join('; ') } <br/>
    {hit.journal.title} <br/>
  </li>
);


export default LiteratureResults;
