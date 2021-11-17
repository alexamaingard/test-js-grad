/**
 * Make the following POST request with either axios or node-fetch:

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

*  With the results from this request, inside "content", return
*  the "name" of the package that has the oldest "date" value
*/

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

//GET OLDEST PACKAGE
function getOldestPackageName(data){
  const dates = [];
  data.forEach(element => {
    dates.push(element.package.date);
  })
  let orderedDates = dates.sort();
  const oldestPackageName = data.filter(element => element.package.date === orderedDates[0])[0].package.name;
  return oldestPackageName;
}

//MAIN SECTION
module.exports = async function oldestPackageName() {
  // TODO
  const data = await fetchData();
  const name = getOldestPackageName(data.content);
  
  return name
};
