/*
 Make the following POST request with either axios or node-fetch:

POST url: http://ambush-api.inyourarea.co.uk/ambush/intercept
BODY: {
  "url": "https://api.npms.io/v2/search/suggestions?q=react",
  "method": "GET",
  "return_payload": true
}

*******

The results should have this structure:
{
  "status": 200.0,
  "location": [
    ...
  ],
  "from": "CACHE",
  "content": [
    ...
  ]
}

******

*  With the results from this request, inside "content", count
*  the number of packages that have a MAJOR semver version 
*  greater than 10.x.x
*/

//RESOLUTION:

//BODY API TO STRINGIFY
const body = {
  "url": "https://api.npms.io/v2/search/suggestions?q=react",
  "method": "GET",
  "return_payload": true
}

//FETCH FROM API
async function fetchData(){
  const fetch = require("node-fetch");
  
  const res = await fetch("http://ambush-api.inyourarea.co.uk/ambush/intercept", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })

  const data = await res.json();
  return data;
}

// COUNT VERSIONS
function countVersionsAbove10(data){
  let count = 0;
  data.forEach(element => {
    if(parseInt(element.package.version) > 10){
      count++;
    }
  });
  return count;
}

//MAIN SECTION
module.exports = async function countMajorVersionsAbove10() {
  const data = await fetchData();
  const count = countVersionsAbove10(data.content);

  return count;
};