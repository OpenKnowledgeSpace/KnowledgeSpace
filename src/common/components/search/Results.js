import React from "react";
import { Link } from "react-router-dom";
import { keys, isEmpty, isString, isArray, join, get } from 'lodash';

const Results = ({hits, cols = {}, onRowClick, linkCol}) => (
  <div>
    <span>{hits.total} records found</span>  
      <table>
        <tbody> 
          <ResultsHeader cols={cols} /> 
          { hits.hits.map((hit, i) => ( <ResultRow result={hit._source} linkCol={linkCol} onClick={onRowClick} cols={keys(cols)} key={i.toString()} /> ))}
        </tbody> 
      </table>
  </div>
);

const ResultsHeader = ({cols = {} }) => (
  <tr>
    { keys(cols).map( col => <td key={col}>{cols[col]}</td> ) }
  </tr>
);

const ResultsCell = ({data}) => {
   if (isEmpty(data)) {
    return(<td></td>)
   } else if (isString(data)) {
    return(<td>{data}</td>)
   } else if (isArray(data)) {
    return(<td>{join(data, '; ')}</td>)
   } else {
    return(<td></td>)
   }
}

const ResultRow = ({result, cols = [], onClick, linkCol }) => (
 <tr data-link={get(result, linkCol)} onClick={onClick}>
    { cols.map( col => <ResultsCell key={col} data={get(result, col)} />)}
</tr>
);

const Result = ({record}) => (
  <li><Link to={`/wiki/${record._id}`}>{record._id}</Link> : {record._source.labels[0]}</li>
);

export default Results;
