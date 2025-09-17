import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { getIpDetails } from "../api/examService";
import { ipDetailsMockData } from "../utils/StubData.js";

export default function Instructions() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const userId = getItem("exam_userId");
  const [selectedLanguage, setSelectedLanguage] = useState("hi");

  const [ipDetails, setIpDetails] = useState([]);
  const [familyDetails, setFamilyDetails] = useState([]);
  const [selectedUHID, setSelectedUHID] = useState("");

  const [showHealthModal, setShowHealthModal] = useState(false);
  const [bp, setBp] = useState("");
  const [sugar, setSugar] = useState("");
  const [hb, setHb] = useState("");

  React.useEffect(() => {
    async function fetchDetails() {
      if (userId) {
        try {
          setLoading(true);
          // const response = await getIpDetails(userId);
          const response = ipDetailsMockData;
          console.log(response);
          if(response.employeeIPNo == null){
            alert("No IP found with the given IP. Please enter valid IP No.");
            nav("/login");
          }
          setIpDetails(response);
          setFamilyDetails(response.InsuredPersonFamilyDetails);
        } catch (e) {
          setIpDetails(null);
          setFamilyDetails(null);
        }finally{
          setLoading(false);
        }
      }else
        nav("/");
    }
    fetchDetails();
  }, [userId]);

  function takeVitalSigns() {
    if(!selectedUHID) {
      alert("Please select a family member");
      return;
    }
    setItem("selected_language", selectedLanguage);
    setItem("selected_UHID", selectedUHID);
    setShowHealthModal(true);
  }

  const handleSubmitHealth = () => {
    const healthData = {
      bloodPressure: bp,
      randomBloodSugar: sugar,
      haemoglobin: hb,
    };

    // store in localStorage
    localStorage.setItem("vitals", JSON.stringify(healthData));

    // close modal and redirect to exam
    setShowHealthModal(false);
    nav("/exam");
  };

  // Simulating API fetch (replace with actual API call)
  // React.useEffect(() => {
  //   const response = {
  //     appointmentDate: "13-12-2021 00:00:00",
  //     dateOfregistration: "27-03-2010 00:00:00",
  //     employeeIPNo: "1111111111,8790169068",
  //     InsuredPersonFamilyDetails: [
  //       {
  //         slNo: 0,
  //         relationship: "Dependant father",
  //         name: "test",
  //         uHID: "DUMM.0000011005",
  //         residingState: "Delhi",
  //         sex: "F",
  //       },
  //       {
  //         slNo: 1,
  //         relationship: "Dependant father",
  //         name: "test",
  //         uHID: "DUMM.0000011006",
  //         residingState: "Delhi",
  //         sex: "F",
  //       },
  //       {
  //         slNo: 2,
  //         relationship: "Minor dependant son",
  //         name: "Test2",
  //         uHID: "DUMM.0000000735",
  //         residingState: "Uttar Pradesh",
  //         sex: "M",
  //       },
  //     ],
  //   };

  //   // setFamilyDetails(response.InsuredPersonFamilyDetails);
  //   // setIpDetails(response);
  // }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header></Header>
      <div className="flex-grow flex items-center justify-center">
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
            {/* <span className="text-lg font-semibold">Submitting...</span> */}
          </div>
        ) : (
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <select
              className="border rounded px-3 py-1 text-gray-700"
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              aria-label="Select language"
            >
              <option value="hi">Hindi</option>
              <option value="te">Telugu</option>
              <option value="ta">Tamil</option>
              <option value="mr">Marathi</option>
              <option value="bn">Bengali</option>
              <option value="gu">Gujarati</option>
              <option value="ur">Urdu</option>
              <option value="ml">Malayalam</option>
              <option value="kn">Kannada</option>
              <option value="or">Odia</option>
              <option value="doi">Dogri</option>
              <option value="mai">Maithili</option>
              <option value="sa">Sanskrit</option>
              <option value="pa">Punjabi</option>
              <option value="sd">Sindhi</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-2">Instructions</h2>
          {ipDetails && (
            <div className="mb-6 p-4 bg-gray-100 rounded">
              {/* <h3 className="font-semibold mb-2">IP Details</h3> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-800">
                <div>
                  <span className="font-medium">IP Name:</span> {ipDetails.personalDetails[0].name || "-"}
                </div>
                <div>
                  <span className="font-medium">IP Number:</span> {ipDetails.employeeIPNo || "-"}
                </div>
                <div>
                  <span className="font-medium">UHID:</span> {ipDetails.uHID || "-"}
                </div>
                <div>
                  <span className="font-medium">Sex:</span> {ipDetails.personalDetails[0].sex || "-"}
                </div>
                <div>
                  <span className="font-medium">Date of Birth: </span>
                  {ipDetails.personalDetails[0].dateOfBirth
                  ? ipDetails.personalDetails[0].dateOfBirth.split(" ")[0]
                  : "-"}
                </div>
                {/* <div className="sm:col-span-2">
                  <span className="font-medium">Residential Address:</span> {userDetails.residentialAddress || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium">Mobile number:</span> {userDetails.mobileNumber || "-"}
                </div> */}
              </div>
              <br />
              <table className="w-full border-collapse border border-gray-400 text-gray-700">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">Select</th>
                    <th className="border border-gray-400 px-4 py-2">Name</th>
                    <th className="border border-gray-400 px-4 py-2">Relationship</th>
                    <th className="border border-gray-400 px-4 py-2">Sex</th>
                    <th className="border border-gray-400 px-4 py-2">UHID</th>
                    <th className="border border-gray-400 px-4 py-2">State</th>
                  </tr>
                </thead>
                <tbody>
                  {familyDetails.map((member, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-400 px-4 py-2">
                        <input
                          type="radio"
                          name={`selectedMember_${index}`}
                          value={member.uHID}
                          checked={member.sex === "F" && selectedUHID === member.uHID}
                          // disabled={member.sex !== "F"}
                          onChange={e => {
                            if (member.sex === "F") {
                              setSelectedUHID(e.target.value);
                            } else {
                              alert("Only Female can give the assessment");
                            }
                          }}
                        />
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{member.name}</td>
                      <td className="border border-gray-400 px-4 py-2">{member.relationship}</td>
                      <td className="border border-gray-400 px-4 py-2">{member.sex}</td>
                      <td className="border border-gray-400 px-4 py-2">{member.uHID}</td>
                      <td className="border border-gray-400 px-4 py-2">{member.residingState}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {/* <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              Login with your UserID: <strong>{userId}</strong>
            </li>
            <li>
              Each question has a 20 second timer. Provide voice answer: "YES" or
              "NO".
            </li>
            <li>
              If no answer within 20s, the default answer <strong>NO</strong> will
              be recorded.
            </li>
            <li>
              After speaking, click <strong>Save & Next</strong> to persist your
              answer.
            </li>
            <li>On the last question you will be asked to confirm submission.</li>
          </ol> */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={takeVitalSigns}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div> 
      )}

        {showHealthModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-lg font-bold mb-4">Enter Health Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Blood Pressure</label>
                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="e.g., 120/80"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Random Blood Sugar</label>
                  <input
                    type="number"
                    value={sugar}
                    onChange={(e) => setSugar(e.target.value)}
                    placeholder="mg/dL"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Haemoglobin</label>
                  <input
                    type="number"
                    value={hb}
                    onChange={(e) => setHb(e.target.value)}
                    placeholder="g/dL"
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="px-2 py-2 bg-gray-300 rounded"
                  onClick={() => setShowHealthModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-2 py-2 bg-green-600 text-white rounded"
                  onClick={handleSubmitHealth}
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <Footer></Footer>
    </div>
  );
}
