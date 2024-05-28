const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.input-search')

const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    //recuperando os dados do pokemon
    const data = await fetchPokemon(pokemon);


    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonNumber.innerHTML = data.id
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // uso de colchetes igual uso de ponto para acessar os dados

        //limpando o valor do input
        input.value = ""
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = "404: ERROR"
        pokemonNumber.innerHTML = ""
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // formulários tem um evento padrão
    renderPokemon(input.value.toLowerCase()) // api has lowercase letters
    input.value = ''

});

btnPrev.addEventListener('click', (event) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }


});
btnNext.addEventListener('click', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)

});

renderPokemon(searchPokemon)