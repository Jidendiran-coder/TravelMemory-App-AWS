import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../url";

export default function ExperienceDetails(props) {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/trip/${id}`);
      setData(res.data);
      setEditedData(res.data); // Initialize edit form with current data
    } catch (err) {
      setError("Failed to load trip details");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${baseUrl}/trip/${id}`, editedData);
      setData(response.data);
      setSuccess("Trip updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Failed to update trip");
      console.error("Update error:", err);
    }
  };

  if (!data) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div style={{ margin: "2%" }}>
      {/* Error/Success Messages */}
      {error && (
        <div className="alert alert-danger">
          {error}
          <button 
            className="btn-close float-end" 
            onClick={() => setError(null)}
          ></button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          {success}
        </div>
      )}

      {/* Edit/Save Buttons */}
      <div className="text-end mb-3">
        {!isEditing ? (
          <button 
            className="btn btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Update Experience
          </button>
        ) : (
          <div>
            <button 
              className="btn btn-success me-2"
              onClick={handleUpdate}
            >
              Save Changes
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 text-center">
          {isEditing ? (
            <input
              type="text"
              className="form-control"
              name="tripName"
              value={editedData.tripName || ""}
              onChange={handleInputChange}
            />
          ) : (
            <h1>{data.tripName}</h1>
          )}
        </div>
        <div className="col-2"></div>
      </div>

      <div className="row mt-4">
        <div className="col-2"></div>
        <div className="col-8 text-center">
          <img src={data.image} alt="Trip" className="img-fluid" />
        </div>
        <div className="col-2"></div>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 border bg-light p-3">
            <div className="row mb-2">
              <div className="col-12">
                Name of Hotel: {isEditing ? (
                  <input
                    type="text"
                    className="form-control"
                    name="nameOfHotels"
                    value={editedData.nameOfHotels || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.nameOfHotels
                )}
              </div>
            </div>
            
            {/* Add similar editable fields for other properties */}
            <div className="row mb-2">
              <div className="col-6">
                Start Date: {isEditing ? (
                  <input
                    type="date"
                    className="form-control"
                    name="startDateOfJourney"
                    value={editedData.startDateOfJourney || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.startDateOfJourney
                )}
              </div>
              <div className="col-6">
                End Date: {isEditing ? (
                  <input
                    type="date"
                    className="form-control"
                    name="endDateOfJourney"
                    value={editedData.endDateOfJourney || ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  data.endDateOfJourney
                )}
              </div>
            </div>

            {/* Add more fields as needed following the same pattern */}
            
          </div>
          <div className="col-3"></div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-1"></div>
        <div className="col-10" style={{ textAlign: "justify" }}>
          {isEditing ? (
            <textarea
              className="form-control"
              rows="5"
              name="experience"
              value={editedData.experience || ""}
              onChange={handleInputChange}
            />
          ) : (
            data.experience
          )}
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { baseUrl } from "../../url";

// export default function ExperienceDetails(props) {
//   const { id } = useParams()
//   const [data, setData] = useState()

//   useEffect(()=>{
//     axios.get(`${baseUrl}/trip/${id}`)
//     .then((res) => {
//       console.log(res.data)
//       setData(res.data)
//     })
//   },[id])
//   if(data){
//     return (
//       <div style={{ margin: "2%" }}>
//         <div class="row">
//           <div class="col-2"></div>
//           <div class="col-8" style={{ textAlign: "center" }}>
//             <h1>{data.tripName}</h1>
//           </div>
//           <div class="col-2"></div>
//         </div>
  
//         <div class="row">
//           <div class="col-2"></div>
//           <div class="col-8" style={{ textAlign: "center" }}>
//             <img
//               src={data.image}
//               alt="Tag"
//             ></img>
//           </div>
//           <div class="col-2"></div>
//         </div>
//         <br></br>
  
//         <div class="container">
//           <div class="row">
//             <div class="col-3"></div>
//             <div class="col-6 border bg-light">
//               <div class="row">
//                 <div class="col-12">Name of Hotel: {data.nameOfHotels}</div>
//               </div>
//               <div class="row">
//                 <div class="col-6">Start Date: {data.startDateOfJourney}</div>
//                 <div class="col-6">End Date: {data.endDateOfJourney}</div>
//               </div>
//               <div class="row">
//                 <div class="col-12">Places Visited: {data.placesVisited}</div>
//               </div>
//               <div class="row">
//                 <div class="col-12">Total Cost: {data.totalCost}</div>
//               </div>
//               <div class="row">
//                 <div class="col-12">Trip Type: {data.tripType}</div>
//               </div>
//             </div>
//             <div class="col-3"></div>
//           </div>
//         </div>
//         <br></br>
//         <div class="row">
//           <div class="col-1"></div>
//           <div class="col-10" style={{ textAlign: "justify"}}>
//           {data.experience}
//           </div>
//           <div class="col-1"></div>
//         </div>
//       </div>
//     );
//   }else{
//     return(<>
//     Loading...
//     </>)
//   }
  
// }
