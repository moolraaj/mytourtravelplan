// 'use client';

// export default function Topbanner({ slug }) {
  
//   return (
//     <div
//       className='top_banner_destination'
//       style={{
//         backgroundImage: `url('/images/destinationfullbanner.png')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '400px',
//       }}
//     >
//       <div className='heading_two'>
//         <h2>
//           Explore <span>{slug}</span>
//         </h2>
//         <span className='hamburger'>{slug} / Destination</span>
//       </div>
//     </div>
//   );
// }




'use client';

import { usePathname } from 'next/navigation';

export default function Topbanner({ slug }) {
  const pathname = usePathname();

  // Split the path to get all path segments after the first "/"
  const pathParts = pathname.split('/').filter(part => part);

  // Remove the last part (slug) from the path
  const parentPath = pathParts.slice(0, -1).join(' / ');

  return (
    <div
      className='top_banner_destination'
      style={{
        backgroundImage: `url('/images/destinationfullbanner.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '400px',
      }}
    >
      <div className='heading_two'>
        <h2>
          Explore <span>{slug}</span>
        </h2>
        <span className='hamburger'>{parentPath} / {slug}</span>
      </div>
    </div>
  );
}
