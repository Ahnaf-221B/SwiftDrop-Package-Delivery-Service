import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";
import { useLoaderData } from "react-router-dom";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  const [searchText, setSearchText] = useState("");
	const [activeCoords, setActiveCoords] = useState(null);
	const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
		e.preventDefault();
		const district = serviceCenters.find((d) =>
			d.district.toLowerCase().includes(searchText.toLowerCase())
		);
		if (district) {
			setActiveCoords([district.latitude, district.longitude]);
			setActiveDistrict(district.district);
		}
	};
	return (
		<div className="relative w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <form
				onSubmit={handleSearch}
				className=" mt-10 mb-10  w-full max-w-2xl px-4 flex "
			>
				<input
					type="text"
					placeholder="Search district..."
					className="flex-1 px-4 py-2 border rounded-lg outline-none"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-6 py-2 ml-10 rounded-lg hover:bg-blue-700"
				>
					Go
				</button>
			</form>
      </div>
			

			{/* Pass props to BangladeshMap */}
			<BangladeshMap
				serviceCenters={serviceCenters}
				activeCoords={activeCoords}
				activeDistrict={activeDistrict}
			/>
		</div>
	);
};

export default Coverage;
