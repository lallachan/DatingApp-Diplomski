import axios from "axios";
import { isNull } from "lodash";
import React, { useContext, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import myContext from "./contexts/myContext";
import { errorHandler } from "./functions/Functions";
import "./Gallery.css"

function Gallery() {
  const { userData, accessToken, setUserData } = useContext(myContext);
  const [galleryPhotos, setGalleryPhotos] = useState(userData.gallery);

  const [toggleGallery, setToggleGallery] = useState(false);

  let widget2 = window.cloudinary.createUploadWidget(
    {
      cloudName: "dbfwwnhat",
      uploadPreset: "jydos0sa",
      folder: "users",
      //  cropping:true,
      name: "hey",
    },
    (error, result) => {
      if (result.event == "queues-end") {
        console.log(result);

        setGalleryPhotos([
          ...galleryPhotos,
          {imageUrl:result.info.files[0].uploadInfo.secure_url},
        ]);
      }
    }
  );

  function showWidget2() {
    widget2.open();
  }

  const addGalleryPhoto = () => {
    showWidget2();
  };

  const NewOptions = () => {
    return (
      <>
        {galleryPhotos.map((img) => {
          return (
            <img
              src={img.imageUrl}
              style={{ borderRadius: "0px", width: "30%", marginRight: "10px" }}
            />
          );
        })}
      </>
    );
  };

  const saveGallery = async () => {
    try {
     
      console.log(galleryPhotos)
      const obj = {
        gallery: galleryPhotos.map(i=>{return {imageUrl:i.imageUrl}})
      };
      console.log(obj);
      const res = await axios.patch(process.env.REACT_APP_GET_USER_DATA, obj, {
        headers: {
          authorization: accessToken,
        },
      });
      console.log(res.data);
      setUserData(res.data.data);
    } catch (error) {
      errorHandler(error);
    }

    window.location.reload();
  };

  const deleteImage = (i) => {
    if(toggleGallery == true){
      const arr = galleryPhotos.filter((img,indx)=> indx != i )
      setGalleryPhotos(arr)
    }
  }

  return (
    <div>
      <Button
        className="editBtn"
        onClick={() => setToggleGallery(!toggleGallery)}
        style={{ marginTop: "-80px", marginLeft: "100px" }}
      >
        Edit
      </Button>
      <div style={{marginLeft:"20px"}}>
        {galleryPhotos.map((img,i) => {
          return (
            <>
            
            <img
              src={img.imageUrl}
              style={{borderRadius:"0px",width:"250px",height:"250px",backgroundSize: "cover"}}
              onClick={()=>deleteImage(i)}
              
            />
          
            </>
          );
        })}
      </div>

      {toggleGallery == true ? (
        <>
          <div style={{ marginTop: "10px" }}>
          
            <Button variant="primary" onClick={() => showWidget2()}>
              Add New Photo
            </Button>
            <Button variant="success" onClick={() => saveGallery()}>
              Save Changes
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Gallery;
