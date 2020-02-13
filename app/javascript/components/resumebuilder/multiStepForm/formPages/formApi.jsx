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

  jsonVariable[vrsAttribute] = vrsValue;

  axios
    .post(endPoint, 
      jsonVariable,
      { withCredentials: true }
    
    )
    .then(response => {
      if (response.status === 200){
        console.log('Success')
        callBack()
      } else {
        console.log('fail')
      }
    })
    .catch(error => {
      console.log(error)
      alert(error.response.data.error)
    })
}

export { postForm as postForm};
export { getForm as getForm};
export { getEndPoint as getEndPoint};