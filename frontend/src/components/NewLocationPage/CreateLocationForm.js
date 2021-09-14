import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createLocation, getLocations } from '../../store/location';
import initMap from './addressMap';
import "./NewLocation.css"

const CreateLocationForm = ({ hideForm }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [locationName, setLocationName] = useState("");
    const [locationAddress, setLocationAddress] = useState("");

    const updateLocationName = (e) => setLocationName(e.target.value);
    const updateLocationAddress = (e) => setLocationAddress(e.target.value);

    useEffect(() => {
        dispatch(getLocations());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newLocation = {
            locationName,
            locationAddress
        };
        let createdLocation = dispatch(createLocation(newLocation))

        if(createdLocation) {
            history.push(`/locations/${createdLocation.id}`);
            hideForm();
        }
    };

    const handleCancelButton = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <div className="newLocationForm">
            <form onSubmit={handleSubmit}>
                <input
                type="string"
                placeholder="Location Name"
                required
                value={locationName}
                onChange={updateLocationName} />
                <div class="card-container">
                    <div class="panel">
                        <div>
                            <img class="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="" />
                            <span class="sb-title">Address Selection</span>
                        </div>
                        <input type="text" placeholder="Address" id="location"/>
                        <input type="text" placeholder="Apt, Suite, etc (optional)"/>
                        <input type="text" placeholder="City" id="locality"/>
                        <div class="half-input-container">
                            <input type="text" class="half-input" placeholder="State/Province" id="administrative_area_level_1"/>
                            <input type="text" class="half-input" placeholder="Zip/Postal code" id="postal_code"/>
                        </div>
                        <input type="text" placeholder="Country" id="country"/>
                        <button class="button-cta">Add Location</button>
                    </div>
                    <div class="map" id="map"></div>
                </div>
                <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places&callback=initMap&channel=GMPSB_addressselection_v1_cABC" async defer></script>

            </form>
        </div>
    )
}
