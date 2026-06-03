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

  describe() {
    console.log(
      `I'm ${this.title}, I work in ${this.location} and I earn ${this.salary}.`,
    );
  }
}

const developer = new JOB("Developer", "New York", 5000);
const cooker = new JOB("Cook", "Cairo", 3000);

console.log(developer);
console.log(cooker);

developer.describe();
cooker.describe();
