import React, { HTMLAttributes, useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import GuideExplore from '../../assets/images/guide-explore.webp';

mapboxgl.accessToken =
  'pk.eyJ1IjoiZnJhc2Vya2MiLCJhIjoiY2t3Nzc2bmZoMTVzcDJ3bGo5eGNwMmx1ZiJ9.4BVSoGs4xQ3bsMsbBW6ABQ';

// const geocoder = new MapboxGeocoder({
//   accessToken: mapboxgl.accessToken,
//   mapboxgl: mapboxgl,
//   countries: 'us',
// });

interface MapProps extends HTMLAttributes<HTMLDivElement> {
  listings: any;
  locationCoords: any | null;
  searchedLocation: any;
  setSearchedLocation: React.Dispatch<React.SetStateAction<any | null>>;
  setInBounds: React.Dispatch<React.SetStateAction<any | null>>;
}

const MapView = ({
  listings,
  locationCoords,
  setSearchedLocation,
  searchedLocation,
  setInBounds,
  ...props
}: MapProps) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/fraserkc/ckw77lvdq0m0n15rzje21kgri',
      center: locationCoords ? locationCoords : { lat: 39, lng: -95 },
      zoom: searchedLocation ? 7 : 3,
      hash: true,
    });

    map.current.dragRotate.disable();
    map.current.touchZoomRotate.disableRotation();

    function inBounds() {
      function intersectRect(r1: any, r2: any) {
        return !(
          r2.left > r1.right ||
          r2.right < r1.left ||
          r2.top > r1.bottom ||
          r2.bottom < r1.top
        );
      }

      function getVisibleMarkers() {
        var cc = map.current.getContainer();
        var els = cc.getElementsByClassName('marker');
        var ccRect = cc.getBoundingClientRect();
        console.log(ccRect);
        var visibles = [];
        for (var i = 0; i < els.length; i++) {
          var el = els.item(i);
          var elRect = el.getBoundingClientRect();
          intersectRect(ccRect, elRect) && visibles.push(el);
        }
      }

      getVisibleMarkers();

      var bounds = map.current.getBounds();
      console.log(bounds);
      setInBounds(bounds);
    }

    inBounds();

    map.current.on('dragend', () => {
      inBounds();
    });

    map.current.on('zoomend', () => {
      inBounds();
    });
  }, []);

  useEffect(() => {
    const locations = new Array<object>();

    var colors = [
      { type: 'course', color: 'blue' },
      { type: 'guide', color: 'red' },
      { type: 'epic', color: 'green' },
      { type: 'access', color: 'orange' },
    ];

    listings.filter((l: any) => {
      locations.push({
        id: l._id,
        address: l.address,
        name: l.name,
        price: l.price,
        type: l.type,
        date: l.date,
        lat: l.lat,
        lng: l.lng,
        city: l.city,
        state: l.state,
        description: l.description,
      });
    });

    function addMarkers(item: any, index: number) {
      const el = document.createElement('div');
      el.setAttribute('data-listing', item.id);
      el.className = 'marker';
      el.style.padding = '0 0.5rem';
      el.style.borderRadius = '4px';
      el.style.cursor = 'pointer';
      el.style.display = 'flex';
      el.style.alignItems = 'center';
      el.style.justifyContent = 'center';
      el.style.fontWeight = '600';
      el.style.color = '#ffffff';
      el.innerHTML = '$' + item.price;

      colors
        .filter(function (color) {
          return color.type == item.type.toLowerCase();
        })
        .map(function ({ color }) {
          el.style.backgroundColor = color;
        });

      new mapboxgl.Marker(el)
        .setLngLat([item.lng, item.lat])
        .setPopup(
          new mapboxgl.Popup({ closeButton: false, offset: 25 }).setHTML(
            `<a style="text-decoration: none;" href=${
              '/listings/' + item.id
            } data-listing="${item.id}" key=${item.id} target="_blank">
                    <div style="width:220px;">
                      <div style="background-image: url('${GuideExplore}');background-size: cover;background-position: center center;border-radius: 4px; height: 140px; width:100%;"></div>
                      <div style="display:flex; justify-content:space-between;align-items:center;">
                      <h3 style="color: #182008; font-size: 12px; font-weight: 500;">${
                        item.date
                      }</h3>
                      <h3 style="color: #182008;font-size: 12px; font-weight: 500;text-transform:capitalize;">${
                        item.type
                      }</h3>
                      </div>
                      <h3 style="font-size: 1rem;font-weight: 600;">${
                        item.name
                      }</h3>
                      <p style="font-size: 0.9rem;font-weight: 400;color:#182008;line-height:1.2;margin:0.25rem 0 0;">${
                        item.description
                      }</p>
                      <div style="display:flex; justify-content:space-between;align-items:flex-end;margin-top:0.5rem;">
                      <h3 style="font-size: 0.9rem; font-weight: 500;color:#182008;text-transform:capitalize;">${
                        item.city
                      }, ${item.state}</h3>
                      <p style="font-size: 0.9rem; font-weight: 500;margin-left:1rem;flex-shrink:0;color:#182008;">$${
                        item.price
                      }</p>
                      </div>
                    </div>
                  </a>`
          )
        )
        .addTo(map.current);
    }

    document.querySelectorAll('.marker').forEach((m) => m.remove());

    locations.forEach(addMarkers);
  }, [listings]);

  useEffect(() => {
    if (searchedLocation !== null) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchedLocation}.json?country=us&access_token=pk.eyJ1IjoiZnJhc2Vya2MiLCJhIjoiY2t3Nzc2bmZoMTVzcDJ3bGo5eGNwMmx1ZiJ9.4BVSoGs4xQ3bsMsbBW6ABQ`
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const items = data;
          map.current.setCenter([
            items.features[0].center[0],
            items.features[0].center[1],
          ]);

          function intersectRect(r1: any, r2: any) {
            return !(
              r2.left > r1.right ||
              r2.right < r1.left ||
              r2.top > r1.bottom ||
              r2.bottom < r1.top
            );
          }

          function getVisibleMarkers() {
            var cc = map.current.getContainer();
            var els = cc.getElementsByClassName('marker');
            var ccRect = cc.getBoundingClientRect();
            var visibles = [];
            for (var i = 0; i < els.length; i++) {
              var el = els.item(i);
              var elRect = el.getBoundingClientRect();
              intersectRect(ccRect, elRect) && visibles.push(el);
            }
          }

          getVisibleMarkers();

          var bounds = map.current.getBounds();
          setInBounds(bounds);
        });
    }
  }, [searchedLocation]);

  return (
    <div id="map" {...props}>
      <div
        id="info"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          backgroundColor: '#fff',
          width: '50%',
          height: '50%',
          display: 'none',
          zIndex: 1,
        }}
      ></div>
    </div>
  );
};

export default MapView;
