import { Rating } from "@mui/material";
import moment from "moment";
import React from "react";
import Avatar from "../Avatar";

const Review = ({ product }) => {
    return (
        <div className="mt-8">
            <div className="text-start">
                <h1 className="font-bold text-3xl mb-4">Product Review</h1>
            </div>
            <div>
                {product.reviews &&
                    product.reviews.map((review) => (
                        <div key={review.id} className="max-w-[300px]">
                            <div className="flex gap-2 items-center">
                                <Avatar src={review.user.image} />

                                <div>{review?.user.name}</div>
                                <div className="font-light">
                                    {moment(review.createdDate).fromNow()}
                                </div>
                            </div>
                            <div className="mt-2">
                                <Rating value={review.rating} readOnly />
                                <div className="ml-2 text-sm">
                                    {review.comment}
                                </div>
                                <hr className="mt-4 mb-4" />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Review;
