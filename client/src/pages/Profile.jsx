import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import Avatar from "../components/Avatar";
import Button from "../components/Button";
import ProfileDialog from "../components/ProfileDialog";
import UserContext from "../context/UserContext";
import { app } from "../firebase";

const Profile = () => {
    const { user, setUser } = useContext(UserContext);

    const [openDialog, setOpenDialog] = useState(false);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.phone);
    const [image, setImage] = useState(user.image);

    const handleUpdateProfile = async (e) => {
        try {
            const { data } = await axios.put("/api/v1/user/update", {
                phone,
                address,
                image,
            });

            if (data.success) {
                toast.success("Successfully updated");
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Somethin went wrong");
        }
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0];
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        toast.success("Uploading...");

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on("state_changed", (snapshot) => {
            if (snapshot.error) {
                toast.error("Image Upload Failed");
                console.log(snapshot.error.message);
            }
        });

        await uploadTask;

        const imageUrl = await getDownloadURL(storageRef);

        setImage(imageUrl);
        toast.success("Image uploaded successfully");
        setUser({ ...user, image: imageUrl });
    };

    return user?.name ? (
        <div className="w-full h-full max-w-7xl mx-auto mt-2">
            <div className="w-full max-w-md h-full mx-auto flex flex-col items-center ">
                <label className="w-48 h-48 flex items-center justify-center rounded-full">
                    {user?.image ? (
                        <>
                            <img
                                src={user.image}
                                className="w-full object-contain h-full rounded-full"
                            />
                        </>
                    ) : (
                        <>
                            <Avatar size={48} />
                        </>
                    )}
                    <input
                        type="file"
                        hidden
                        accept="image/.*"
                        onChange={(e) => handleImageUpload(e)}
                    />
                </label>

                <div className="flex items-start justify-center flex-col">
                    <div>Name: {user.name}</div>
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Address: {user.address}</div>
                </div>
                <div className="flex w-full gap-4">
                    <Button
                        label={"Edit Profile"}
                        onClick={() => setOpenDialog(true)}
                    />
                    <Button
                        label={"Update Profile"}
                        onClick={() => handleUpdateProfile()}
                    />
                    <ProfileDialog
                        setOpenDialog={setOpenDialog}
                        openDialog={openDialog}
                        phone={phone}
                        setPhone={setPhone}
                        address={address}
                        setAddress={setAddress}
                    />
                </div>
            </div>
        </div>
    ) : (
        <>
            {toast.error("You need to login")}
            <Navigate to={"/"} />
        </>
    );
};

export default Profile;
