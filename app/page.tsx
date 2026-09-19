"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleAlert, CloudMoon, Compass, Eye, LoaderCircle, MapPin, MoonStar, PackageCheck, QrCode, Sparkles, Telescope } from "lucide-react";
import demo from "../data/demo.json";

type Surface = "deck" | "patio" | "yard" | "balcony";
type Form = { name: string; bortle: string; horizon: string; surface: Surface; rate: string; occupancy: string };
type Result = { score: number; tier: string; darkness: number; horizon: number; readiness: number; kitId: string; upside: number; placement: string; cautions: string[] };

const examples: Record<string, Form> = {
  ridge: { name: "Blue Ridge Cabin", bortle: "3", horizon: "82", surface: "deck", rate: "265", occupancy: "71" },
  desert: { name: "Juniper Desert Casita", bortle: "2", horizon: "91", surface: "patio", rate: "310", occupancy: "77" },
};

function scoreProperty(form: Form): Result {
  const bortle = Number(form.bortle), horizon = Number(form.horizon), rate = Number(form.rate), occupancy = Number(form.occupancy);
  const darkness = Math.round(((10 - bortle) / 9) * 50);
  const horizonPoints = Math.round((horizon / 100) * 30);
  const readiness = { deck: 20, patio: 18, yard: 16, balcony: 10 }[form.surface];
  const score = Math.min(100, darkness + horizonPoints + readiness);
  const kitId = score >= 86 ? "premium" : score >= 72 ? "guided" : "starter";
  const lift = score >= 86 ? 0.1 : score >= 72 ? 0.07 : 0.04;
  const placement = {
    deck: "Use the darkest deck corner, shield path lights below eye level, and point the viewing zone south.",
    patio: "Mark a no-white-light zone on the far edge of the patio with the widest southern view.",
    yard: "Choose firm ground with a wide southern horizon and add a lockable weatherproof gear bin.",
    balcony: "Use secured binoculars only and preserve the building's egress path.",
  }[form.surface];
  const cautions: string[] = [];
  if (bortle >= 6) cautions.push("Bright sky: lead with moon and planet sessions, not deep-sky promises.");
  if (horizon < 50) cautions.push("Obstructed sightlines: verify the viewing window before buying gear.");
  if (form.surface === "balcony") cautions.push("Confirm wind, railing, and house-rule safety before guest use.");
  if (!cautions.length) cautions.push("Confirm weather, wildfire, wildlife, and quiet-hour guidance before launch.");
  return { score, tier: score >= 86 ? "Signature" : score >= 72 ? "Strong" : "Promising", darkness, horizon: horizonPoints, readiness, kitId, upside: Math.round(30 * occupancy / 100 * rate * lift), placement, cautions };
}

