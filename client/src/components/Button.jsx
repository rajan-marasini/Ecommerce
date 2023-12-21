import React from "react";

const Button = ({ label, disabled, outline, small, custom, Icon, onClick }) => {
    return (
        <button
            disabled={disabled}
            className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 border-2
        flex items-center justify-center gap-2
        ${outline ? "bg-white" : "bg-slate-700"}
        ${outline ? "text-slate-700" : "text-white"}
        ${small ? "text-sm font-medium" : "text-base font-bold"}
        ${small ? "py-1 px-2" : "py-3 px-4"}
        ${custom ? custom : ""}
        `}
            onClick={onClick}
        >
            {Icon && <Icon size={24} />}
            {label}
        </button>
    );
};

export default Button;
