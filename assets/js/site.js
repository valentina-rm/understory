/* Understory — small, dependency-free interactions */
(function () {
  "use strict";

  /* 1. Reveal-on-load (respects reduced motion via CSS) */
  document.documentElement.classList.add("js");
  window.addEventListener("DOMContentLoaded", function () {
    document.body.classList.add("is-ready");
  });

  /* 2. Mobile navigation toggle */
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* 3. The Index — filter by topic AND reflection type */
  var filterBar = document.querySelector("[data-filters]");
  var cardsWrap = document.querySelector("[data-cards]");
  if (!filterBar || !cardsWrap) return;

  var cards = Array.prototype.slice.call(cardsWrap.querySelectorAll(".card"));
  var countEl = document.querySelector("[data-count]");
  var emptyEl = document.querySelector("[data-empty]");
  var state = { topic: "all", type: "all" };

  function setActive(axis, value) {
    state[axis] = value;
    filterBar.querySelectorAll('[data-axis="' + axis + '"]').forEach(function (b) {
      b.setAttribute("aria-pressed", b.dataset.value === value ? "true" : "false");
    });
  }

  function apply() {
    var shown = 0;
    cards.forEach(function (card) {
      var okTopic = state.topic === "all" || card.dataset.topic === state.topic;
      var okType = state.type === "all" || card.dataset.type === state.type;
      var show = okTopic && okType;
      card.style.display = show ? "" : "none";
      if (show) shown++;
    });
    if (countEl) {
      countEl.textContent = shown + (shown === 1 ? " piece" : " pieces");
    }
    if (emptyEl) {
      emptyEl.classList.toggle("is-shown", shown === 0);
    }
  }

  filterBar.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-axis]");
    if (!btn) return;
    setActive(btn.dataset.axis, btn.dataset.value);
    apply();
    updateUrl();
  });

  /* 4. Deep-linking: /index/?topic=climate&type=dream */
  function updateUrl() {
    var params = new URLSearchParams();
    if (state.topic !== "all") params.set("topic", state.topic);
    if (state.type !== "all") params.set("type", state.type);
    var qs = params.toString();
    var url = window.location.pathname + (qs ? "?" + qs : "");
    window.history.replaceState(null, "", url);
  }

  function readUrl() {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get("topic");
    var type = params.get("type");
    var valid = function (axis, v) {
      return v && filterBar.querySelector('[data-axis="' + axis + '"][data-value="' + v + '"]');
    };
    if (valid("topic", topic)) setActive("topic", topic);
    if (valid("type", type)) setActive("type", type);
  }

  readUrl();
  apply();
})();
