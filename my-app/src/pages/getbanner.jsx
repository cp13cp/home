import React, { useEffect, useState } from "react";
import axios from "axios";

// // const BannerList = () => {
// //   const [banners, setBanners] = useState([]);

// //   useEffect(() => {
// //     axios
// //       .get("http://localhost:5000/api/banner/getbanners")
// //       .then((res) => {
// //         setBanners(res.data); // array of image paths
// //       })
// //       .catch((err) => {
// //         console.error("Failed to load banners:", err);
// //       });
// //   }, []);

// //   return (
// //     <div className="banner-gallery">
// //       {banners.length > 0 ? (
// //         banners.map((path, i) => (
// //           <img
// //             key={i}
// //             src={`http://localhost:5000${path}`}
// //             alt={`Banner ${i + 1}`}
// //             width="300"
// //           />
// //         ))
// //       ) : (
// //         <p>No banners found.</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default BannerList;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BannerList = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/banner/getbanners")
//       .then((res) => {
//         setBanners(res.data);
//       })
//       .catch((err) => {
//         console.error("Failed to load banners:", err);
//       });
//   }, []);

//   return (
//     <div className="banner-gallery w-full overflow-hidden">
//       {banners.length > 0 ? (
//         banners.map((path, i) => (
//           <img
//             key={i}
//             src={`http://localhost:5000${path}`}
//             alt={`Banner ${i + 1}`}
//             className="w-full"
//             style={{ height: "30rem", objectFit: "cover" }}
//           />
//         ))
//       ) : (
//         <p>No banners found.</p>
//       )}
//     </div>
//   );
// };

// export default BannerList;

// const BannerList = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/banner/getbanners"
//         );
//         setBanners(response.data);
//       } catch (error) {
//         console.error("Failed to load banners:", error);
//       }
//     };

//     fetchBanners();
//   }, []); // Empty dependency array ensures this effect runs only once after the initial render

//   return (
//     <div className="banner-gallery w-full overflow-hidden">
//       {banners.length > 0 ? (
//         banners.map((path, i) => (
//           <img
//             key={i}
//             src={`http://localhost:5000${path}`}
//             alt={`Banner ${i + 1}`}
//             className="w-full"
//             style={{ height: "30rem", objectFit: "cover" }}
//           />
//         ))
//       ) : (
//         <p>No banners found.</p>
//       )}
//     </div>
//   );
// };

const BannerList = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/banner/getbanners"
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Failed to load banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Last banner ko access karna
  const lastBanner = banners[banners.length - 1];
  // console.log("Last Banner:", lastBanner.path);
  return (
    <div className="banner-gallery  bg-slate-200 overflow-hidden width-[100%]">
      {lastBanner ? (
        <img
          src={`http://localhost:5000${lastBanner}`}
          alt={`Banner ${banners.length}`}
          style={{
            height: "30rem",
            width: "100%",
            // objectFit: "contain", //
            objectPosition: "center",
            // Image ko vertically aur horizontally center kare
          }}
        />
      ) : (
        <p>No banners found.</p>
      )}
    </div>
  );
};

export default BannerList;