export default function Home() {
  const [form, setForm] = useState<Form>(examples.ridge);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [removed, setRemoved] = useState<string[]>([]);
  const [eventIndex, setEventIndex] = useState(0);
  const kit = useMemo(() => result ? demo.kits.find((item) => item.id === result.kitId)! : null, [result]);
  const event = demo.skyEvents[eventIndex];

  function set<K extends keyof Form>(key: K, value: Form[K]) { setForm((current) => ({ ...current, [key]: value })); setResult(null); setError(""); }
  function loadExample(id: keyof typeof examples) { setForm(examples[id]); setResult(null); setRemoved([]); setError(""); }
  function assess(e: React.FormEvent) {
    e.preventDefault();
    const bortle = Number(form.bortle), horizon = Number(form.horizon), rate = Number(form.rate), occupancy = Number(form.occupancy);
    if (form.name.trim().length < 2) return setError("Add a property name with at least 2 characters.");
    if (!Number.isInteger(bortle) || bortle < 1 || bortle > 9) return setError("Bortle class must be a whole number from 1 (darkest) to 9 (brightest).");
    if (!Number.isFinite(horizon) || horizon < 20 || horizon > 100) return setError("Open horizon must be between 20% and 100%.");
    if (!Number.isFinite(rate) || rate < 50 || rate > 5000) return setError("Nightly rate must be between $50 and $5,000.");
    if (!Number.isFinite(occupancy) || occupancy < 10 || occupancy > 100) return setError("Occupancy must be between 10% and 100%.");
    setError(""); setResult(null); setRemoved([]); setLoading(true);
    window.setTimeout(() => { setResult(scoreProperty(form)); setLoading(false); }, 600);
  }
  function toggleItem(item: string) { setRemoved((items) => items.includes(item) ? items.filter((value) => value !== item) : [...items, item]); }

  return <>
    <a className="skip" href="#assessment">Skip to assessment</a>
    <header className="topbar"><a className="brand" href="#top"><MoonStar/>NightNest</a><nav aria-label="Page"><a href="#assessment">Score a property</a><a href="#guest-guide">Guest guide</a></nav><span className="demo"><i/> FICTIONAL DATA · SIMULATED SKY PLAN</span></header>
    <main id="top">
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><Sparkles/> YOUR BEST AMENITY IS ALREADY OVERHEAD</span><h1>Make the night sky<br/><em>part of the stay.</em></h1><p>NightNest scores a rural rental’s sky, specifies a right-sized gear kit, and creates a guest-ready viewing plan—without shipping a mystery telescope to the host.</p><a className="primary" href="#assessment">Score your sky <ArrowRight/></a><div className="proof"><span><Eye/> Transparent score</span><span><PackageCheck/> Exact gear list</span><span><QrCode/> Nightly guest guide</span></div></div>
        <div className="orbit-card" aria-hidden="true"><div className="stars"/><span className="moon">◐</span><div className="orbit-copy"><small>TONIGHT · 9:10 PM</small><strong>Saturn rises southeast</strong><span>Look just above the tree line</span></div><div className="sky-meter"><i style={{width:"82%"}}/><span>Viewing quality 82</span></div></div>
      </section>

      <section className="lab" id="assessment">
        <div className="section-heading"><span>PROPERTY LAB 01</span><h2>Is this sky worth selling?</h2><p>Six facts become a transparent amenity plan. No live map, weather, or booking data is used in this demo.</p></div>
        <div className="lab-grid">
          <form className="panel form-panel" onSubmit={assess}>
            <div className="panel-head"><span><small>HOST INPUT</small><h3>Property snapshot</h3></span><MapPin/></div>
            <div className="examples"><button type="button" onClick={() => loadExample("ridge")}>Blue Ridge example</button><button type="button" onClick={() => loadExample("desert")}>Desert example</button></div>
            <label><span>Property name</span><input aria-label="Property name" value={form.name} onChange={(e) => set("name", e.target.value)} /></label>
            <div className="pair"><label><span>Bortle class <b>1 dark · 9 bright</b></span><input aria-label="Bortle class" inputMode="numeric" value={form.bortle} onChange={(e) => set("bortle", e.target.value)}/></label><label><span>Open horizon <b>percent</b></span><input aria-label="Open horizon" inputMode="numeric" value={form.horizon} onChange={(e) => set("horizon", e.target.value)}/></label></div>
            <fieldset><legend>Viewing area</legend><div className="surface-grid">{(["deck","patio","yard","balcony"] as Surface[]).map((surface) => <button type="button" key={surface} className={form.surface === surface ? "selected" : ""} onClick={() => set("surface", surface)}>{surface}</button>)}</div></fieldset>
            <div className="pair"><label><span>Nightly rate <b>USD</b></span><input aria-label="Nightly rate" inputMode="numeric" value={form.rate} onChange={(e) => set("rate", e.target.value)}/></label><label><span>Occupancy <b>percent</b></span><input aria-label="Occupancy" inputMode="numeric" value={form.occupancy} onChange={(e) => set("occupancy", e.target.value)}/></label></div>
            {error && <div className="error" role="alert"><CircleAlert/>{error}</div>}
            <button className="run" disabled={loading}>{loading ? <><LoaderCircle className="spin"/>Reading the sky…</> : <>Build amenity plan <ArrowRight/></>}</button>
          </form>

          <section className="panel results" aria-live="polite">
            <div className="panel-head"><span><small>ASSESSMENT</small><h3>{result ? `${result.tier} potential` : "Waiting for a property"}</h3></span><Telescope/></div>
            {loading && <div className="empty"><LoaderCircle className="spin"/><h4>Mapping the viewing zone</h4><p>Balancing darkness, horizon, readiness, and economics.</p></div>}
            {!loading && !result && <div className="empty"><CloudMoon/><h4>No sky scored yet.</h4><p>Load a fictional example or enter your own assumptions to see the amenity plan.</p></div>}
            {!loading && result && kit && <div className="result-body">
              <div className="score-row"><div className="score"><strong>{result.score}</strong><span>/ 100<br/>SKY SCORE</span></div><div className="bars"><span>Darkness <i><b style={{width:`${result.darkness * 2}%`}}/></i><em>{result.darkness}/50</em></span><span>Horizon <i><b style={{width:`${result.horizon / 30 * 100}%`}}/></i><em>{result.horizon}/30</em></span><span>Readiness <i><b style={{width:`${result.readiness * 5}%`}}/></i><em>{result.readiness}/20</em></span></div></div>
              <div className="recommendation"><span>RECOMMENDED KIT</span><h4>{kit.name}</h4><p>{result.placement}</p><div className="kit-price"><strong>${kit.price.toLocaleString()}</strong><small>illustrative one-time gear budget</small></div><ul>{kit.items.map((item) => <li key={item} className={removed.includes(item) ? "removed" : ""}><button type="button" aria-label={`${removed.includes(item) ? "Restore" : "Remove"} ${item}`} onClick={() => toggleItem(item)}><Check/>{item}</button></li>)}</ul><small className="custom-note">Customize the demo kit by toggling items. No cart or purchase occurs.</small></div>
              <div className="upside"><span><small>ILLUSTRATIVE MONTHLY RATE UPSIDE</small><strong>+${result.upside}</strong></span><p>Based on current rate × occupancy × a conservative {result.score >= 86 ? "10" : result.score >= 72 ? "7" : "4"}% lift. Not a forecast.</p></div>
              <div className="caution"><CircleAlert/><span><b>Launch check</b>{result.cautions.join(" ")}</span></div>
            </div>}
          </section>
        </div>
      </section>

      <section className="guide" id="guest-guide"><div className="guide-copy"><span>GUEST EXPERIENCE 02</span><h2>A QR guide that changes with the sky.</h2><p>Guests should not need astronomy knowledge. Pick a demo night to preview the single best thing to see, when to step outside, and which way to face.</p><div className="date-buttons">{demo.skyEvents.map((item, index) => <button type="button" key={item.date} className={eventIndex === index ? "active" : ""} onClick={() => setEventIndex(index)}>{new Date(`${item.date}T12:00:00`).toLocaleDateString("en-US", {weekday:"short", month:"short", day:"numeric"})}</button>)}</div></div><article className="guest-card"><div className="guest-brand"><MoonStar/>NIGHTNEST <span>DEMO GUIDE</span></div><small>YOUR SKY TONIGHT</small><h3>{event.title}</h3><p><Compass/>Face {event.direction}</p><div><span><b>Best window</b>{event.window}</span><span><b>Difficulty</b>{event.difficulty}</span></div><footer><QrCode/><span>Fictional guide · Weather not live</span></footer></article></section>

      <section className="business"><span>THE PAID WEDGE</span><h2>Sell the audit before the directory.</h2><p>The first customer is a rural short-term-rental operator with 3–25 properties and no differentiated nighttime amenity. Start with a $349 remote assessment plus affiliate-margin gear plan; earn the right to add recurring guest guides and referral bookings.</p><div><b>$349<small>remote property audit</small></b><b>14 days<small>concierge pilot</small></b><b>3 hosts<small>first validation cohort</small></b></div></section>
    </main>
    <footer className="site-footer"><a className="brand" href="#top"><MoonStar/>NightNest</a><p>Fictional prototype · Simulated scoring and sky events · No live weather, maps, purchasing, or bookings.</p><a href="https://www.ideabrowser.com/hub/ideas/a-stargazing-setup-service-for-rural-airbnb-hosts-64e25990">Public source ↗</a></footer>
  </>;
}
