document.querySelector(".busca").addEventListener("submit", async (event) => { 
    event.preventDefault(); //retira efeitos padrões

    let input = document.querySelector("#searchInput").value;

    if (input !== ""){
            clearInfo();
            showWarning("Carregando...");


            let url = `http://openweathermap.org/data/2.5/weather?q=${encodeURI(
            input
            )}&appid=d9f82afede3c64973dca32eb908cff5a&units=metric&lang=pt_br`;

            //fazendo requisição da api
            let results = await fetch(url);
            let json = await results.json();

            if (json.cod === 200){
                showInfo({
                    name: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    windSpeed: json.wind.speed,
                    windAngle: json.angle.deg
                });
            }else {
                clearInfo();
                showWarning("Localização não encontrada.");
            }
    }else {
        clearInfo();
    }
});

function showInfo(json){
    showWarning("");
    document.querySelector(".titulo").innerHTML = `${json.name}, ${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector(
        ",ventoInfo"
    ).innerHTML = `${json.windSpeed} <span>Km/h</span>`;

    document.querySelector(".temp img")
    .setAttribute(
        "src",
        `http://openweathermap.org/img/wn${json.tempIcon}@2x.png`
    );
    
    document.querySelector(".ventoPonto").style.transfom = `rotate(${
        json.windAngle - 90
    }deg)`;
    document.querySelector(".resultado").style.display = "block;"
}

function clearInfo() {
    showWarning("");
    document.querySelector(".resultado").style.display ="none";
}

const showWarning = (msg) => {
    document.querySelector(".aviso").innerHTML = msg;
};