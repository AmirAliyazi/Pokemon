

(async ()=> {

    try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
        const pokemons = response.data.results;
        console.log(pokemons);

        const table = document.createElement("table");
        const tHead = table.createTHead();
        const headerRow = tHead.insertRow();

        const headers = ["ID" , "Image" , "Name" , "Type" , "First Ability" , "Second Ability"];

        headers.forEach(headerTitle => {
            const headerCell = document.createElement("th");
            headerCell.textContent =headerTitle;
            headerRow.appendChild(headerCell)
        })

        const tBody = table.createTBody();
        for(const pokemon of pokemons){
            const detailResponse = await axios.get(pokemon.url);
            const detail = detailResponse.data;

            const bodyRow = tBody.insertRow();



            bodyRow.insertCell().textContent = detail.id;

            const imgCell = bodyRow.insertCell();
            const img = document.createElement("img");
            img.src = detail.sprites.other.dream_world.front_default;
            imgCell.appendChild(img);

            bodyRow.insertCell().textContent = detail.name;

            bodyRow.insertCell().textContent = detail.types.map(typeStyle => typeStyle.type.name).join(" , ");

            const abilities = detail.abilities.map(abilityName => abilityName.ability.name);
            bodyRow.insertCell().textContent = abilities[0] || "-";
            bodyRow.insertCell().textContent = abilities[1] || "-";
        }

        document.getElementById("app").appendChild(table);

    }catch (error){
        console.log(error)
    }
})()