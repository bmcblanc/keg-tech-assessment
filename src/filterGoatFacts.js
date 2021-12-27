/**
 * filterGoatFacts - Filters goat facts based on word and index
 * Note: Case of text surrounded by HTML entites no implemented
 */
export const filterGoatFacts = facts => {
  const cleanUpSpecialCharsRegex = /(^[',.:;?!()]+|[',.:;?!()]+$)/g
  const singleWord = document.querySelector('#single-word-filter').value.trim()
  const wordIndex = parseInt(document.querySelector('#word-index-filter').value.trim(), 10)
  
  if (validateFilters(singleWord, wordIndex)) {
    return facts.filter(fact => {
      // Split sentence and clean up words that starts
      // or ends with some punctuations/special chars
      const factItems = fact.toLowerCase().split(/\s+/).map(item => item.replace(cleanUpSpecialCharsRegex, ''))
      return factItems.indexOf(singleWord.toLowerCase().replace(cleanUpSpecialCharsRegex, '')) == wordIndex - 1
    })
  }

  return facts
}

const validateFilters = (word, index) => {
  return /^\S+$/.test(word) && !isNaN(index) && index > 0
}