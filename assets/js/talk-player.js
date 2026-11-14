(function () {
  function fmt(s) {
    if (!isFinite(s)) return "0:00";
    s = Math.floor(s);
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }
  document.querySelectorAll("[data-sc-player]").forEach(function (root) {
    var video = root.querySelector("video");
    var bar = root.querySelector(".sc-bar");
    var play = root.querySelector(".sc-play");
    var wave = root.querySelector(".sc-wave");
    var cur = root.querySelector(".sc-cur");
    var dur = root.querySelector(".sc-dur");
    var full = root.querySelector(".sc-full");
    if (!video || !bar) return;

    video.removeAttribute("controls");
    bar.hidden = false;
    root.classList.add("is-enhanced");

    function toggle() { video.paused ? video.play() : video.pause(); }
    function setPct(name, pct) { root.style.setProperty(name, (pct * 100).toFixed(3) + "%"); }
    function pctAt(e) {
      var r = wave.getBoundingClientRect();
      return Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    }
    function sync() {
      var d = video.duration || 0, t = video.currentTime || 0;
      setPct("--sc-p", d ? t / d : 0);
      cur.textContent = fmt(t);
      wave.setAttribute("aria-valuenow", Math.floor(t));
      wave.setAttribute("aria-valuetext", fmt(t) + " of " + fmt(d));
    }
    function meta() {
      dur.textContent = fmt(video.duration);
      wave.setAttribute("aria-valuemax", Math.floor(video.duration || 0));
      sync();
    }

    play.addEventListener("click", toggle);
    video.addEventListener("click", toggle);
    video.addEventListener("play", function () { root.classList.add("is-playing"); play.setAttribute("aria-label", "Pause"); });
    video.addEventListener("pause", function () { root.classList.remove("is-playing"); play.setAttribute("aria-label", "Play"); });
    video.addEventListener("timeupdate", sync);
    video.addEventListener("loadedmetadata", meta);
    if (video.readyState >= 1) meta();

    wave.addEventListener("click", function (e) {
      if (video.duration) { video.currentTime = pctAt(e) * video.duration; sync(); }
    });
    wave.addEventListener("mousemove", function (e) { setPct("--sc-h", pctAt(e)); root.classList.add("is-hovering"); });
    wave.addEventListener("mouseleave", function () { root.classList.remove("is-hovering"); });
    wave.addEventListener("keydown", function (e) {
      var step = { ArrowRight: 5, ArrowUp: 5, ArrowLeft: -5, ArrowDown: -5 }[e.key];
      if (step) { e.preventDefault(); video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + step)); }
      else if (e.key === "Home") { e.preventDefault(); video.currentTime = 0; }
      else if (e.key === "End" && video.duration) { e.preventDefault(); video.currentTime = video.duration; }
      else if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(); }
    });
    if (full) full.addEventListener("click", function () {
      if (video.requestFullscreen) video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
    });
  });
})();
