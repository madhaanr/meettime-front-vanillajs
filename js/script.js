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
    const form = document.createElement("form");
    form.className = "tr";
    const name = document.createElement("input");
    const td = document.createElement("div");
    td.className = "td";
    if (!table) {
      return;
    }
    name.type = "text";
    name.id = person.id;
    name.value = person.name;
    name.className = "td";
    form.id = "form_" + person.id;
    td.appendChild(name);
    form.appendChild(td);
    const td3 = document.createElement("div");
    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "edit";
    editButton.id = "edit_" + person.id;
    td3.className = "td";
    td3.appendChild(editButton);
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.id = "delete_" + person.id;
    td3.appendChild(deleteButton);
    form.appendChild(td3);
    person.selectedTimes.forEach((time, i) => {
      const td2 = document.createElement("div");
      td2.className = "td";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = timesList[i];
      checkbox.id = "checkbox" + person.id + "_" + i;
      checkbox.className = "checkbox_" + person.id;
      checkbox.checked = time[Object.keys(time)[0]];
      td2.appendChild(checkbox);
      form.appendChild(td2);
    });
    table.appendChild(form);
    document.getElementById("edit_" + person.id).addEventListener("click", function (e) {
      editReservation(person);
    });
    document.getElementById("delete_" + person.id).addEventListener("click", function (e) {
      deleteReservation(person);
    });
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

  function createCheckBoxesToPage() {
    const form = document.querySelector("#selectTimes");
    if (!form) {
      return;
    }
    const name = document.createElement("input");
    name.type = "text";
    name.id = "name";
    form.appendChild(name);
    for (let i = 0; i < timesList.length; ++i) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = timesList[i];
      checkbox.className = "selection";
      checkbox.name = "checkbox " + i;
      form.appendChild(checkbox);
    }
    const submit = document.createElement("input");
    submit.type = "button";
    submit.value = "save";
    submit.id = "saveSelected";
    form.appendChild(submit);
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
    const th2 = document.createElement("div");
    th2.className = "th";
    tr.appendChild(th);
    tr.appendChild(th2);
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
      tr = document.createElement("div");
      tr.id = "availableDates";
      tr.className = "tr";
      const th = document.createElement("div");
      th.appendChild(document.createTextNode("Persons"));
      th.value = "persons";
      th.className = "th"
      tr.appendChild(th);
      table.appendChild(tr);
    }
    const th = document.createElement("div");
    th.className = "th";
    th.appendChild(document.createTextNode(date.toLocaleDateString() + " " + date.toLocaleTimeString()));
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
    createCheckBoxesToPage();
    document.getElementById("submitDate").addEventListener("click", function (e) {
      addDate();
    });
    document.getElementById("saveSelected").addEventListener("click", function (e) {
      savePersonAndReservations();
    });
  });
})();