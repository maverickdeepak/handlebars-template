
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

$(document).ready(function () {
    var characterTemplate = $('#character-template').html();
    var template = Handlebars.compile(characterTemplate);

    var characterID = getParameterByName("id");

    // $.ajax('../data/cast.json').done(function (cast) {
    //     if ($("body").hasClass("cast-details")) {
    //         $('.character-list-container').html(template(cast.characters[characterID]));
    //     } else {
    //         $('.character-list-container').html(template(cast));
    //     }
    // })

    const db = firebase.database().ref();
    if ($("body").hasClass("cast-details")) {
        db.on('value', function (snap) {
            $('.character-list-container').html(template(snap.val().characters[characterID]));
        })

    } else {
        db.on('value', function (snap) {
            $('.character-list-container').html(template(snap.val()));
        })
        // $('.character-list-container').html(template(cast));
    }
});


// Custom Helpers
Handlebars.registerHelper('formatName', function (property) {
    return new Handlebars.SafeString("<strong>" + property + "</strong>");
});

Handlebars.registerHelper('boldName', function (house) {
    return new Handlebars.SafeString("<strong>" + house.fn(this) + "</strong>");
});

Handlebars.registerHelper('toLower', function (toLower) {
    return toLower.fn(this).toLowerCase();
})
