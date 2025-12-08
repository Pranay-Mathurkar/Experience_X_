// import React from "react";



// import { Navbar } from "../components/common/Navbar";
// import { SearchBar } from "../components/common/SearchBar";
// import { CompanyGrid } from "../components/mainPage/CompanyGrid";
// import { AddCompanyButton } from "../components/mainPage/AddCompanyButton";
// import { Footer } from "../components/common/Footer";

// export default function MainPage() {
//   return (
//     <div className="min-h-screen w-full bg-white">
//       <Navbar/>
//       <SearchBar />
//       <CompanyGrid />
//       <AddCompanyButton />
//       <Footer/>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Navbar } from "../components/common/Navbar";
import { SearchBar } from "../components/common/SearchBar";
import { CompanyGrid } from "../components/mainPage/CompanyGrid";
import { AddCompanyButton } from "../components/mainPage/AddCompanyButton";
import { Footer } from "../components/common/Footer";

export default function MainPage() {
  const [search, setSearch] = useState(""); // ✅ GLOBAL SEARCH

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <SearchBar setSearch={setSearch} /> {/* ✅ SEND SETTER */}
      <CompanyGrid search={search} /> {/* ✅ SEND SEARCH */}
      <AddCompanyButton />
      <Footer />
    </div>
  );
}
