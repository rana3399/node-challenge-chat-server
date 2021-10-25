module.exports = {
    onSignUp:  onSignUp,
    onSignIn:  onSignIn
}

async function onSignUp(body){
    const url = "http://localhost:3007/user/sign-up";
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      };

      const result = await fetch(url, requestOptions)
      const data = result.json()
      return data;

}

function onSignIn(body) {
    // TODO Implement this function
  }