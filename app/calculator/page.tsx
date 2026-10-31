"use client";

import { useMemo, useState } from "react";
import { moneyLocale, tx } from "@/lib/region";

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
        <p className="eyebrow">{tx("Laborrechnung", "Laboratory calculation")}</p>
        <h1>{tx("Konzentrationsrechner", "Concentration calculator")}</h1>
        <p className="lede">
          {tx(
            "Masse geteilt durch Lösungsmittelvolumen. Das ist ein Laborblatt für eine angesetzte Lösung. Es ist keine Dosierungsanleitung und empfiehlt kein Volumen.",
            "Mass divided by solvent volume. This is a laboratory sheet for a prepared solution. It is not a dosing instruction and it does not recommend a volume.",
          )}
        </p>
      </div>
      <div className="calc" style={{ marginTop: 20 }}>
        <form className="form panel" onSubmit={(event) => event.preventDefault()}>
          <label>
            {tx("Peptidmasse (mg)", "Peptide mass (mg)")}
            <input className="field" inputMode="decimal" value={mg} onChange={(event) => setMg(event.target.value)} />
          </label>
          <label>
            {tx("Lösungsvolumen (mL)", "Solution volume (mL)")}
            <input className="field" inputMode="decimal" value={ml} onChange={(event) => setMl(event.target.value)} />
          </label>
          <p className="notice">{tx("Tragen Sie die gewogene Masse und das angesetzte Volumen ein. Das Ergebnis ist nur die Konzentration.", "Enter the weighed mass and the prepared volume. The result is only the concentration.")}</p>
        </form>
        <div className="result">
          <p className="stage-kicker">{tx("Konzentration", "Concentration")}</p>
          {result ? (
            <>
              <strong>{result.mgPerMl.toLocaleString(moneyLocale, { maximumFractionDigits: 3 })} mg/mL</strong>
              <p>{result.ugPerMl.toLocaleString(moneyLocale, { maximumFractionDigits: 1 })} µg/mL</p>
            </>
          ) : (
            <strong>—</strong>
          )}
          <p style={{ marginTop: 16 }}>{tx("Für Forschungsrechnungen. Nicht zur Anwendung an Mensch oder Tier.", "For research calculations. Not for use in people or animals.")}</p>
        </div>
      </div>
    </div>
  );
}
