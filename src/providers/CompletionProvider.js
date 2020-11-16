var serverUri = "http://localhost:3001";
const complete = async (text) => {
  var uri = encodeURI(serverUri + "/complete/");
  let res = await fetch(uri, {
    method: "POST",
    body: JSON.stringify({ text }),
  }).then(function (response) {
    return response.json();
  });
  if (res.error) {
    throw new Error("Completion failed. Please try again.");
  }
  return res;
};

export default {
  complete,
};
