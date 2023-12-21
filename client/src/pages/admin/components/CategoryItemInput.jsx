import React from "react";

const CategoryItem = ({ label, selected, Icon, setCategory }) => {
    return (
        <label
            className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
                selected ? "border-slate-800" : "border-slate-200"
            }`}
        >
            <Icon size={30} />
            <input
                type="checkbox"
                checked={selected}
                onChange={() => setCategory(label)}
                hidden
            />
            {label}
        </label>
    );
};

export default CategoryItem;
