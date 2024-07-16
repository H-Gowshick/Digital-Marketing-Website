$(document).ready(function () {
  // Slider functionality
  const $slider = $(".slider");
  const $slides = $(".slide");
  const $dots = $(".dot");
  let currentIndex = 0;

  function updateSlider() {
    $slider.css("transform", `translateX(-${currentIndex * 25}%)`);
    $dots
      .removeClass("active")
      .eq(Math.floor(currentIndex / 4))
      .addClass("active");
  }

  $dots.on("click", function () {
    currentIndex = $(this).index() * 4;
    updateSlider();
  });

  // Project image change functionality
  $(".project-content").on("click", function (event) {
    const imageName = $(this).data("image");
    $("#projectImage").attr("src", `./assets/images/${imageName}`);
    $(".project-content").removeClass("active-content");
    $(this).addClass("active-content");
  });

  // Form submission
  $("#submitForm").on("click", function (e) {
    e.preventDefault();
    const $form = $("#contactForm");
    const $submitButton = $(this);

    $submitButton.prop("disabled", true).text("Submitting...");

    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.serialize(),
      success: function (data) {
        console.log("Success:", data);
        alert("Form submitted successfully!");
        $("#contactModal").modal("hide");
        $form[0].reset();
      },
      error: function (xhr, status, error) {
        console.error("Error:", error);
        if (xhr.status === 429) {
          alert("Too many requests. Please try again later.");
        } else {
          alert("An error occurred: " + error);
        }
      },
      complete: function () {
        $submitButton.prop("disabled", false).text("Contact Us");
      },
    });
  });
});
