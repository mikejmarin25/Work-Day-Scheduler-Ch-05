var myDay = [
    {
        id: "0",
        hour: "9:00",
        time: "09",
        suffix: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10:00",
        time: "10",
        suffix: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11:00",
        time: "11",
        suffix: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12:00",
        time: "12",
        suffix: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1:00",
        time: "13",
        suffix: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2:00",
        time: "14",
        suffix: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3:00",
        time: "15",
        suffix: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4:00",
        time: "16",
        suffix: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5:00",
        time: "17",
        suffix: "pm",
        reminder: ""
    },
    
]

//Displays the current date 
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// Saves the myDay object to local storage
function saveReminders() {
    localStorage.setItem("myDay", JSON.stringify(myDay));
}

function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

//Retrieves the items stored in local storage
function init() {
    var storedDay = JSON.parse(localStorage.getItem("myDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

getHeaderDate();

// Creates the time blocks and formats color based on time 
myDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.suffix}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // creates schdeduler data
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
   
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    // creates save button/ save button icons
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

//Once the codeblocks are created, loads any existing stored data

init();


//Save button click event 

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    let saveIndex =  $(this).siblings(".description").children(".past").attr("id");
    console.log(saveIndex);
    myDay[saveIndex].reminder = $(this).siblings(".description").children(".past").val();
    console.log(myDay);
    saveReminders();
    displayReminders();
})
