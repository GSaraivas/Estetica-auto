(() => {
  const { initAnimations } = window.AutoDemo;
  const form = document.querySelector("#quote-form");
  const select = document.querySelector("#quote-service");
  const status = document.querySelector("#contact-status");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  document.querySelectorAll("[data-service]").forEach(link => {
    link.addEventListener("click", () => { select.value = link.dataset.service; });
  });
  form.addEventListener("submit", event => {
    event.preventDefault();
    status.textContent = (select.value ? "Serviço selecionado: " + select.value + ". " : "Simulação concluída. ") + "Este é um modelo demonstrativo. Nenhuma mensagem foi enviada e nenhum agendamento foi realizado.";
    status.hidden = false;
  });

  const menu = document.querySelector("#mobile-menu");
  const menuToggle = document.querySelector(".menu-toggle");
  menuToggle.addEventListener("click", () => {
    menu.showModal();
    menuToggle.setAttribute("aria-expanded", "true");
    menu.querySelector("[data-menu-close]").focus();
  });
  menu.querySelectorAll("a, [data-menu-close]").forEach(control => {
    control.addEventListener("click", () => menu.close());
  });
  menu.addEventListener("close", () => menuToggle.setAttribute("aria-expanded", "false"));
  matchMedia("(min-width: 980px)").addEventListener("change", event => {
    if (event.matches && menu.open) menu.close();
  });

  document.querySelector("#year").textContent = new Date().getFullYear();
  const progress = document.querySelector(".scroll-progress");
  const header = document.querySelector(".header");
  let pending = false;
  function updateScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header.classList.toggle("scrolled", window.scrollY > 20);
    progress.style.transform = "scaleX(" + (max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0) + ")";
    pending = false;
  }
  function queueScroll() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener("scroll", queueScroll, { passive: true });
  window.addEventListener("resize", queueScroll);
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(([entry]) => header.classList.toggle("away-from-hero", !entry.isIntersecting));
    observer.observe(document.querySelector(".hero"));
  }
  updateScroll();


  const preloader = document.querySelector(".preloader");
  if (!reducedMotion.matches && performance.now() < 1100) {
    preloader.hidden = false;
    setTimeout(() => { preloader.hidden = true; }, 740);
  }
  let animated = false;
  function enhance(requireOptional = true) {
    window.lucide?.createIcons();
    if (animated || !window.gsap || !window.ScrollTrigger) return;
    if (requireOptional && (!window.SplitText || !window.Lenis)) return;
    animated = true;
    initAnimations();
  }
  enhance();
  document.querySelectorAll("script[async]").forEach(script => {
    script.addEventListener("load", () => enhance(), { once: true });
  });
  window.addEventListener("load", () => enhance(false), { once: true });
})();
