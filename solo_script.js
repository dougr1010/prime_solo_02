// ! ! !
// Three Bugs

//input is an array of arrays
//  [name, employee num, salary, reviewScore]
var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];
var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];


//Create variables used to write to the DOM
var newEl, newText, position;
//Capture the position of insertion into the DOM
position = document.getElementById('content');


//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
    array[i] = calculateSTI(array[i]); // Bug 1: need to add index so only sending in a 1D array
    array[i] = array[i].join(" __ ");  //add some space between array elements
    //insert into DOM
    newEl = document.createElement('li');
    newText = document.createTextNode(array[i]);
  	newEl.appendChild(newText);
  	position.appendChild(newEl);
}


//calculate employee bonus
function calculateSTI(array){
    var newArray = [];
    newArray[0] = array[0];  //employee name
    var employeeNumber = array[1];
    var baseSalary = array[2];
    var reviewScore = parseInt(array[3]);

    var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
    if(bonus > 0.13){
        bonus = 0.13;  //cap bonus at .13 
    }

    newArray[1] = bonus;
    newArray[2] = Math.round(baseSalary * (1.0 + bonus));  //bug 2: this needs to be an integer 
    newArray[3] = Math.round(baseSalary * bonus);

  return newArray;
}


//determine base bonus percent based on review score
function getBaseSTI(reviewScore){
    var basePercent;
    switch(reviewScore){
        case 1:
            basePercent = 0;
            break;
        case 2:
            basePercent = 0;
            break;
        case 3:
            basePercent = 0.04;
            break;
        case 4:
            basePercent = 0.06;
            break;
        case 5:
            basePercent = 0.10;
            break;
    }
    return basePercent; //basePercent - 1;    Bug 3: don't subtract 1
}


//adjustment for more senior employees
function getYearAdjustment(employeeNumber){
    var yearAdjustment = 0;
    if(employeeNumber.length == 4){
        yearAdjustment = 0.05;
    }
    return yearAdjustment;
}


//adjustment for high income employees
function getIncomeAdjustment(salary){
    var incomeAdjustment = 0;
    salary = parseInt(salary);
    if(salary > 65000){
        incomeAdjustment = 0.01;
    }
    return incomeAdjustment;
}