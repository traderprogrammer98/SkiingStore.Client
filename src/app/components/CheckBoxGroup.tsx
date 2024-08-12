import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

interface Props {
  items: string[];
  checked?: string[];
  onClick: (items: string[]) => void;
}

const CheckBoxGroup = ({ items, checked, onClick }: Props) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);
  const handleChecked = (value: string) => {
    let newChecked: string[] = checkedItems;
    const checkedIndex = checkedItems.findIndex((item) => item === value);
    if (checkedIndex === -1) {
      newChecked = [...checkedItems, value];
    } else {
      newChecked = newChecked.filter((item) => item !== value);
    }
    setCheckedItems(newChecked);
    onClick(newChecked);
  };
  return (
    <FormGroup>
      {items.map((item) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={checkedItems.indexOf(item) !== -1}
              onClick={() => handleChecked(item)}
            />
          }
          label={item}
          key={item}
        />
      ))}
    </FormGroup>
  );
};

export default CheckBoxGroup;
