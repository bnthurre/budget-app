import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function Dialoga(props) {
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

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const dialogStyle = {
    padding: "20px",
  };
  const navigate = useNavigate();

  const handleEdit = async () => {
    try {
      let response;
      if (props.type === "account") {
        response = await axios.get(`http://localhost:7001/get-account/${props.itemId}`);
      } else if (props.type === "category") {
        response = await axios.get(`http://localhost:7001/get-category-by-id/${props.itemId}`);
      }
      else if (props.type === "allocation") {
        response = await axios.get(`http://localhost:7001/get-budgetallocationById/${props.itemId}`);
      }

      // Handle response differently based on type
      const data = response.data;
      if (props.type === "account") {
        navigate(`/accounts/accountform?edit=${props.itemId}`, { state: { account: data } });
      } else if (props.type === "category") {
        navigate(`/accounts/CategoryForm?edit=${props.itemId}`, { state: { category: data } });
      }
      else if (props.type === "allocation") {
        navigate(`/budget/budgetAllocationForm?edit=${props.itemId}`, { state: { allocation: data } });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <IconButton aria-label="Example" onClick={handleClick}>
        <FontAwesomeIcon icon={faEllipsisV} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloses}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>
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

          <IconButton
            onClick={handleEdit}
            style={{
              color: "black",
              "&:hover": {
                color: "gray",
              },
            }}
          >
            <DeleteIcon />
            <span style={{ fontSize: "12px", marginLeft: "5px" }}>Edit</span>
          </IconButton>
        </Typography>
      </Popover>
      
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
              onClick={() => props.handleDelete(props.itemId)}
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

// import * as React from "react";
// import DialogTitle from "@mui/material/DialogTitle";
// import Dialog from "@mui/material/Dialog";
// import Popover from "@mui/material/Popover";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from 'react-router-dom';
// import axios from "axios";
// export default function Dialoga(props) {
//   const [openDialog, handleDisplay] = React.useState(false);
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClose = () => {
//     handleDisplay(false);
//   };

//   const openDialogBox = () => {
//     handleDisplay(true);
//   };

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloses = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   const dialogStyle = {
//     padding: "20px",
//   };
//   const navigate = useNavigate();
//   const handleEdit = async () => {
//     try {
//       const response = await axios.get(`http://localhost:7001/get-account/${props.itemId}`);
//       const account = response.data;
//       navigate(`/accounts/accountform?edit=${props.itemId}`, { state: { account } });
//     } catch (error) {
//       console.error('Error fetching account:', error);
//     }
//   };
  

//   return (
//     <>
//       <IconButton aria-label="Example" onClick={handleClick}>
//         <FontAwesomeIcon icon={faEllipsisV} />
//       </IconButton>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleCloses}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <Typography sx={{ p: 2 }}>
//           <IconButton
//             onClick={openDialogBox}
//             style={{
//               color: "lightcoral",
//               "&:hover": {
//                 color: "gray",
//               },
//             }}
//           >
//             <DeleteIcon />
//             <span style={{ fontSize: "12px", marginLeft: "5px" }}>Delete</span>
//           </IconButton>

//           <IconButton
//           onClick={handleEdit}
           
//             style={{
//               color: "black",
//               "&:hover": {
//                 color: "gray",
//               },
//             }}
//           >
//             <DeleteIcon />
//             <span style={{ fontSize: "12px", marginLeft: "5px" }}>Edit</span>
//           </IconButton>
//         </Typography>
//       </Popover>
      
//       <Dialog onClose={handleClose} open={openDialog}>
//         <DialogTitle> Delete </DialogTitle>
//         <Divider />
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <h3 style={dialogStyle}>Are you sure to delete this item?????</h3>
//           <div style={{ margin: "10px 100px" }}>
//             <Button
//               variant="contained"
//               size="small"
//               color="error"
//               style={{
//                 margin: "10px",
//                 "&:hover": { backgroundColor: "#d32f2f" },
//               }}
//               onClick={() => props.handleDelete(props.itemId)}
//             >
//               Delete
//             </Button>
//             <Button
//               variant="contained"
//               size="small"
//               style={{
//                 marginLeft: "10px",
//                 backgroundColor: "white",
//                 color: "gray",
//                 border: "1px solid gray",
//                 "&:hover": { backgroundColor: "#e0e0e0" },
//               }}
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//           </div>
//         </div>
//       </Dialog>
//     </>
//   );
// }

