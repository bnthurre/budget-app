import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteMany(props) {
  const [openDialog, handleDisplay] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    handleDisplay(false);
  };

  const openDialogBox = () => {
    handleDisplay(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloses = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = () => {
    // Handle delete logic here
    console.log("Item deleted!");
    handleCloses(); // Close popover after deletion if needed
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dialogStyle = {
    padding: "20px",
  };

  return (
    <>
      <IconButton
        onClick={openDialogBox}
        style={{
          color: "lightcoral",
          "&:hover": {
            color: "gray",
          },
        }}
      >
        <DeleteIcon />
        <span style={{ fontSize: "12px", marginLeft: "5px" }}>Delete</span>
      </IconButton>
      <Dialog onClose={handleClose} open={openDialog}>
        <DialogTitle> Delete </DialogTitle>
        <Divider />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3 style={dialogStyle}>Are you sure to delete this item?????</h3>
          <div style={{ margin: "10px 100px" }}>
            <Button
              variant="contained"
              size="small"
              color="error"
              style={{
                margin: "10px",
                "&:hover": { backgroundColor: "#d32f2f" },
              }}
              onClick={() => props.handleDeleteMany(props.itemId)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              size="small"
              style={{
                marginLeft: "10px",
                backgroundColor: "white",
                color: "gray",
                border: "1px solid gray",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
