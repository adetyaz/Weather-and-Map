import React, { Component } from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles ={
    width: '100%',
    height: '100%'
}

export class MapComponent extends Component {
    
    state = {
        showingInfoWindow: false, //Hides or the shows the infoWindow
        activeMarker: {}, //Shows the active marker upon click
        selectedPlace: {}  //Shows the infoWindow to the selected place upon a marker
    }
    

    onMarkerClick = (props, marker, e) => 
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });


    onClose =props=> {
        if (this.state.showingInfoWindow){
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                style={mapStyles}
                initialCenter={{
                    lat:-1.2884,
                    lng: 36.8233
                }}
            >
                <Marker 
                    onClick={this.onMarkerClick}
                    name={'Kenyatta International Convention Centre'}
                />
                <InfoWindow 
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                        <p class="font-bold">{this.state.selectedPlace.name}</p>
                    </div>
                </InfoWindow>
            </Map>    
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBRgLUAe8SPD9GPxOnTWPc0WsYS8Txs7H8'
})(MapComponent);