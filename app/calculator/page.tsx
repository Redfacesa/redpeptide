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
        <p className="eyebrow">Bench math</p>
        <h1>Concentration calculator</h1>
        <p className="lede">
          Mass divided by solvent volume. This is a laboratory worksheet for a prepared solution. It is not a dosing guide and it does not recommend a volume.
        </p>
      </div>
      <div className="calc" style={{ marginTop: 20 }}>
        <form className="form panel" onSubmit={(event) => event.preventDefault()}>
          <label>
            Peptide mass (mg)
            <input className="field" inputMode="decimal" value={mg} onChange={(event) => setMg(event.target.value)} />
          </label>
          <label>
            Solution volume (mL)
            <input className="field" inputMode="decimal" value={ml} onChange={(event) => setMl(event.target.value)} />
          </label>
          <p className="notice">Enter the mass you weighed and the volume you prepared. The result is concentration only.</p>
        </form>
        <div className="result">
          <p className="stage-kicker">Concentration</p>
          {result ? (
            <>
              <strong>{result.mgPerMl.toLocaleString("en-GB", { maximumFractionDigits: 3 })} mg/mL</strong>
              <p>{result.ugPerMl.toLocaleString("en-GB", { maximumFractionDigits: 1 })} µg/mL</p>
            </>
          ) : (
            <strong>—</strong>
          )}
          <p style={{ marginTop: 16 }}>For research calculations. Not for human or veterinary administration.</p>
        </div>
      </div>
    </div>
  );
}
