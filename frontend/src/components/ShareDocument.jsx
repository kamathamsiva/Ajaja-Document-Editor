import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/components.css";

function ShareDocument({ documentId }) {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/auth/users");

      // Exclude the currently logged-in user
      const filteredUsers = res.data.filter(
        (user) => user.id !== currentUser.id
      );

      setUsers(filteredUsers);
    } catch (err) {
      console.error(err);
      alert("Failed to load users");
    }
  };

  const share = async () => {
    if (!userId) {
      alert("Please select a user");
      return;
    }

    try {
      await api.post("/documents/share", {
        documentId,
        userId: Number(userId),
      });

      alert("Document shared successfully!");
      setUserId("");
    } catch (err) {
      console.error(err);
      alert("Sharing failed");
    }
  };

  return (
    <div className="share-container">
      <select
        className="share-select"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Select User</option>

        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.username} ({user.email})
          </option>
        ))}
      </select>

      <button
        className="share-btn"
        onClick={share}
      >
        Share Document
      </button>
    </div>
  );
}

export default ShareDocument;