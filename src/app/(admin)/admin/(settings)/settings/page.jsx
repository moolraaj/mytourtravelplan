
'use client';
import Breadcrumb from '@/app/(admin)/_common/Breadcrumb';
import { useSession, update } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function SettingsPage() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '', // Add password to profile state
  });

  const [theme, setTheme] = useState('light');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      const { registerusername, email, phoneNumber, password } = session.user;
      setProfile({
        name: registerusername || '',
        email: email || '',
        phoneNumber: phoneNumber || '',
        password: password || '', // Password will remain empty
      });
    }
  }, [session]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const saveSettings = async () => {
    const response = await fetch(`/api/v1/otpuser/update/${session.user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile), // Send the entire profile object, including password
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
    } else {
      console.error('Failed to save settings:', data.message);
      toast.error(data.message);
    }
  };

  return (
    <div className="settings-page">
      <Breadcrumb path="/admin/settings" />

      <div className="settings-section">
        <h2>Profile</h2>
        <label>
          Name:
          <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
        </label>
        <label>
          Phone Number:
          <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleProfileChange} />
        </label>
      </div>

      <div className="settings-section">
        <h2>Change Password</h2>
        <label>
          New Password:
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={profile.password}
              onChange={handleProfileChange}
              style={{ width: '100%' }}
            />
            <span onClick={togglePasswordVisibility} className="password-toggle" style={{ display: 'flex', alignItems: 'center' }}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>

          </div>
        </label>
      </div>

      <div className="settings-section">
        <h2>Appearance</h2>
        <label>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>

      <button onClick={saveSettings}>Save Changes</button>
    </div>
  );
}

export default SettingsPage;
