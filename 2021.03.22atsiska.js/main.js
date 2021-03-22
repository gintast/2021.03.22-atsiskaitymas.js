$(function() {
    var form = document.querySelector('#todo-form');
    var form_input = document.querySelector('#todo-input');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            sukurtiUzduoti(form_input.value);
        }
        form.classList.add('was-validated');
    });
});


function sukurtiUzduoti(pavadinimas) {
    // Padarome sablono koda ir i sablona idedame uzduoties pavadinima
    // Sablonas yra index.html failo gale
    var template = document.querySelector('#todo-task-template');
    var node = template.content.cloneNode(true);
    node.querySelector("h5").textContent = pavadinimas;

    // Pridedame funkcija istrinti uzduoti paspaudus "Delete" mygtuka
    var delete_button = node.querySelector(".delete-button");
    delete_button.onclick = function(event) {
        event.target.parentNode.parentNode.remove();
    }

    // Pridedame funkcija perkelti uzduoti paspaudus "Move" mygtuka.
    // Jei mygtuko tekstas "Move Back", perkeliame i kairiaja sekcija,
    // o jei mygtuko tekstas "Move to Done", keliame i desine.
    var move_button = node.querySelector(".move-button");
    move_button.onclick = function(event) {
        if (event.target.innerHTML == 'Move Back') {
            event.target.innerHTML = 'Move to Done';
            document.querySelector('#todos').appendChild(event.target.parentNode.parentNode);
        } else {
            event.target.innerHTML = 'Move Back';
            document.querySelector('#dones').appendChild(event.target.parentNode.parentNode);
        }
    }

    // Pridedame naujai sukurta uzduoti i kairiaja sekcija.
    document.querySelector('#todos').appendChild(node);
}
