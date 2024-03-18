const inputBox = document.getElementById("input-box")
const listContainer = document.getElementById("container")
const title = document.getElementById("title");

// Function to handle title editing
function editTitle() {
    let newTitle = prompt("Edit the list name", title.textContent);
    if (newTitle !== null && newTitle.trim() !== '') {
        title.textContent = newTitle;
    }else{
        title.textContent = "Título";
    }
}

function addTask() {
    if (inputBox.value === '') {
        alert("Você deve escrever algum item")
    } else {
        // Cria LI
        let li = document.createElement("li")
        let item = document.createTextNode(inputBox.value);
        li.appendChild(item)    
        listContainer.appendChild(li);

        // Cria botão de editar 

        let editButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        li.appendChild(editButton);

        // Edita cont Li

        editButton.onclick = function () {
            let newItem = prompt("Edite o item", li.firstChild.textContent);
            if (newItem === ''){
                alert("Você deve escrever algum item")
            }else if(newItem !== null && newItem.trim() !== '') {    
                li.firstChild.textContent = newItem;
            }
        }

        // Cria X - remove

        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);

    }
    inputBox.value = '';
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");

        if (e.target.classList.contains("checked")) {
            listContainer.appendChild(e.target);
        } else {
            listContainer.insertBefore(e.target, listContainer.childNodes[0]);
        }

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
    }
}, false);

function searchItem() {
    // Get the value from the search input
    var searchValue = document.getElementById("searchInput").value;
    
    // Do something with the search value, like filtering items in the list
    console.log("Searching for:", searchValue);
    // Example: Call a function to filter items based on the search value
    filterItems(searchValue);
}

function filterItems(searchValue) {
    // Convert the search value to lowercase for case-insensitive comparison
    searchValue = searchValue.toLowerCase();
    
    // Get all list items
    var items = document.querySelectorAll('.itens-lista li');
    
    // Loop through each item
    items.forEach(function(item) {
        var textNode = item.firstChild;
        
        // Certifique-se de que o primeiro nó filho seja um nó de texto
        while (textNode.nodeType !== Node.TEXT_NODE) {
            textNode = textNode.nextSibling;
        }
        
        // Obter o texto do item e convertê-lo para minúsculas
        var text = textNode.textContent.toLowerCase().trim();
        console.log(text);
        if (text.includes(searchValue)) {
            item.style.display = ''; // Show the item
        } else {
            item.style.display = 'none'; // Hide the item
        }
    });
}

// Function to add task when Enter key is pressed in the input box
function handleEnterToAdd(event) {
    if (event.keyCode === 13) { // Check if the Enter key is pressed
        addTask();
    }
}

// Function to search item when Enter key is pressed in the search input
function handleEnterToSearch(event) {
    if (event.keyCode === 13) { // Check if the Enter key is pressed
        searchItem();
    }
}

// Add event listeners to input boxes
inputBox.addEventListener("keydown", handleEnterToAdd);
searchInput.addEventListener("keydown", handleEnterToSearch);