// Function to search for Pokémon
function searchPokemon() {
    const pokemonName = document.getElementById("pokemonName").value.toLowerCase();  // Get input value

    if (!pokemonName) {
        alert("Please enter a Pokémon name.");
        return;
    }

    // Pokémon API URL
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Pokémon not found.");
            }
            return response.json();
        })
        .then(data => {
            // Clear previous results
            document.getElementById("pokemonInfo").innerHTML = '';

            // Extracting Pokémon data
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
            const abilities = data.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            const stats = data.stats.map(statInfo => `${statInfo.stat.name}: ${statInfo.base_stat}`).join('<br>');
            const imageUrl = data.sprites.front_default;

            // Display Pokémon information
            document.getElementById("pokemonInfo").innerHTML = `
                <h2>${name}</h2>
                <img src="${imageUrl}" alt="${name}">
                <p><strong>Types:</strong> ${types}</p>
                <p><strong>Abilities:</strong> ${abilities}</p>
                <p><strong>Stats:</strong><br>${stats}</p>
            `;
        })
        .catch(error => {
            document.getElementById("pokemonInfo").innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}
