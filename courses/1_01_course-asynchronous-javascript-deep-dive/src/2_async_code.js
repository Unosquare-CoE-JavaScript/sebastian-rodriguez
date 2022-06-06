"uss strict"

const test = () => {

  // The execution will continue, the event loop will resolver other thing and then
  // it will come back here to resolve
  setTimeout(() => {
    
    // Execute at first
    console.log("Start of code");
  
    // Block the execution until the user intercts with the alert
    alert("Notice me!");
  
    // Continue the execution if user interacts
    console.log("End of code");

  }, 0);

}

// This function will executes because the test it's now async
const test2 = () => {

  // This line will be executed first
  console.log("Now I get attention.");

}

test();
test2();
