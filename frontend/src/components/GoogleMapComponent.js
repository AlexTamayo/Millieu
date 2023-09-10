import React, { useState, useEffect, useContext } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  MarkerClusterer,
} from '@react-google-maps/api';
import { DataContext } from '../context/MainContext';
import mapStyles from '../styles/mapStyles.js';
import categoryIcons from '../routes/categoryIcons';

const containerStyle = {
  width: '100%',
  height: '800px',
};

const ICON_SIZE = { width: 40, height: 40 };

const GoogleMapComponent = () => {
  const [isGoogleMapLoaded, setIsGoogleMapLoaded] = useState(false);
  const [center, setCenter] = useState({ lat: -3.745, lng: -38.523 });
  const [markers, setMarkers] = useState([]);
  const { state } = useContext(DataContext);
  const { eventData, businessData, selectedFilter } = state;
  const mapRef = React.useRef(null);

  useEffect(() => {
    if (isGoogleMapLoaded && mapRef.current) {
      const newMarkers = [];
      const iconSize = new window.google.maps.Size(ICON_SIZE.width, ICON_SIZE.height);

      if (!selectedFilter || selectedFilter === 'events') {
        eventData.forEach((event) => {
          if (event.eventLocation && event.eventLocation.latitude && event.eventLocation.longitude) {
            newMarkers.push({
              position: { lat: event.eventLocation.latitude, lng: event.eventLocation.longitude },
              metadata: { topic: 'event', name: event.title, link: event.link },
              icon: {
                url: categoryIcons[event.categoryName] || "http://maps.google.com/mapfiles/ms/micons/sportvenue.png",
                scaledSize: iconSize,
              },
            });
          }
        });
      }

      if (!selectedFilter || selectedFilter === 'businesses') {
        businessData.forEach((business) => {
          if (business.businessLocation && business.businessLocation.latitude && business.businessLocation.longitude) {
            newMarkers.push({
              position: { lat: business.businessLocation.latitude, lng: business.businessLocation.longitude },
              metadata: { topic: 'business', name: business.name, link: business.website },
              icon: {
                url: categoryIcons[business.businessCategory.name] || "http://maps.google.com/mapfiles/kml/pal2/icon10.png",
                scaledSize: iconSize,
              },
            });
          }
        });
      }

      setMarkers(prevMarkers => [
        ...prevMarkers.filter(marker => marker.metadata && marker.metadata.topic === 'user-location'),
        ...newMarkers,
      ]);
    }
  }, [selectedFilter, eventData, businessData, isGoogleMapLoaded]);

  useEffect(() => {
    if (isGoogleMapLoaded && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCenter({ lat: latitude, lng: longitude });

          if (mapRef.current) {
            const iconSize = new window.google.maps.Size(ICON_SIZE.width, ICON_SIZE.height);

            setMarkers(prevMarkers => [
              ...prevMarkers.filter(marker => marker.metadata && marker.metadata.topic !== 'user-location'),
              {
                position: { lat: latitude, lng: longitude },
                metadata: { topic: 'user-location', name: 'Current Location', link: '#' },
                icon: {
                  url: process.env.PUBLIC_URL + "/icons/you-are-here-icon.png",
                  scaledSize: iconSize,
                },
              },
            ]);
          }
        },
        error => {
          console.error('Geolocation Error:', error);
          setCenter({ lat: -3.745, lng: -38.523 });
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation not supported");
      setCenter({ lat: -3.745, lng: -38.523 });
    }
  }, [isGoogleMapLoaded]);

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_MAPSKEY}
      onLoad={() => setIsGoogleMapLoaded(true)}
    >
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        options={{
          disableDefaultUI: true,
          styles: mapStyles,
        }}
      >
        <MarkerClusterer
          key={selectedFilter}
          options={{
            imagePath: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
            gridSize: 50,
            minimumClusterSize: 2,
          }}
        >
          {(clusterer) =>
            markers
              .filter((marker) => {
                if (selectedFilter === 'events') {
                  return marker.metadata.topic === 'event';
                } else if (selectedFilter === 'businesses') {
                  return marker.metadata.topic === 'business';
                } else {
                  return true;
                }
              })
              .map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  icon={marker.icon}
                  onClick={() => {
                    console.log(marker.metadata);
                  }}
                  clusterer={clusterer}
                />
              ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
