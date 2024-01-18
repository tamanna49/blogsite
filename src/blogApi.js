import request from "request";

function deleteAllPost() {
  request.delete(
    //First parameter = API to make post request
    "http://localhost:3002/delete",

    //Second parameter = Callack function
    function (error, response, body) {
      if (!error) {
        console.log(body);
        console.log(response.statusCode);
      } else {
        console.log(error);
      }
    }
  );
}

export default deleteAllPost;