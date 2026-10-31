"use client";

import { useMemo, useState } from "react";

export default function CalculatorPage() {
  const [mg, setMg] = useState("10");
  const [ml, setMl] = useState("2");

  const result = useMemo(() => {
    const mass = Number(mg);
    const volume = Number(ml);
    if (!Number.isFinite(mass) || !Number.isFinite(volume) || mass <= 0 || volume <= 0) return null;
    const mgPerMl = mass / volume;
    return { mgPerMl, ugPerMl: mgPerMl * 1000 };
  }, [mg, ml]);

  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Laborrechnung</p>
        <h1>Konzentrationsrechner</h1>
        <p className="lede">
          Masse geteilt durch Lösungsmittelvolumen. Das ist ein Laborblatt für eine angesetzte Lösung. Es ist keine Dosierungsanleitung und empfiehlt kein Volumen.
        </p>
      </div>
      <div className="calc" style={{ marginTop: 20 }}>
        <form className="form panel" onSubmit={(event) => event.preventDefault()}>
          <label>
            Peptidmasse (mg)
            <input className="field" inputMode="decimal" value={mg} onChange={(event) => setMg(event.target.value)} />
          </label>
          <label>
            Lösungsvolumen (mL)
            <input className="field" inputMode="decimal" value={ml} onChange={(event) => setMl(event.target.value)} />
          </label>
          <p className="notice">Tragen Sie die gewogene Masse und das angesetzte Volumen ein. Das Ergebnis ist nur die Konzentration.</p>
        </form>
        <div className="result">
          <p className="stage-kicker">Konzentration</p>
          {result ? (
            <>
              <strong>{result.mgPerMl.toLocaleString("de-CH", { maximumFractionDigits: 3 })} mg/mL</strong>
              <p>{result.ugPerMl.toLocaleString("de-CH", { maximumFractionDigits: 1 })} µg/mL</p>
            </>
          ) : (
            <strong>—</strong>
          )}
          <p style={{ marginTop: 16 }}>Für Forschungsrechnungen. Nicht zur Anwendung an Mensch oder Tier.</p>
        </div>
      </div>
    </div>
  );
}
