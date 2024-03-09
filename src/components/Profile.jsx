import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import LayoutCenter from "./LayoutCenter";
import EditForm from "./EditForm";
import DialogMessage from "./DialogMessage";
import { useContext, useState } from "react";
import { appContext } from "../context/AppContext";
import { handleBday } from "../utilities/functions";

export default function Profile() {
  const { updateRoute, logoutUser } = useContext(appContext);
  const [showDialog, setShowDialog] = useState(false);

  const {
    firstName,
    lastName,
    bDay,
    city,
    street,
    flatNumber,
    email,
    userImage,
  } = JSON.parse(sessionStorage.getItem("currentUser"));

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  function handleUserLogout() {
    logoutUser(email);
    updateRoute("login");
  }

  function handleCloseDialog() {
    setShowDialog(false);
  }

  return (
    <LayoutCenter title="הפרופיל שלי:">
      {showDialog && (
        <DialogMessage
          openDialog={showDialog}
          closeDialog={handleCloseDialog}
          title="עריכת פרטים"
          closeBtn="ביטול"
          customStyle={{ marginY: 2, width: 100, marginX: "auto" }}
        >
          <EditForm user={currentUser} onClose={handleCloseDialog} />
        </DialogMessage>
      )}
      <Card sx={{ width: "330px", padding: "15px", display: "block" }}>
        <CardHeader
          sx={{ gap: "15px", margin: "0 auto", paddingRight: "0" }}
          avatar={
            <Avatar sx={{ bgcolor: green[800] }} aria-label="recipe">
              {firstName.charAt(0)}
            </Avatar>
          }
          title={`${firstName} ${lastName}`}
          subheader=""
        />
        {userImage && (
          <CardMedia
            sx={{ objectFit: "contain", width: "100%" }}
            component="img"
            height="150"
            image={userImage}
            alt="user image"
          />
        )}
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <EmailIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <LocationOnIcon fontSize="small" />
            <Typography
              sx={{ marginTop: "5px" }}
              variant="body2"
              color="text.secondary"
            >
              {`${street} ${flatNumber}, ${city}`}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CakeIcon fontSize="small" />
            <Typography
              sx={{ marginTop: "5px" }}
              variant="body2"
              color="text.secondary"
            >
              {handleBday(bDay)}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Button variant="contained" onClick={() => setShowDialog(true)}>
            עדכון פרטים
          </Button>
          <Button
            aria-label="move to online game"
            variant="contained"
            color="secondary"
          >
            <a
              href="https://chat.openai.com/"
              rel="noreferrer"
              target="_blank"
              aria-label="my favorite online game"
            >
              למשחק
            </a>
          </Button>
          <Button
            aria-label="logout button"
            variant="outlined"
            color="primary"
            onClick={handleUserLogout}
          >
            התנתק
          </Button>
        </CardActions>
      </Card>
    </LayoutCenter>
  );
}
// import * as React from "react";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import { green } from "@mui/material/colors";
// import CakeIcon from "@mui/icons-material/Cake";
// import EmailIcon from "@mui/icons-material/Email";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import Box from "@mui/material/Box";
// import LayoutCenter from "./LayoutCenter";
// import EditDetailsDialog from "./EditDetailsDialog";
// import { useContext } from "react";
// import { appContext } from "../context/AppContext";
// import { handleBday } from "../utilities/functions";

// export default function Profile() {
//   const { updateRoute, logoutUser } = useContext(appContext);

//   const {
//     firstName,
//     lastName,
//     bDay,
//     city,
//     street,
//     flatNumber,
//     email,
//     userImage,
//   } = JSON.parse(sessionStorage.getItem("currentUser"));

//   const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

//   function handleUserLogout() {
//     logoutUser(email);
//     updateRoute("login");
//   }

//   return (
//     <LayoutCenter title="הפרופיל שלי:">
//       <Card sx={{ width: "330px", padding: "15px", display: "block" }}>
//         <CardHeader
//           sx={{ gap: "15px", margin: "0 auto", paddingRight: "0" }}
//           avatar={
//             <Avatar sx={{ bgcolor: green[800] }} aria-label="recipe">
//               {firstName.charAt(0)}
//             </Avatar>
//           }
//           title={`${firstName} ${lastName}`}
//           subheader=""
//         />
//         {userImage && (
//           <CardMedia
//             sx={{ objectFit: "contain", width: "100%" }}
//             component="img"
//             height="150"
//             image={userImage}
//             alt="user image"
//           />
//         )}
//         <CardContent>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <EmailIcon fontSize="small" />
//             <Typography variant="body2" color="text.secondary">
//               {email}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <LocationOnIcon fontSize="small" />
//             <Typography
//               sx={{ marginTop: "5px" }}
//               variant="body2"
//               color="text.secondary"
//             >
//               {`${street} ${flatNumber}, ${city}`}
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
//             <CakeIcon fontSize="small" />
//             <Typography
//               sx={{ marginTop: "5px" }}
//               variant="body2"
//               color="text.secondary"
//             >
//               {handleBday(bDay)}
//             </Typography>
//           </Box>
//         </CardContent>
//         <CardActions
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             justifyContent: "space-around",
//           }}
//           disableSpacing={true}
//         >
//           <EditDetailsDialog
//             btnValue="עדכון פרטים"
//             variant="contained"
//             editUser={currentUser}
//           />
//           <Button
//             aria-label="move to online game"
//             variant="contained"
//             color="secondary"
//           >
//             <a
//               href="https://chat.openai.com/"
//               rel="noreferrer"
//               target="_blank"
//               aria-label="my favorite online game"
//             >
//               למשחק
//             </a>
//           </Button>
//           <Button
//             aria-label="logout button"
//             variant="outlined"
//             color="primary"
//             onClick={handleUserLogout}
//           >
//             התנתק
//           </Button>
//         </CardActions>
//       </Card>
//     </LayoutCenter>
//   );
// }
