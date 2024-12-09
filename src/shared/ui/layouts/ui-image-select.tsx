import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MUISelect,
  type SelectProps,
} from "@mui/material";
import classNames from "classnames";

type UIImageSelectData<T extends string | number> = SelectProps<T> & {
  className?: string;
  getSource: (avatarId: T) => string;
  images: T[];
  placeholder?: string;
  helpertext?: string;
};

export function UIImageSelect<T extends string | number>({
  getSource,
  defaultValue,
  placeholder = "Выберите фото",
  images = [],
  ...props
}: UIImageSelectData<T>) {
  return (
    <FormControl error={props?.error}>
      <InputLabel id="demo-simple-select-label">{props?.label}</InputLabel>
      <MUISelect
        style={{ height: 56 }}
        variant="outlined"
        defaultValue={defaultValue as T | undefined}
        {...props}
        className={classNames(props.className, "relative")}
        MenuProps={{
          disablePortal: true,
          PaperProps: {
            style: {
              maxHeight: 200,
              overflowY: "auto",
            },
          },
        }}
        renderValue={(value) => {
          if (!value) {
            return <em>{placeholder}</em>;
          }

          if (Array.isArray(value)) {
            return (
              <div className="flex">
                {value.map((item, i) => (
                  <img
                    style={{
                      left: -i * 20,
                      height: 45,
                    }}
                    className="relative"
                    key={item}
                    src={getSource(item as T)}
                    alt={`Option ${item}`}
                  />
                ))}
              </div>
            );
          }
          return (
            <img
              style={{ height: 45 }}
              src={getSource(value as T)}
              alt={`Option ${value}`}
            />
          );
        }}
      >
        {images.map((image) => (
          <MenuItem key={image} value={image}>
            <img
              style={{ height: 50 }}
              src={getSource(image as T)}
              alt={`Option ${image}`}
            />
          </MenuItem>
        ))}
      </MUISelect>
      <FormHelperText>{props?.helpertext}</FormHelperText>
    </FormControl>
  );
}
