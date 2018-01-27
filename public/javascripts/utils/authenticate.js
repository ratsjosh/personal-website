window.onload = () => {
  fetch('/', {
    method: 'post',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: 'foo=bar&lorem=ipsum',
  })
    .then((response) => {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status Code: ${
          response.status}`)
        return
      }

      // Examine the text in the response
      response.json().then((data) => {
        console.log(data)
      })
    })
    .catch((err) => {
      console.log('Fetch Error :-S', err)
    })
}
