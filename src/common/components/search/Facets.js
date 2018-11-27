import React, {Component} from "react";
import {connect} from "react-redux"; 

const Facets = ({facets, selected, handleFacetToggle}) => (
  <div>
    { Object.keys(facets).map((facet, i) => (
        <Facet
          key={i.toString()}
          name={facet} 
          handleFacetToggle={handleFacetToggle}
          values={facets[facet].buckets}
          selected={selected[facet]} />   
      ))
    }
  </div>
);

const Facet = ({name, values, selected = new Set(), handleFacetToggle}) => (
  <div>
    <span>{name}</span>
    <ul>
      { values.map( (v,i) => <FacetValue key={i.toString()} facet={name} value={v} selected={selected} handleFacetToggle={handleFacetToggle} /> )}
    </ul>
  </div>
);

const FacetValue = ({facet, value, selected, handleFacetToggle}) => (
  <li 
    data-facet={facet}
    data-value={value.key}
    onClick={handleFacetToggle}>
      { selected.has(value.key) && '✓' } 
      {value.key} : {value.doc_count}
  </li>
);

export default Facets;
