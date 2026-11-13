import React from "react";
import { assets } from "../assets/assets";

const StarRating = ({ rating = 4 }) => {
	return (
		<div role="img" aria-label={`Rated ${rating} out of 5`} className="flex items-center">
			{Array(5)
				.fill("")
				.map((_, index) => (
					<img
						key={index}
						src={
							rating > index
								? assets.starIconFilled
								: assets.starIconOutlined
						}
						alt=""
						aria-hidden="true"
						className="w-4.5 h-4.5"
					/>
				))}
		</div>
	);
};

export default StarRating;
