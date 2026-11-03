window.addEventListener("load", function () {
  if (document.fonts && document.fonts.load) {
    document.fonts.load('200 1em "IBM Plex Sans"');
    document.fonts.load('italic 200 1em "IBM Plex Sans"');
  }
});

document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".research-nav");
  var list = document.querySelector(".research-list");
  if (!nav || !list) return;

  var title = document.createElement("div");
  title.className = "nav-title";
  title.textContent = "Type";
  nav.appendChild(title);

  var groups = Array.prototype.map.call(
    list.querySelectorAll("section.level1"),
    function (section) {
      var entries = section.querySelectorAll("section.level2");

      var lastYear = null;
      entries.forEach(function (entry) {
        var h2 = entry.querySelector("h2");
        var year = h2.getAttribute("data-year");
        h2.classList.toggle("year-repeat", !!year && year === lastYear);
        lastYear = year;
      });

      var link = document.createElement("a");
      link.className = "nav-item";
      link.href = "#" + section.id;
      link.appendChild(document.createTextNode(
        section.querySelector("h1").textContent.trim()));
      var count = document.createElement("span");
      count.className = "nav-count";
      count.textContent = " (" + entries.length + ")";
      link.appendChild(count);
      nav.appendChild(link);

      return { section: section, link: link };
    });

  function highlight() {
    var current = groups[0];
    groups.forEach(function (group) {
      if (group.section.getBoundingClientRect().top <= 120) current = group;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      current = groups[groups.length - 1];
    }
    groups.forEach(function (group) {
      var on = group === current;
      group.link.classList.toggle("active", on);
      if (on) group.link.setAttribute("aria-current", "true");
      else group.link.removeAttribute("aria-current");
    });
  }

  function measureHeader() {
    var header = document.getElementById("quarto-header");
    if (header) {
      document.documentElement.style.setProperty(
        "--header-height", header.offsetHeight + "px");
    }
  }

  measureHeader();
  window.addEventListener("resize", measureHeader);

  if (!groups.length) return;
  window.addEventListener("scroll", highlight, { passive: true });
  window.addEventListener("resize", highlight);
  highlight();
});
