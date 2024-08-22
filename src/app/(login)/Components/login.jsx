// import { useState } from 'react';
// import popupbg from '../../../../public/images/popup-bg.png';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';
// import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';

// const Login = () => {
//     const router = useRouter();

//     const [info, setInfo] = useState({
//         orderId: '',
//         phoneNumber: '',
//         registerusername: ''
//     });

//     const [otp, setOtp] = useState('');
//     const [user, setUser] = useState({
//         phoneNumber: '',
//         registerusername: '',
//         channel: 'SMS',
//         otpLength: 6,
//         expiry: 86400,
//     });
//     const [verifyOtp, setVerifyOtp] = useState(false);

//     const closeLogin = () => {
//         router.push(`/`);
//     };

//     const changeHandler = (value, e) => {
//         if (e) {
//             setUser({ ...user, [e.target.name]: e.target.value });
//         } else {
//             setUser({ ...user, phoneNumber: value });
//         }
//     };

//     const handleSendOtp = async (e) => {
//         e.preventDefault();
//         try {
//             const resp = await fetch('/api/v1/send-otp', {
//                 method: 'POST',
//                 body: JSON.stringify(user),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const result = await resp.json();
//             if (result) {
//                 setInfo({
//                     orderId: result.orderId,
//                     phoneNumber: user.phoneNumber,
//                     registerusername: user.registerusername
//                 });
//                 setVerifyOtp(true);
//             } else {
//                 alert(result.error || 'Error sending OTP');
//             }
//         } catch (error) {
//             console.error('Internal server issue:', error);
//         }
//     };

//     const verifyOtpHandler = async (e) => {
//         e.preventDefault();
//         try {
//             const resp = await fetch('/api/v1/verify-otp', {
//                 method: 'POST',
//                 body: JSON.stringify({ orderId: info.orderId, otp, phoneNumber: info.phoneNumber }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             const result = await resp.json();
//             if (result.isOTPVerified) {
//                 await saveUser(info.phoneNumber, user.registerusername);  
//                 await signIn('credentials', {
//                     phoneNumber: info.phoneNumber,
//                     registerusername: user.registerusername,  
//                     callbackUrl: '/',
//                     redirect: true,
//                 });
//             } else {
//                 alert(result.error || 'OTP verification failed');
//             }
//         } catch (error) {
//             console.error('Internal server issue:', error);
//         }
//     };

//     const saveUser = async (phoneNumber, registerusername) => {
//         try {
//             const resp = await fetch('/api/v1/otpuser/login', {
//                 method: 'POST',
//                 body: JSON.stringify({ phoneNumber, registerusername }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });
//             const result = await resp.json();
//             if (result) {
//                 console.log('User saved:', result);
//             } else {
//                 console.log('Error:', result.message);
//             }
//         } catch (error) {
//             console.error('Error saving user:', error);
//         }
//     };

//     return (
//         <div className="login-wrapper">
//             <div className="login-modal" style={{ backgroundImage: `url(${popupbg.src})` }}>
//                 <button className="close-button" onClick={closeLogin}>×</button>
//                 <div className="image-section">
//                     <img src="/images/popup-img.png" alt="Travel" />
//                 </div>
//                 <div className="form-section">
//                     <h2>{verifyOtp ? 'Enter OTP to Verify Your Phone Number' : 'Enter Mobile Number To Personalize Your Trip'}</h2>
//                     <form onSubmit={verifyOtp ? verifyOtpHandler : handleSendOtp}>
//                         {verifyOtp ? (
//                             <div className="input-group">
//                                 <input
//                                     type="number"
//                                     name="otp"
//                                     value={otp}
//                                     placeholder="Enter OTP"
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                             </div>
//                         ) : (
//                             <>
//                                 <div className="input-group">
//                                     <input
//                                         id="registerusername"
//                                         name="registerusername"
//                                         value={user.registerusername}
//                                         onChange={(e) => changeHandler(null, e)}
//                                         placeholder="Enter Your Name"
//                                     />
//                                 </div>
//                                 <div className="input-group">
//                                     <PhoneInput
//                                         id="phone-number"
//                                         defaultCountry="IN"
//                                         value={user.phoneNumber}
//                                         onChange={(value) => changeHandler(value)}
//                                         placeholder="Enter Your Phone Number"
//                                     />
//                                 </div>
//                             </>
//                         )}
//                         <button type="submit">
//                             {verifyOtp ? 'Verify OTP' : 'Get OTP'}
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;




