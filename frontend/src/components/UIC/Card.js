import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Card(props) {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const visitDetails = () => {
    navigate(`/experiencedetails/${props.id}`);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleUpdate = () => {
    // Navigate to update form (adjust the route if needed)
    navigate(`/updateexperience/${props.id}`);
  };

  const handleDelete = () => {
    // You can integrate API call here later
    alert(`Delete trip with ID: ${props.id}`);
  };

  return (
    <div style={{ marginBottom: "2%", marginTop: "2%", position: "relative" }}>
      <div className="card">
        <div className="card-body">
          {/* 3-dot menu button */}
          <button
            className="btn btn-light"
            onClick={toggleMenu}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            ⋮
          </button>

          {/* Dropdown menu */}
          {showMenu && (
            <div
              className="card p-2"
              style={{
                position: "absolute",
                top: "45px",
                right: "10px",
                zIndex: 10,
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "5px"
              }}
            >
              <button className="btn btn-sm btn-outline-primary mb-1" onClick={handleUpdate}>
                Update
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}

          <h5 className="card-title">{props.title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">{props.tripType}</h6>
          <p className="card-text">{props.description}</p>
          <button className="card-link btn btn-primary" onClick={visitDetails}>
            More Details
          </button>
        </div>
      </div>
    </div>
  );
}


// import React from "react";
// import { useNavigate } from "react-router-dom"


// export default function Card(props) {
//     const navigate = useNavigate()
//     const visitDetails = () => {
//         navigate(`/experiencedetails/${props.id}`)
//     }
//   return (
//     <div style={{ marginBottom: "2%", marginTop: "2%"}}>
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">{props.title}</h5>
//           <h6 class="card-subtitle mb-2 text-body-secondary">{props.tripType}</h6>
//           <p class="card-text">
//             {props.description}
//           </p>
//           <button class="card-link btn btn-primary" onClick={visitDetails}>
//             More Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
