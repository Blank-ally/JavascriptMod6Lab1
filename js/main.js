$(function () {
  let lastId = 0;
  const $listEle = $("#studentList");

  const students = [
    new Student(
      "Conrad",
      "Hilton",
      "chilto34",
      "chilton@gmail.com",
      new Date(2000, 0, 21)
    ),
    new Student(
      "Alexandria",
      "Roberts",
      "arober23",
      "arobert@gmail.com",
      new Date(1995, 6, 10)
    ),
    new Student(
      "Xavier",
      "Allen",
      "xallen64",
      "xallen@wctc.edu",
      new Date(1984, 3, 8)
    ),
  ];

  function Student(fName, lName, uName, email, birthday) {
    this.id = lastId++;
    this.fName = fName;
    this.lName = lName;
    this.uName = uName;
    this.email = email;
    this.birthday = birthday;
  }

  function displayStudents(studentsList) {
    $listEle.html(" ");
    $(studentsList).each(function (index) {
      $listEle.append(`
                <div class="student">
                    <h3>${this.fName} ${this.lName}</h3>
                    <h4>${this.id} ${this.uName} ${this.email}</h4>
                </div>
            `);
    });
  }
  displayStudents(students);

  function filterByKeyword(item) {
    let myKeyword = $("#keywordFilter").val().toLowerCase();
    if (
      item.fName.toLowerCase().includes(myKeyword) ||
      item.lName.toLowerCase().includes(myKeyword)
    ) {
      return true;
    }
    return false;
  }

  function sortstudentsByKeyword(a, b) {
    const aFirstNameLover = a.fName.toLowerCase();
    const bFirstNameLover = b.fName.toLowerCase();

    if (aFirstNameLover > bFirstNameLover) {
      return 1;
    } else if (aFirstNameLover < bFirstNameLover) {
      return -1;
    }
    return 0;
  }

  $("#keywordFilter").on("keyup", function (e) {
    debugger;
    const studentsByKeyword = students.filter(filterByKeyword);
    const studentsSorted = studentsByKeyword.sort(sortstudentsByKeyword);
    if ($("#firstNameSort").val() == "dsc") {
      displayStudents(studentsSorted.reverse());
    } else {
      displayStudents(studentsSorted);
    }
  });

  // debugger;
  //  displayStudents(students)

  //This is function that will take the id and error message and display
  //the error on the correct element and label
  function displayErrorById(idSelector, errorMessage) {
    const $input = $("#" + idSelector);
    const $label = $(`label[for="${idSelector}"]`);

    $input.addClass("invalid");
    $label.text(" " + errorMessage);
  }

  //This is a function that will take the id and default label text
  //and remove any errors and reset the text
  function removeErrorById(idSelector, defaultText) {
    const $input = $("#" + idSelector);
    const $label = $(`label[for="${idSelector}"]`);

    $input.removeClass("invalid");
    $label.text(defaultText);
  }

  $("#fNameInput").on("keyup blur", function (e) {
    validateNameById("fNameInput", "first");
  });

  $("#lNameInput").on("keyup blur", function (e) {
    validateNameById("lNameInput", "last");
  });

  $("#uNameInput").on("keyup blur", function (e) {
    validateUserNameById("uNameInput");
  });

  $("#emailInput").on("keyup blur", function (e) {
    validateEmailById("emailInput");
  });

  $("#datInput").on("keyup blur", function (e) {
    validateBirthdayById("dateInput");
  });

  $("form#addStudent").on("submit", function (e) {
    e.preventDefault();

    //validate our inputs
    let isFNameValid = validateNameById("fNameInput", "First");
    let isLNameValid = validateNameById("lNameInput", "Last");
    let isValidUserName = validateUserNameById("uNameInput");
    let isValidEmail = validateEmailById("emailInput");
    let isOldEnough = validateBirthdayById("dateInput");

    //if all are valid, add the student to the array and reset the form
    if (
      isFNameValid &&
      isLNameValid &&
      isValidUserName &&
      isValidEmail &&
      isOldEnough
    ) {
      //create new students
      students.push(
        new Student(
          $("#fNameInput").val(),
          $("#lNameInput").val(),
          $("#uNameInput").val(),
          $("#emailInput").val(),
          $("#dateInput").val()
        )
      );

      //push the new student IF valid
      this.reset();
      displayStudents(students);

      console.log(students);
    }
  });

  function validateNameById(id, nameType) {
    const $input = $("#" + id);

    const letterRegex = new RegExp("^[a-zA-Z]*$");

    if (letterRegex.test($input.val())) {
      removeErrorById(id, nameType + " Name");
      return true;
    } else {
      displayErrorById(id, nameType + " Name - Please use only letters");
      return false;
    }
  }

  function validateUserNameById(id) {
    const $input = $("#" + id);

    const userNameRegex = new RegExp("^[a-zA-Z]{6}[0-9]{2}$");

    if (userNameRegex.test($input.val())) {
      removeErrorById(id, "User Name");
      return true;
    } else {
      displayErrorById(id, "User Name - Please use 6 letters and 2 numbers");
      return false;
    }
  }

  function validateEmailById(id) {
    const $input = $("#" + id);

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (emailRegex.test($input.val())) {
      removeErrorById(id, "Email");
      return true;
    } else {
      displayErrorById(id, "Email - Please use a proper email");
      return false;
    }
  }

  function validateBirthdayById(id) {
    const bday = new Date(
      $("#" + id)
        .val()
        .replace("-", "/")
    );

    let eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

    let isAdult = false;

    if (bday.getFullYear() < eighteenYearsAgo.getFullYear()) {
      isAdult = true;
    } else if (bday.getFullYear() == eighteenYearsAgo.getFullYear()) {
      if (bday.getMonth() < eighteenYearsAgo.getMonth()) {
        isAdult = true;
      } else if (bday.getMonth() == eighteenYearsAgo.getMonth()) {
        if (bday.getDate() <= eighteenYearsAgo.getDate()) {
          isAdult = true;
        }
      }
    }

    if (isAdult) {
      removeErrorById(id, "Birthday");
      return true;
    } else {
      displayErrorById(id, "Birthday - Must be 18 years or older");
      return false;
    }
  }
});
