import { Offer, FullOffer } from '../../types';
import useMap from '../../hooks/use-map';
import { useEffect } from 'react';
import Leaflet from 'leaflet';
import { useRef } from 'react';
import classNames from 'classnames';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  offers: Offer[];
  selectedOffer: Offer | FullOffer | null;
  isOfferPage?: boolean;
}
const UrlMarker = {
  Default: './img/pin.svg',
  Current: './img/pin-active.svg',
} as const;

const defaultCustomIcon = Leaflet.icon({
  iconUrl: UrlMarker.Default,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});
const selectedCustomIcon = Leaflet.icon({
  iconUrl: UrlMarker.Current,
  iconSize: [27, 39],
  iconAnchor: [13, 39]
});


export default function Map({offers, selectedOffer, isOfferPage = false}: MapProps): JSX.Element {
  const center = (isOfferPage && selectedOffer) ? selectedOffer.location : offers[0].city.location;
  const containerRef = useRef(null);
  const map = useMap(containerRef, center);

  useEffect(() => {
    if (!map) {
      return;
    }
    const markerLayer = Leaflet.layerGroup().addTo(map);

    if (isOfferPage && selectedOffer) {
      Leaflet
        .marker({
          lat: selectedOffer.location.latitude,
          lng: selectedOffer.location.longitude,
        })
        .setIcon(selectedCustomIcon)
        .addTo(markerLayer);
    }

    offers.forEach((offer) => {
      const marker = Leaflet
        .marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        })
        .setIcon(
          selectedOffer?.id === offer.id
            ? selectedCustomIcon
            : defaultCustomIcon
        );

      marker.addTo(markerLayer);
    });

    return () => {
      map.removeLayer(markerLayer);
    };
  }, [map, offers, selectedOffer, isOfferPage]);


  return (
    <section className={ classNames('map', {'offer__map': isOfferPage, 'cities__map': !isOfferPage}) }>
      <div style={{ height: '100%'} } ref={ containerRef }></div>
    </section>
  );
}
