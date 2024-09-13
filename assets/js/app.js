function getNumberOfDaysInMonth(year, month) {
    // Create a Date object for the first day of the next month
    // and set the day to 0 (last day of the specified month)
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    // The getDate() method returns the day of the month (1-31)
    return lastDayOfMonth.getDate();
  }
  
//   Example usage:
//   const year = 2023;
//   const month = 10; // 0-based index, so 2 represents March
//   const numberOfDays = getNumberOfDaysInMonth(year, month);
//   console.log(`Days in selected month ${year}: ${numberOfDays}`);
  
let this_month = new Date().getMonth();
let this_year = new Date().getFullYear();
let this_month_total_day = getNumberOfDaysInMonth(this_year, this_month);

// console.log(this_month_total_day);

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const d = new Date();
// console.log("The current month is " + monthNames[this_month]);


let cells = '';
for (let index = 1; index <= this_month_total_day; index++) {
    cells += `<li>${index}</li>`;
}
// console.log(cells);

calender_dates.innerHTML = cells;

let all_cells = document.querySelectorAll('#calender_dates li');

// console.log(all_cells);

for (const cell of all_cells) {
    cell.onclick = function(e) {
        let date = e.target.innerHTML+ ' ' + (monthNames[this_month]);
        // console.log(date);
        month.value = date;
    }
}

let calender_notes = JSON.parse(localStorage.getItem('calender_notes'));

calender_form.onsubmit = saveData;

function saveData(e) {
    e.preventDefault(); 
    let data = { 
        month : month.value,
        title : title.value,
        description : description.value
    }
    if (calender_notes === null) {
        calender_notes = []; // Initialize calender_notes as an empty array
    }

    console.log(data);
    calender_notes.unshift(data); 
    localStorage.setItem('calender_notes',JSON.stringify(calender_notes)); 
    show_calender_data(); 
}
console.log(calender_notes); 


// function show_calender_data() {
//     let collected_data = JSON.parse(localStorage.getItem('calender_notes'));
//     let row;
//     for (const data of collected_data) {
//         row += `
//         <thead>
//         <tr>
//           <th>Month</th>
//           <th>Title</th>
//           <th>Description</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//             <td>${data.month}</td>
//             <td>${data.title}</td>
//             <td>${data.description}</td>
//         </tr>
//         </tbody>
//         `;
//     }
//     calender_table.innerHTML = row;
// }

function show_calender_data() {
    let collected_data = JSON.parse(localStorage.getItem('calender_notes'));
    if (Array.isArray(collected_data)) {
        let row = '';
        for (const data of collected_data) {
            row += `
            <thead>
            <tr>
                <th>Month</th>
                <th>Title</th>
                <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>${data.month}</td>
                <td>${data.title}</td>
                <td>${data.description}</td>
            </tr>
            </tbody>
            `;
        }
        calender_table.innerHTML = row;
    } else {
        // Handle the case where collected_data is not an array, e.g., when there is no data in local storage.
        calender_table.innerHTML = '<p>No data available</p>';
    }
}

show_calender_data();

//Reset Data

// Add an event listener to the reset button
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetData);

// Function to reset the array and remove data from the table
function resetData() {
    // Clear the array by assigning an empty array to it
    calender_notes = [];
    localStorage.setItem('calender_notes', JSON.stringify(calender_notes));

    // Clear the table
    calender_table.innerHTML = '';

    // Optionally, you can show a message to indicate that the data has been reset
    alert('Data has been reset');
}

