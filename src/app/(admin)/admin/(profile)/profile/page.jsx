// /app/(admin)/admin/(profile)/profile/page.jsx

'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

function ProfilePage() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    if (session?.user) {
      const { registerusername, email, phoneNumber } = session.user;
      setProfile({
        name: registerusername || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
      });
    }
  }, [session]);

  return (
    <div className="profile-page">
      <h1>Admin Profile</h1>
      <div className="profile-details">
        <div className="profile-item">
          <FaUserCircle size={24} />
          <span><strong>Name:</strong> {profile.name}</span>
        </div>
        <div className="profile-item">
          <FaEnvelope size={24} />
          <span><strong>Email:</strong> {profile.email}</span>
        </div>
        <div className="profile-item">
          <FaPhone size={24} />
          <span><strong>Phone Number:</strong> {profile.phoneNumber}</span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
