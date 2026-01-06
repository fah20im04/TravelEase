import React, { useContext, useState } from "react";
import { AuthContext } from "../Auth/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    setEditing(false);
    alert("Profile updated (frontend only)");
  };

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-xl shadow bg-white text-black">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <img
          src={photo || "https://i.pravatar.cc/100"}
          alt="profile"
          className="w-54 h-54 rounded-4xl object-cover border border-gray-300"
        />

        {editing && (
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            placeholder="Photo URL"
            className="border border-gray-300 text-black bg-white px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>

      {/* Info */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 text-black bg-white px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <p className="font-medium">{name || "No name set"}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <p className="font-medium">{user?.email}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-4">
        {editing ? (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
