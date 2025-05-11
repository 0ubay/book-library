import { useEffect, useState } from "react";

function Profile() {
  const [alerts, setAlerts] = useState([
    { id: 1, from: "Alice", comment: "Loved your fantasy picks!" },
    { id: 2, from: "Bob", comment: "Not a fan of thrillers but your list rocks." },
  ]);

  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    favoriteGenre: "Fantasy",
  });

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">👤 Profile</h1>

      <div className="bg-white shadow p-4 rounded mb-6">
        <h2 className="text-lg font-semibold mb-2">User Info</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Favorite Genre:</strong> {user.favoriteGenre}</p>
      </div>

      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Review Alerts</h2>
        <ul className="space-y-2">
          {alerts.map((alert) => (
            <li key={alert.id} className="bg-gray-100 p-2 rounded">
              <strong>{alert.from}:</strong> {alert.comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
