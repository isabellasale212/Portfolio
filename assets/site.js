(function(){
"use strict";
var A = "assets/";

/* ---------------- data ---------------- */
var PROJECTS = [
  {i:0,cat:"GPS · Python",badge:"Real data",title:"GPS Session Physical Report",blurb:"A raw 36,000-row Catapult export becomes a one-page physical summary.",thumb:"gps_movement_trace.png"},
  {i:1,cat:"Power BI · Dashboard",badge:"Real data",title:"Squad Training Report",blurb:"A live, filterable squad dashboard, drill into any session or player.",thumb:"training_report.png"},
  {i:2,cat:"Research · Dissertation",badge:"Primary research",title:"Force-Plate Dissertation",blurb:"Does jump-test power transfer to change-of-direction braking? (r = −0.55)",thumb:"diss_qualisys.jpg"},
  {i:3,cat:"Applied project · App",badge:"Real project",title:"Lacrosse Team App",blurb:"A mobile app my squad uses every week, built on relational data.",thumb:"lax_checkin.png"},
  {i:4,cat:"Recovery · Python",badge:"Real data",title:"Recovery & Readiness Analysis",blurb:"28 days of my own WHOOP recovery, HRV and sleep, with a cycle-aware, female-performance angle.",thumb:"whoop_recovery.png"},
  {i:5,cat:"Load monitoring · Python",badge:"Method demo",title:"Training Load Monitor (ACWR)",blurb:"Rolling ACWR flagging athlete-weeks outside the safe load range.",thumb:"acwr.png"}
];
var CV_WORK = [
  {title:"GPS Session Physical Report",tool:"Python · pandas",desc:"Raw 10 Hz Catapult export → one-page physical summary; reproducible from one command."},
  {title:"Squad Training Report",tool:"Power BI · DAX",desc:"Live, filterable squad dashboard, distance, HSR and max velocity by player and phase."},
  {title:"Force-Plate Dissertation",tool:"Qualisys · Visual3D",desc:"20-athlete study of whether jump-test power transfers to change-of-direction braking (r = −0.55)."},
  {title:"Recovery & Readiness Analysis",tool:"Python · WHOOP",desc:"28 days of personal recovery, HRV and sleep turned into a readiness view."},
  {title:"Lacrosse Team App",tool:"No-code · Sheets",desc:"A five-screen app on a relational backend, used by a full squad every week."}
];
var CV_SKILLS = [
  {l:"Python",d:"pandas, numpy, matplotlib, cleaning, modelling and automating analysis."},
  {l:"Power BI",d:"Power Query and DAX; interactive, cross-filtered squad dashboards."},
  {l:"Excel",d:"Power Query, formulas and conditional-format trackers staff can run themselves."},
  {l:"GPS analytics",d:"Catapult 10 Hz, speed zones, Player Load, sprint and accel/decel demands."},
  {l:"Wearables",d:"WHOOP recovery, HRV and sleep; readiness and monitoring."},
  {l:"Biomechanics",d:"Force plates, Qualisys and Visual3D; RFD, impulse and joint kinematics."},
  {l:"Statistics",d:"Correlation, group comparison and RM-ANOVA; inferential analysis."}
];
var INTERESTS = [
  {n:"01",t:"Performance Analysis",b:"Turning training and match data into the physical reports coaches actually use."},
  {n:"02",t:"GPS & Tracking",b:"10 Hz Catapult data into intensity zones, Player Load and sprint demands."},
  {n:"03",t:"Female-Performance Monitoring",b:"Cycle-aware readiness, wellness and load, building monitoring that isn't blind to the athlete in front of it."},
  {n:"04",t:"Python",b:"Cleaning, modelling and automating analysis pipelines end to end."},
  {n:"05",t:"Power BI & Dashboards",b:"Interactive squad dashboards staff can explore, filter and drill into."},
  {n:"06",t:"Statistics & Research",b:"Force-plate signal processing and inferential stats, from my dissertation onward."}
];

var CODE0 = '<span class="kw">def</span> summarise(df):\n'+
'    <span class="cmt"># distance per speed zone, integrate velocity over time in each band</span>\n'+
'    step = df[<span class="str">"vel_ms"</span>] * dt\n'+
'    zones = {}\n'+
'    <span class="kw">for</span> name, lo, hi <span class="kw">in</span> ZONES:\n'+
'        mask = (df[<span class="str">"vel_kmh"</span>] &gt;= lo) &amp; (df[<span class="str">"vel_kmh"</span>] &lt; hi)\n'+
'        zones[name] = float(step[mask].sum())\n'+
'    hsr = float(step[df[<span class="str">"vel_kmh"</span>] &gt;= 19.8].sum())   <span class="cmt"># high-speed running</span>\n'+
'    <span class="kw">return</span> {<span class="str">"distance_m"</span>: round(df[<span class="str">"odometer"</span>].iloc[-1]),\n'+
'            <span class="str">"peak_kmh"</span>: round(df[<span class="str">"vel_kmh"</span>].max(), 1),\n'+
'            <span class="str">"zones"</span>: {k: round(v) <span class="kw">for</span> k, v <span class="kw">in</span> zones.items()}}';
var CODE2 = '<span class="cmt"># eccentric rate of force development from a 2000 Hz force trace</span>\n'+
'dt = 1 / 2000\n'+
'rfd = np.gradient(force, dt)                  <span class="cmt"># ΔForce / ΔTime</span>\n'+
'peak_rfd = rfd[brake_start:brake_end].max()   <span class="cmt"># braking phase only</span>';

var CASES = [
 { kick:"01 / Session profiling", sub:"Real data · Catapult 10 Hz",
   title:"GPS Session Physical Report",
   stand:"GPS units log an athlete's every step, ten times a second. A coach can't read 36,000 rows of that, they need four or five numbers. This turns the raw feed into exactly those, automatically.",
   meta:[["Role","Data analysis & reporting"],["Tools","Python · pandas · matplotlib"],["Data","Catapult 10 Hz · 60 min"],["Output","Summary + charts + CSV"]],
   blocks:[
    {h:"The brief"},
    {p:["A GPS unit captures every step at 10 Hz, but nobody's reading 36,000 rows of latitude and velocity before training. Coaches need the headline: how hard was it, and where did the load sit? This produces total distance, work rate, a speed-zone breakdown, Player Load and heart-rate response."]},
    {h:"The raw signal"},
    {p:["Before any numbers, there's the movement itself. Plot the raw lat/long, colour each step by speed, and the whole session reads at a glance, cool blue for recovery jogging, warm and red for the high-speed bursts."]},
    {img:"gps_movement_trace.png",cap:"Every position sample from the 60-minute session, coloured by running speed (0–21 km/h)."},
    {h:"What I did"},
    {bul:[["Parsed and cleaned","the Catapult export, there's a title line above the header and the columns move around between exports, so the matching is deliberately forgiving."],["Integrated velocity to distance","and sorted every 0.1 s sample into five speed zones, computing zone distance as Σ v·Δt, not by naively counting samples."],["Accumulated Player Load","and heart-rate response across the session."],["Wrote it as one reproducible script","a single command regenerates the summary, the charts and the CSVs."]]},
    {callout:{k:"Headline result",p:"8,382 m at a 140 m/min work rate, topping out at 21.0 km/h, for a Player Load of 796 au and an average heart rate of 138 bpm."}},
    {h:"Speed-zone distribution"},
    {p:["Splitting distance into speed bands tells you what kind of running it was, not just how much. This one was aerobic, 5,879 m of the 8,382 total sat in the 6–12 km/h jog band, with 196 m above 15 km/h."]},
    {img:"speed_zones.png",cap:"Distance by speed zone."},
    {imgs:[{img:"velocity_time.png",cap:"Velocity across the session, high-speed threshold marked."},{img:"hr_response.png",cap:"Heart-rate response, the cost behind the distance."}]},
    {h:"The code"},
    {code:CODE0,codeLabel:"session_report.py"},
    {h:"Why it matters"},
    {p:["A report like this is the daily unit of a performance department. Run consistently, it lets staff compare today against an athlete's own norm, spot who over- or under-ran, and feed accurate load into the week. Because it's scripted, it takes seconds on the next session and never quietly drifts."]},
    {bul:[["Time-series parsing","and cleaning of a real 10 Hz feed."],["Signal-to-metric feature engineering","velocity to distance, samples to zones."],["Sports-science modelling","speed zones, Player Load and HR done properly."],["Reproducible reporting","one command, same result every time."]]},
    {stats:[{f:"8,382",l:"m total distance"},{f:"140",l:"m/min work rate"},{f:"21.0",l:"km/h peak speed"},{f:"796",l:"au Player Load"}]},
    {note:"The full Jupyter notebook and Python script live on GitHub."}
   ]},

 { kick:"02 / Matchday reporting", sub:"Real data · Catapult 10 Hz",
   title:"Squad Training Report",
   stand:"The session drill-down, live. Pick a coaching phase and every tile, the trend line and the intensity split update to it. This is the real 60-minute feed, go on, poke it.",
   meta:[["Role","Dashboard & reporting"],["Skills","Power BI · DAX · data viz"],["Data","Catapult 10 Hz · 7 phases"],["Interaction","Filter · hover · drill-down"]],
   blocks:[
    {h:"Try it, pick a phase"},
    {dash:true},
    {h:"The squad report it rolls up into"},
    {p:["One session is one row of a bigger picture. Rolled up across the squad it becomes the report staff open after every session, every player by position, with total distance, high-speed running, high-intensity efforts and max velocity, and athletes auto-flagged against their own norms."]},
    {img:"training_report.png",cap:"Squad physical report, 24 players by position, two flagged for review. Demo / anonymised data."},
    {h:"The question it answers"},
    {p:["A session total tells you how much an athlete did, not when. Splitting the feed on Catapult's phase flag shows exactly where the demand sat, so staff can sequence the week and make high-speed exposure a choice rather than an accident."]},
    {callout:{k:"The insight the drill-down surfaces",p:"Peak speed of 21.0 km/h came in movement prep, not the game. The warm-up is already pushing athletes to near-maximal velocity, which is exactly what you want to know for hamstring-injury management."}},
    {h:"On the tooling"},
    {p:["In a club I build this in Power BI, Power Query to shape the export, DAX measures per phase, cross-filtering between visuals. I rebuilt it here as a live web app on the same real data and the same logic, so you can actually click it. A native .pbix is available on request."]},
    {bul:[["Data shaping","from raw export to a clean model."],["Measure design","distance and peak speed per phase."],["Cross-filtered interaction","one click reshapes everything."],["Information design","built for a coach, not a data team."]]}
   ]},

 { kick:"Research · BSc dissertation", sub:"Primary research · original data",
   title:"Does jump-test power transfer to change-of-direction braking?",
   stand:"A force-plate study of 20 athletes, testing an assumption a lot of practitioners make without checking: that jump tests tell you how well someone brakes into a turn. Turns out, mostly, no.",
   meta:[["Award","BSc (Hons) Sport & Exercise Science"],["Institution","University of Bath"],["Supervisor","Dr Adam Brazil"],["Sample","n = 20 · force plates 2000 Hz"]],
   blocks:[
    {h:"The question"},
    {p:["Change-of-direction speed decides a lot of games, and the deceleration, the eccentric 'braking', is its hardest phase. Practitioners routinely profile it with jump tests and assume it carries over. Does it? I tested whether eccentric rate of force development from a countermovement, drop and broad jump reflects the braking RFD in a 505 change-of-direction, and whether any of it predicts 505 speed."]},
    {h:"Method"},
    {bul:[["20 BUCS athletes","(21 ± 1.3 yr, 1.78 ± 0.07 m, 74.1 ± 13.6 kg)."],["3D motion capture in Qualisys (200 Hz)","with force plates (2000 Hz), modelled in Visual3D, RFD as ΔForce/ΔTime off the vertical trace."],["Four tasks","CMJ, drop jump, broad jump and a 505, with a best-trial selection criterion."],["Statistics","Pearson/Spearman correlations, t-tests / Mann–Whitney for fast-vs-slow groups, and repeated-measures ANOVA."]]},
    {code:CODE2,codeLabel:"signal processing, force-plate RFD"},
    {img:"diss_qualisys.jpg",cap:"My own data collection: a 44-marker 3D reconstruction in Qualisys Track Manager over the force plate, with live Fx/Fy/Fz traces. The project tree lists the real CMJ, DJ, BJ and 505 trials."},
    {h:"Results"},
    {p:["One jump quality did relate to performance: a significant negative correlation between CMJ peak RFD and 505 time, faster athletes produced force more quickly. But no jump-derived RFD reflected the 505's braking RFD, and the RM-ANOVA showed large, task-specific differences."]},
    {stats:[{f:"r = −0.55",l:"CMJ peak RFD ↔ 505 time (p = 0.014)"},{f:"η²p = 0.77",l:"task-specific difference in RFD"},{f:"n = 20",l:"athletes · 2000 Hz"}]},
    {h:"Conclusion"},
    {callout:{k:"What it means for practice",p:"Eccentric RFD is a non-transferable quality. Profile deceleration with COD-specific force-plate braking metrics, horizontal braking impulse, say, rather than reading it off a jump test."}},
    {note:"Marker feedback: 'a very good introduction… a well-written abstract… methods that would allow for replication.'"},
    {h:"Why it's in a data portfolio"},
    {p:["This is the deepest quantitative work here, high-frequency signal processing, feature engineering (RFD, RSI, impulse) and inferential statistics, carried end to end from collection to a defensible conclusion. Same analytical spine as the GPS work, a notch more rigorous."]}
   ]},

 { kick:"Applied project · Team build", sub:"Real project · built for a team",
   title:"Lacrosse Team App",
   stand:"A real app I built to run a university women's lacrosse squad from one place, schedule, daily check-ins, profiles, matches and a playbook, all wired to a relational data backend.",
   meta:[["Role","Data model, build & rollout"],["Build","AppSheet · Python"],["Users","A full squad, 2025–26 season"],["Screens","5 · relational data"]],
   blocks:[
    {h:"The brief"},
    {p:["A student team runs on scattered group chats and a graveyard of spreadsheets, schedule here, wellness there, drills nowhere. I built one app that pulls it together and, crucially, collects athlete-monitoring data the coaches can actually use. Five things in every player's pocket: this week's sessions, a 30-second daily check-in, their own profile and stats, upcoming matches, and the playbook."]},
    {h:"The app"},
    {p:["Five screens, each reading its own table. The check-in feeds a monitoring log; profiles pull a player's stats and their linked check-in history; the playbook stores drills with diagrams the coaches can pull up pitch-side."]},
    {imgs:[{img:"lax_checkin.png",cap:"Check-in & monitoring"},{img:"lax_profile.png",cap:"Player profile"},{img:"lax_schedule.png",cap:"Training schedule"},{img:"lax_playbook.png",cap:"Coaching playbook"}]},
    {h:"The data model behind it"},
    {p:["An app is only as good as its data design. I modelled the squad as linked tables, Players and Monitoring, related so a profile can show a player's own 16 check-ins. That's the same relational thinking behind any BI model or analytics pipeline."]},
    {imgs:[{img:"lax_data_monitoring.png",cap:"The Monitoring table, soreness, stress, fatigue, sleep, hours, injury notes."},{img:"lax_data_players.png",cap:"The Players table, position, 600 m test, goals, fines. Anonymised to Player A–E."}]},
    {h:"Why it belongs in a data portfolio"},
    {p:["This is where collection meets analysis. The check-in captures exactly the inputs, soreness, stress, fatigue, sleep, that my Recovery project turns into a readiness score. One project gathers the data at source; the other reads it."]},
    {bul:[["Relational data modelling","normalised tables with a real player-to-monitoring link."],["End-to-end delivery","from data design to a working app in players' hands."],["Adoption-first design","a check-in has to be fast, or nobody does it, and then you have no data."]]},
    {callout:{k:"The takeaway",p:"I don't just analyse athlete-monitoring data, I've built the system that collects it, and I understand the model from the first check-in to the final report."}}
   ]},

 { kick:"04 / Readiness & recovery", sub:"Real data · my own WHOOP export",
   title:"Recovery & Readiness Analysis",
   stand:"28 days of my own WHOOP data, recovery, HRV, resting heart rate and sleep, pulled into Python and turned into the readiness view a coach uses to decide who trains hard today.",
   meta:[["Role","Analysis & visualisation"],["Tools","Python · pandas · matplotlib"],["Data","WHOOP export · 28 days · personal"],["Output","Recovery dashboard"]],
   blocks:[
    {h:"The idea"},
    {p:["Readiness answers one question before every session: is this athlete recovered enough to go hard, or should today be dialled back? WHOOP's recovery score is a tidy proxy, it folds HRV, resting heart rate and sleep into a single 0–100%. I exported my own and built the view a performance department actually uses."]},
    {stats:[{f:"61%",l:"mean recovery"},{f:"36 ms",l:"mean HRV"},{f:"94%",l:"sleep performance"},{f:"2",l:"red-recovery days",mag:true}]},
    {h:"My recovery, day by day"},
    {p:["Each bar is one day, colour-coded into WHOOP's zones, green ≥ 67% (good to go), amber 34–66% (moderate), red < 34% (prioritise recovery). Over the month: 11 green, 14 amber, 2 red, about what you'd expect training through a lacrosse season."]},
    {img:"whoop_recovery.png",cap:"Daily recovery across 28 days from my WHOOP export, mean 61% marked. The two red days are exactly the ones I'd have flagged for a lighter session."},
    {h:"What drives it"},
    {p:["Recovery isn't a black box. It tracks two markers pulling in opposite directions on a good day, HRV up, resting heart rate down. Plotting them together shows the signal behind the score."]},
    {img:"whoop_hrv.png",cap:"HRV (ms) and resting heart rate (bpm) across the month, the two inputs a readiness model leans on most."},
    {h:"A female-performance angle"},
    {p:["Most readiness models are cycle-blind, but female physiology shifts across the menstrual cycle, and that's exactly where female-performance tech (WHOOP's cycle features, Orreco's FitrWoman) is heading. My WHOOP journal logs menstruation, so I joined that flag to the recovery data and had a look."]},
    {img:"cycle_recovery.png",cap:"Recovery, HRV, resting heart rate and sleep on menstruating vs non-menstruating days, my own data, one month."},
    {callout:{k:"Read it honestly",p:"Over this month, sleep and recovery dipped a little around menstruation while HRV and resting heart rate actually looked favourable. With five menstruating days that's descriptive, not a finding, but the pipeline is the point. At squad scale, this is exactly the cycle-aware readiness analysis I'd want to run."}},
    {h:"What it shows"},
    {bul:[["A real wearable-data pipeline","parsing a WHOOP export, cleaning dates and metrics, deriving zones in Python."],["Individual baselines","sleep held strong (94% mean), so the dips came from load and HRV, not sleep. That's the read that changes a decision."],["Flagging that matters","the two red days are the actionable bit: the mornings I'd have modified training."]]},
    {callout:{k:"Where it connects",p:"The lacrosse app collects the wellness inputs; the GPS report measures the load. Recovery is where they meet, the read that decides how hard tomorrow gets."}}
   ]},

 { kick:"03 / Load monitoring", sub:"Method demo · synthetic data",
   title:"Training Load Monitor (ACWR)",
   stand:"A longitudinal injury-risk technique a single session can't show off: rolling acute-to-chronic workload ratio across 16 weeks, flagging the athlete-weeks that spike into the danger zone.",
   meta:[["Role","Analysis & monitoring"],["Tools","Python · pandas · matplotlib"],["Method","Rolling 7 : 28-day ratio"],["Data","Simulated squad, 26 athletes"]],
   blocks:[
    {note:"Straight up: ACWR needs months of continuous daily load, and my real GPS sample is one session. So this runs on realistic simulated data to show the method, the code is identical on a real longitudinal feed."},
    {h:"The idea"},
    {p:["The acute-to-chronic workload ratio compares what an athlete's done lately against what they're conditioned for. Ramp it too fast and injury risk climbs; the widely-used sweet spot is 0.8–1.3. The value isn't the formula, it's doing it continuously, per athlete, across a whole squad."]},
    {h:"The monitor"},
    {p:["Each athlete's daily load (session RPE × duration) feeds a rolling 7-day acute and 28-day chronic average; the ratio is tracked against the safe band, and any week that pushes past 1.5 gets flagged red."]},
    {img:"acwr.png",cap:"ACWR across a 16-week block. Green band is the 0.8–1.3 safe range; red points spiked above 1.5 and warrant a deload. Demonstration data."},
    {h:"What it shows"},
    {bul:[["Rolling-window feature engineering","acute and chronic loads with the ramp-up period handled properly."],["Threshold logic and flagging","surfacing the weeks that need a coach's eyes."],["Squad-scale thinking","the same pipeline across 26 athletes, not one."]]},
    {callout:{k:"Result (demo)",p:"3 high-risk weeks flagged across the block against a squad mean ACWR of 1.12, each one a nudge to modify the following week."}}
   ]}
];

/* ---------------- helpers ---------------- */
function esc(s){ return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }
function el(html){ var t=document.createElement("template"); t.innerHTML=html.trim(); return t.content.firstChild; }

/* ---------------- render static lists ---------------- */
function renderProjects(){
  var g=document.getElementById("projgrid"); if(!g) return;
  PROJECTS.forEach(function(p){
    var b=document.createElement("button"); b.className="proj"; b.type="button"; b.setAttribute("data-open",p.i);
    b.innerHTML=
      '<img class="proj-thumb" src="'+A+p.thumb+'" alt="'+esc(p.title)+'">'+
      '<div><div class="proj-meta"><span class="proj-cat">'+esc(p.cat)+'</span><span class="badge">'+esc(p.badge)+'</span></div>'+
      '<h3>'+esc(p.title)+'</h3><p class="proj-blurb">'+esc(p.blurb)+'</p>'+
      '<div class="proj-go">Read the case study →</div></div>';
    g.appendChild(b);
  });
}
function renderCV(){
  var w=document.getElementById("cvwork");
  if(w) CV_WORK.forEach(function(e){
    w.appendChild(el('<div class="cv-entry"><div class="cv-e-top"><span class="cv-e-title">'+esc(e.title)+'</span><span class="cv-e-tool">'+esc(e.tool)+'</span></div><div class="cv-e-desc">'+esc(e.desc)+'</div></div>'));
  });
  var s=document.getElementById("cvskills");
  if(s) CV_SKILLS.forEach(function(e){
    s.appendChild(el('<div class="cv-skill"><div class="cv-s-l">'+esc(e.l)+'</div><div class="cv-s-d">'+esc(e.d)+'</div></div>'));
  });
}
function renderInterests(){
  var g=document.getElementById("intgrid"); if(!g) return;
  INTERESTS.forEach(function(x){
    g.appendChild(el('<div class="int"><div class="int-num">'+x.n+'</div><div class="int-rule2"></div><h3>'+esc(x.t)+'</h3><p>'+esc(x.b)+'</p></div>'));
  });
}

/* ---------------- overlay ---------------- */
var overlay=document.getElementById("overlay"), body=document.getElementById("ovBody");
var ovKick=document.getElementById("ovKick"), ovSub=document.getElementById("ovSub"), ovNext=document.getElementById("ovNext");
var openIdx=null, lastTrigger=null;

function blockHTML(b){
  if(b.h) return '<h3 class="cb-h">'+esc(b.h)+'</h3>';
  if(b.p) return b.p.map(function(t){ return '<p class="cb-p">'+esc(t)+'</p>'; }).join("");
  if(b.bul) return '<div class="cbul">'+b.bul.map(function(r){ return '<div class="row"><b class="i">'+esc(r[0])+'</b> '+esc(r[1]); }).join("</div>")+'</div>';
  if(b.img) return '<figure class="cfig"><img src="'+A+b.img+'" alt=""><figcaption>'+esc(b.cap||"")+'</figcaption></figure>';
  if(b.imgs) return '<div class="cfigs">'+b.imgs.map(function(f){ return '<figure class="cfig"><img src="'+A+f.img+'" alt=""><figcaption>'+esc(f.cap||"")+'</figcaption></figure>'; }).join("")+'</div>';
  if(b.code) return '<div class="code"><div class="code-l">'+esc(b.codeLabel||"")+'</div><pre>'+b.code+'</pre></div>';
  if(b.stats) return '<div class="cstats">'+b.stats.map(function(s){ return '<div><div class="cs-f'+(s.mag?' mag':'')+'">'+esc(s.f)+'</div><div class="cs-l">'+esc(s.l)+'</div></div>'; }).join("")+'</div>';
  if(b.quote) return '<p class="cquote">'+esc(b.quote)+'</p>';
  if(b.callout) return '<div class="callout"><div class="co-k">'+esc(b.callout.k)+'</div><div class="co-p">'+esc(b.callout.p)+'</div></div>';
  if(b.note) return '<p class="demo-note">'+esc(b.note)+'</p>';
  if(b.dash) return '<div id="dashRoot"></div>';
  return "";
}
function renderCase(i){
  var c=CASES[i]; openIdx=i;
  ovKick.textContent=c.kick; ovSub.textContent=c.sub;
  var html='<h2 class="case-title">'+esc(c.title)+'</h2><p class="case-stand">'+esc(c.stand)+'</p>';
  html+='<div class="case-meta">'+c.meta.map(function(m){ return '<div><div class="cm-l">'+esc(m[0])+'</div><div class="cm-v">'+esc(m[1])+'</div></div>'; }).join("")+'</div>';
  html+=c.blocks.map(blockHTML).join("");
  body.innerHTML=html;
  ovNext.textContent="Next: "+CASES[(i+1)%CASES.length].title.replace(/\?$/,"")+" →";
  var dr=document.getElementById("dashRoot"); if(dr) initDash(dr);
}
function openCase(i,trigger){
  lastTrigger=trigger||null; renderCase(i);
  overlay.classList.add("open"); document.body.style.overflow="hidden";
  requestAnimationFrame(function(){ overlay.scrollTop=0; document.getElementById("ovClose").focus(); });
}
function closeCase(){
  overlay.classList.remove("open"); document.body.style.overflow="";
  openIdx=null; if(lastTrigger&&lastTrigger.focus) lastTrigger.focus();
}
document.addEventListener("click",function(e){
  var o=e.target.closest("[data-open]"); if(o){ e.preventDefault(); openCase(+o.getAttribute("data-open"),o); return; }
  var p=e.target.closest(".proj"); if(p){ openCase(+p.getAttribute("data-open"),p); return; }
});
document.getElementById("ovClose").addEventListener("click",closeCase);
document.getElementById("ovBack").addEventListener("click",closeCase);
ovNext.addEventListener("click",function(){ renderCase((openIdx+1)%CASES.length); requestAnimationFrame(function(){ overlay.scrollTop=0; }); });
overlay.addEventListener("click",function(e){ if(e.target===overlay) closeCase(); });
document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&overlay.classList.contains("open")) closeCase(); });

