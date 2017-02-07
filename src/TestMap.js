import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './TestMap.css';
import admin_level_4 from '../data/admin_level_4.json'

export default class TestMap extends Component {
  componentDidMount() {
     mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaGxldnk4OSIsImEiOiJjaXlrZHVpNnUwMDBuMndqdm9jdnVlMTRwIn0.an0-fmOZ-15KzXSvgSa-TA';
      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [40.172526, 9.28966],
          zoom: 4
      });

      map.on('load', function () {

          // Add a layer showing the state polygons.
          map.addLayer({
              'id': 'states-fills',
              'type': 'fill',
              'source': {
                  'type': 'geojson',
                  //'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
                  'data': admin_level_4
              },
              'paint': {
                  'fill-color': 'rgba(200, 100, 240, 0.4)',
                  'fill-outline-color': 'rgba(200, 100, 240, 1)'
              }
          });

          map.addLayer({
            "id": "states-fills-hover",
            "type": "fill",
            'source': {
                'type': 'geojson',
                //'data': 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_admin_1_states_provinces_shp.geojson'
                'data': admin_level_4
            },
            "layout": {},
            "paint": {
                "fill-color": "#627BC1",
                "fill-opacity": 1
            },
            "filter": ["==", "name", ""]
        });

          // disable map zoom when using scroll
          map.scrollZoom.disable();
      });


      // When a click event occurs near a polygon, open a popup at the location of
      // the feature, with description HTML from its properties.
      map.on('click', (e) => {
          var features = map.queryRenderedFeatures(e.point, { layers: ['states-fills'] });
          if (!features.length) {
              return;
          }

          var feature = features[0];
          this.props.set_region(feature.properties.name);

          // var popup = new mapboxgl.Popup()
          //     .setLngLat(map.unproject(e.point))
          //     .setHTML(feature.properties.name)
          //     .addTo(map);


          var features = map.queryRenderedFeatures(e.point, { layers: ["states-fills"] });
          if (features.length) {
              map.setFilter("states-fills-hover", ["==", "name", features[0].properties.name]);
          } else {
              map.setFilter("states-fills-hover", ["==", "name", ""]);
          }
      });

      // map.on("mouseover", function(e) {
      //     var features = map.queryRenderedFeatures(e.point, { layers: ["states-fills"] });
      //     if (features.length) {
      //         map.setFilter("states-fills-hover", ["==", "name", features[0].properties.name]);
      //     } else {
      //         map.setFilter("states-fills-hover", ["==", "name", ""]);
      //     }
      // });

      // Use the same approach as above to indicate that the symbols are clickable
      // by changing the cursor style to 'pointer'.
      // map.on('mousemove', function (e) {
      //     var features = map.queryRenderedFeatures(e.point, { layers: ['states-layer'] });
      //     map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
      // });
  }
  render() {
    return (
      <div id='map'></div>
    )
  }
}
