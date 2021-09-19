import moment from "moment"


export const errorHandler = (error) => {

    if (error.response) {
        // Request made and server responded
        
        console.log(error.response.data);
        
        console.log(error.response.status);
       
        console.log(error.response.headers);
        
        if(error.response.data.message !==undefined){
          return error.response.data.message
        }
    
        return error.response.data

       
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
    return "Muškarci";
  } else if (sex == 1) {
    return "Žene";
  } else if (sex == 2) {
    return "Ne binarno";
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


export const getParsedDate = (date) => {
  
  return moment(date).format(' hh:mm');
  // date = String(date).split(' ');
  // var days = String(date[0]).split('-');
  // var hours = String(date[1]).split(':');
  // return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])];
}
