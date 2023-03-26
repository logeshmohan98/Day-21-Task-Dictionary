const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const output = document.getElementById("output");

function displayDefinition(data) {
  const word = data[0].word;
  const definition = data[0].meanings[0].definitions[0].definition;
  const example = data[0].meanings[0].definitions[0].example;
  const html = `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">${word}</h2>
        <p class="card-text"><strong>Definition:</strong> ${definition}</p>
        <p class="card-text"><strong>Example:</strong> ${example}</p>
      </div>
    </div>
  `;
  output.innerHTML = html;
}

function displayErrorMessage() {
  const html = `
    <div class="alert alert-danger" role="alert">
      No definitions found for "${searchInput.value}". Please try another word.
    </div>
  `;
  output.innerHTML = html;
}

function handleSearch() {
  const word = searchInput.value;
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.title === "No Definitions Found") {
        displayErrorMessage();
      } else {
        displayDefinition(data);
      }
    })
    .catch(error => console.log(error));
}

searchBtn.addEventListener("click", handleSearch);