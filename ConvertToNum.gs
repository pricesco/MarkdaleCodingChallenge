/**
 * For each selection, if the selection is a valid choice
 * appends the index of the selection in choices to selectionsNums
 * then returns the array of selections.
 */
function convertToNum(selections, choices) {
  let selectionsNums = [];
  const isEqual = (element) => element == selections[i].trim()
  for (var i = 0; i < selections.length; i++) {
    selectionsNums.push(choices.findIndex(isEqual))
  }
  return selectionsNums
}