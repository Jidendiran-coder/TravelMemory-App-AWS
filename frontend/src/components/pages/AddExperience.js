import React, { useState } from "react";
import { baseUrl } from "../../url";
import axios from "axios";

export default function AddExperience() {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    tripName: "",
    startDateOfJourney: "",
    endDateOfJourney: "",
    nameOfHotels: "",
    placesVisited: "",
    totalCost: 0,
    experience: "",
    image: "",
    tripType: "",
    featured: false,
    shortDescription: ""
  });

  const submitForm = async (e) => {
    e.preventDefault(); // ⛔ Stop default form reload
    try {
      setLoading(true);
      console.log("Submitting Form:", formdata);
      const response = await axios.post(`${baseUrl}/trip`, formdata);
      console.log("Success:", response.data);
      alert("Trip added successfully!");
    } catch (error) {
      console.error("Error submitting trip:", error);
      alert("Failed to submit trip.");
    } finally {
      setLoading(false);
    }
  };

  
  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ margin: "2%" }}>
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="tripName" className="form-label">Trip Name</label>
          <input
            type="text"
            className="form-control"
            id="tripName"
            placeholder="Add your Trip Name"
            value={formdata.tripName}
            onChange={(e) => setFormdata({ ...formdata, tripName: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tripDate" className="form-label">Trip Date</label>
          <div className="row">
            <div className="col-6">
              <input type="date" className="form-control" id="startDate"
                value={formdata.startDateOfJourney}
                onChange={(e) => setFormdata({ ...formdata, startDateOfJourney: e.target.value })}
              />
            </div>
            <div className="col-6">
              <input type="date" className="form-control" id="endDate"
                value={formdata.endDateOfJourney}
                onChange={(e) => setFormdata({ ...formdata, endDateOfJourney: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="nameOfHotels" className="form-label">Name of Hotels</label>
          <input
            type="text"
            className="form-control"
            id="nameOfHotels"
            placeholder="Add your Hotel Name"
            value={formdata.nameOfHotels}
            onChange={(e) => setFormdata({ ...formdata, nameOfHotels: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <div className="row">
            <div className="col-6">
              <label htmlFor="tripType" className="form-label">Trip Type</label>
              <select className="form-select" id="tripType"
                value={formdata.tripType}
                onChange={(e) => setFormdata({ ...formdata, tripType: e.target.value })}
              >
                <option value="select">Select One</option>
                <option value="backpacking">Backpacking</option>
                <option value="leisure">Leisure</option>
                <option value="business">Business</option>
              </select>
            </div>
            <div className="col-6">
              <label htmlFor="totalCost" className="form-label">Total Cost</label>
              <input
                type="number"
                className="form-control"
                id="totalCost"
                placeholder="99999"
                value={formdata.totalCost}
                onChange={(e) => setFormdata({ ...formdata, totalCost: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="placesVisited" className="form-label">Places Visited</label>
          <input
            type="text"
            className="form-control"
            id="placesVisited"
            placeholder="Delhi, Paris, London, etc."
            value={formdata.placesVisited}
            onChange={(e) => setFormdata({ ...formdata, placesVisited: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Featured Trip?</label>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="featured"
              id="true"
              value={true}
              onChange={(e) => setFormdata({ ...formdata, featured: JSON.parse(e.target.value) })}
              checked={formdata.featured === true}
            />
            <label className="form-check-label" htmlFor="true">True</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="featured"
              id="false"
              value={false}
              onChange={(e) => setFormdata({ ...formdata, featured: JSON.parse(e.target.value) })}
              checked={formdata.featured === false}
            />
            <label className="form-check-label" htmlFor="false">False</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image Link</label>
          <input
            type="text"
            className="form-control"
            id="image"
            placeholder="http://xyz.com/image.png"
            value={formdata.image}
            onChange={(e) => setFormdata({ ...formdata, image: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="shortDescription" className="form-label">Short Description</label>
          <textarea
            className="form-control"
            id="shortDescription"
            rows="2"
            placeholder="Write Short Description"
            value={formdata.shortDescription}
            onChange={(e) => setFormdata({ ...formdata, shortDescription: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="experience" className="form-label">Experience</label>
          <textarea
            className="form-control"
            id="experience"
            rows="5"
            placeholder="Write Complete Details about your experience in the trip."
            value={formdata.experience}
            onChange={(e) => setFormdata({ ...formdata, experience: e.target.value })}
          />
        </div>

        <div className="mb-3" style={{ textAlign: "center" }}>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}


// import React, { useState } from "react";
// import { baseUrl } from "../../url";
// import axios from "axios";

// export default function AddExperience() {
//   const [loading, setLoading] = useState(false)
//     const [formdata, setFormdata] = useState({
//             tripName: "",
//             startDateOfJourney: "",
//             endDateOfJourney: "",
//             nameOfHotels: "",
//             placesVisited: "",
//             totalCost: 0,
//             experience: "",
//             image: "",
//             tripType: "",
//             featured: false,
//             shortDescription: ""
//     })
//     const submitForm = () => {
//         setLoading(true);
//         console.log(formdata)
//         axios.post(`${baseUrl}/trip`, formdata)
//         setLoading(false)
//     }

//     if(loading==true){
//       return(
//         <div>Loading...</div>
//       )
//     }else{
//       return (
//         <div style={{ margin: "2%" }}>
//           <div class="mb-3">
//             <label for="tripName" class="form-label">
//               Trip Name
//             </label>
//             <input
//               type="text"
//               class="form-control"
//               id="tripName"
//               placeholder="Add your Trip Name"
//               value={formdata.tripName}
//               onChange={(e) => setFormdata({...formdata, tripName: e.target.value})}
//             ></input>
//           </div>
//           <div class="mb-3">
//             <label for="tripDate" class="form-label">
//               Trip Date
//             </label>
//             <div class="row">
//               <div class="col-6">
//                 <input type="date" class="form-control" id="startDate"
//                 value={formdata.startDateOfJourney}
//                 onChange={(e)=> setFormdata({...formdata, startDateOfJourney: e.target.value})}
//                 ></input>
//               </div>
//               <div class="col-6">
//                 <input type="date" class="form-control" id="endDate"
//                 value={formdata.endDateOfJourney}
//                 onChange={(e)=> setFormdata({...formdata, endDateOfJourney: e.target.value})}
//                 ></input>
//               </div>
//             </div>
//           </div>
//           <div class="mb-3">
//             <label for="nameOfHotels" class="form-label">
//               Name of Hotels
//             </label>
//             <input
//               type="text"
//               class="form-control"
//               id="nameOfHotels"
//               placeholder="Add your Hotel Name"
//               value={formdata.nameOfHotels}
//             onChange={(e)=> setFormdata({...formdata, nameOfHotels: e.target.value})}
//             ></input>
//           </div>
//           <div class="mb-3">
//             <div class="row">
//               <div class="col-6">
//                 <label for="nameOfHotels" class="form-label">
//                   Trip Type
//                 </label>
//                 <select class="form-select" id="tripType" aria-label="tripType"
//                 value={formdata.tripType}
//                 onChange={(e)=> setFormdata({...formdata, tripType: e.target.value})}
//                 >
//                   <option selected value="select">
//                     Select One
//                   </option>
//                   <option value="backpacking">Backpacking</option>
//                   <option value="leisure">Leisure</option>
//                   <option value="business">Business</option>
//                 </select>
//               </div>
//               <div class="col-6">
//                 <label for="totalCost" class="form-label">
//                   Total Cost
//                 </label>
//                 <input
//                   type="number"
//                   class="form-control"
//                   id="totalCost"
//                   placeholder="99999"
//                   value={formdata.totalCost}
//                 onChange={(e)=> setFormdata({...formdata, totalCost: e.target.value})}
//                 ></input>
//               </div>
//             </div>
//           </div>
//           <div class="mb-3">
//             <label for="placesVisited" class="form-label">
//               Places Visited
//             </label>
//             <input
//               type="text"
//               class="form-control"
//               id="placesVisited"
//               placeholder="Delhi, Paris, London, etc."
//               value={formdata.placesVisited}
//                 onChange={(e)=> setFormdata({...formdata, placesVisited: e.target.value})}
//             ></input>
//           </div>
//           <div class="mb-3">
//             <label for="featured" class="form-label">
//               Featured Trip?
//             </label>
//             <div class="form-check">
//               <input
//                 type="radio"
//                 class="form-check-input"
//                 id="true"
//                 value={true}
//                 onChange={(e)=> setFormdata({...formdata, featured: JSON.parse(e.target.value)})}
//                 checked={formdata.featured === true}
//               ></input>
//               <label>True</label>
//             </div>
//             <div class="form-check">
//               <input
//                 type="radio"
//                 class="form-check-input"
//                 id="false"
//                 value={false}
//                 onChange={(e)=> setFormdata({...formdata, featured: JSON.parse(e.target.value)})}
//                 checked={formdata.featured === false}
//               ></input>
//               <label>False</label>
//             </div>
//           </div>
//           <div class="mb-3">
//             <label for="image" class="form-label">
//               Image Link
//             </label>
//             <input
//               type="text"
//               class="form-control"
//               id="image"
//               placeholder="http://xyz.com/image.png"
//               value={formdata.image}
//             onChange={(e)=> setFormdata({...formdata, image: e.target.value})}
//             ></input>
//           </div>
//           <div class="mb-3">
//             <label for="shortDescription" class="form-label">
//               Short Description
//             </label>
//             <textarea
//               class="form-control"
//               id="shortDescription"
//               rows="2"
//               placeholder="Write Short Description"
//               value={formdata.shortDescription}
//                 onChange={(e)=> setFormdata({...formdata, shortDescription: e.target.value})}
//             ></textarea>
//           </div>
//           <div class="mb-3">
//             <label for="experience" class="form-label">
//               Experience
//             </label>
//             <textarea
//               class="form-control"
//               id="experience"
//               rows="5"
//               placeholder="Write Complete Details about your experience in the trip."
//               value={formdata.experience}
//                 onChange={(e)=> setFormdata({...formdata, experience: e.target.value})}
//             ></textarea>
//           </div>
//           <div class="mb-3" style={{ textAlign: "center"}}>
//             <button type="submit" class="btn btn-primary" onClick={submitForm}>Submit</button>
//           </div>
//         </div>
//       );
//     }

  
// }
