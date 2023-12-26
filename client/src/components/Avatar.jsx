import { FaUser } from "react-icons/fa";

const Avatar = ({ src, size }) => {
    if (src) {
        return (
            <img
                alt="avatar"
                src={"" + src}
                className="object-contain rounded-full"
                height={30}
                width={30}
            />
        );
    }

    return <FaUser size={size || 24} />;
};

export default Avatar;
