'use client';

import React, { useEffect, useState } from 'react';
import BookingForm from '@/Components/(bookings)/bookings/bookingForm';
import LoginPopup from '@/Components/loginPopup/Components/popup';
import Image from 'next/image';
import Link from 'next/link';
import { getSession } from 'next-auth/react';
import LoadingBar from '@/app/_common/innerLoader/innerLoader';
import useFetchAllSections from '@/hooks/useLoadApiHook';
import Paginations from '@/app/_common/_paginations/paginations';
import { PER_PAGE_LIMIT } from '@/utils/apis/api';

const Allpackages = () => {
  const [page, setPage] = useState(1);
  const [userVerified, setUserVerified] = useState(false);
  const [isopenForm, setIsopenForm] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);

  const { data, loading } = useFetchAllSections(page, PER_PAGE_LIMIT); 
  const { packages = [], pagination = {} } = data;
  const { totalPackages = 0 } = pagination;

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
    checkUserVerification();
  }, []);

  return (
    <>
    {isopenForm && <BookingForm setIsopenForm={setIsopenForm} packageId={selectedPackageId} />}
      {isLogin && <LoginPopup setIsLogin={setIsLogin} />}

    <div className="container card_main_section">
      <div className="card_discount">
        <div className="packages">

          {
          
          packages===undefined||packages===null ? <LoadingBar/> : packages?.map((pkg, index) => (
            <div key={index} className="package">
              {pkg.images ? pkg.images.map((e) => (
                <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={e.title}
                  width={333} height={380}

                />
              )) : 'No image found'}
              <div className="info">
                <h3>{pkg.title}</h3>
                <p>{pkg.package_nights || 0} nights / {pkg.package_days} days</p>
                <p className="rating">
                  <span className="star">⭐</span> {pkg.rating} ({pkg.reviews})
                </p>
                <p className="price">From {pkg.package_price}</p>
                <div className="buttons">
                  <Link href={`/packages/${pkg.slug.toLowerCase().replace(' ', '-')}`}>
                    <button className="details-btn">View Details</button>
                  </Link>
                  <button className="enquiry-btn" onClick={() => bookingAndLogin(pkg._id)}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {packages && <Paginations
          page={page}
          limit={PER_PAGE_LIMIT}
          totalItems={totalPackages}
          setPage={setPage}
        />}
    </div>
    </>
  );
};

export default Allpackages;
