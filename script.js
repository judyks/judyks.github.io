(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var status = document.getElementById("copy-status");

  if (!reduce.matches) {
    window.requestAnimationFrame(function () {
      document.body.classList.add("page-enter");
    });
  }

  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy") || "";
      var reset = btn.textContent;

      function succeed() {
        btn.classList.add("copied");
        btn.textContent = "Copied";
        if (status) status.textContent = "Email copied to clipboard.";
        window.setTimeout(function () {
          btn.classList.remove("copied");
          btn.textContent = reset;
          if (status) status.textContent = "";
        }, 1600);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(succeed).catch(function () {
          if (status) status.textContent = "Copy failed. Use the email link.";
        });
        return;
      }

      if (status) status.textContent = "Copy failed. Use the email link.";
    });
  });

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
