"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Contact</p>
        <h1>Write to the desk</h1>
        <p className="lede">Questions about a lot, a shipment, or a document. This form stores nothing on a server yet — it confirms on screen only.</p>
      </div>
      <div className="split" style={{ marginTop: 20 }}>
        {sent ? (
          <div className="panel">
            <h2 style={{ fontSize: 36 }}>Message noted.</h2>
            <p className="muted">In the live store this will reach the desk by email. For now it stays in the browser session.</p>
          </div>
        ) : (
          <form
            className="form panel"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>Name<input className="field" name="name" required /></label>
            <label>Email<input className="field" type="email" name="email" required /></label>
            <label>Topic
              <select className="field" name="topic" defaultValue="Order">
                <option>Order</option>
                <option>Certificate</option>
                <option>Wholesale</option>
                <option>Something else</option>
              </select>
            </label>
            <label>Message<textarea className="field" name="message" rows={5} required /></label>
            <button className="btn" type="submit">Send message</button>
          </form>
        )}
        <aside className="summary">
          <h2>Desk</h2>
          <p>Geneva · Switzerland</p>
          <p className="muted">Research correspondence only. We do not advise on human use, preparation, or dose.</p>
        </aside>
      </div>
    </div>
  );
}
