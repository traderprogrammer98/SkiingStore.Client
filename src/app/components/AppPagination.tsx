import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";
interface Props {
  metaData: MetaData;
  onPageClick: (page: number) => void;
}
const AppPagination = ({ metaData, onPageClick }: Props) => {
  const { currentPage, pageSize, totalPages, totalCount } = metaData;
  return (
    <Box display={"flex"} justifyContent={"space-between"}>
      <Typography>
        Display {(currentPage - 1) * pageSize + 1} -{" "}
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount}
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        color="secondary"
        onChange={(_, page) => onPageClick(page)}
      />
    </Box>
  );
};

export default AppPagination;
