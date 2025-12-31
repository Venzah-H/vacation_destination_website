var detailsForm = document.querySelector('#destination_details_form');

// Event listner to detect if user submits information into the form
detailsForm.addEventListener('submit', handleFormSubmit);

// This function will do the following:
// 1. Extract the values the user inputs into the form
// 2. Clears the form
// 3. Calls function to create a card with all the provided information and display it on the web page
function handleFormSubmit(event) {
    event.preventDefault();

    // Pulls data from the form and assigns them to their own variables
    var destName = event.target.elements["name"].value;
    var destLocation = event.target.elements["location"].value;
    var destStart = event.target.elements["start_date"].value;
    var destEnd = event.target.elements["end_date"].value;
    var destBudget = event.target.elements["budget"].value;
    var destPhoto = event.target.elements["photo"].value;
    var destDescription = event.target.elements["description"].value;

    // Clears the text boxes after clicking the submit button
    for (var i = 0; i < detailsForm.length; i++){
        detailsForm.elements[i].value = "";
    }

    /*
    Does a validation check for the dates to ensure the start date is earlier than the edit before adding to the list:
    - If start date is later than end date, it will notify the user that their input is invalid and
    won't continue with creating the card
    - If either the start date or end date is earlier than the current date, it will notify the user that their input is
    invalid and won't continue with creating the card
     */
    let currentDate = new Date().toLocaleDateString('en-CA');
    if (destStart > destEnd){
        alert("Invalid date: Make sure the start date is before the end date.");
        return;
    }
    else if (destStart < currentDate || destEnd < currentDate){
        alert("Invalid date: Make sure the start date or end date is not before today.");
        return;
    }

    /*
    Does a validation check to ensure that budget is greater than 0
    - If the budget is 0 or negative, it will notify the user to select a value greater than 0 and won't continue with
    creating the card
     */
    if(destBudget <= 0){
        alert("Invalid budget: Please select a value greater than 0.")
        return
    }

    // Creates a card with given information
    var destCard = createDestinationCard(destName, destLocation, destStart, destEnd, destBudget, destPhoto, destDescription);

    var wishListContainer = document.getElementById('destinations_container');

    /*
    Checks to see if there are any cards currently in on the web page
    If not: It'll display 'No destinations yet...'
    If so: It'll display 'My Wish List'
     */
    if (wishListContainer.children.length === 0) {
        document.getElementById('title').innerHTML = "My Wish List";
    }

    // Adds card to list
    document.querySelector('#destinations_container').appendChild(destCard);
}

// This function will create a brand new card for the web page with the information provided in the text boxes
function createDestinationCard(name, location, start, end, budget, photoURL, description) {
    var card = document.createElement('div');
    card.className = 'card';

    // Description of image provided by URL
    var img = document.createElement('img');
    img.setAttribute('alt', name);

    // default.gif image (for cards with no photo URLs provided)
    var constantPhotoUrl = "images/default.gif";

    /*
    Checks to see if a photo URL was provided
    If so: It'll try to display the photo provided in the URL in the card
    If not: A default.gif image will be used (signpost.jpg)
     */
    if (photoURL.length === 0) {
        img.setAttribute('src', constantPhotoUrl);
    }
    else {
        img.setAttribute('src', photoURL);
    }

    // Adds image to the card
    card.appendChild(img);

    /*
    Creates the body of the card which will contain the following qualities:
    - The name of the destination
    - The location
    - The dates the vacation will occur
    - The budget for the vacation
    - Description of the vacation
     */
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Adds user-inputted name of destination to the card
    var cardTitle = document.createElement("h3");
    cardTitle.innerText = name;
    cardBody.appendChild(cardTitle);

    // Adds user-inputted location to the card
    var cardSubtitle = document.createElement("h4");
    cardSubtitle.innerText = location;
    cardBody.appendChild(cardSubtitle);

    // Adds the start date and end date provided by user to the card
    var cardDate = document.createElement("h4");
    cardDate.innerText = "From: " + start + " to " + end;
    cardBody.appendChild(cardDate);

    // Adds user-inputted budget to the card
    var cardBudget = document.createElement("h4");
    cardBudget.innerText = "Budget: $" + budget;
    cardBody.appendChild(cardBudget);

    // Adds description if one is provided
    if (description.length !== 0) {
        var cardText = document.createElement("p");
        cardText.className = "card-text";
        cardText.innerText = description;
        cardBody.appendChild(cardText);
    }

    // Adds a delete button to remove existing cards from the web page
    var cardDeleteBtn = document.createElement("button");
    cardDeleteBtn.innerText = "Remove from List";

    // Event listener to detect if user clicks the remove button remove a destination from the list
    cardDeleteBtn.addEventListener("click", removeDestination);
    cardBody.appendChild(cardDeleteBtn)

    card.appendChild(cardBody);

    return card;
}

// Removes the card when the user selects the remove button
function removeDestination(event){
    var card = event.target.parentElement.parentElement;
    card.remove();
}