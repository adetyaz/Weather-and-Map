import React, { Component } from 'react'

const mapStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%'
}

export  class CurrentLocation extends Component {
    constructor(props){
        super(props);


        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation:{
                lat: lat,
                lng: lng
            }
        }

    }

    recenterMap(){
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;


        if (map){
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
          if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const coords = pos.coords;
              this.setState({
                currentLocation: {
                  lat: coords.latitude,
                  lng: coords.longitude
                }
              });
            });
          }
        }
        this.loadMap();
      }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.google !== this.props.google){
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation){
            this.recenterMap()
        }
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default CurrentLocation;


CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter:{
        lat: -1.2884,
        lng: 36.8233
    },
    centerAroundCurrentLocation: false,
    visible: true
};