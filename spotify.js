// l'entête de la requête avec le token

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "BQDZT-X9pihT7czh6zfjjEXWyIoQpXZ6mFI_cIj6wPWwrUuSIFuNRk0hRaGWHQ9irlT6-PxxRUsWnrRpfBPiBPH8lHKcAjWofvAcW3Ms-Fw2ayCTT2PDUDLqO7lQy9KtUZhE7yiMoQ"
};

const fetchOptions = { headers: headers };

// événement validation (submit) du formulaire
document.getElementById("fm").addEventListener("submit", chercherAlbums());

function chercherAlbums(event) {
  // empêcher le rechargement de la page
  event.preventDefault();
  // le mot clé saisi
  let motcle = document.getElementById("motcle").value;
  let url =
    "https://api.spotify.com/v1/search?q=" +
    motcle +
    "&type=album&market=FR&limit=10";

  // la requête AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      let albums = dataJSON.albums.items;
    })
    .catch((error) => console.log(error));
}
