import { Checkbox, FormControlLabel } from "@mui/material";
import { useController, UseControllerProps } from "react-hook-form";
interface Props extends UseControllerProps {
  label: string;
}
const AppCheckBox = (props: Props) => {
  const { field } = useController({ ...props, defaultValue: false });
  return (
    <FormControlLabel
      control={<Checkbox {...field} checked={field.value} />}
      label={props.label}
    />
  );
};

export default AppCheckBox;
