const students = [
  {
    name: 'Mary',
    score: 90,
    school: 'East',
  },
  {
    name: 'James',
    score: 100,
    school: 'East',
  },
  {
    name: 'Steve',
    score: 40,
    school: 'East',
  },
  {
    name: 'Gabe',
    score: 90,
    school: 'West',
  },
  {
    name: 'Rachel',
    score: 85,
    school: 'East',
  },
  {
    name: 'Rochelle',
    score: 95,
    school: 'West',
  },
  {
    name: 'Lynette',
    score: 75,
    school: 'East',
  },
];

const processStudents = (data, callback) =>
  data.forEach((student) => {
    if (student.school.trim().toLowerCase() === 'east') {
      if (typeof callback === 'function') {
        callback(student);
      }
    }
  });

const determineTotal = (studentsData) => {
  let total = 0,
    count = 0;

  processStudents(studentsData, (studentValue) => {
    total = total + studentValue.score;
    count++;
  });

  console.log('Total score:', total, '- Total Count:', count);
};

console.log('Before determineTotal');

setTimeout(determineTotal, 1000, students);

console.log('End of code');
