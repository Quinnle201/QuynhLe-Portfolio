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

// Typing effect
const wordList = ["Software", "Frontend", "FullStack", "Web", "React"];

const wordColors = {
  Software: "#ffa640",
  Frontend: "#645af0",
  FullStack: "#3c7723",
  Web: "#f86d4a",
  React: "#308ea8",
};

let i = 0,
  j = 0,
  deleting = false;
const typed = document.getElementById("typed-text");
const typingSpeed = 150;
const deletingSpeed = 100;
const pauseTime = 1500;

function type() {
  const word = wordList[i];

  if (!deleting) {
    typed.textContent = word.slice(0, j++);
    typed.style.color = wordColors[word] || "#ffffff";
    if (j > word.length) {
      deleting = true;
      setTimeout(type, pauseTime);
      return;
    }
  } else {
    typed.textContent = word.slice(0, j--);
    typed.style.color = wordColors[word] || "#ffffff"; 
    if (j < 0) {
      deleting = false;
      j = 0;
      i = (i + 1) % wordList.length;
    }
  }
  setTimeout(type, deleting ? deletingSpeed : typingSpeed);
}
type();

// Active nav on scroll
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((sec) => {
    const top = window.scrollY;
    if (top >= sec.offsetTop - 200) {
      current = sec.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// theme toggle
const body = document.body;

document.getElementById("lightMode").onclick = () => {
  body.setAttribute("data-theme", "light");
};

document.getElementById("darkMode").onclick = () => {
  body.setAttribute("data-theme", "darkMode");
};

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

const settingsBtn = document.querySelector(".settings-btn");
const settingsDropdown = document.querySelector(".settings-dropdown");

//  Toggle Hamburger
hamburger.addEventListener("click", (e) => {
  e.stopPropagation();

  navLinks.classList.toggle("show");

  // Close settings if open
  settingsDropdown.classList.remove("show");
});

// Toggle Settings
settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  settingsDropdown.classList.toggle("show");

  // Close hamburger if open
  navLinks.classList.remove("show");
});

// Click outside → close everything
document.addEventListener("click", (e) => {
  const isClickInsideNav = e.target.closest("nav");

  if (!isClickInsideNav) {
    navLinks.classList.remove("show");
    settingsDropdown.classList.remove("show");
  }
});

const canvas = document.getElementById("skills-canvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height =
  document.querySelector(".skills-section").offsetHeight);

window.addEventListener("resize", () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height =
    document.querySelector(".skills-section").offsetHeight;
});

// Generate random particles
const particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 3 + 1,
    speedX: (Math.random() - 0.5) * 0.5,
    speedY: (Math.random() - 0.5) * 0.5,
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, width, height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "#ff67d1";
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    // bounce
    if (p.x < 0 || p.x > width) p.speedX *= -1;
    if (p.y < 0 || p.y > height) p.speedY *= -1;
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// Cursor wave effect
const skillItems = document.querySelectorAll(".skill-item");
document.addEventListener("mousemove", (e) => {
  const mx = e.clientX;
  const my = e.clientY;

  skillItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const dx = mx - (rect.left + rect.width / 2);
    const dy = my - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const angle = Math.atan2(dy, dx);
      const offset = (150 - dist) / 20;
      item.style.transform = `translate(${Math.cos(angle) * offset}px, ${Math.sin(angle) * offset}px) scale(1.3)`;
    } else {
      item.style.transform = "translate(0,0) scale(1)";
    }
  });
});

const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (e.target.tagName.toLowerCase() === "a") return;
    projectCards.forEach((c) => {
      if (c !== card) c.classList.remove("expanded");
    });

    card.classList.toggle("expanded");
  });
});

// Avatar images
const avatarImages = ["photos/avata.png", "photos/avata1.jpg"];

let currentAvatarIndex = 0;
const avatarElements = document.querySelectorAll(".avatar");

setInterval(() => {
  avatarElements.forEach((img) => img.classList.add("fade-out"));
  setTimeout(() => {
    currentAvatarIndex = (currentAvatarIndex + 1) % avatarImages.length;
    avatarElements.forEach((img) => {
      img.src = avatarImages[currentAvatarIndex];
      img.classList.remove("fade-out"); 
    });
  }, 500); 
}, 3000);
