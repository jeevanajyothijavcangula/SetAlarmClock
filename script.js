// JavaScript code

// Declare a variable to hold the interval
let alarmInterval;

// References to the ringtone and notification elements
const ringtone = document.getElementById("ringtone");
const notification = document.getElementById("notification");

// Function to update the clock
function updateClock() {
    // Get the current time
    const now = new Date();
    const timeElement = document.getElementById("time");
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    if (hours > 12) {
        hours -= 12;
    } else if (hours === 0) {
        hours = 12;
    }

    // Update the clock display
    timeElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

// Function to set the alarm
function setAlarm() {
    // Get the user-input values
    let hour = parseInt(document.getElementById("hour").value);
    let minute = parseInt(document.getElementById("minute").value);
    let second = parseInt(document.getElementById("second").value);
    let ampm = document.getElementById("ampm").value;

    // Validate the input values
    if (isNaN(hour) || isNaN(minute) || isNaN(second) || hour < 1 || hour > 12 || minute < 0 || minute > 59 || second < 0 || second > 59) {
        alert("Invalid time format. Please enter a valid time.");
        return;
    }

    // Get the current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // Convert the time to 24-hour format if PM is selected
    if (ampm === "PM") {
        if (hour !== 12) {
            hour += 12;
        }
    } else {
        // Convert 12 AM to 24-hour format (midnight)
        if (hour === 12) {
            hour = 0;
        }
    }

    // Calculate the time difference between the alarm and current time in milliseconds
    let timeDiff = ((hour - currentHour + 12) % 12) * 3600 * 1000 +
        (minute - currentMinute) * 60 * 1000 +
        (second - currentSecond) * 1000;

    if (timeDiff <= 0) {
        alert("Invalid time. Please set a future time for the alarm.");
        return;
    }

    // Clear any existing alarm interval
    clearInterval(alarmInterval);

    // Schedule the alarm interval to check if it's time to trigger the alarm
    alarmInterval = setInterval(() => {
        const currentTime = new Date();
        if (currentTime.getHours() === hour && currentTime.getMinutes() === minute && currentTime.getSeconds() === second) {
            playRingtone(); // Play the ringtone when the alarm triggers
            clearInterval(alarmInterval); // Clear the interval when the alarm triggers
            showNotification(); // Display the notification
        }
    }, 1000); // Check every second

    // Get the alarms list element
    let alarmsList = document.getElementById("alarm-list");

    // Create a new list item to display the alarm time
    let listItem = document.createElement("li");
    let formattedHour = hour % 12 || 12; // Convert to 12-hour format
    let formattedTime = `${formattedHour}:${minute}:${second} ${ampm}`;
    listItem.textContent = `Alarm set for ${formattedTime}`;
    alarmsList.appendChild(listItem);

    // Create a delete button for the alarm
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    // Add the Bootstrap classes to style the delete button
    deleteButton.classList.add("btn", "btn-primary");

    // Add event listener to delete the alarm when the button is clicked
    deleteButton.addEventListener("click", function () {
        alarmsList.removeChild(listItem);
    });

    // Create a tab space
    const tabSpace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0"); // Four spaces

    // Append the tab space, alarm description, and delete button to the list item
    listItem.appendChild(tabSpace);
    listItem.appendChild(deleteButton);

    // Append the list item to the alarms list
    alarmsList.appendChild(listItem);
}

// Function to play the ringtone
function playRingtone() {
    // Play the ringtone
    ringtone.play();
}

// Function to stop the ringtone
function stopRingtone() {
    // Stop the ringtone
    ringtone.pause();
    ringtone.currentTime = 0;
    hideNotification(); // Hide the notification
}

// Function to show the notification
function showNotification() {
    // Display the notification
    notification.style.display = "block";
    
    setTimeout(() => {
        stopRingtone(); // Stop the ringtone after 30seconds
        hideNotification(); // Hide the notification
    }, 30000); // Automatically hide and stop ringtone after 30seconds (30,000 milliseconds)

}

// Function to hide the notification
function hideNotification() {
    // Hide the notification
    notification.style.display = "none";
}

// Update the clock immediately when the page loads
window.onload = function () {
    setInterval(updateClock, 1000); // Update the clock every second
};
