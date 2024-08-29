'use client'

import { EXPORT_ALL_APIS } from '@/utils/apis/api'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import explorebg from '../../../../assets/home_images/explore-package-bg.png';
import emptyImage from '../../../../assets/home_images/empty.jpg';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import BookingForm from '@/Components/(bookings)/bookings/bookingForm';
import LoginPopup from '@/Components/loginPopup/Components/popup';

function PackagesCatPackages({ slug }) {
  const api = EXPORT_ALL_APIS();
  const [data, setData] = useState([]);
  const [userVerified, setUserVerified] = useState(false);
  const [isopenForm, setIsopenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSinglePackage = async () => {
    try {
      const resp = await api.loadSinglePackagesActivity(slug);
      if (resp && resp.result) {
        setData(resp.result);
      } else {
        console.error('No data found or error in response:', resp);
      }
    } catch (error) {
      console.error('Error fetching single package:', error);
    } finally {
      setLoading(false); // Stop loading regardless of the result
    }
  };

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

  const bookingAndLogin = (pkgId) => {
    if (!userVerified) {
      setIsLogin(true);
    } else {
      setSelectedPackageId(pkgId);
      setIsopenForm(true);
    }
  };

  useEffect(() => {
    fetchSinglePackage();
    checkUserVerification();
  }, [slug]);

  return (
    <div>
      {isopenForm && <BookingForm setIsopenForm={setIsopenForm} packageId={selectedPackageId} />}
      {isLogin && <LoginPopup setIsLogin={setIsLogin} />}
      <div className="explore-packages" style={{ backgroundImage: `url(${explorebg.src})` }}>
        <div className="container card_main_section">
          {loading ? (
            <EmptyPackageComponent />
          ) : data.length === 0 ? (
            <div className="no-results">
              <p>No results found.</p>
            </div>
          ) : (
            data.map((item, index) => (
              <div key={index} className='card_category_section'>
                <div className='card_discount'>
                  <div className="packages">
                    {item.packages.map(pkg =>
                      <div key={pkg._id} className="package">
                        {pkg.images && pkg.images.length > 0 ? (
                          pkg.images.map((image) => (
                            <Image
                              key={image._id}
                              src={`/uploads/${image.name}`}
                              alt={pkg.name || "loading..."}
                              width={333}
                              height={380}
                              className="image"
                            />
                          ))
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
                          <p>{pkg.package_nights} nights / {pkg.package_days} days</p>
                          <p className="price">From ₹ {pkg.package_price || 0}</p>
                          <div className="buttons">
                            <Link href={`/packages/${pkg.title.trim().toLowerCase().replace(/\s+/g, '-').replace(/-+/g, '-')}`}>
                              <button className="details-btn">View Details</button>
                            </Link>
                            <button className="enquiry-btn" onClick={() => bookingAndLogin(pkg._id)}>Book Now</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function EmptyPackageComponent() {
  return (
    <>
    <div className='card_category_section'>
    <div className='card_discount'>
    <div className="packages">
      {Array(6).fill().map((_, index) => (
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
      </div>
      </div>
      </div>
    </>
  );
}

export default PackagesCatPackages;
