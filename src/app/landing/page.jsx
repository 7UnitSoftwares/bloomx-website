import React from "react";

export default function Landing() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#F2F2F2" }}>
      <img src="/logo/logo.png" alt="Bloom Logo" style={{ maxWidth: 180, marginBottom: 32 }} />
      <h1 style={{ color: "#00A59B", fontSize: 36, fontWeight: 700, marginBottom: 16 }}>Bloom sta arrivando!</h1>
      <p style={{ color: "#373737", fontSize: 20, maxWidth: 500, textAlign: "center", marginBottom: 32 }}>
        Siamo un centro di pedagogia, un'oasi di crescita per tutte le età.<br />
        Offriamo esperienze trasformative di apprendimento, co-creazione e comunità in uno spazio sicuro e accogliente.<br /><br />
        <b>Sito in costruzione.</b>
      </p>
      <div style={{ color: "#00A59B", fontSize: 18, marginBottom: 8 }}>
        Per informazioni: <a href="mailto:info@bloom-bi.it" style={{ color: "#00A59B", textDecoration: "underline" }}>info@bloom-bi.it</a>
      </div>
      <div style={{ color: "#00A59B", fontSize: 18 }}>
        Telefono: <a href="tel:+393382256056" style={{ color: "#00A59B", textDecoration: "underline" }}>+39 3382256056</a>
      </div>
    </div>
  );
} 