
import Link from 'next/link';
import Image from 'next/image';
import trending from '../../assets/home_images/trending.png';
import ribbon from '../../assets/home_images/ribbon.png';
import fishbg from '../../assets/home_images/fish-bg.png';
import emptyImage from '../../assets/empty.jpg';

const CountryResults = ({ results }) => {

    let reversedCountries = Array.isArray(results) ? [...results].reverse() : [];

    return (
      <>
       <div className="results-section">
      <h2>Countires:</h2>
      <div className="topdestination container inner-w-container">
        <div className="destinations expert-travel">
          {reversedCountries===null||reversedCountries===undefined?(''):(reversedCountries.slice(0,8).map((country, index) => (
            <Link className="destination" href={`/country/${country.slug.toLowerCase().replace(' ', '-')}`} key={index}>

            <div key={index} >
             
              {country.images === null || country.images === undefined ? ('no result found') : country.images.map((e) => {
                return <Image
                  key={e._id}
                  src={`/uploads/${e.name}`}
                  alt={country.name}
                  width={1000}
                  height={300}
                  className="image-travel-expert"
                />
              })}

              <span
                style={{
                  backgroundImage: `url(${ribbon.src})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
                className="trending"
              >
                <img src={trending.src}></img>
                TRENDING
              </span>
              <div className="info">
                <h3>{country.title}</h3>
                <p>{country.countries} Packages</p>

              </div>
            </div>
            </Link>
          )))}
        </div>
    </div>
    </div>
      </>
    );
  };
  
  export default CountryResults;
  