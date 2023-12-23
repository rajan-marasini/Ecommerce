import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import * as React from "react";
import { toast } from "react-hot-toast";
import {
    MdCached,
    MdClose,
    MdDelete,
    MdDone,
    MdRemoveRedEye,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AlertDialog from "../../../components/Dialog";
import { formatPrice } from "../../../utils/formatPrice";
import ActionBtn from "./ActionBtn";
import Status from "./Status";

export default function DataTable() {
    const [products, setProducts] = React.useState([]);
    const navigate = useNavigate();
    const [dialogBoxOpen, setDialogBoxOpen] = React.useState(false);
    const [deleteId, setDeleteId] = React.useState("");

    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "name", headerName: "Product Name", width: 160 },
        {
            field: "price",
            headerName: "Price(USD)",
            width: 130,
            renderCell: (params) => (
                <div className="font-bold text-center text-slate-800">
                    {params.row.price}
                </div>
            ),
        },
        {
            field: "category",
            headerName: "Category",
            width: 90,
        },
        {
            field: "brand",
            headerName: "Brand",
            width: 100,
        },
        {
            field: "inStock",
            headerName: "In Stock",
            width: 160,
            renderCell: (params) => (
                <div>
                    {params.row.inStock ? (
                        <Status
                            text={"In stock"}
                            Icon={MdDone}
                            bg={"bg-teal-200"}
                            color={"text-teal-700"}
                        />
                    ) : (
                        <Status
                            text={"Out of stock"}
                            Icon={MdClose}
                            bg={"bg-rose-200"}
                            color={"text-rose-700"}
                        />
                    )}
                </div>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => (
                <div className="flex justify-between gap-4">
                    <ActionBtn
                        Icon={MdCached}
                        onClick={() =>
                            handleToggleStock(params.row.id, params.row.inStock)
                        }
                    />
                    <ActionBtn
                        Icon={MdDelete}
                        onClick={() => {
                            setDialogBoxOpen(true);
                            setDeleteId(params.row.id);
                        }}
                    />
                    <ActionBtn
                        Icon={MdRemoveRedEye}
                        onClick={() => navigate(`/product/${params.row.id}`)}
                    />
                </div>
            ),
        },
    ];
    let rows = [];

    const handleToggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.put(
                `/api/v1/product/updateStock/${id}`,
                {
                    inStock: !inStock,
                }
            );

            if (data.success) {
                toast.success("Status updated successfully");
                setProducts((prev) =>
                    prev.map((product) =>
                        product.id === id
                            ? { ...product, inStock: !inStock }
                            : product
                    )
                );
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Oops ");
        }
    };

    const handleDelete = async (id) => {
        try {
            setDialogBoxOpen(false);
            toast.success("Product deleted successfully");

            const { data } = await axios.delete(
                `/api/v1/product/delete/${deleteId}`
            );
            setProducts((prev) => prev.filter((product) => product.id != id));
        } catch (error) {
            console.log(error.message);
            toast.error("Deletion failed");
        }
    };

    React.useEffect(() => {
        const getAllProducts = async () => {
            const { data } = await axios.get(
                "/api/v1/product/get-all-products"
            );

            setProducts(data.products);
        };

        getAllProducts();
    }, []);

    rows = products?.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
    }));

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-4 mt-8">
                <h1 className="font-bold text-3xl text-center">
                    Manage Produts
                </h1>
            </div>
            <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
                <AlertDialog
                    setDialogBoxOpen={setDialogBoxOpen}
                    dialogBoxOpen={dialogBoxOpen}
                    action={"Delete"}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}
