import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
interface Props {
  messsage?: string;
}

const LoadingComponent = ({ messsage = "Loading..." }: Props) => {
  return (
    <Backdrop open={true} invisible>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"100vh"}
      >
        <CircularProgress size={100} color="secondary" />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {messsage}
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default LoadingComponent;
