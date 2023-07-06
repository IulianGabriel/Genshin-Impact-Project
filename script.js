const input = document.querySelector("input");
document.querySelector("button").addEventListener("click", submit);

function submit(event) {
  event.preventDefault();
  fetchData();
}

async function fetchData() {
  const choice = input.value.toLowerCase().replace(/\s/g, "-");
  const url = `https://api.genshin.dev/characters/${choice}`
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  if (response.status === 404) {
    input.style.borderColor = "red";
    input.value = "Character does not exist!";
    clearContent();
  } else {
    input.style.borderColor = "black";
    input.value = data.name;
    document.querySelector(".name").textContent = data.name;
    document.querySelector(".title").textContent = data.title;
    document.querySelector(".vision").textContent = data.vision + " /";
    document.querySelector(".birthday").textContent = data.birthday.substr(5, 5) + " /";
    document.querySelector(".nation").textContent = data.nation;
    document.querySelector(".description").textContent = `"${data.description}"`;
    const imageUrl = `https://api.genshin.dev/characters/${choice}/card`;
    document.querySelector(".character-image").src = imageUrl;
  }
}

function clearContent() {
  document.querySelector(".name").textContent = "";
  document.querySelector(".title").textContent = "";
  document.querySelector(".vision").textContent = "";
  document.querySelector(".birthday").textContent = "";
  document.querySelector(".nation").textContent = "";
  document.querySelector(".description").textContent = "";
  document.querySelector(".character-image").src = "";
}