'use client';
import Image from 'next/image';
import Link from 'next/link';
import discountc from '../app/assets/home_images/discountcards.png';
import explorebg from '../app/assets/home_images/explore-package-bg.png';
import emptyImage from '../app/assets/home_images/empty.jpg';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react'; 
import BookingForm from './(bookings)/bookings/bookingForm';
import LoginPopup from './loginPopup/Components/popup';

const BestSellingPackages = ({ packages, loading }) => {
  const [userVerified, setUserVerified] = useState(false);
  const [isopenForm, setIsopenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const checkUserVerification = async () => {
    try {
      const session = await getSession();
      if (session && session.user) {
        setUserVerified(session.user.role === 'user');
      } else {
        setUserVerified(false);
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    }
  };

  useEffect(() => {
    checkUserVerification();
  }, []);

  const bookingAndLogin = (pkgId) => {
    if (!userVerified) {
      setIsLogin(true);
    } else {
      setSelectedPackageId(pkgId);
      setIsopenForm(true);
    }
  };

  // Ensure result is an array; if not, use an empty array as a fallback
  // let result = Array.isArray(packages?.result) ? packages.result : [];
 

  return (
    <>
      {isopenForm && <BookingForm setIsopenForm={setIsopenForm} packageId={selectedPackageId} />}
      {isLogin && <LoginPopup setIsLogin={setIsLogin} />}

      <div className="explore-packages" style={{ backgroundImage: `url(${explorebg.src})` }}>
        <div className="container card_main_section">
          <div className="header_best_selling">
            <h2 className='same_heading'>Explore Best Selling Packages</h2>
            <div className='link_heading'>
              <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
              <Link href="/packages"><span className="view-all">View All Packages</span></Link>
            </div>
          </div>

          <div className='card_discount'>
            <div className="packages">
              {packages.length === 0 ? (
                <EmptyPackageComponent />
              ) : (
                packages?.slice(0, 4)?.map((pkg, index) => (
                  <div key={pkg._id} className="package">
                    {pkg.images && pkg.images.length > 0 ? (
                      <Image
                        key={index}
                        src={`/uploads/${pkg.images[0].name}`} // Only displaying the first image
                        alt={pkg.name || "loading..."}
                        width={333}
                        height={380}
                        className="image"
                      />
                    ) : (
                      <Image
                        src={emptyImage.src}
                        alt="No Image Available"
                        width={333}
                        height={380}
                        className="image"
                      />
                    )}
                    <div className="info">
                      <h3>{pkg.title}</h3>
                      <p>{pkg.package_nights} nights / {pkg.package_days} days | {pkg.customizable}</p>
                      <p className="rating">
                        <span className="star">★ {pkg.rating}</span> ({pkg.reviews})
                      </p>
                      <p className="price">From ₹ {pkg.package_price || 0}</p>
                      <div className="buttons">
                        <Link href={`/packages/${pkg.slug}`}><button className="details-btn">View Details</button></Link>
                        <button className="enquiry-btn" onClick={() => bookingAndLogin(pkg._id)}>Book Now</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className='discount_section' style={{
              backgroundImage: `url(${discountc.src})`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}>
              <span>Up to 40% Discount!</span>
              <button>Discover More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

function EmptyPackageComponent() {
  return (
    <>
      {Array(4).fill().map((_, index) => (
        <div key={index} className="package">
           <div className="skeleton">
           <div className='skeleton_animation'></div>
          <Image
            src={emptyImage.src}
            alt="Loading"
            width={333}
            height={380}
            className="image"
          />
          </div>
        </div>
      ))}
    </>
  );
}

export default BestSellingPackages;
