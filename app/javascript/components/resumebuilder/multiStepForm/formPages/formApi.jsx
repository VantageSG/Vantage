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

function sanitizeResponseJsonObject(response, arrayUnwantedKey) {

  if (response !== undefined && response !== null) {
    // added Guard clauses
  if (response.id !== null) {
    delete response.id;
  }
  
  if (response.createdAt !== null) {
    delete response.createdAt;
  }

  if (response.updatedAt !== null) {
    delete response.updatedAt;
  }

  
  }
  if (arrayUnwantedKey !== undefined && arrayUnwantedKey !== null) {
    const length = arrayUnwantedKey.length
    for (var i = 0; i < length; i++) {
      if (response.arrayUnwantedKey[i] != null) {
        delete response[arrayUnwantedKey[i]];
      }
    }
  }
 


 
  return response;
}

function sanitizeResponse(response, arrayUnwantedKey) {
  
  if (Array.isArray(response)) {
    for(var i = 0; i < response.length; i++) {
      sanitizeResponseJsonObject(response[i], arrayUnwantedKey);
    }
  } else {
    sanitizeResponseJsonObject(response, arrayUnwantedKey);
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