// https://codesandbox.io/s/sleepy-zhukovsky-34pog?file=/spotify.js:1792-2026
// l'entête de la requête avec le token
const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer BQApiO02ijElcas_L7eDtJK_MWi-_xdNiqznrp8r65s2wg3pL7Wa-kknxyr3AAF0HTDSIGnuyBFPVutIsSiM8gcJOkHjKn11hn6XinDkrHEH11mTHPBHrnH5pmmiT6Sixihni00oLA"
};
const fetchOptions = { headers: headers };

// événement validation (submit) du formulaire
document.getElementById("fm").addEventListener("submit", chercherAlbums);

function chercherAlbums(event) {
  // empecher le rechargement de la page
  event.preventDefault();
  // le mot cle saisi
  let motcle = document.getElementById("motcle").value;
  let url =
    "https://api.spotify.com/v1/search?q=" +
    motcle +
    "&type=album&market=FR&limit=10";

  // la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      afficheAlbums(dataJSON.albums.items);
    })
    .catch((error) => console.log(error));
}

// --------  afficher la liste des albums -----------------------------
function afficheAlbums(albums) {
  // le texte HTML à générer = une balise img par album
  let resHTML = "";
  for (let album of albums) {
    resHTML =
      resHTML +
      '<img id="' +
      album.id +
      '" src="' +
      album.images[1].url +
      '"/>';
  }
  document.getElementById("albums").innerHTML = resHTML;

  // gérer événement click sur les images
  for (let elem of document.querySelectorAll("#albums > img")) {
    elem.addEventListener("click", detailsAlbum);
  }
}

function detailsAlbum(event) {
  let idAlbum = event.target.id;
  let url = "https://api.spotify.com/v1/albums/" + idAlbum;

  // exécuter la requête AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      // dataJSON = les données renvoyées
      console.log(dataJSON);
      afficheDetailAlbum(dataJSON);
    })
    .catch((error) => console.log(error));
}

function afficheDetailAlbum(album) {
  document.getElementById("disque").textContent = album.name;
  document.getElementById("chanteur").textContent = album.artists[0].name;

  // -- le texte HTML à générer = une liste HTML <u></ul>
  let resHTML = "<ul>";
  for (let chanson of album.tracks.items) {
    resHTML += '<li id="' + chanson.id + '">' + chanson.name + "</li>";
    // -- si la chanson dispose d'une bande son, mettre la balise audio
    if (chanson.preview_url) {
      resHTML +=
        '<audio id="AudioSong" controls src="' +
        chanson.preview_url +
        '">pas supporté</audio>';
    }
  }
  document.getElementById("chansons").innerHTML = resHTML;
}
