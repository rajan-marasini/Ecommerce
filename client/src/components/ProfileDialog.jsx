import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";
import UserContext from "../context/UserContext";
import Input from "./Input";

export default function FormDialog({
    openDialog: open,
    setOpenDialog: setOpen,
    phone,
    setPhone,
    address,
    setAddress,
}) {
    const { user } = React.useContext(UserContext);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <div className="flex flex-col gap-4 w-[28rem]">
                        <Input label={"Name"} value={user.name} />
                        <Input label={"Email"} value={user.email} />
                        <Input
                            label={"Phone"}
                            value={phone}
                            setValue={setPhone}
                        />
                        <Input
                            label={"Address"}
                            value={address}
                            setValue={setAddress}
                        />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>
                        <span className="bg-slate-700 text-white font-bold px-6 py-2 rounded-lg ">
                            Update
                        </span>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
