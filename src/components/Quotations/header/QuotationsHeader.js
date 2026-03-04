import React from "react";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DehazeIcon from "@mui/icons-material/Dehaze";
import SearchIcon from "@mui/icons-material/Search";

const QuotationsHeader = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-start">
          <DehazeIcon
            className="text-muted me-3"
            style={{ fontSize: "1.5rem" }}
          />
          <span className="navbar-brand mb-0 h1">MediCore</span>
        </div>

        <div className="flex-grow-1 mx-5">
          <div className="position-relative w-50">
            <input
              type="text"
              className="form-control w-100 ps-5 bg-light"
              placeholder="Search"
              style={{
                borderRadius: "10px",
                backgroundColor: "#f5f5dc !important",
                border: "1px solid #ccc",
              }}
            />
            <SearchIcon
              className="text-muted position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ fontSize: "1.5rem" }}
            />
          </div>
        </div>

        <div className="btn btn-link text-decoration-none">
          <PeopleOutlineIcon
            className="text-muted"
            style={{ fontSize: "1.5rem" }}
          />
        </div>

        <div className="btn btn-link text-decoration-none">
          <NotificationsNoneIcon
            className="text-muted"
            style={{ fontSize: "1.5rem" }}
          />
        </div>

        <div className="d-flex align-items-center">
          <i className="bi bi-people fs-5 me-3"></i>
          <i className="bi bi-bell fs-5 me-3"></i>

          <div className="d-flex align-items-center">
            <span className="me-5">HELLO {/* User Name */}</span>
            <img
              src=""
              alt="User"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default QuotationsHeader;