'use client'
import { useState } from 'react';
import popupbg from '../../../../public/images/popup-bg.png';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter();

    const [info, setInfo] = useState({
        orderId: '',
        phoneNumber: '',
        registerusername: ''
    });

    const [otp, setOtp] = useState('');
    const [user, setUser] = useState({
        phoneNumber: '',
        registerusername: '',
        channel: 'SMS',
        otpLength: 6,
        expiry: 86400,
    });
    const [showOtpField, setShowOtpField] = useState(false); // State to handle OTP visibility
    const [isSignup, setIsSignup] = useState(false); // State to determine if showing signup form

    const closeLogin = () => {
        router.push(`/`);
    };

    const changeHandler = (value, e) => {
        if (e) {
            setUser({ ...user, [e.target.name]: e.target.value });
        } else {
            setUser({ ...user, phoneNumber: value });
        }
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();

        // Basic validation for phone number
        if (!user.phoneNumber) {
            toast.error('Phone number is required.');
            return;
        }

        try {
            // Check if user exists in the database
            const userResp = await fetch('/api/v1/otpuser/getallusers');
            const userResult = await userResp.json();
            const existingUser = userResult.users.find(u => u.phoneNumber === user.phoneNumber);

            if (existingUser) {
                // User exists, show OTP input
                setShowOtpField(true);
                setIsSignup(false);
                setInfo({
                    orderId: '',  // Clear orderId as we are not sending OTP yet
                    phoneNumber: user.phoneNumber,
                    registerusername: ''
                });
                toast.success('OTP sent successfully');
            } else {
                // User does not exist, prompt to enter name and show signup fields
                setShowOtpField(false);
                setIsSignup(true);
                setInfo({
                    orderId: '',  // Clear orderId as we are not sending OTP
                    phoneNumber: user.phoneNumber,
                    registerusername: ''
                });
                toast.info('User does not exist. Please sign up first.');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const handleSignupAndSendOtp = async (e) => {
        e.preventDefault();

        // Basic validation for name and phone number
        if (!user.registerusername) {
            toast.error('Name is required for signup.');
            return;
        }
        if (!user.phoneNumber) {
            toast.error('Phone number is required.');
            return;
        }

        try {
            const resp = await fetch('/api/v1/send-otp', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await resp.json();
            if (result.orderId) {
                setInfo({
                    orderId: result.orderId,
                    phoneNumber: user.phoneNumber,
                    registerusername: user.registerusername
                });
                setShowOtpField(true);
                toast.success('OTP sent. Please check your phone.');
            } else {
                toast.error(result.error || 'Error sending OTP');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const verifyOtpHandler = async (e) => {
        e.preventDefault();

        // Validate OTP
        if (!otp) {
            toast.error('OTP is required.');
            return;
        }

        try {
            const resp = await fetch('/api/v1/verify-otp', {
                method: 'POST',
                body: JSON.stringify({ orderId: info.orderId, otp, phoneNumber: info.phoneNumber }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await resp.json();
            if (result.isOTPVerified) {
                if (isSignup) {
                    await saveUser(info.phoneNumber, user.registerusername);
                }
                await signIn('credentials', {
                    phoneNumber: info.phoneNumber,
                    registerusername: user.registerusername,
                    callbackUrl: '/',
                    redirect: true,
                });
            } else {
                toast.error(result.error || 'OTP verification failed');
            }
        } catch (error) {
            console.error('Internal server issue:', error);
        }
    };

    const saveUser = async (phoneNumber, registerusername) => {
        try {
            const resp = await fetch('/api/v1/otpuser/login', {
                method: 'POST',
                body: JSON.stringify({ phoneNumber, registerusername }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const result = await resp.json();
            if (result) {
                console.log('User saved:', result);
            } else {
                console.log('Error:', result.message);
            }
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-modal" style={{ backgroundImage: `url(${popupbg.src})` }}>
                <button className="close-button" onClick={closeLogin}>×</button>
                <div className="image-section">
                    <img src="/images/popup-img.png" alt="Travel" />
                </div>
                <div className="form-section">
                    <h2>{showOtpField ? 'Enter OTP to Verify Your Phone Number' : (isSignup ? 'Sign Up' : 'Enter Mobile Number To Personalize Your Trip')}</h2>
                    <form onSubmit={showOtpField ? verifyOtpHandler : (isSignup ? handleSignupAndSendOtp : handleSendOtp)}>
                        {!showOtpField && (
                            <>
                                {isSignup && (
                                    <>
                                        <div className="input-group">
                                            <input
                                                id="registerusername"
                                                name="registerusername"
                                                value={user.registerusername}
                                                onChange={(e) => changeHandler(null, e)}
                                                placeholder="Enter Your Name"
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="input-group">
                                    <PhoneInput
                                        id="phone-number"
                                        defaultCountry="IN"
                                        value={user.phoneNumber}
                                        onChange={(value) => changeHandler(value)}
                                        placeholder="Enter Your Phone Number"
                                    />
                                </div>
                            </>
                        )}
                        {showOtpField && (
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="otp"
                                    value={otp}
                                    placeholder="Enter OTP"
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </div>
                        )}
                        <button type="submit">
                            {showOtpField ? 'Verify OTP' : (isSignup ? 'Sign Up and Get OTP' : 'Get OTP')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
