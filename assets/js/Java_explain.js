This little project is about saving notes under a particular calendar date. 
So, the interface has 3 parts: 
1. The calender showing dates of current month
2. A form to collect data under a specific date
3. Finally, a table to show the collected data.

Step 1
First, we can get the total days in a particular month. For instance, 31 in jan and 28 in feb in 2023.

```
function getNumberOfDaysInMonth(year, month) {
    // Create a Date object for the first day of the next month
    // and set the day to 0 (last day of the specified month)
    const lastDayOfMonth = new Date(year, month + 1, 0);
  
    // The getDate() method returns the day of the month (1-31)
    return lastDayOfMonth.getDate();
  }
```

```
let this_month = new Date().getMonth();
let this_year = new Date().getFullYear();
let this_month_total_day = getNumberOfDaysInMonth(this_year, this_month);
console.log(this_month_total_day);
```
  
This will show in the console how many days are in the current month.

Step 2
Suppose, November has 30 days. We can create 30 list of dates for the month November by coding below:

```
let cells = '';
for (let index = 1; index <= this_month_total_day; index++) {
    cells += `<li>${index}</li>`;
}
// console.log(cells);
```

If we used only '=' instead of '+=' in the 3rd line, the result would be only <li>30</li> 
But we used += 
Now, the result will be from  <li>1</li> .. <li>2</li>  to all the way up to  <li>30</li> .

Step 3
We can use this list in our HTML to create a calendar.

```
calender_dates.innerHTML = cells;
```

Here,  calender_dates is the ID name of the ul tag where we want to put this list.

Step 4
We want to get the number of the cell whenever we CLICK on the date cell.
In short, we want to do this to all of the cells at once.
In addition, we want to get the name of the month in output.

Let's do it gradually:

Start by getting the current month name:

```
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
console.log("The current month is " + monthNames[this_month]);
```

So, the code  monthNames[this_month] **the variable this_month was declared earlier.
will give us the name of the current month.

Now, click event:
```
let all_cells = document.querySelectorAll('#calender_dates li');
// console.log(all_cells);
for (const cell of all_cells) {
    cell.onclick = function(e) {
        let date = e.target.innerHTML+ ' ' + (monthNames[this_month]);
        // console.log(date);
        month.value = date;
    }
}
```

First, we selected all the list items by 'querySelectorAll' and put the value in variable 'all_cells'
Then, we used the for of function to add evenListener CLICK in all items at once.
The number of the cell is actually the InnerHTML value  So, we select that which was encapsulated in the object property named 'target'
After that, we set the value of the variable of 'date' in the 'month' id. (that is the title input)

Now, when we click on any cell, the cell number and month name will be visible in the title input automatically.

Step 5

After completing the form, when we click on the submit button, we want to show the data in a table.
Again, two parts:

part 1: Collect data 
comments are on the code attached.

```
// let calender_notes = []; // every time we reload the page, data gets removed. So, we modified it later.
let calender_notes = JSON.parse(localStorage.getItem('calender_notes')); // no matter if we reload the page, the data remains.
calender_form.onsubmit = saveData;
function saveData(e) {
    e.preventDefault(); // to avoid reload data vanish issue.
    let data = { // putting 3 kinds of data in one object.
        month : month.value,
        title : title.value,
        description : description.value
    }

    if (calender_notes === null) {
        calender_notes = []; // Initialize calender_notes as an empty array (otherwise, may error occurs)
    }

    // console.log(data); (to review performance in console)   
calender_notes.unshift(data); // to insert new data on top.
    localStorage.setItem('calender_notes',JSON.stringify(calender_notes)); // To store the collected data in an array called 'calendar_notes' from which we can use them later.
    show_calender_data(); // here, we call a function to show submitted data instantly when we click the submit button.
}
// console.log(calender_notes); (to review performance in console)
```

Part 2: Show data

```
function show_calender_data() {
    let collected_data = JSON.parse(localStorage.getItem('calender_notes'));
    if (Array.isArray(collected_data)) { // to avoid error, need to check whether an array 
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
        calender_table.innerHTML = row; // id =  calender_table
    } else {
        // Handle the case where collected_data is not an array, e.g., when there is no data in local storage.
        calender_table.innerHTML = '<p>No data available</p>';
    }
}

show_calender_data();
```

Finally, we can add a reset button:

```
<button id="resetButton" class="btn btn-purple text-white">Reset Data</button>
```

```
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
```