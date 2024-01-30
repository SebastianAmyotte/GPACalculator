var table = document.getElementById("current_classes")
document.getElementById("AddRowButton").addEventListener("click", addGPARow);
document.getElementById("ClearForm").addEventListener("click", clearForm);

//Adds a row to the table
function addGPARow() {
  newRow = table.insertRow(table.rows.length - 1)
  newRow.classList.add("ClassRow")
  newRow.insertCell(0).innerHTML = `<input type="submit" value="Remove" onclick="removeGPARow(this)">`
  newRow.insertCell(1).innerHTML = `<input type="text" name="class" </td>`
  newRow.insertCell(2).innerHTML = creditsCellHTML()
  newRow.insertCell(3).innerHTML = gradeCellHTML()
  newRow.insertCell(4).innerHTML = `12.00`
  newRow.insertCell(5).innerHTML = `<input type="checkbox">`
  newRow.insertCell(6).innerHTML = gradeCellHTML(true)
}

//Clears all the inputs
function clearForm() {
  //Confirm the action
  if (confirm("Clear form?")) {
    //Reset prior credits and gpa entries
    document.getElementById("PriorCredits").value = 0.0
    document.getElementById("PriorGPA").value = 0.0
    //Remove all rows
    while (table.rows.length > 2) {
      table.firstElementChild.children[1].remove();
    }
    //Add a blank row
    addGPARow();
    //Reset the gpa elements to zero
    document.getElementById("CreditSum").innerText = ("3 Credits")
    document.getElementById("SemesterGPA").innerText = ("GPA: 4.000")
    document.getElementById("CombinedGPA").innerText = ("4.000")
    document.getElementById("PointsSum").innerText = ("Points: 12.00")
  }
}

//Removes the selected row from the table
function removeGPARow(pushedButton) {
  //Makes sure there is at least 1 row containing inputs
  rowToRemove = pushedButton.parentNode.parentNode
  rowToRemove.parentNode.removeChild(rowToRemove);
  //Check if that was the last row
  if (table.rows.length == 2) {
    //if it was, add a blank row back in
    addGPARow()
  }
  calculateGPA();
}

//Returns HTML for a credits dropdown
const creditsCellHTML = () => {
  return `<select name="credit">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3" selected>3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="0">Not for credit</option>
            </select>`
}

//Returns HTML for a grades dropdown
const gradeCellHTML = (retakenDropdown) => {
  return ` <select name="grade">
              <option value="A">A</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B">B</option>
              <option value="B-">B-</option>
              <option value="C+">C+</option>
              <option value="C">C</option>
              <option value="C-">C-</option>
              <option value="D+">D+</option>
              <option value="D">D</option>
              <option value="D-">D-</option>
              <option value="F">F</option>
              <option value="Incomplete">Incomplete</option>
              <option value="Pass/Complete" ${retakenDropdown ? 'selected' : ''}>Pass/Complete</option>
              ${retakenDropdown ? '<option value="AB">AB</option>' : ''}
              ${retakenDropdown ? '<option value="BC">BC</option>' : ''}
              ${retakenDropdown ? '<option value="CD">CD</option>' : ''}
            </select>`
}

