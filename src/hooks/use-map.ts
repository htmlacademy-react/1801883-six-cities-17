import { useEffect, useState, useRef, MutableRefObject } from 'react';
import Leaflet, { Map } from 'leaflet';
import { Location } from '../types';

export const TileLayerConfig = {
  UrlTemplate: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  Options: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }
} as const;


export default function useMap(containerRef: MutableRefObject<HTMLElement | null>, center: Location): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRendered = useRef<boolean>(false);

  useEffect(() => {
    if (map) {
      map.setView([center.latitude, center.longitude], center.zoom);
    }
  }, [map, center]);

  useEffect(() => {
    if (containerRef.current !== null && !isRendered.current) {
      const instance = Leaflet.map(containerRef.current, {
        center: {
          lat: center.latitude,
          lng: center.longitude
        },
        zoom: center.zoom
      });

      Leaflet.tileLayer(TileLayerConfig.UrlTemplate, TileLayerConfig.Options).addTo(instance);

      setMap(instance);
      isRendered.current = true;
    }
  }, [containerRef, center]);

  return map;
}
