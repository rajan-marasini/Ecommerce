import React from "react";

const TextArea = ({ label, type, value, setValue, isLoading }) => {
    return (
        <div className="relative w-full">
            <textarea
                placeholder=""
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="
                    border
                  border-slate-400
                    rounded-lg
                    transition
                    h-48
                    resize-none
                    disabled:opacity-70
                    disabled:cursor-not-allowed
                    px-2
                    pt-6
                    pb-1
                    w-full
                    peer
                "
                required
                disabled={isLoading}
            />
            <label
                className="
                    absolute
                    left-2 
                    transform 
                    top-3
                    origin-bottom
                    -translate-y-2
                    scale-75
                    -translate-x-2
                    duration-300
                    peer-placeholder-shown:translate-y-1
                    peer-placeholder-shown:translate-x-2
                    peer-placeholder-shown:scale-100
                    peer-focus:scale-75
                    peer-focus:-translate-y-3
                    peer-focus:-translate-x-2
                  text-gray-600
               "
                r
            >
                {label}
            </label>
        </div>
    );
};

export default TextArea;
