"use strict"

const logCall = () => console.log("logCall was called back.")

setTimeout(logCall, 3000)

setTimeout(() => console.log("The lambda was called back."), 1000)