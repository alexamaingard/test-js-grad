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

* With the results from this request, inside "content", 
* list every maintainer and each package name that they maintain,
* return an array with the following shape:
[
  ...
  {
      username: "a-username",
      packageNames: ["a-package-name", "another-package"]
  }
  ...
]
* NOTE: the parent array and each "packageNames" array should 
* be in alphabetical order.
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

//GET USERS-PACKAGES
function getUsers(data){
  const users = [];
  const usernames = [];
  data.forEach(element => {
    element.package.maintainers.forEach(user => {
      const newUser = {
        username: '',
        packageNames: []
      }
      if(!usernames.includes(user.username)){
        usernames.push(user.username);
        newUser.username = user.username;
        newUser.packageNames.push(element.package.name);
        users.push(newUser);
      }
      else {
        users.forEach(item => {
          if(item.username === user.username){
            item.packageNames.push(element.package.name);
          }
        });
      }
    });
  });
  users.sort((a, b) => (a.username > b.username) ? 1 : -1);
  users.forEach(user => {
    user.packageNames.sort();
  });
  return users;
}

//MAIN SECTION
module.exports = async function organiseMaintainers() {
  const data = await fetchData();
  const maintainers = getUsers(data.content);
  
  return maintainers;
};
