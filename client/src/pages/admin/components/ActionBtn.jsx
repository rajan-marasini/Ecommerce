import React from "react";

const ActionBtn = ({ Icon, onClick, disabled }) => {
    return (
        <button
            className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400 ${
                disabled && "opacity-70 cursor-not-allowed"
            }`}
            onClick={() => onClick()}
            disabled={disabled}
        >
            <Icon size={18} />
        </button>
    );
};

export default ActionBtn;
