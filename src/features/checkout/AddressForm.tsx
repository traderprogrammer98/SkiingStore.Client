import { Typography, Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AppCheckBox from "../../app/components/AppCheckBox";

export default function AddressForm() {
  const { control, formState } = useFormContext();
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <AppTextInput name="fullName" label="Full Name" control={control} />
        </Grid>
        <Grid item xs={12} sm={12}>
          <AppTextInput name="address1" label="Address1" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="address2" label="Address2" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppTextInput name="city" label="city" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="zip" label="zip" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="country" label="country" control={control} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppTextInput name="state" label="state" control={control} />
        </Grid>
        <Grid item xs={12}>
          <AppCheckBox
            disabled={!formState.isDirty}
            name="saveAddress"
            label="save this as the default address"
            control={control}
          />
        </Grid>
      </Grid>
    </>
  );
}
