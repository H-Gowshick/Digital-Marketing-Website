
/*slide imgae script*/

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 25}%)`;
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === Math.floor(currentIndex / 4));
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index * 4;
    updateSlider();
  });
});


/*click event imgae change script*/
function changeImage(imageName) {
  document.getElementById("projectImage").src = `./assets/images/${imageName}`;
  document.querySelectorAll(".project-content").forEach((el) => {
    el.classList.remove("active-content");
  });
  event.currentTarget.classList.add("active-content");
}


/*form data submission script*/ 
document.getElementById('submitForm').addEventListener('click', function(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const submitButton = document.getElementById('submitForm');
  // Disable the submit button to prevent multiple submissions
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      }
      throw new Error('Network response was not ok');
    }
    return response.text();
  })
  .then(data => {
    console.log('Success:', data);
    alert('Form submitted successfully!');
    // Hide modal without jQuery
    document.getElementById('contactModal').classList.remove('show');
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
    form.reset();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred: ' + error.message);
  })
  .finally(() => {
    // Re-enable the submit button
    submitButton.disabled = false;
    submitButton.textContent = 'Contact Us';
  });
});