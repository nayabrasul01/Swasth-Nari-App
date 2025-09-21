import axios from "axios";
import { getItem, removeItem, setItem } from "../utils/localStorage";

// const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:9091";

// const API_BASE = "http://localhost:9090/api";
const API_BASE = "/api";

// export async function startSession(userIdentifier, examId = "exam-uuid-001") {
//   try {
//     const res = await axios.post(`${API_BASE}/sessions`, {
//       userIdentifier,
//       examId,
//     });
//     return res.data;
//   } catch (e) {
//     // fallback dummy data when backend unavailable
//     return {
//       sessionId: `local-${userIdentifier}`,
//       sessionToken: "local-token",
//       exam: {
//         id: examId,
//         title: "Sample Y/N Exam",
//         timePerQuestionSec: 20,
//         totalQuestions: 5,
//       },
//       questions: [
//         { questionId: "q1", position: 1, text: "Do you have a valid ID?", localText: "क्या आपके पास वैध आईडी है?" },
//         { questionId: "q2", position: 2, text: "Are you above 18?", localText: "क्या आप 18 वर्ष से अधिक हैं?" },
//         {
//           questionId: "q3",
//           position: 3,
//           text: "Have you taken this test before?",
//           localText: "क्या आपने पहले यह परीक्षण दिया है?"
//         },
//         { questionId: "q4", position: 4, text: "Do you accept the terms?",
//           localText: "क्या आप शर्तें स्वीकार करते हैं?" },
//         {
//           questionId: "q5",
//           position: 5,
//           text: "Are you available for future tests?",
//           localText: "क्या आप भविष्य के परीक्षणों के लिए उपलब्ध हैं?",
//         },
//       ],
//     };
//   }
// }

export async function login (username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
      },
      credentials: "include",
      body: JSON.stringify({
          username: username,
          password: password
      })
    });
    const response = await res.json();
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    return {
      "message": "Invalid credentials",
      "status": "failure",
    };
  }

  // try {
  //   const queryParams = new URLSearchParams({
  //     username: username,
  //     password: password,
  //   }).toString();

  //   const res = await fetch(`${API_BASE}/auth/login?${queryParams}`, {
  //     method: 'GET',
  //     headers: {
  //     'Content-Type': 'application/json'
  //     }
  //   });
  //   const data = await res.json();
  //   return data;
  // } catch (e) {
  //   throw e;
  // }
};


// export async function saveAnswer(sessionId, token, payload) {
//   try {
//     const res = await axios.post(
//       `${API_BASE}/sessions/${sessionId}/answers`,
//       payload,
//       {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       }
//     );
//     return res.data;
//   } catch (e) {
//     throw e;
//   }
// }

export async function saveAnswer(questionnaireId, questionId, answer, userId) {
  try {
    const token = getItem("jwt");
    const response = await fetch(`${API_BASE}/responses`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        questionnaireId: Number(questionnaireId),
        questionId: Number(questionId),
        userId: userId, // Assuming userId is 1 for this example
        responseValue: String(answer)
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function saveIpVitals(vitalsData) {
  try {
    const token = getItem("jwt"); // If using JWT auth
    const response = await fetch(`${API_BASE}/questionnaires/vitals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}` // remove if not using auth
      },
      body: JSON.stringify(vitalsData)
    });

    if (!response.ok) {
      throw new Error(`Failed to save vitals: ${response.status}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Error saving vitals:", err);
    throw err;
  }
}



// export async function completeSession(sessionId, token, payload) {
//   try {
//     const token = localStorage.getItem("jwt");
//     const res = await axios.post(
//       `${API_BASE}/sessions/${sessionId}/complete`,
//       payload,
//       {
//         headers: token ? { Authorization: `Bearer ${token}` } : {},
//       }
//     );
//     return res.data;
//   } catch (e) {
//     throw e;
//   }
// }


export async function getQuestions(id, selectedLanguage) {
  try {
    const token = getItem("jwt");
    const res = await fetch(`${API_BASE}/questionnaires/${id}/questions/${selectedLanguage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      // helpful error logging
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }

    // parse JSON correctly
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("Error fetching questions:", e);
    throw e;
  }
}


export async function getUserResponses(id, uhid){
  try {
    const token = getItem("jwt");
    const res = await fetch(`${API_BASE}/responses/user/${uhid}/questionnaire/${id}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function validateToken(){
  try {
    const token = getItem("jwt");
    const res = await fetch(`${API_BASE}/auth/validate`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function logout(){
  try {
    const token = getItem("jwt");
    const response = await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.text();
    return data;
  } catch (e) {
    throw e;
  }
}

export async function getIpDetails(id){
  try {
    // const res = await axios.get(`${API_BASE}/auth/ip-details/${id}`);
    const token = getItem("jwt");
    const response = await fetch(`${API_BASE}/questionnaires/getIpDetails`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        IPNumber: id
      })
    });

    const data = await response.json();
    return data;
  } catch (e) {
    throw e;
  }
}

