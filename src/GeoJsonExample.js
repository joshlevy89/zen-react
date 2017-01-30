import React, { Component } from "react";
import ReactMapboxGl, { Source, Layer, ScaleControl, ZoomControl } from "react-mapbox-gl";
//import geojson from "./geojson.json";
//import config from "./config.json";

//const { accessToken } = ;

const containerStyle = {
  height: "100vh",
  width: "100%"
};

const SOURCE_OPTIONS = {
  'type': 'geojson',
  'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
}

export default class GeoJSONExample extends Component {
  state = {
    popup: null,
    center: [ -77.01239, 38.91275 ]
  };



  render() {
    return (
      <ReactMapboxGl
        style="mapbox://styles/mapbox/light-v8"
        accessToken={'pk.eyJ1Ijoiam9zaGxldnk4OSIsImEiOiJjaXlrZHVpNnUwMDBuMndqdm9jdnVlMTRwIn0.an0-fmOZ-15KzXSvgSa-TA'}
        center={this.state.center}
        movingMethod="jumpTo"
        containerStyle={{ height: "100vh", width: "100%" }}
        zoom={[3]}
        >

        <ScaleControl/>
        <ZoomControl/>
        <Source id="states-layer" sourceOptions={SOURCE_OPTIONS} />
        <Layer
          id='states-layer'
          sourceId="states-layer"
          type='fill'
          paint= {{
            'fill-color': 'rgba(200, 100, 240, 0.4)',
            'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }}>
        </Layer>

      </ReactMapboxGl>
    );
  }
}