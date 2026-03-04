import React, { useEffect, useState } from "react";
import "./LoadingScreen.css";

/**
 * Pantalla de carga que se muestra hasta que:
 * - El evento window "load" haya disparado (DOM + recursos listos), Y
 * - Haya transcurrido al menos MIN_MS milisegundos (para que la animación luzca bien)
 */
const MIN_MS = 1800;

const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, MIN_MS - elapsed);

      setTimeout(() => {
        setFadeOut(true);
        // Eliminar del DOM después de que la transición CSS termine
        setTimeout(() => setHidden(true), 650);
      }, remaining);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
    }

    return () => window.removeEventListener("load", dismiss);
  }, []);

  if (hidden) return null;

  return (
    <div className={`loading-overlay${fadeOut ? " fade-out" : ""}`}>
      {/* Logo / marca */}
      <div className="loading-brand">
        <div className="loading-brand-title">
          Medi<span>Core</span>
        </div>
        <div className="loading-brand-subtitle">Portal de Gestión</div>
      </div>

      {/* Animación átomo */}
      <div className="loader">
        <div className="react-star">
          <div className="nucleus"></div>
          <div className="electron electron1"></div>
          <div className="electron electron2"></div>
          <div className="electron electron3"></div>
        </div>
      </div>

      {/* Barra y texto */}
      <div className="loading-bar-wrapper">
        <div className="loading-bar-fill"></div>
      </div>
      <div className="loading-text">Inicializando sistema…</div>
    </div>
  );
};

export default LoadingScreen;
