# Alarm Clock with Sound

This simple JavaScript project implements an alarm clock with a customizable alarm sound.

## How to Use

1. Open the `index.html` file in a web browser.
2. Set the alarm time using the input box on the page.
3. Click the "Set Alarm" button.
4. Wait for the alarm to go off at the specified time.

## Code Structure

The code is structured as follows:

- `index.html`: The HTML file that contains the structure of the web page.
- `script.js`: The JavaScript file that handles the logic for updating the clock, setting the alarm, and clearing the alarm.
- `assets/javascript_assets_mixkit-alarm-tone-996.wav`: The alarm sound file.

## Variables

- `display`: Represents the HTML element where the clock time is displayed.
- `audio`: Represents an Audio object for playing the alarm sound.
- `alarmTime`: Stores the user-specified alarm time.
- `alarmTimeout`: Stores the timeout ID for the alarm.

## Functions

- `updateTime()`: Updates the displayed time on the clock every second.
- `formatTime(time)`: Formats the time to ensure it always has two digits.
- `setAlarmTime(value)`: Sets the alarm time based on the user input.
- `setAlarm()`: Sets the alarm to go off at the specified time.
- `clearAlarm()`: Clears the alarm and stops the sound.



