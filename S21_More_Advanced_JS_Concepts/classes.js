//the previous literal notation object

const job = {
  title: "Developer",
  location: "New York",
  salary: 5000,
};

console.log(job);

//ex built in blueprint objects (built-in classes)

console.log(new Date().toISOString());

// create our own classes or constracting object

class JOB {
  constructor(jobTitle, jobLoc, jobSalary) {
    this.title = jobTitle;
    this.location = jobLoc;
    this.salary = jobSalary;
  }
}

const developer = new JOB("Developer", "New York", 5000);

console.log(developer);
