import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

export default function AlertDialog({
    dialogBoxOpen: open,
    setDialogBoxOpen: setOpen,
    action,
    handleDelete,
}) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you really want to delete this product. Once done it
                        cannot be retrived.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={handleDelete} autoFocus>
                        <span className="bg-rose-500 text-white font-bold px-4 py-2 rounded-sm">
                            {action}
                        </span>
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
