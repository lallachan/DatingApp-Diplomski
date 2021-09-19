import axios from "axios";
import { isNull } from "lodash";
import React, { useContext, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
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
              style={{ borderRadius: "0px",  width:  "100px",
              height: "100px",
              objectFit: "cover" }}
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
    
      const arr = galleryPhotos.filter((img,indx)=> indx != i )
      setGalleryPhotos(arr)
   
  }

  return (
    <Row>
      <Col>
      {/* <Button
        className="editBtn"
        onClick={() => setToggleGallery(!toggleGallery)}
        style={{ marginTop: "-80px", marginLeft: "100px" }}
      >
        Edit
      </Button> */}
      </Col>

      <Row>

        <Col style={{display:"inline-block"}} lg={12}>
        {galleryPhotos.map((img,i) => {
          return (
            <>
            
            <img
              src={img.imageUrl}
              style={{borderRadius:"0px",backgroundSize: "cover",padding:"5px", width:  "300px",
              height: "300px",
              objectFit: "cover" }}
              onClick={()=>deleteImage(i)}
              
            />
          
            </>
          );
        })}
        </Col>

      </Row>
     
    

   
       
          <Row style={{ marginTop: "10px" }}>
            <Col>
            <Button variant="primary" onClick={() => showWidget2()} style={{backgroundColor:"#578BB8",border:"none",borderRadius:"0",
          padding:"10px",marginRight:"10px"
          }}>
              Dodaj novu sliku
            </Button>
            <Button variant="success" onClick={() => saveGallery()} style={{border:"none",borderRadius:"0",
          padding:"10px",marginRight:"10px"
          }}>
              Spremi promjene
            </Button>
            </Col>
         
          
          </Row>
       

    </Row>
  );
}

export default Gallery;
