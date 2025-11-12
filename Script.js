// Load existing students from local storage
let students = JSON.parse(localStorage.getItem("students")) || [];

// Save form when submitted
function saveStudent(event) {
    event.preventDefault(); // stop page reload

    const name = document.getElementById("fullname").value;
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const grade = document.getElementById("grade").value;
    const phone = document.getElementById("phone").value;

    // Create student object
    const student = {
        fullname: name,
        gender: gender,
        dob: dob,
        grade: grade,
        phone: phone
    };

    // Add to array
    students.push(student);

    // Save back to local storage
    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Registered Successfully!");

    // Clear form
    document.getElementById("regForm").reset();
}
function filterStudents() {
    const searchValue = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTable tr");

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchValue) ? "" : "none";
    });
}
function sortTable(columnIndex) {
    const table = document.getElementById("studentTable");
    let rows = Array.from(table.rows);

    // Toggle ascending/descending
    let asc = table.getAttribute("data-sort") !== "asc";
    table.setAttribute("data-sort", asc ? "asc" : "desc");

    rows.sort((a, b) => {
        const x = a.cells[columnIndex].textContent.toLowerCase();
        const y = b.cells[columnIndex].textContent.toLowerCase();

        if (!isNaN(x) && !isNaN(y)) {
            return asc ? x - y : y - x;
        }
        return asc ? x.localeCompare(y) : y.localeCompare(x);
    });

    // Rewrite rows
    table.innerHTML = "";
    rows.forEach(r => table.appendChild(r));
}
