import React, { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

maptilersdk.config.apiKey = process.env.mapbox_key;

const Map = ({ coordinates, location }) => {
  useEffect(() => {
    const map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      zoom: 13,
    });

    const { lon: ActiveLongitude, lat: ActiveLatitude } = location;

    coordinates.forEach((coordinate) => {
      const [lon, lat] = coordinate.geoLocation;

      if (!ActiveLongitude && !ActiveLatitude) {
        map.setCenter([lon, lat]);
      } else {
        map.setCenter([ActiveLongitude, ActiveLatitude]);
        map.setZoom(16);
      }

      const marker = new maptilersdk.Marker().setLngLat([lon, lat]).addTo(map);

      const label = document.createElement("div");
      label.className = "marker-label";
      label.textContent = `$ ${coordinate.price}`;

      label.style.fontWeight = "bold";

      marker.getElement().appendChild(label);
    });

    return () => map.remove();
  }, [coordinates, location]);

  return (
    <div
      id="map"
      style={{ position: "relative", width: "auto", height: "85vh" }}
    ></div>
  );
};

export default Map;
