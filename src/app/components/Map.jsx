import React, { useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";

const Map = ({ coordinates }) => {
  useEffect(() => {
    maptilersdk.config.apiKey = process.env.mapbox_key;
    var map = new maptilersdk.Map({
      container: "map",
      style: maptilersdk.MapStyle.STREETS,
      center: [2.294694, 48.858093],
      zoom: 13,
    });

    coordinates.forEach((coordinate, index) => {
      const [lon, lat] = coordinate.geoLocation;
      map.setCenter([lon, lat]);

      const marker = new maptilersdk.Marker().setLngLat([lon, lat]).addTo(map);

      const label = document.createElement("div");
      label.className = "marker-label";
      label.textContent = `$ ${coordinate.price}`;

      label.style.fontWeight = "bold";

      marker.getElement().appendChild(label);
    });

    return () => map.remove();
  }, [coordinates]);

  return (
    <div
      id="map"
      style={{ position: "relative", width: "100%", height: "85vh" }}
    ></div>
  );
};

export default Map;
