
export const errorHandler = (error) => {

    if (error.response) {
        // Request made and server responded
        
        console.log(error.response.data);
        
        console.log(error.response.status);
       
        console.log(error.response.headers);
        
        if(error.response.data.message !==undefined){
          return error.response.data.message
        }
    

       
      } else if (error.request) {
        // The request was made but no response was received
       
        console.log(error.request);
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        
        console.log('Error', error.message);
        alert(error.message)
        return error.message
       
      }
}


export const getSexOr = (sex) => {
  if (sex == 0) {
    return "males";
  } else if (sex == 1) {
    return "females";
  } else if (sex == 2) {
    return "both";
  } else {
    return "";
  }
};

export const resizeCloudinary = (imageUrl) => {
  
  let imageChangeSize = imageUrl.split('/upload/')
  imageChangeSize[0]=imageChangeSize[0] +"" +'/upload/w_600/q_auto/'
  imageChangeSize = imageChangeSize.join('')

  return imageChangeSize
}