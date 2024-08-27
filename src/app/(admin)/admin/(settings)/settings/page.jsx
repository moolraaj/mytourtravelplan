// 'use client'
// import Breadcrumb from '@/app/(admin)/_common/Breadcrumb';
// import { useSession } from 'next-auth/react';
// import React, { useState } from 'react';

// function SettingsPage() {

//   const {data: session} = useSession();
//     console.log('session', session.user);


//   const [profile, setProfile] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//   });

//   const [password, setPassword] = useState('');
//   const [theme, setTheme] = useState('light');

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({ ...profile, [name]: value });
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleThemeChange = (e) => {
//     setTheme(e.target.value);
//   };

//   const saveSettings = () => {
//     // Handle save settings logic here
//     console.log('Settings saved:', { profile, password, theme });
//   };

//   return (
//     <div className="settings-page">
//       <Breadcrumb path="/admin/settings"/>

//       <div className="settings-section">
//         <h2>Profile</h2>
//         <label>
//           Name:
//           <input type="text" name="name" value={profile.name} onChange={handleProfileChange} />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" value={profile.email} onChange={handleProfileChange} />
//         </label>
//         <label>
//           Phone Number:
//           <input type="tel" name="phoneNumber" value={profile.phoneNumber} onChange={handleProfileChange} />
//         </label>
//       </div>

//       <div className="settings-section">
//         <h2>Change Password</h2>
//         <label>
//           New Password:
//           <input type="password" value={password} onChange={handlePasswordChange} />
//         </label>
//       </div>

//       <div className="settings-section">
//         <h2>Appearance</h2>
//         <label>
//           Theme:
//           <select value={theme} onChange={handleThemeChange}>
//             <option value="light">Light</option>
//             <option value="dark">Dark</option>
//           </select>
//         </label>
//       </div>

//       <button onClick={saveSettings}>Save Changes</button>
//     </div>
//   );
// }

// export default SettingsPage;



'use client';
import Breadcrumb from '@/app/(admin)/_common/Breadcrumb';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

function SettingsPage() {
  const { data: session } = useSession();
  
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });
  const [password, setPassword] = useState('');
  const [theme, setTheme] = useState('light');

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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const saveSettings = async () => {
    const response = await fetch('/api/v1/otpuser/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...profile,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Settings saved:', data);
      // You can also display a success message here
    } else {
      console.error('Failed to save settings:', data.message);
      // You can also display an error message here
    }
  };

  return (
    <div className="settings-page">
      <Breadcrumb path="/admin/settings"/>

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
          <input type="password" value={password} onChange={handlePasswordChange} />
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
