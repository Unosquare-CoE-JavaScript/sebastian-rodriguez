"uss strict"

const test = () => {

  // Execute at first
  console.log("Start of code");

  // Block the execution until the user intercts with the alert
  alert("Notice me!");

  // Continue the execution if user interacts
  console.log("End of code");

}

// This function will never executes if the user don't interact
const test2 = () => {

  console.log("Now I get attention.");

}

test();
test2();
