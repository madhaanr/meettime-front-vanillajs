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
    const personId = randomId();
    const name = document.querySelector("#name").value;
    const person = { "id": personId, "name": name, "selectedTimes": [] };
    const checkboxes = document.querySelectorAll(".selection");
    checkboxes.forEach(function (checkbox) {
      const checkboxId = checkbox.id;
      const obj = {};
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
    const table = document.querySelector(".table");
    const form = document.createElement("form");
    form.className="tr";
    const name = document.createElement("input");
    const spanTd=document.createElement("span");
    spanTd.className="td";
    if(!table) {
      return;
    }
    name.type = "text";
    name.id = person.id;
    name.value = person.name;
    form.id = "form_" + person.id;
    spanTd.appendChild(name);
    form.appendChild(spanTd);
    person.selectedTimes.forEach((time, i) => {
      const spanTd2 = document.createElement("span");
      spanTd2.className="td";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = timesList[i];
      checkbox.id = "checkbox" + person.id + "_" + i;
      checkbox.className = "checkbox_" + person.id;
      checkbox.checked = time[Object.keys(time)[0]];
      spanTd2.appendChild(checkbox);
      form.appendChild(spanTd2);
    });
    const editButton = document.createElement("input");
    editButton.type = "button";
    editButton.value = "edit";
    editButton.id = "edit_" + person.id;
    const spanTd3=document.createElement("span");
    spanTd3.className="td";
    spanTd3.appendChild(editButton);
    form.appendChild(spanTd3);
    const deleteButton = document.createElement("input");
    deleteButton.type = "button";
    deleteButton.value = "delete";
    deleteButton.id = "delete_" + person.id;
    const spanTd4=document.createElement("span");
    spanTd4.className="td";
    spanTd4.appendChild(deleteButton);
    form.appendChild(spanTd4);
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
      const checkboxId = checkbox.id;
      const obj = {};
      if (checkbox.checked === true) {
        obj[checkboxId] = true;
        person.selectedTimes.push(obj);
      }
      else {
        obj[checkboxId] = false;
        person.selectedTimes.push(obj);
      }
    });
    savedSelections.persons = savedSelections.persons.filter(p => p.id !== person.id);
    savedSelections.persons.push(person);
  }

  function deleteReservation(person) {
    const li = document.querySelector("#li_" + person.id)
    li.parentElement.removeChild(li);
    savedSelections.persons = savedSelections.persons.filter(p => {
      return p.id !== person.id;
    });
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
    //ugly hack to get extra th cells so edit and delete button 
    //have space in table
    const table = document.querySelector(".table");
    let spanTr = document.querySelector("#availableDates");
    const spanTh = document.createElement("span");
    spanTh.className="th";
    const spanTh2 = document.createElement("span");
    spanTh2.className="th";
    spanTr.appendChild(spanTh);
    spanTr.appendChild(spanTh2);
    table.appendChild(spanTr);
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
    let spanTr = document.querySelector("#availableDates");
    if(!spanTr) {
      spanTr = document.createElement("span");
      spanTr.id = "availableDates";
      spanTr.className = "tr";
      const spanTh = document.createElement("span");
      spanTh.appendChild(document.createTextNode("Persons"));
      spanTh.value="persons";
      spanTh.className="th"
      spanTr.appendChild(spanTh);
      table.appendChild(spanTr);
    }
    const spanTh = document.createElement("span");
    spanTh.className="th";
    spanTh.appendChild(document.createTextNode(date.toLocaleDateString()+" "+date.toLocaleTimeString())); 
    spanTr.appendChild(spanTh);
    table.appendChild(spanTr);
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
    makeCheckBoxes();
    document.getElementById("submitDate").addEventListener("click", function (e) {
      addDate();
    });
    document.getElementById("saveSelected").addEventListener("click", function (e) {
      saveSelections();
    });
  });
})();