// public/main.js
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (
      pageYOffset >= sectionTop - 150 &&
      pageYOffset < sectionTop + sectionHeight - 150
    ) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// FORM SUBMIT
const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    status.textContent = result.message;
    form.reset();
  } catch (err) {
    status.textContent = "Error sending message.";
  }
});
form.addEventListener("focusin", () => {
  status.textContent = "";
});
