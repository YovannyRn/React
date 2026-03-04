import React from "react";
import { Link } from "react-router-dom";

const GlobalDashboard = () => {
  const modules = [
    {
      name: "Quotations",
      link: "/quotation/list",
      icon: "💰",
      responosible: "Yovanny Nunez",
      updatedon: "04-03-2026",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=220&fit=crop&auto=format",
      description:
        "Manage supplier quotations, compare offers and track approval status.",
    },
    {
      name: "Company Process",
      link: "/company-process/list",
      icon: "🏢",
      responosible: "Yovanny Nunez",
      updatedon: "07-04-2025",
      image:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=220&fit=crop&auto=format",
      description:
        "Visualize and manage company workflows with a kanban board.",
    },
    {
      name: "Client Form (Landing)",
      link: "/client-form",
      icon: "📝",
      responosible: "Yovanny Nunez",
      updatedon: "28-05-2025",
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=220&fit=crop&auto=format",
      description:
        "Public landing page where clients submit their service requests.",
    },
    {
      name: "Client Form Management",
      link: "/client-form-management",
      icon: "📊",
      responosible: "Yovanny Nunez",
      updatedon: "28-05-2025",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=220&fit=crop&auto=format",
      description:
        "Review, filter and manage all submitted client forms from the admin panel.",
    },
  ];

  return (
    <div className="container mt-5 mb-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">My Modules</h1>
        <p className="text-muted">
          MediCore · Internship Project · Yovanny Nunez
        </p>
      </div>
      <div className="row g-4 justify-content-center">
        {modules.map((module, index) => (
          <div key={index} className="col-md-6 col-lg-5">
            <div className="card h-100 shadow border-0 rounded-4 overflow-hidden">
              <div
                style={{
                  height: "200px",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={module.image}
                  alt={module.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 14,
                    fontSize: "1.8rem",
                    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4))",
                  }}
                >
                  {module.icon}
                </div>
              </div>
              <div className="card-body px-4 py-3">
                <h5 className="card-title fw-bold mb-1">{module.name}</h5>
                <p
                  className="text-muted small mb-2"
                  style={{ minHeight: "40px" }}
                >
                  {module.description}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div>
                    <span className="badge bg-light text-secondary border me-1">
                      👤 {module.responosible}
                    </span>
                    <span className="badge bg-light text-secondary border">
                      🗓 {module.updatedon}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-white border-0 px-4 pb-4 pt-0">
                <Link to={module.link} className="btn btn-dark w-100 rounded-3">
                  Open {module.name} →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalDashboard;
