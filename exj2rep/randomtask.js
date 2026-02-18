function randomTask() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let random = Math.random();

      if (random < 0.5) {
        resolve("Success");
      } else {
        reject("Failed");
      }

    }, 1000);
  });
}

  randomTask()
  .then(result => {
    console.log(result);   
  })
  .catch(error => {
    console.log(error);   
  });

