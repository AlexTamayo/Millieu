import { useContext } from 'react';
import { DataContext } from '../context/MainContext';
import {
  formatPhoneNumber,
  formatURL,
  extractNumbers,
  addressFormatter
} from '../utils/helpers';

function VenueModalBusiness({ currentBusiness }) {
  const {
    closeVenueModal,
    handleCopy,
  } = useContext(DataContext);

  const addressFormatterSafe = (location) => {
    return location && location.streetAddress ? addressFormatter(location) : "Address not available";
  };

  const openGoogleMaps = () => {
    const address = addressFormatterSafe(currentBusiness?.eventLocation);
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  const renderedSocialMediaLinks = currentBusiness?.socialMedia?.length
    ? currentBusiness.socialMedia.map((media) => (
        <div key={media.id} className="vm-container__social-media">
          <div className="vm-left__social-media">
            <i className="fas fa-share-alt"></i>
          </div>
          <div className="vm-right__social-media">
            <a
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`social-media__link social-media__link--${media.platform.toLowerCase()}`}
            >
              {formatURL(media.link)}
            </a>
          </div>
          <div onClick={() => handleCopy(media.link)} className="copy-icon-button">
            <i className="fas fa-copy"></i>
          </div>
        </div>
      ))
    : null;

  return (
    <div>
      <div className="venue-modal__bg-image">
        <img src={currentBusiness?.businessBranding?.bannerUrl} alt="Venue background" />
      </div>
      <div className="venue-modal__bagde-image">
        <img src={currentBusiness?.businessBranding?.logoUrl} alt="Venue badge" className="venue-badge" />
      </div>
      <div className="venue-modal__title">{currentBusiness?.name}</div>
      <div className="venue-modal__category">{currentBusiness?.businessCategory?.name}</div>
      <div className="venue-modal__rating">
        {currentBusiness?.rating} / 5 rating ({currentBusiness?.reviewCount})
      </div>
      <hr />
      <div className="venue-modal__description">
        {currentBusiness?.description}
      </div>
      <hr />
      <div className="vm-container__address">
        <div className="vm-left__address">
          <i className="fas fa-map-marker-alt"></i>
        </div>
        <div className="vm-right__address">
          {addressFormatterSafe(currentBusiness?.businessLocation)}
        </div>
        <div onClick={() => handleCopy(addressFormatterSafe(currentBusiness?.businessLocation))} className="copy-icon-button">
          <i className="fas fa-copy"></i>
        </div>
        <div onClick={openGoogleMaps} className="google-maps-button">
          <i className="fas fa-map"></i>
        </div>
      </div>
      <div className="vm-container__operating-hours">
        <div className="vm-left__operating-hours">
          <i className="fas fa-clock"></i>
        </div>
        <div className="vm-right__operating-hours">Thursday 11h - 19h</div>
      </div>
      <div className="vm-container__website">
        <div className="vm-left__website">
          <i className="fas fa-globe"></i>
        </div>
        <div className="vm-right__website">
          <a href={currentBusiness?.website} target="_blank" rel="noopener noreferrer">
            {formatURL(currentBusiness?.website)}
          </a>
        </div>
        <div onClick={() => handleCopy(currentBusiness?.website)} className="copy-icon-button">
          <i className="fas fa-copy"></i>
        </div>
      </div>
      <div className="vm-container__phoneNumber">
        <div className="vm-left__phoneNumber">
          <i className="fas fa-phone"></i>
        </div>
        <div className="vm-right__phoneNumber">
          {formatPhoneNumber(currentBusiness?.phoneNumber)}
        </div>
        <div onClick={() => handleCopy(extractNumbers(currentBusiness?.phoneNumber))} className="copy-icon-button">
          <i className="fas fa-copy"></i>
        </div>
      </div>
      {renderedSocialMediaLinks}
      <button className="venue-modal__close-button" onClick={closeVenueModal}>
        &times;
      </button>
    </div>
  );
}

export default VenueModalBusiness;
