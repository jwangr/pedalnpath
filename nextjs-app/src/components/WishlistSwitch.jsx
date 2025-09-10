
import { FormControlLabel, FormGroup } from "@mui/material";
import Switch from "@mui/material/Switch";

const label = { inputProps: { "aria-label": "Color switch demo" } };

export default async function WishlistSwitch() {

  return (
    <FormGroup>
      <FormControlLabel
        label="Save"
        control={
          <Switch
            defaultChecked
            color="secondary"
            // checked={checked}
            // onChange={handleChange}
            slotProps={{ input: { "aria-label": "controlled" } }}
          />
        }
      />
    </FormGroup>
  );
}
