import './styles/style.css'
import './styles/bootstrap.min.css'
import { getGoatFacts } from './getGoatFacts'
import { addGoatFacts } from './addGoatFacts'
import { filterGoatFacts } from './filterGoatFacts'

/**
 * onGetGoatFacts - Action to update the goat facts displayed on the Dom
 */
const onGetGoatFacts = async () => {
  const facts = await getGoatFacts()

  const filteredFacts = filterGoatFacts(facts)

  addGoatFacts(filteredFacts)
}

;(async () => {
  const form = document.querySelector('#goat-facts-filters-form')
  const singleWordFilter = document.querySelector('#single-word-filter')
  const wordIndexFilter = document.querySelector('#word-index-filter')

  // Select get-goat-facts button Element and attach
  // a click event to it to call onGetGoatFacts
  document.querySelector('#get-goat-facts').addEventListener('click', async () => {
    await onGetGoatFacts()
  })

  // Add event listener on 'keyup' for filters inputs
  // to trigger client-side validation
  document.querySelectorAll('.goat-facts-input-filter').forEach(input => {
    input.addEventListener('keyup', () => {
      document.querySelector('#goat-facts-filters-submit').click()

      // reset validation state when both filters are fully emptied, 
      if (singleWordFilter.value.length <= 0 && wordIndexFilter.value.length <= 0) {
        form.classList.remove('was-validated')
      }
    })
  })

  // Enforce Bootstrap custom form validation
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    if (!form.checkValidity()) {
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  })
})()
