import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import  D3 from 'd3';

class Histogram extends Component {  

  constructor(props) {
    super(props);
		this.state = { 
			width: this.props.width,
			height: this.props.height
		}		
	}
  
	componentWillMount () { 
    this.setState( {  "focusStyle": { display:  'none' }} );
  }
 
	componentDidMount() { 
		let { height,  width } = this.props; 
		/* yuck */
   	if (  document.getElementById("literature") ) {
        width = document.getElementById("literature").offsetWidth - 100;	
				this.setState( { width: width, height: height });
		}
	}


 
  xExtent() {
    return d3.extent( this.props.data, (d) =>   d[0]  ); 
  }

  yExtent() {
    return d3.extent(this.props.data, (d) => d[1] );
  }

  onMouseMove(event) { 
   	d3.event = event;
   	var { top, right, bottom, left, data } = this.props;
	 	var { width, height } = this.state;  

		let position = d3.mouse(this.el);  
    let x = d3.scale.linear().domain(this.xExtent()).range([0, width - left - right ]);
    let y = d3.scale.linear().domain(this.yExtent()).range([ height - top - bottom, 0 ]);
    let bisectYear = d3.bisector( (d) => d[0] ).left;
     
     var x0 = x.invert( position[0]  ),
              i = bisectYear( data, x0, 1 );
     var d0 = data[i - 1],
              d1 = data[i],
              d = x0 - d0[0] > d1[0] - x0 ? d1 : d0
    
			this.setState({ transform: "translate(" + x(d[0]) + "," + y(d[1]) + ")" });
 
  }
  

 render() {
   var { top, right, bottom, left, data } = this.props;
	 var { width, height } = this.state;  
 

   let x = d3.scale.linear().domain(this.xExtent()).range([0, width - left - right]);
   let y = d3.scale.linear().domain(this.yExtent()).range([ height - top - bottom, 0 ]);
   let valueLine = d3.svg.line().x( function(d) { return x(d[0]); } )
                    .y( function(d) { return y(d[1]); } );

   var circleOn = () => {  this.setState({"focusStyle": { display: null }});  }
   var circleOff = () => { this.setState({"focusStyle": { display: "none" }}); }


   return (
      <div className="react-d3-histogram" ref={ (el) => this.el = el } >
        <svg width={ width   } height={ height }>
          <g transform={ "translate(" + left + "," + top + ")" } >
            <Path data={valueLine(data)}  />
            <XAxis height={ height - top - bottom  } scale={ x }   />
            <YAxis height={ height - top - bottom } width={width - left - right}  scale={ y }   />
            <Focus style={ this.state.focusStyle } transform={ this.state.transform }  /> 
            <rect id='focusRect' width={ width - left - right } height={ height - top - bottom } onMouseOver={ circleOn } onMouseOut={circleOff} onMouseMove={ this.onMouseMove.bind(this) }  /> 
          </g>
        </svg>
      </div>
 
   );
	}
}


Histogram.defaultProps = {
    top: 20,
    right: 10,
    bottom: 30,
    left: 30,
		width: 800,
		height: 400,
		data: []
};

class Focus extends Component { 

  render() {
    let { style, transform } =  this.props;
    return (
      <g style={ style }>
        <circle className="y" r="4" transform={transform} />       
      </g>
    )
  }
}


class Path extends Component { 
  
	render() {
    return (
      <path className="react-d3-histogram__domain" d={this.props.data} />
    );
  }
}


class XTick extends Component {

  render() {
    let { value, transform } = this.props;
    let textStyle = { textAnchor: "middle" };

    return (
      <g className="react-d3-histogram__xtick" transform={ transform } >
        <line x2="0" y2="6"></line>
        <text dy=".71em" y="9" x="0" style={textStyle}>{value}</text>
      </g>
    );
  }
}

class YTick extends Component {

  render() {
    let { value, transform, width } = this.props;
    let textStyle = { textAnchor: "middle" };
    
    let d = `M0${width},0H0`; 

    return (
      <g className="react-d3-histogram__ytick " transform={ transform } >
        <text dy=".71em" y="-5" x="0" style={textStyle}>{value}</text>
        <Path data={d} />
      </g>
    );
  }
}

export class XAxis extends Component {

  render() {
    let { height, scale } = this.props;
    
    let [ start, end ] = scale.range();
    let d = `M0${start},6V0H${end}V6`; 


    let ticks = scale.ticks(10).map(function(tick, i) {
      return (
        <XTick value={tick} transform={"translate(" + scale(tick) + ",0)"}  key={i} />
      );
    });

    return (
      <g className="react-d3-histogram__x-axis" transform={"translate(0," + height + ")"}>
        <Path data={d } />
        <g>{ticks}</g>
      </g>
    );
  }
}

export class YAxis extends Component {

  render() {
    let { height, width, scale } = this.props;

    let ticks = scale.ticks(5).map(function(tick, i) {
      return (
        <YTick value={tick} width={width} transform={"translate(20," + scale(tick) + ")"}  key={i} />
      );
    });

    return (
      <g className="react-d3-histogram__y-axis" >
        <g>{ticks}</g>
      </g>
    );
  }
}

export default Histogram;
