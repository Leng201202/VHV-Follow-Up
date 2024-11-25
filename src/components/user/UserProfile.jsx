import React, { useEffect, useState } from 'react';
const UserProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Retrieve profile data from localStorage
    const storedProfile = localStorage.getItem('userProfile');
    
    if (storedProfile) {
      // If profile data is found, set it in the state
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  // If profile is not yet fetched, show a loading message
  if (!profile) {
    return <p>Loading profile...</p>;
  }

  // Display the profile data
  return (
    <div className="card shadow-lg mx-auto my-5" style={{ maxWidth: '400px' }}>
      <div className="card-body text-center">
        <h1 className="card-title mb-4">My Profile</h1>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Role:</strong> {profile.role}</p>
      </div>
    </div>


  );
};

export default UserProfile;
