import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { getItem } from "../utils/localStorage";
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { getIpDetails } from "../api/examService";

export default function Instructions() {
  const nav = useNavigate();
  const userId = getItem("exam_userId") || "";
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [userDetails, setUserDetails] = React.useState(null);

  React.useEffect(() => {
    async function fetchDetails() {
      if (userId) {
        try {
          const details = await getIpDetails(userId);
          setUserDetails(details);
        } catch (e) {
          setUserDetails(null);
        }
      }
    }
    fetchDetails();
  }, [userId]);
  function start() {
    setItem("selected_language", selectedLanguage);
    nav("/exam");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header></Header>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow">
          <div className="flex justify-between items-center mb-4">
            <div></div>
            <select
              className="border rounded px-3 py-1 text-gray-700"
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
              aria-label="Select language"
            >
              <option value="hindi">Hindi</option>
              <option value="telugu">Telugu</option>
              <option value="tamil">Tamil</option>
              <option value="marathi">Marathi</option>
              <option value="bengali">Bengali</option>
              <option value="gujarati">Gujarati</option>
            </select>
          </div>
          <h2 className="text-2xl font-bold mb-2">Instructions</h2>
          {userDetails && (
            <div className="mb-6 p-4 bg-gray-100 rounded">
              <h3 className="font-semibold mb-2">IP Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-800">
                <div>
                  <span className="font-medium">Name:</span> {userDetails.name || "-"}
                </div>
                <div>
                  <span className="font-medium">IP Number:</span> {userDetails.ipNumber || "-"}
                </div>
                <div>
                  <span className="font-medium">Age:</span> {userDetails.age || "-"}
                </div>
                <div>
                  <span className="font-medium">Sex:</span> {userDetails.sex || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium">Residential Address:</span> {userDetails.residentialAddress || "-"}
                </div>
                <div className="sm:col-span-2">
                  <span className="font-medium">Mobile number:</span> {userDetails.mobileNumber || "-"}
                </div>
              </div>
            </div>
          )}
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            {/* <li>
              Login with your UserID: <strong>{userId}</strong>
            </li> */}
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
          </ol>
          <div className="mt-6 flex gap-3">
            <button
              onClick={start}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
