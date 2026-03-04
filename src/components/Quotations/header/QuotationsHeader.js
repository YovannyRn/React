import React, { useState } from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";

const QuotationsHeader = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-light bg-light px-3 px-md-4 border-bottom"
      style={{ minHeight: "56px" }}
    >
      <div className="container-fluid d-flex align-items-center gap-2">
        {/* Logo */}
        <div className="d-flex align-items-center flex-shrink-0">
          <DehazeIcon
            className="text-muted me-2"
            style={{ fontSize: "1.4rem", cursor: "pointer" }}
          />
          <span
            className="navbar-brand mb-0 fw-bold"
            style={{ fontSize: "1.1rem" }}
          >
            MediCore
          </span>
        </div>

        {/* Buscador desktop: visible desde md */}
        <div className="d-none d-md-flex flex-grow-1 mx-3 mx-lg-5 position-relative">
          <input
            type="text"
            className="form-control ps-5 bg-light"
            placeholder="Search"
            style={{
              borderRadius: "20px",
              border: "1px solid #ccc",
              maxWidth: "500px",
              width: "100%",
            }}
          />
          <SearchIcon
            className="text-muted position-absolute top-50 translate-middle-y"
            style={{ fontSize: "1.3rem", left: "14px" }}
          />
        </div>

        {/* Spacer para empujar iconos a la derecha en desktop */}
        <div className="d-md-none flex-grow-1" />

        {/* Buscador móvil expandible */}
        {searchOpen && (
          <div className="d-md-none position-relative flex-grow-1">
            <input
              type="text"
              className="form-control ps-5 bg-light"
              placeholder="Search"
              autoFocus
              style={{ borderRadius: "20px", border: "1px solid #ccc" }}
            />
            <SearchIcon
              className="text-muted position-absolute top-50 translate-middle-y"
              style={{ fontSize: "1.3rem", left: "14px" }}
            />
          </div>
        )}

        {/* Icono lupa en móvil */}
        <button
          className="d-flex d-md-none btn btn-link text-muted p-1"
          onClick={() => setSearchOpen(!searchOpen)}
          title="Buscar"
        >
          <SearchIcon style={{ fontSize: "1.4rem" }} />
        </button>

        {/* Iconos de la derecha */}
        <div className="d-flex align-items-center gap-1 flex-shrink-0">
          <button className="btn btn-link text-muted p-1" title="Usuarios">
            <PeopleOutlineIcon style={{ fontSize: "1.4rem" }} />
          </button>
          <button
            className="btn btn-link text-muted p-1"
            title="Notificaciones"
          >
            <NotificationsNoneIcon style={{ fontSize: "1.4rem" }} />
          </button>

          {/* Usuario */}
          <div className="d-flex align-items-center ms-1 gap-2">
            <span
              className="d-none d-sm-inline fw-semibold text-dark"
              style={{ fontSize: "0.9rem", letterSpacing: "0.03em" }}
            >
              HELLO
            </span>
            <div
              className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white"
              style={{
                width: "32px",
                height: "32px",
                fontSize: "0.75rem",
                fontWeight: 700,
              }}
            >
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QuotationsHeader;
