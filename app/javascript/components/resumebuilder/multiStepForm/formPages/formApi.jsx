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

function getEndPoint(vrsAttribute, userID) {
  return process.env.BACKEND_SOCKET + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute;
}

function postForm(vrsAttribute, vrsValue ,userID, callBack) {
  const endPoint = getEndPoint(vrsAttribute, userID);

  var jsonVariable = {};
  console.log(vrsValue)
  jsonVariable[vrsAttribute] = vrsValue;
  return(
    axios
    .post(endPoint, 
      jsonVariable,
      { withCredentials: true }
    
    )
    .then(response => {
      if (response.status === 200){
        return response.status
      } else {
        console.log('fail')
      }
    })
    .catch(error => {
      alert(error.response.data.error)
      return error.response.data.status
    })
  )
 
}

export { postForm as postForm};
export { getForm as getForm};
export { getEndPoint as getEndPoint};