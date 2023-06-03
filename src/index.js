import { fetchBreeds } from "./cat-api"
import { fetchCatByBreed } from "./cat-api"
import { generateInfo } from "./cat-api"

const breedSelect = document.querySelector('select.breed-select');

document.addEventListener('load', fetchBreeds());
breedSelect.addEventListener('change', generateInfo)




