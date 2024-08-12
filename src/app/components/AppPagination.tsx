import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";
interface Props {
  metaData: MetaData;
  onPageClick: (page: number) => void;
}
const AppPagination = () => {
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography>show 6 items from 20</Typography>
      <Pagination count={10} color="secondary" />
    </Box>
  );
};

export default AppPagination;
