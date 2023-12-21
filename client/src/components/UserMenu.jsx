import Login from "@mui/icons-material/Login";
import Logout from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { FaCartPlus } from "react-icons/fa";
import { MdDashboardCustomize } from "react-icons/md";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Avatar from "./Avatar";

export default function UserMenu() {
    const { user } = React.useContext(UserContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Tooltip title="Profile">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? "account-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                    >
                        <Avatar />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        width: "200px",
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to={"/profile"} className="flex gap-3 items-center">
                        <Avatar /> Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to={"/cart"} className="flex items-center gap-3">
                        <FaCartPlus size={18} /> My Cart
                    </Link>
                </MenuItem>
                {user?.role === "Admin" && (
                    <MenuItem onClick={handleClose}>
                        <Link
                            to={"/admin/dashboard"}
                            className="flex items-center gap-3"
                        >
                            <MdDashboardCustomize /> Admin Dashboard
                        </Link>
                    </MenuItem>
                )}
                <Divider />

                <MenuItem onClick={handleClose}>
                    <Link to={"/login"} className="flex items-center gap-2">
                        {user?.name ? (
                            <>
                                <ListItemIcon>
                                    <Logout fontSize="medium" />
                                </ListItemIcon>
                                Logout
                            </>
                        ) : (
                            <>
                                <ListItemIcon>
                                    <Login fontSize="medium" />
                                </ListItemIcon>
                                Login
                            </>
                        )}
                    </Link>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
