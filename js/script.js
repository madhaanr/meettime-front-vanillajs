"use strict";
(function () {
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
    const name = document.querySelector("#name").value;
    const checkboxes = document.querySelectorAll(".selection");
    let person = savedSelections.persons.find(person => person.name === name);
    if (person) {
      person.selectedTimes = [];
    } else {
      person = { "name": name, "selectedTimes": [] };
    }

    checkboxes.forEach(function (checkbox) {
      let checkboxId = checkbox.id;
      let obj = new Object();
      if (checkbox.checked === true) {
        obj[checkboxId] = true;
        person.selectedTimes.push(obj);
      }
      else {
        obj[checkboxId] = false;
        person.selectedTimes.push(obj);
      }
    }, this);

    savedSelections.persons=savedSelections.persons.filter(person=>person.name!==name);
    savedSelections.persons.push(person);

    console.log(savedSelections.persons);

    document.querySelector("#name").value = "";
    for (let i = 0; i < checkboxes.length; ++i) {
      document.querySelectorAll(".selection")[i].checked = false;
    };
  }

  function makeCheckBoxes() {
    let form = document.querySelector("#selectTimes");
    if (!form) {
      return;
    }
    let name = document.createElement("input");
    name.type = "text";
    name.id = "name";
    form.appendChild(name);
    for (let i = 0; i < timesList.length; ++i) {
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = timesList[i];
      checkbox.className = "selection";
      checkbox.name = "checkbox " + i;
      form.appendChild(checkbox);
    }
    let submit = document.createElement("input");
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

  function addDateToList(date) {
    if (!date) {
      return;
    }
    let ul = document.querySelector("#dates");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(date.toLocaleDateString() + " " + date.toLocaleTimeString()));
    ul.appendChild(li);
  }

  function addDate() {
    let date = new Date(document.querySelector("#date").value);
    if (!date) {
      return;
    }
    timesList.push(date);
    document.querySelector("#date").value = "";
    addDateToList(date);
  }

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