//Assign button press
document.getElementById("CalculateGPAButton").addEventListener("click", calculateGPA);
//Global values for final output:
let summedCreditsOnPage = document.getElementById("CreditSum")
let semesterGPAOnPage = document.getElementById("SemesterGPA")
let combinedGPAOnPage = document.getElementById("CombinedGPA")
//Object for a student's classes
let studentGrades = {}

//Button handler
function calculateGPA() {
  console.log("Performing GPA calculation..")
  resetStudentGrades()
  getUserData()
  doTheMath()
  writeToPage()
}

function resetStudentGrades() {
  studentGrades = {
    cumulativePriorCredits: 0,
    cumulativePriorGPA: 0,
    totalPoints: 0,
    totalCreditsAttempted: 0,
    semesterGPA: 0,
    combinedGPA: 0,
    classList: [],
  }
}

//Gets the information off of the user's page
function getUserData() {
  //Get all the relevant html elements on the page
  let classRows = document.getElementsByClassName("ClassRow");
  studentGrades.cumulativePriorCredits = parseFloat(document.getElementById("PriorCredits").value)
  studentGrades.cumulativePriorGPA = parseFloat(document.getElementById("PriorGPA").value)
  //NaN checks. Author: https://bobbyhadz.com/blog/javascript-convert-nan-to-zero
  studentGrades.cumulativePriorCredits = studentGrades.cumulativePriorCredits || 0;
  studentGrades.cumulativePriorGPA = studentGrades.cumulativePriorGPA || 0;
  //If the prior gpa or credits fields are blank, ignore them
  for (var i = 0; i < classRows.length; i++) {
    studentGrades.classList.push(new SingleClass(
      classRows[i].children[1].children[0].value,
      classRows[i].children[2].children[0].value,
      classRows[i].children[3].children[0].value,
      classRows[i].children[4].children[0].checked,
      classRows[i].children[5].children[0].value,
    ));
  }
};

//Calculates the GPA, storing the various information inside the studentGrades object
function doTheMath() {
  for (var i = 0; i < studentGrades.classList.length; i++) {
    if (letterGradeToDouble(studentGrades.classList[i].grade) != -1) {
      //Add up all the points earned this semester (credit score * letter grade)
      studentGrades.totalPoints += parseFloat(studentGrades.classList[i].credits) * (letterGradeToDouble(studentGrades.classList[i].grade))
      //If a class is retaken, check to see if the new earned grade is higher
      if (studentGrades.classList[i].retaken && letterGradeToDouble(studentGrades.classList[i].grade) != -1) {
        if (letterGradeToDouble(studentGrades.classList[i].grade) >
          letterGradeToDouble(studentGrades.classList[i].previousGrade) &&
          letterGradeToDouble(studentGrades.classList[i].previousGrade) != -1) {
          //The new grade is higher. Remove the class from the prior GPA
          //Calculate the previous points earned
          var priorPointsEarned = studentGrades.cumulativePriorCredits * studentGrades.cumulativePriorGPA;
          //calculate new points earned - doesn't include the class we replace in the new semester
          priorPointsEarned -= studentGrades.classList[i].credits * letterGradeToDouble(studentGrades.classList[i].previousGrade)
          //Update previous credits earned
          studentGrades.cumulativePriorCredits -= studentGrades.classList[i].credits
          //calculate the new GPA from prior semesters
          studentGrades.cumulativePriorGPA = priorPointsEarned / //Check that the prior credits count is not zero
            (studentGrades.cumulativePriorCredits == 0 ? 1 : studentGrades.cumulativePriorCredits)
          console.log(priorPointsEarned)
        }
      }
      studentGrades.totalCreditsAttempted += parseFloat(studentGrades.classList[i].credits)
    }
  }
  //Calculate the student's gpa for this semester (Total points / credits attempted)
  studentGrades.semesterGPA = studentGrades.totalPoints / studentGrades.totalCreditsAttempted
  //Calculate combined GPA
  studentGrades.combinedGPA = (studentGrades.totalPoints +
    studentGrades.cumulativePriorCredits * studentGrades.cumulativePriorGPA)
    /
    (studentGrades.totalCreditsAttempted + studentGrades.cumulativePriorCredits);
}

//Updates the elements on the page
function writeToPage() {
  semesterGPAOnPage.innerText = "GPA: " + studentGrades.semesterGPA.toFixed(3)
  summedCreditsOnPage.innerText = studentGrades.totalCreditsAttempted + " Credits"
  combinedGPAOnPage.innerText = studentGrades.combinedGPA.toFixed(3)
}

//Source of truth: https://uwosh.edu/advising/resources/gpa-calculator/
//AB = 3.5 grade points, BC = 2.5 grade points, and CD = 1.5 grade points - Erik Heller
function letterGradeToDouble(grade) {
  switch (grade) {
    case "A":
      return 4.0;
    case "A-":
      return 3.67;
    case "B+":
      return 3.33;
    case "B":
      return 3.0;
    case "B-":
      return 2.67;
    case "C+":
      return 2.33;
    case "C":
      return 2.0;
    case "C-":
      return 1.67;
    case "D+":
      return 1.33;
    case "D":
      return 1.0;
    case "D-":
      return 0.67;
    case "F":
      return 0.0;
    case "Incomplete":
      return -1.0;
    case "Pass/Complete":
      return -1.0;
    case "AB":
      return 3.5;
    case "BC":
      return 2.5;
    case "CD":
      return 1.5;
  }
}

class SingleClass {
  name;
  credits;
  grade;
  retaken;
  previousGrade;

  constructor(name, credits, grade, retaken, previousGrade) {
    this.name = name;
    this.credits = credits;
    this.grade = grade;
    this.retaken = retaken;
    this.previousGrade = previousGrade;
  }
}
calculateGPA()