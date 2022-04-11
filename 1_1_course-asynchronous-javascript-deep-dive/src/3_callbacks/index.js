const students = [
  {
    name: "James",
    score: 100,
    school: "East",
  },
  {
    name: "Rachel",
    score: 85,
    school: "West",
  },
  {
    name: "Lynette",
    score: 40,
    school: "East",
  },
  {
    name: "Steve",
    score: 61,
    school: "East",
  },
];

const processStudents = (data, callback) => {
  for (let index = 0; index < data.length; index++) {
    if (data[index].school.toLowerCase() === "east") {
      if (typeof callback === "function") {
        callback(data[index]);
      }
    }
  }
};

const processStudent2 = (data, callback) =>
  data.forEach((student) => {
    if (student.school.toLowerCase() === "east") {
      if (typeof callback === "function") {
        callback(student);
      }
    }
  });

const callbackLogNameUpperScore = (student) => {
  if (student.score > 60) {
    console.log(student.name);
  }
};

const determineTotal = (studentsData) => {
  let total = 0,
    count = 0;

  processStudent2(studentsData, (studentValue) => {
    total = total + studentValue.score;
    count++;
  });

  console.log("Total score:", total, "- Total Count:", count);
};

processStudents(students, callbackLogNameUpperScore);
processStudent2(students, callbackLogNameUpperScore);

determineTotal(students);