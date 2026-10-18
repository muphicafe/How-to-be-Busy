let activities = [];
let time = 30, mood = "any", current = null;
const $ = id => document.getElementById(id);

function load(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch(e){ return d; } }
function save(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }

function today(){ return new Date().toISOString().slice(0,10); }

function updateStats(){
  const s = load("stats", {total:0, streak:0, last:""});
  $("total").textContent = s.total;
  $("streak").textContent = s.streak;
}

function markDone(){
  const s = load("stats", {total:0, streak:0, last:""});
  const t = today();
  if (s.last !== t){
    const y = new Date(Date.now()-86400000).toISOString().slice(0,10);
    s.streak = s.last === y ? s.streak + 1 : 1;
    s.last = t;
  }
  s.total += 1;
  save("stats", s);
  updateStats();
  $("msg").textContent = "Great job! 🎉";
  $("card").hidden = true;
}

function pick(){
  $("msg").textContent = "";
  const list = activities.filter(a =>
    a.duration <= time && (mood === "any" || a.mood.includes(mood)));
  if (!list.length){
    $("card").hidden = true;
    $("msg").textContent = "No idea found. Try other options.";
    return;
  }
  let a;
  do { a = list[Math.floor(Math.random()*list.length)]; }
  while (list.length > 1 && current && a.title === current.title);
  current = a;
  $("icon").textContent = a.icon;
  $("title").textContent = a.title;
  $("meta").textContent = a.duration + " min · " + a.place + " · needs: " + a.needs;
  $("card").hidden = false;
}

function chips(id, cb){
  $(id).addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b) return;
    [...$(id).children].forEach(c => c.classList.remove("on"));
    b.classList.add("on");
    cb(b.dataset.v);
  });
}

chips("time", v => time = Number(v));
chips("mood", v => mood = v);
$("go").onclick = pick;
$("skip").onclick = pick;
$("done").onclick = markDone;

fetch("activities.json")
  .then(r => r.json())
  .then(d => { activities = d; })
  .catch(() => { $("msg").textContent = "Could not load activities."; });

updateStats();

if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
