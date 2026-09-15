(function () {
  var status = document.getElementById("copy-status");

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
})();
