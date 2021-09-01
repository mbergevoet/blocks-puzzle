export function extractNumber(arrayItem) {
    // Extracts the number from the string
    const stringNumber = arrayItem.match(/(\d+)/)
    // Turn it in to an number or int
    const number = parseInt(stringNumber[0], 10)
    return number
}