import React from "react";
import { Link } from "react-router-dom";

const Results = ({hits}) => (
  <div>
    <span>{hits.total} records found</span>  
      <ul>
        { hits.hits.map((hit, i) => ( <Result record={hit} key={i.toString()} /> ))}
      </ul>
  </div>
);

const Result = ({record}) => (
  <li><Link to={`/wiki/${record._id}`}>{record._id}</Link> : {record._source.labels[0]}</li>
);

export default Results;
