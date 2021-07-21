
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

