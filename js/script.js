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

  function saveSelections() {
    const personId = "a" + randomId();
    const name = document.querySelector("#name").value;
    const person = { "id": personId, "name": name, "selectedTimes": [] };
    const checkboxes = document.querySelectorAll(".selection");
    checkboxes.forEach(function (checkbox) {
      const checkboxId = checkbox.id;
      const obj = new Object();
      if (checkbox.checked === true) {
        obj[checkboxId] = true;
        person.selectedTimes.push(obj);
      }
      else {
        obj[checkboxId] = false;
        person.selectedTimes.push(obj);
      }
    }, this);

    savedSelections.persons = savedSelections.persons.filter(person => person.id !== personId);
    savedSelections.persons.push(person);

    console.log(savedSelections.persons);
    clearInputFields(checkboxes);
    showReservation(person);
  }

  function showReservation(person) {
    const ul = document.querySelector("#selectedTimes");
    const li = document.createElement("li");
    const form = document.createElement("form");
    const name = document.createElement("input");
    name.type = "text";
    name.id = person.id;
    name.value = person.name;
    form.id="form_"+person.id;
    li.id="li_"+person.id;
    form.appendChild(name);
    //form.id = "edit_" + person.id;
    person.selectedTimes.forEach((time, i) => {
      const label = document.createElement("label");
      label.appendChild(document.createTextNode(Object.keys(time)[0]));
      form.appendChild(label);
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = timesList[i];
      checkbox.className = person.id;
      checkbox.name = "checkbox " + i;
      checkbox.checked = time[Object.keys(time)[0]];
      form.appendChild(checkbox);
      //Object.keys(time)[0] + " " + time[Object.keys(time)[0]] + " : ";
    });
    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "edit";
    editButton.id = "edit_" + person.id;
    form.appendChild(editButton);
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.id = "delete_" + person.id;
    form.appendChild(deleteButton);
    li.appendChild(form);
    ul.appendChild(li);
    document.getElementById("edit_" + person.id).addEventListener("click", function (e) {
      editReservation(person);
    });
    document.getElementById("delete_" + person.id).addEventListener("click", function (e) {
      deleteReservation(person);
    });
  }

  function editReservation(person) {
    console.log(person);
  }

  function deleteReservation(person) {
    const li=document.querySelector("#li_"+person.id)
    li.parentElement.removeChild(li);
    savedSelections.persons=savedSelections.persons.filter(p => {
      return p.id!==person.id;
    });
    console.log(savedSelections.persons);
}

  function makeCheckBoxes() {
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
    const ul = document.querySelector("#dates");
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(date.toLocaleDateString() + " " + date.toLocaleTimeString()));
    ul.appendChild(li);
  }

  function clearInputFields(checkboxes) {
    document.querySelector("#name").value = "";
    for (let i = 0; i < checkboxes.length; ++i) {
      document.querySelectorAll(".selection")[i].checked = false;
    };
  }

  function randomId() {
    return Math.random().toString(36).substr(2, 10);
  }
  //event listeners
  document.addEventListener("DOMContentLoaded", function (e) {
    listDates();
    makeCheckBoxes();
    document.getElementById("submitDate").addEventListener("click", function (e) {
      addDate();
    });
    document.getElementById("saveSelected").addEventListener("click", function (e) {
      saveSelections();
    });
  });
})();