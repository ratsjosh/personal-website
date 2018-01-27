if (navigator.userAgent.indexOf('Safari') !== -1) {
  window.onpageshow = (event) => {
    if (event.persisted) {
      window.location.reload()
    }
  }
}

