import axios from "axios";

function getForm(vrsAttribute, userID) {
  const endPoint = process.env.BACKEND_PORT + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute;
  axios
    .get(process.env.BACKEND_PORT + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute, { 
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

function postForm(vrsAttribute, vrsValue ,userID) {
  const endPoint = process.env.BACKEND_PORT + "/api/v1/vrs/" + parseInt(userID, 10) + "/" + vrsAttribute;
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