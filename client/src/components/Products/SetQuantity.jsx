import React from "react";

const SetQuantity = ({
    cartCounter,
    cartProduct,
    handleQtyDecrease,
    handleQtyIncrease,
}) => {
    const btnStyle = "border-2 border-slate-500 rounded px-2";

    return (
        <div className="flex gap-5">
            {!cartCounter && <div className="font-bold">QUANTITY:</div>}
            <div className="flex gap-4 items-center text-base">
                <button
                    className={btnStyle}
                    onClick={() => handleQtyDecrease()}
                >
                    -
                </button>
                <div>{cartProduct.quantity}</div>
                <button
                    className={btnStyle}
                    onClick={() => handleQtyIncrease()}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default SetQuantity;
