import axios from 'axios';
import { accessToken } from 'mapbox-gl';
import React, { useContext, useEffect, useState } from 'react'
import ReactMapGL, { Marker,Layer,SVGOverlay } from "react-map-gl";
import myContext from './contexts/myContext';
import { errorHandler } from './functions/Functions';
import img from '../images/default-photo.png'



function Map(props) {

    const {userData,accessToken} = useContext(myContext)
    const userImage = process.env.REACT_APP_CLOUDINARY_URL  + "/"+ userData.imageUrl
    const [viewport, setViewport] = useState({
        width: "100%",
        height: "500px",
        latitude:userData.lastKnownLocation.coordinates[0],
        longitude:userData.lastKnownLocation.coordinates[1],

        zoom: 13,
      });


      const [usersMarkers,setUsersMarkers] = useState([])

      function redraw({project}) {
        const [cx, cy] = project([-122, 37]);
        return <circle cx={cx} cy={cy} r={4} fill="blue" />;
      }

      const layerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#007cbf'
        }
      };


      const getUsersInRadius = async (radius = 100)=>{
        try {
           
           const res = await axios.get(process.env.REACT_APP_MAP+"?range="+radius,{
               headers:{
                   "authorization":accessToken
               }
           })
            setUsersMarkers(res.data)

        } catch (error) {
            errorHandler(error)
        }
      }

      useEffect(() => {
        getUsersInRadius()
      }, [])
      
    return (
        

           
              <ReactMapGL
              
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapStyle="mapbox://styles/fakkkkkk123/ckq6pcalq3jpd17o6c7kiwz2y"
              >
                <Marker
                  latitude={userData.lastKnownLocation.coordinates[0]}
                  longitude={userData.lastKnownLocation.coordinates[1]}
          
                  zoom = {11}
                >
                  <img width="40px" src={userImage} />
                </Marker>
                {usersMarkers.map(i=>{

                    return <Marker
                    latitude={i.lastKnownLocation.coordinates[0]}
                    longitude={i.lastKnownLocation.coordinates[1]}
            
                    zoom = {11}
                  >
                    <img width="40px" src={img}/>
                  </Marker>
                })}
                 <SVGOverlay redraw={redraw} />
              </ReactMapGL>
            );
          
        
        }
    


export default Map
