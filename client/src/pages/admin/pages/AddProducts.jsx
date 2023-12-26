import axios from "axios";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import TextArea from "../../../components/TextArea";
import { app } from "../../../firebase";
import { categories } from "../../../utils/categories";
import { colors } from "../../../utils/colors";
import CategoryItem from "../components/CategoryItemInput";
import SelectColor from "../components/SelectColor";

const AddProducts = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [inStock, setInStock] = useState(false);
    const [category, setCategory] = useState(null);
    const [images, setImages] = useState([]);

    const handleCheckboxClick = (color) => {
        const colorIndex = images.findIndex((img) => img.color === color.color);

        if (colorIndex !== -1) {
            const updatedImages = [...images];
            updatedImages.splice(colorIndex, 1);
            setImages(updatedImages);
        } else {
            setImages((prevImages) => [
                ...prevImages,
                { color: color.color, colorCode: color.colorCode, image: null },
            ]);
        }
    };

    const handleImageUpload = async (e, color) => {
        setIsLoading(true);
        try {
            toast.success("Uploading...");
            const image = e.target.files[0];
            const storage = getStorage(app);
            const fileName = new Date().getTime() + image.name;
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, image);

            // Listen for state changes (including errors)
            uploadTask.on("state_changed", (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                if (snapshot.error) {
                    console.error(snapshot.error.message);
                    toast.error("Image upload failed. Try again");
                }
            });

            // Wait for the upload to complete before getting the URL
            await uploadTask;

            // Now it's safe to call getDownloadURL
            const imageUrl = await getDownloadURL(storageRef);

            // Update image list with new URL
            setImages((prevImages) =>
                prevImages.map((img) =>
                    img.color === color ? { ...img, image: imageUrl } : img
                )
            );
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error(error.message);
            toast.error("Image upload failed. Try again");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const { data } = await axios.post("/api/v1/product/create", {
                name,
                price,
                brand,
                description,
                inStock,
                category,
                images,
            });

            if (data.success) {
                toast.success(data.message);
                navigate("/admin/manage-products");
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-full max-w-7xl mx-auto px-4 py-2">
                <form className="w-full max-w-2xl shadow-lg mx-auto flex flex-col py-2 px-8 gap-4">
                    <h1 className="font-bold text-3xl mb-4 text-center">
                        Add a Product
                    </h1>
                    <Input
                        label={"Name"}
                        isLoading={isLoading}
                        type={"text"}
                        value={name}
                        setValue={setName}
                    />
                    <Input
                        label={"Price"}
                        isLoading={isLoading}
                        type={"number"}
                        value={price}
                        setValue={setPrice}
                    />
                    <Input
                        label={"Brand"}
                        isLoading={isLoading}
                        type={"text"}
                        value={brand}
                        setValue={setBrand}
                    />
                    <TextArea
                        label={"Description"}
                        isLoading={isLoading}
                        value={description}
                        setValue={setDescription}
                    />
                    {console.log(images)}

                    <div className="flex gap-2 items-center text-sm text-slate-800">
                        <input
                            type="checkbox"
                            className="cursor-pointer"
                            checked={inStock}
                            onChange={() => setInStock((prev) => !prev)}
                        />
                        <p>This product is available in stock</p>
                    </div>

                    <div className="w-full font-medium">
                        <div className="mb-2 font-semibold">
                            Select A Category
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-4">
                            {categories.map((item) => {
                                if (item.label === "All") {
                                    return null;
                                }

                                return (
                                    <div key={item.label}>
                                        <CategoryItem
                                            Icon={item.icon}
                                            label={item.label}
                                            setCategory={setCategory}
                                            selected={category == item.label}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="w-full flex flex-col flex-wrap gap-4">
                        <div>
                            <div className="font-bold">
                                Select the available product colors and upload
                                their images.
                            </div>
                            <div className="text-sm">
                                You must upload an image for each of the color
                                selected otherwise your color selection will be
                                ignored
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {colors.map((item, i) => (
                                <SelectColor
                                    key={i}
                                    item={item}
                                    images={images}
                                    selected={images.some(
                                        (img) => img.color === item.color
                                    )}
                                    handleCheckboxClick={() =>
                                        handleCheckboxClick(item)
                                    }
                                    handleImageUpload={handleImageUpload}
                                />
                            ))}
                        </div>
                    </div>
                    <Button
                        label={"Add a product"}
                        disabled={isLoading}
                        onClick={(e) => handleSubmit(e)}
                    />
                </form>
            </div>
        </div>
    );
};

export default AddProducts;
