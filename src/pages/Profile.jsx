import { useEffect, useState } from "react";
import { format } from 'date-fns';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [alerts] = useState([
    {
      id: 1,
      message: 'Someone reviewed your book taste',
      time: '2 hours ago'
    },
    {
      id: 2,
      message: 'New book recommendation based on your interests',
      time: '1 day ago'
    },
    {
      id: 3,
      message: 'Your reading streak is now 7 days!',
      time: '2 days ago'
    }
  ]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // Format the date from user's createdAt
      const joinDate = user.createdAt 
        ? format(new Date(user.createdAt), 'MMMM yyyy')
        : format(new Date(), 'MMMM yyyy');
      
      setUserData({
        ...user,
        joinDate
      });
    }
  }, []);

  if (!userData) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center dark:text-gray-200">
          Loading profile...
        </div>
      </div>
    );
  }

  // Get initials for the avatar
  const initials = userData.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 bg-primary-500 dark:bg-primary-600 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white font-bold">
              {initials}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">{userData.name}</h1>
            <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Member since {userData.joinDate}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold dark:text-white">Recent Alerts</h2>
        </div>
        <div className="divide-y dark:divide-gray-700">
          {alerts.map(alert => (
            <div key={alert.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-between items-start">
                <p className="text-gray-800 dark:text-gray-200">{alert.message}</p>
                <span className="text-sm text-gray-500 dark:text-gray-400">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
