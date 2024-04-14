const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
});
ScrollReveal().reveal(".header__content h2", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content .header__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval: 500,
});

ScrollReveal().reveal(".trainer__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".blog__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,

  pagination: {
    el: ".swiper-pagination",
  },
});
function calculateBMI() {
  var height = parseFloat(document.getElementById('bmi_height').value);
  var weight = parseFloat(document.getElementById('bmi_weight').value);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
    document.getElementById('bmi_result').innerText = 'Please enter valid height and weight.';
    return;
  }

  var bmi = weight / ((height / 100) * (height / 100));
  var bmiCategory = '';

  if (bmi < 18.5) {
    bmiCategory = 'Underweight';
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiCategory = 'Normal weight';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Overweight';
  } else {
    bmiCategory = 'Obese';
  }

  document.getElementById('bmi_result').innerText = `Your BMI is ${bmi.toFixed(2)} (${bmiCategory}).`;
}

//Payments realated script

document.querySelector('.pay').addEventListener('click', function() {
  var options = {
    key: '',
    amount: 50000, // Amount in paise (e.g., 50000 for ₹500)
    currency: 'INR',
    name: 'Your Company Name',
    description: 'Test Transaction',
    image: 'https://via.placeholder.com/150', // Your company logo
    order_id: 'order_E9h7dSjBv6l8Zt', // Replace with actual order ID
    handler: function(res) {
      alert('Payment successful');
    },
    prefill: {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999'
    }
  };
  var rzp1 = new Razorpay(options);
  rzp1.open();
});
