import React from 'react'
import { Carousel } from 'react-bootstrap'

function Slideshow(props) {

    const {images} = props

    return (
        <Carousel>

        {images.map(img=>{
            return <Carousel.Item>
            <img
              className="d-block w-100"
              src={img.imageUrl}
              alt="First slide"
              style={{borderRadius:"0px",width:"800px",height:"800px",objectFit:"cover"}}
            />
               </Carousel.Item>
        })}

       
      </Carousel>
    )
}

export default Slideshow
