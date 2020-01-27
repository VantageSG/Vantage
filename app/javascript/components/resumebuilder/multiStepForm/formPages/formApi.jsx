import axios from "axios";

function getForm(vrsAttribute, userID) {
  const endPoint = getEndPoint(vrsAttribute, userID);
  axios
    .get(endPoint, { 
      withCredentials: true
    })
    .then(response => {
      if (response.status === 200){
        return response;
      } else {
        console.log('unknown error')
      }
    })
    .catch(error => {
    })
}

function getEndPoint(vrsAttribute, userID) {
  return process.env.BACKEND_PORT + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute;
}

function postForm(vrsAttribute, vrsValue ,userID) {
  const endPoint = getEndPoint(vrsAttribute, userID);
  axios
    .post(endPoint, 
    { withCredentials: true },
    { vrsValue }
    )
    .then(response => {
      if (response.status === 200){
        console.log('submitted: \n');
        console.table(vrsValue);
        console.log('to ' + endPoint);
      } else {
        console.log('unknown error')
      }
    })
    .catch(error => {
    })
}

export { postForm as postForm};
export { getForm as getForm};
export { getEndPoint as getEndPoint};