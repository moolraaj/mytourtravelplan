'use client'
import Image from 'next/image';
import exploretheme from '../app/assets/home_images/theme-destination.png';
import Link from 'next/link';
import emptyImage from '../app/assets/home_images/empty.jpg';
const ExploreDestinations = ({ packagescat }) => {



  // let result = packagescat ? packagescat.result : []

  // let reversedPackagesCat=Array.isArray(result)?[...result].reverse():[]
  console.log('aaaaaaaaaaaaaaaaaa', packagescat)

  return (
    <div className='explore-theme-destination' style={{ backgroundImage: `url(${exploretheme.src})` }}>
      <div className="explore-destinations">
        <h2 className='same_heading'>Explore Destinations By Theme</h2>
        <p>Unlimited Choices | Best Prices | Happy Memories | Hot Deals</p>
        <div className="destinations-container-countries">
          { packagescat === null || packagescat === undefined || packagescat.length === 0 ? (
            <EmptyExplorationDestinations />
          ) : (packagescat?.slice(0, 6)?.map((destination, index) => (
            <div key={index} className="destination">
              <Link href={`/${destination.slug}`}>

                {destination.image && destination.image.length > 0 ? (
                  destination.image.map((e) => (
                    <Image
                      key={e._id}
                      src={`/uploads/${e.name}`}
                      alt='packages_categories'
                      width={100}
                      height={100}
                      className="destination-image"
                      srcset={` ${`/uploads/${e.name}`} 480w, 
                             ${`/uploads/${e.name}`} 800w, 
                            ${`/uploads/${e.name}`} 1200w`}
                      sizes="(max-width: 600px) 480px, 
                           (max-width: 1200px) 800px, 
                           1200px"
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
                <p>{destination.slug}</p>
              </Link>
            </div>
          )))}
        </div>
      </div>
    </div>

  );
};

function EmptyExplorationDestinations() {
  return (
    <>
      <div className="destinations-container-countries">
        {Array(6).fill().map((_, index) => (
          <div key={index} className="destination">
            <Link href="#">
              <div className="skeleton">
                <div className='skeleton_animation'></div>
                <Image
                  src={emptyImage.src}
                  alt='packages_categories'
                  width={100}
                  height={100}
                  className="destination-image"
                />
              </div>
              <p></p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ExploreDestinations;
