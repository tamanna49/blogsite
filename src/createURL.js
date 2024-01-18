import _ from "lodash";

function generateURL(blogTitle) {
  const result = _.lowerCase(blogTitle).replaceAll(" ", "-");
  return result;
}

export default generateURL;
