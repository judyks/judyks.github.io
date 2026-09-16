(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!reduce.matches) {
    window.requestAnimationFrame(function () {
      document.body.classList.add("page-enter");
    });
  }

  if (reduce.matches) return;

  document.querySelectorAll("a[href]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target === "_blank") return;

      var url;
      try {
        url = new URL(link.href, window.location.href);
      } catch (err) {
        return;
      }

      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.hash) return;
      if (url.href === window.location.href) return;

      event.preventDefault();
      document.body.classList.remove("page-enter");
      document.body.classList.add("page-leave");
      window.setTimeout(function () {
        window.location.href = url.href;
      }, 160);
    });
  });
})();