/* ---------------- interactive dashboard ---------------- */
function initDash(root){
  var S=window.SESSION; if(!S){ root.innerHTML='<p class="cb-p">Session data unavailable.</p>'; return; }
  var ZL=["Z1 · walk < 6 km/h","Z2 · jog 6–12 km/h","Z3 · run 12–15 km/h","Z4 · high speed 15–20 km/h","Z5 · sprint > 20 km/h"];
  var phase=null, metric="v", hoverIdx=null;
  var pnames=["Full session"].concat(S.phases.map(function(p){return p.name;}));

  root.innerHTML=
    '<div class="dash"><div class="dash-l">Filter by coaching phase</div><div class="chiprow" id="dPhase"></div>'+
    '<div class="kpis" id="dKpi"></div>'+
    '<div class="chart-head"><div class="chart-title" id="dTitle"></div><div class="chart-right"><span class="readout" id="dRead"></span>'+
      '<div class="chiprow" style="margin-top:0"><button class="chip" data-m="v">Speed</button><button class="chip" data-m="hr">Heart rate</button></div></div></div>'+
    '<div class="chart-plate" id="dPlate"><div class="hsr-label" id="dHsr">High-speed running · 19.8 km/h</div>'+
      '<svg id="dSvg" viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true"></svg></div>'+
    '<div class="axis-row"><span id="dAx0"></span><span id="dAx1"></span></div>'+
    '<div class="zonedist"><div class="dash-l" id="dZoneL"></div><div class="zrows" id="dZones"></div></div>'+
    '<p class="demo-note">Live on the real 60-minute Catapult feed, 258 samples, 10 Hz downsampled. Not a mock-up.</p></div>';

  var dPhase=root.querySelector("#dPhase"), dKpi=root.querySelector("#dKpi"), dSvg=root.querySelector("#dSvg"),
      dTitle=root.querySelector("#dTitle"), dRead=root.querySelector("#dRead"), dHsr=root.querySelector("#dHsr"),
      dAx0=root.querySelector("#dAx0"), dAx1=root.querySelector("#dAx1"), dZones=root.querySelector("#dZones"),
      dZoneL=root.querySelector("#dZoneL"), dPlate=root.querySelector("#dPlate");

  pnames.forEach(function(nm,idx){
    var b=document.createElement("button"); b.className="chip"; b.textContent=nm;
    b.onclick=function(){ phase=(idx===0?null:idx-1); hoverIdx=null; render(); };
    dPhase.appendChild(b);
  });
  root.querySelectorAll("[data-m]").forEach(function(b){ b.onclick=function(){ metric=b.getAttribute("data-m"); hoverIdx=null; render(); }; });

  function series(){ return phase===null?S.series:S.series.filter(function(d){return d.p===phase;}); }
  function scope(){ return phase===null?"full session":S.phases[phase].name; }
  function fmt(n){ return n.toLocaleString(); }

  function render(){
    // chips active
    Array.prototype.forEach.call(dPhase.children,function(c,idx){ c.classList.toggle("on", (idx===0&&phase===null)||(idx-1===phase)); });
    root.querySelectorAll("[data-m]").forEach(function(b){ b.classList.toggle("on", b.getAttribute("data-m")===metric); });
    // KPIs
    var k;
    if(phase===null){ var t=S.total; k=[["Distance",fmt(t.dist)+" m","140 m/min · 60 min"],["Peak speed",t.peak+" km/h","in movement prep, not the game"],["Average HR",t.avg_hr+" bpm","max "+t.max_hr+" bpm"],["Player Load",t.pl+" au","whole session"]]; }
    else { var p=S.phases[phase]; k=[["Distance",fmt(p.dist_m)+" m",Math.round(p.dist_m/p.dur_min)+" m/min · "+p.dur_min+" min"],["Peak speed",p.peak_kmh+" km/h","fastest in this block"],["Average HR",p.avg_hr+" bpm","mean across the block"],["Player Load",Math.round(p.pl)+" au","accumulated in block"]]; }
    dKpi.innerHTML=k.map(function(x){ return '<div class="kpi"><div class="kpi-l">'+x[0]+'</div><div class="kpi-v">'+x[1]+'</div><div class="kpi-n">'+x[2]+'</div></div>'; }).join("");
    // chart
    var ser=series(), n=ser.length;
    var key=metric, lo=metric==="v"?0:70, hi=metric==="v"?22:175;
    function X(i){ return n<2?0:i/(n-1)*1000; }
    function Y(v){ v=Math.max(lo,Math.min(hi,v)); return 12+(1-(v-lo)/(hi-lo))*276; }
    var pts=ser.map(function(d,i){ return X(i).toFixed(1)+","+Y(d[key]).toFixed(1); }).join(" ");
    var svg='';
    [81,150,219].forEach(function(y){ svg+='<line x1="0" y1="'+y+'" x2="1000" y2="'+y+'" stroke="#d7d3d3" stroke-width="1" vector-effect="non-scaling-stroke"/>'; });
    if(metric==="v"){ svg+='<line x1="0" y1="40" x2="1000" y2="40" stroke="#d6006c" stroke-width="1" stroke-dasharray="5 5" vector-effect="non-scaling-stroke"/>'; }
    if(n>1){ svg+='<polygon points="0,296 '+pts+' 1000,296" fill="#cbeeff"/><polyline points="'+pts+'" fill="none" stroke="#0088b0" stroke-width="2" vector-effect="non-scaling-stroke"/>'; }
    if(hoverIdx!==null&&hoverIdx>=0&&hoverIdx<n){ var hx=X(hoverIdx); svg+='<line x1="'+hx+'" y1="12" x2="'+hx+'" y2="288" stroke="#201e1d" stroke-width="1" vector-effect="non-scaling-stroke"/>'; }
    dSvg.innerHTML=svg;
    dHsr.style.display=metric==="v"?"block":"none";
    dTitle.textContent=(metric==="v"?"Speed":"Heart rate")+" over time · "+scope();
    if(hoverIdx!==null&&ser[hoverIdx]){ var d=ser[hoverIdx]; dRead.textContent=d.t.toFixed(1)+" min, "+(metric==="v"?d.v.toFixed(1)+" km/h":d.hr+" bpm"); }
    else dRead.textContent="Hover the chart to read any moment";
    dAx0.textContent=n?ser[0].t.toFixed(0)+" min":""; dAx1.textContent=n?ser[n-1].t.toFixed(0)+" min":"";
    // zones
    var z=phase===null?S.phases.reduce(function(a,p){return p.zones.map(function(v,i){return a[i]+v;});},[0,0,0,0,0]):S.phases[phase].zones;
    var mx=Math.max.apply(null,z)||1;
    dZoneL.textContent="Speed-zone distribution · "+scope();
    dZones.innerHTML=z.map(function(v,i){ var pct=Math.max(v/mx,v>0?0.012:0)*100; return '<div class="zrow"><span class="z-lab">'+ZL[i]+'</span><span class="z-track"><span class="z-bar" style="width:'+pct.toFixed(1)+'%"></span></span><span class="z-val tnum">'+Math.round(v).toLocaleString()+' m</span></div>'; }).join("");
  }
  dPlate.addEventListener("mousemove",function(e){ var ser=series(),n=ser.length; if(n<2){hoverIdx=null;return;} var r=dPlate.getBoundingClientRect(); var ratio=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width)); hoverIdx=Math.round(ratio*(n-1)); render(); });
  dPlate.addEventListener("mouseleave",function(){ hoverIdx=null; render(); });
  render();
}

/* ---------------- init ---------------- */
renderProjects(); renderCV(); renderInterests();
})();
