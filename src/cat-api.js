const myKey = `live_pS72kF8nR1ekLZHxMXwYoE9Cn5uDDrB2NDTuBBz2DletvkPLc3d8Ul8k7QbYKh7n`
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

const fetchBreeds = async () => {
    try {
        loader.classList.add('hidden');
        error.classList.add('hidden');

      const response = await fetch('https://api.thecatapi.com/v1/breeds');
      const data = await response.json();
  
      const breedSelect = document.querySelector('select.breed-select');
      breedSelect.innerHTML = ''; 
  
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });
    } catch (error) {
      console.log(error.toString());
    }
  };
  


  async function fetchCatByBreed (breedId) {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${myKey}&breed_id=${breedId}`);
      const data = await response.json();
    //   console.log(data);
      return data;
    } catch (error) {
      console.log(error.toString());
      throw error;
    }
  };


  
  async function generateInfo() {
    const breedSelect = document.querySelector('select.breed-select');
    const catInfoDiv = document.querySelector('div.cat-info');

    const breedId = breedSelect.value;
  
    try {
        loader.classList.remove('hidden')

catInfoDiv.innerHTML='';

const catData = await fetchCatByBreed(breedId);
  if(catData.length > 0) {
      const renderInfo = catData.map(x => {
    //    console.log(x);

        return `<img class="img" src="${x.url}" alt="${x.breeds[0].name}">
        <h2>${x.breeds[0].name}</h2>
        <p>${x.breeds[0].description}</p>
        <p>${x.breeds[0].temperament}</p>
        `
       
       
      })
    //   console.log(`jestem tutaj po zmianie`)
      catInfoDiv.insertAdjacentHTML('beforeend', renderInfo)
    
      loader.classList.add('hidden');
      error.classList.add('hidden')
    }
      else {
        loader.classList.add('hidden');
        error.classList.add('hidden');
        catInfoDiv.innerHTML='There is no information';
      }
  
    } 
    catch (error) {
      console.log(error.toString());
    }
  };
  
  
  export { fetchBreeds, fetchCatByBreed, generateInfo };
  
