const pokemonName = document.querySelector('.pokemon-name')
const pokemonNumber = document.querySelector('.pokemon-number')
const pokemonImage = document.querySelector('.pokemon-image')

const form = document.querySelector('.form')
const input = document.querySelector('.input-search')

const fetchPokemon = async(pokemon)=>{
const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
const data = APIResponse.json();
return data;
}

const renderPokemon = async (pokemon) =>{
    //recuperando os dados do pokemon
    const data = await fetchPokemon(pokemon);
    pokemonName.innerHTML = data.name
    pokemonNumber.innerHTML = data.id
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']; // uso de colchetes igual uso de ponto para acessar os dados

}

form.addEventListener('submit', (event) => {
    event.preventDefault(); // formulários tem um evento padrão
    console.log(input.value)
    renderPokemon(input.value)
});