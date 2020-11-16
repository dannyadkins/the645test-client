var serverUri = "https://dadkins645-backend.herokuapp.com/nps/Trump";
const findAndScoreTweets = async (topic) => {
  var uri = encodeURI(serverUri + "/nps/" + topic);
  const res = await fetch(uri).then(function (response) {
    console.log(response);
    return response.json();
  });
  if (res.error) {
    throw new Error(
      "No tweets could be fetched for the given term. Please try again."
    );
  }
  console.log(res);
  return res;
};

export default {
  findAndScoreTweets,
};
