import axios from "axios";

function getForm(vrsAttribute, userID) {
  const endPoint = getEndPoint(vrsAttribute, userID);
  return axios
    .get(endPoint, { 
      withCredentials: true
    })
    .then(response => {
      return response
    })
    .catch(error => {
    })
}

function sanitizeResponse(response, arrayUnwantedKey) {
  
  if (Array.isArray(response)) {
    for(i = 0; i < response.length; i++) {
      delete response[i].id;
      delete response[i].createdAt;
      delete response[i].updatedAt;

      if (arrayUnwantedKey != undefined) {
        const length = arrayUnwantedKey.length
        for (var j = 0; j < length; j++) {
          delete response[i][arrayUnwantedKey[j]];
        }
      }
    }
  } else {
    delete response.id;
    delete response.createdAt;
    delete response.updatedAt;

    if (arrayUnwantedKey != undefined) {
      const length = arrayUnwantedKey.length
      for (var i = 0; i < length; i++) {
        delete response[arrayUnwantedKey[i]];
      }
    }
  }
  return response;
}

function getEndPoint(vrsAttribute, userID) {
  return process.env.BACKEND_PORT + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute;
}

function postForm(vrsAttribute, vrsValue ,userID) {
  const endPoint = getEndPoint(vrsAttribute, userID);

  var jsonVariable = {};

  jsonVariable[vrsAttribute] = vrsValue;

  axios
    .post(endPoint, 
      jsonVariable,
      { withCredentials: true }
    
    )
    .then(response => {
      if (response.status === 200){
        console.log('Success')
      } else {
        console.log('fail')
      }
    })
    .catch(error => {
      console.log('fail in catch')
      console.log(error.response)
    })
}

export { postForm as postForm};
export { getForm as getForm};
export { getEndPoint as getEndPoint};
export { sanitizeResponse as sanitizeResponse }