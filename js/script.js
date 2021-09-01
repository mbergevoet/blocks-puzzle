// Better understanding the problem:
// Assuming your facing north at the first sign, after the first sign you can go either west or east, the step after that you go either north or south and after that you can again go either west or east so there is a pattern
// If you keep track of the direction you're moving in (by checking the L or R in eacht sign) and what your previous direction was you can add the number after the L or the R to to total sum of that direction, or in my final case a combined number that adds or subtracts from the total
// After you've followed all the steps you subtract the totals of west/east and north/south and add those two together to get the total amount of city blocks
// The final number should be how many blocks you are away from the office 

// Plan in code:
// 1. Loop through the array (maybe turn it in to strings first)
// 2. Again assuming you face north for the first step you always go either east or west and the step after that always north or south. You can use the index of the array and check if it's odd or even and know if you go either north/south or east/west
// 3. After that indentify which direction you are going, left or right according to the previous direction.
// 4. "Move" in that direction by adding it to the total of that direction
// 5. Repeat step 2 and 3 untill you've looped through them all
// 5. If all items have looped, subtract the totals and tada

// For the record
// If you're facing south, left is east, right is west
// If you're facing north, left is west, right is east
// If you're facing west, left is south, right is north
// If you're facing east, left is north, right is south

// source for extracting a number from a string
// https://www.geeksforgeeks.org/extract-a-number-from-a-string-using-javascript/

// Things I need in code:
// An array of the signs you pass
// A variable keep track of the direction that is changed everytime
// two variables for up/down and left/right
// A function that takes in the previous direction and the array item
// A function that extracts the number from the string and converts into a number or int 
// A forEach loop that loops through the array
// A function that checks if the index is odd or even
// A function for odd indexes that determines left/right with .search and west/east, north/south with the array index
// A function for even indexes that determines left/right with .search and west/east, north/south with the array index
// An HTML element that can be clicked to execute all the code for fun
// A span to print the final result in for fun
// An Eventlistener that listens to a click on the HTML so the code will execute

// Import to get the extractNumber function out of helpers.js
import { extractNumber } from './modules/helpers.js'

// querySelector to select the button from the html
const button = document.querySelector('.calcBtn')
const output = document.querySelector('.output')

// Global variables to keep track of the amounts of blocks moved and the state of the previous direction
let upDown = 0
let leftRight = 0
let previousDirection = 1
// I've decided to use numbers instead of strings for the directions
// 1 means north, 2 means south, 3 means east, 4 means west

// I've turned the signs into an array of strings
const passedSigns = ['R3', 'L5', 'R4', 'R3', 'L3', 'L3', 'R2', 'R4', 'R1', 'L2', 'L5', 'R5', 'R5', 'R2', 'R2', 'R1', 'L2', 'L3', 'L2', 'L1', 'R3', 'L5', 'R187', 'R1', 'R2', 'L1', 'L3', 'R4', 'L4', 'R49', 'L4', 'R2', 'R72', 'L3', 'L2', 'R3', 'R3', 'R192', 'L3', 'L4', 'L4', 'L3', 'L4', 'R4', 'R5', 'L1', 'L5', 'L4', 'R1', 'L2', 'R4', 'L4', 'L3', 'R4', 'L5', 'L5', 'R5', 'R3', 'R5', 'L2', 'L4', 'R4', 'L1', 'R3', 'R1', 'L1', 'L2', 'R2', 'R3', 'L3', 'R5', 'R2', 'R5', 'R3', 'R5', 'L3', 'R5', 'L3', 'R1', 'R2', 'R2', 'L4', 'L5', 'L1', 'L2', 'R4', 'R3', 'R3', 'R2', 'L1', 'L2', 'R5', 'R5', 'L2', 'R3', 'L4', 'L5', 'L5', 'L4', 'R4', 'L2', 'R1', 'R1', 'L2', 'L3', 'L2', 'R2', 'L4', 'R3', 'R2', 'L2', 'L3', 'L6', 'L4', 'L2', 'R2', 'L3', 'L4', 'L2', 'L5', 'L3', 'R4', 'R3', 'L5', 'L1', 'L3', 'R4', 'R5', 'L4', 'L4', 'L6', 'L1', 'R2', 'L3', 'L2', 'L2', 'R2', 'L2']

