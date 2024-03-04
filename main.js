
function toggleSidebar() {
    var sidebar = document.getElementById("sidebar");
    var main = document.getElementById("main");

    sidebar.classList.toggle("active");
    main.classList.toggle("active");
}

var firebaseConfig = {
  apiKey: "AIzaSyBKLzrzD7QKy3CiqkQ3AMkdWGt_WaZTEYA",
          authDomain: "untitled-pop-company.firebaseapp.com",
          projectId: "untitled-pop-company",
          storageBucket: "untitled-pop-company.appspot.com",
          messagingSenderId: "644274215001",
          appId: "1:644274215001:web:814aefa42092fe5b9eb948",
          measurementId: "G-E9PHPBBBLT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()


function NoAccess(){
  alert("Account registration is not opened. Check back later")
}


// Set up our register function
function register () {
  // Get all our input fields
  enabled = true
  if (enabled == false){
    NoAccess()
  }
  if (enabled == true){
    email = document.getElementById('email').value
  password = document.getElementById('password').value
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }
  }
  
  
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // Done
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return;
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);

      // Redirect to dashboard.html
      document.cookie = "authenticated=true";
      window.location.href = 'dashboard.html';
    })
    .catch(function (error) {
      // Handle errors if needed
      console.error('Login error:', error.message);
      alert('Login failed. Please check your credentials.');
    });
}


function logout(){
  document.cookie = "authenticated=false";
  window.location.href = 'login.html';
}


// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
} 