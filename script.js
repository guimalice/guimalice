/* =========================================================
   ALICE GUIMARÃES — PORTFÓLIO
   script.js
   1. Menu hambúrguer (mobile)
   2. Fechar menu ao clicar em um link / rolagem suave
   3. Header muda de leve ao rolar a página
   4. Animação de entrada das seções (Intersection Observer)
   5. Modal de certificados
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* ---------- 1. Menu hambúrguer ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  menuToggle.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  /* ---------- 2. Fechar menu ao clicar em um link ---------- */
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      nav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- 3. Header com sombra ao rolar ---------- */
  const header = document.getElementById("header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 12) {
      header.style.boxShadow = "0 8px 24px -20px rgba(15, 21, 18, 0.6)";
    } else {
      header.style.boxShadow = "none";
    }
  });

  /* ---------- 4. Animação de entrada das seções ---------- */
  const revealTargets = document.querySelectorAll(
    ".about__grid, .project, .cert-grid, .hobbies__grid, .hobbies__videos, .skills-grid, .contact__inner"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach(function (el) { observer.observe(el); });

  /* ---------- 5. Modal de certificados ---------- */
  const modal = document.getElementById("certModal");
  const modalImage = document.getElementById("modalImage");
  const modalCaption = document.getElementById("modalCaption");
  const modalClose = document.getElementById("modalClose");
  const certCards = document.querySelectorAll(".cert-card");

  function openModal(imgSrc, name) {
    modalImage.src = imgSrc;
    modalImage.alt = "Certificado: " + name;
    modalCaption.textContent = name;
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("is-open");
    document.body.style.overflow = "";
    modalImage.src = "";
  }

  certCards.forEach(function (card) {
    card.addEventListener("click", function () {
      openModal(card.dataset.img, card.dataset.name);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modal.querySelector(".modal__backdrop").addEventListener("click", closeModal);

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

});