function convertAndDisplay() {
    // With the help of the Math.abs the number will convert from negative to positive
    const convertedleftRight = Math.abs(leftRight)
    const convertedupDown = Math.abs(upDown)
    output.innerText = convertedleftRight + convertedupDown
    console.log("I am ", convertedleftRight + convertedupDown, " blocks away from the office")
}

function loopThroughSigns(array) {
    // With a forEach loop loop through the array and pass the sign (array item) and the signIndex (array index) through to the function that will compare it
    array.forEach((sign, signIndex) => {
        getOddOrEvenIndex(sign, signIndex)
    })
}

function getOddOrEvenIndex(arrayItem, arrayIndex) {
    // If the index is even that means north or south
    if (arrayIndex % 2 == 0) {
        evenIndex(arrayItem)
    }
    // Else the index isn't even that means west or east
    else {
        oddIndex(arrayItem)
    }
}

// These two functions do basicly the same but with some more refactoring it might be possible to make this function reusable aswell
// In the first if statement it checks what the previous direction was (either north south) 
// Then it checks if your going either Left or Right
// After that it will update the totals and the previous direction accordingly
function evenIndex(arrayItem) {
    // Debug console.log
    // console.log("even index " + arrayIndex)
    if (previousDirection == 1) {
        if (!arrayItem.search('L')) {
            // Going left while facing north is west so minus
            leftRight = leftRight - extractNumber(arrayItem)
            // Update previousDirection to west so 4
            previousDirection = 4
        } else if (!arrayItem.search('R')) {
            // Going Right while facing north is east so plus
            leftRight = leftRight + extractNumber(arrayItem)
            // Update previousDirection to east so 3
            previousDirection = 3
        }
    } else if (previousDirection == 2) {
        if (!arrayItem.search('L')) {
            // Going left while facing south is west so plus
            leftRight = leftRight + extractNumber(arrayItem)
            // Update previousDirection to west so 4
            previousDirection = 4
        } else if (!arrayItem.search('R')) {
            // Going Right while facing south is east so minus
            leftRight = leftRight - extractNumber(arrayItem)
            // Update previousDirection to east so 3
            previousDirection = 3
        }
    }
}

function oddIndex(arrayItem) {
    // Debug console.log
    // console.log("odd index " + arrayIndex)
    if (previousDirection == 4) {
        if (!arrayItem.search('L')) {
            // Going Left while facing west is south so minus
            upDown = upDown - extractNumber(arrayItem)
            // Update the previousDirection to south so 2
            previousDirection = 2
        } else if (!arrayItem.search('R')) {
            // Going Right while facing west is north so plus
            upDown = upDown + extractNumber(arrayItem)
            // Update the previousDirection to north so 1
            previousDirection = 1
        }
    } else if (previousDirection == 3) {
        if (!arrayItem.search('L')) {
            // Going Left while facing east is south so plus
            upDown = upDown + extractNumber(arrayItem)
            // Update the previousDirection to south so 2
            previousDirection = 2
        } else if (!arrayItem.search('R')) {
            // Going Right while facing west is north so minus
            upDown = upDown - extractNumber(arrayItem)
            // Update the previousDirection to north so 1
            previousDirection = 1
        }
    }
}

// Debug console.log to check if the variables got updated correctly
// console.log('Up & Down Movement is ' + upDown + ' Left & Right Movement is ' + leftRight + ' previousDirection: ' + previousDirection)

// Event listener that will fire if the button on the html page is clicked
button.addEventListener('click', (e) => {
    // This arrow function with call the other two functions to make the magic happen
    loopThroughSigns(passedSigns)
    convertAndDisplay()
})

// A try at refactoring parts of odd and even logic, didn't work unfortunately :(
// This would go inside the if statement where the upDown, LeftRight and previousDirection would get updated

// function updateVariablePlus(variableToUpdate, arrayItem, direction) {
//     variableToUpdate = variableToUpdate + extractNumber(arrayItem)
//     previousDirection = direction
// }

// function updateVariableMunis(variableToUpdate, arrayItem, direction) {
//     variableToUpdate = variableToUpdate - extractNumber(arrayItem)
//     previousDirection = direction
// }
