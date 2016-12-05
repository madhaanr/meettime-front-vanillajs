(function () {
  "use strict";
  let timesList = [
    new Date(2016, 4, 31, 10, 0),
    new Date(2016, 4, 31, 11, 0),
    new Date(2016, 4, 31, 12, 0),
    new Date(2016, 4, 31, 13, 0),
    new Date(2016, 4, 31, 14, 0),
    new Date(2016, 5, 1, 10, 0),
    new Date(2016, 5, 1, 11, 0)];

  let savedSelections = { "persons": [] };

  function savePersonAndReservations() {
    const personId = randomId();
    const name = document.querySelector("#name").value;
    if (!name) {
      return;
    }
    const person = { "id": personId, "name": name, "selectedTimes": [] };
    const checkboxes = document.querySelectorAll(".selection");
    checkboxes.forEach(function (checkbox) {
      const obj = {};
      obj[checkbox.id] = checkbox.checked;
      person.selectedTimes.push(obj);
    }, this);
    savedSelections.persons = savedSelections.persons.filter(person => person.id !== personId);
    savedSelections.persons.push(person);

    console.log(savedSelections.persons);
    clearInputFields(checkboxes);
    addReservationToPage(person);
  }

  function addReservationToPage(person) {
    const table = document.querySelector(".table");
    let form = createElement("form", "tr");
    form.id = "form_" + person.id;
    const name = createNameInput(person);
    let td = createElement("div", "td");
    td.appendChild(name);
    form.appendChild(td);
    td = createElement("div", "td");
    const editButton = createButton("edit", person.id);
    td.appendChild(editButton);
    const deleteButton = createButton("delete", person.id);
    td.appendChild(deleteButton);
    form.appendChild(td);
    person.selectedTimes.forEach((time, i) => {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = timesList[i];
      checkbox.id = "checkbox_" + person.id + "_" + i;
      checkbox.className = "checkbox";
      checkbox.checked = time[Object.keys(time)[0]];
      td = createElement("div", "td");
      td.appendChild(checkbox);
      form.appendChild(td);
    });
    table.appendChild(form);
    document.getElementById("edit_" + person.id).addEventListener("click", function (e) {
      editReservation(person);
    });
    document.getElementById("delete_" + person.id).addEventListener("click", function (e) {
      deleteReservation(person);
    });
  }

  function createElement(elementName, className) {
    const element = document.createElement(elementName);
    element.className = className;
    return element;
  }

  function createButton(buttonName, personId) {
    const button = document.createElement("input");
    button.type = "button";
    button.value = buttonName;
    button.id = buttonName + "_" + personId;
    return button;
  }

  function createNameInput(person) {
    const input = document.createElement("input");
    input.type = "text";
    input.className = "td";
    if (!person) {
      input.id = "name";
      input.value = "";
    } else {
      input.id = person.name;
      input.value = person.name;
    }
    return input;
  }

  function editReservation(person) {
    person.selectedTimes = [];
    const checkboxes = document.querySelectorAll(".checkbox_" + person.id);
    checkboxes.forEach(checkbox => {
      const obj = {};
      obj[checkbox.id] = checkbox.checked;
      person.selectedTimes.push(obj);

    });
    savedSelections.persons = savedSelections.persons.filter(p => p.id !== person.id);
    savedSelections.persons.push(person);
  }

  function deleteReservation(person) {
    const form = document.querySelector("#form_" + person.id)
    form.parentElement.removeChild(form);
    savedSelections.persons = savedSelections.persons.filter(p => {
      return p.id !== person.id;
    });
  }

  function createAddReservationForm() {
    const table = document.querySelector(".table");
    const form = createElement("div", "tr")
    const name = createNameInput();
    form.className += " footer";
    let td = createElement("div", "td");
    td.appendChild(name);
    form.appendChild(td);
    const submit = createButton("save");
    submit.id = "saveReservation";
    td = createElement("div", "td");
    td.appendChild(submit);
    form.appendChild(td);
    for (let i = 0; i < timesList.length; ++i) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = timesList[i];
      checkbox.className = "selection";
      checkbox.name = "checkbox " + i;
      td = createElement("div", "td");
      td.appendChild(checkbox);
      form.appendChild(td);
    }
    table.appendChild(form);
  }

  function listDates() {
    timesList.forEach(function (date) {
      addDateToList(date)
    }, this);
    //ugly hack to get extra th cells so edit and delete button 
    //have space in table
    const table = document.querySelector(".table");
    let tr = document.querySelector("#availableDates");
    const th = document.createElement("div");
    th.className = "th";
    tr.appendChild(th);
    table.appendChild(tr);
  }

  function addDate() {
    const date = new Date(document.querySelector("#date").value);
    if (!date) {
      return;
    }
    timesList.push(date);
    document.querySelector("#date").value = "";
    addDateToList(date);
  }

  function addDateToList(date) {
    if (!date) {
      return;
    }
    const table = document.querySelector(".table");
    let tr = document.querySelector("#availableDates");
    if (!tr) {
      tr = createElement("div", "tr");
      tr.id = "availableDates";
      let th = createElement("div", "th");
      th.appendChild(document.createTextNode("Persons"));
      th.value = "persons";
      tr.appendChild(th);
      th = createElement("div", "th");
      tr.appendChild(th);
      table.appendChild(tr);
    }
    const th = createElement("div", "th")
    const br = document.createElement("br");
    th.appendChild(document.createTextNode(date.toLocaleDateString()));
    th.appendChild(br);
    th.appendChild(document.createTextNode(date.toLocaleTimeString()));
    tr.appendChild(th);
    table.appendChild(tr);
  }

  function clearInputFields(checkboxes) {
    document.querySelector("#name").value = "";
    for (let i = 0; i < checkboxes.length; ++i) {
      document.querySelectorAll(".selection")[i].checked = false;
    };
  }

  function randomId() {
    return "e" + Math.random().toString(36).substr(2, 10);
  }

  document.addEventListener("DOMContentLoaded", function (e) {
    listDates();
    createAddReservationForm();
    document.getElementById("submitDate").addEventListener("click", function (e) {
      addDate();
    });
    document.getElementById("saveReservation").addEventListener("click", function (e) {
      savePersonAndReservations();
    });
  });
})();