import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const usestyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      'border-color': '#DAE8E7',
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        'border-color': '#4C12A1',
      },
    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
      {
        'border-color': '#4C12A1',
      },
    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline':
      {
        'border-color': '#DAE8E7',
      },
    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline':
      {
        'border-color': '#DAE8E7',
      },
    '& .MuiInputBase-root.MuiOutlinedInput-root .MuiButtonBase-root.MuiIconButton-root:hover':
      {
        color: '#4C12A1',
        'background-color': 'transparent',
      },

    backgroundColor: '#F5F5F5',
  },
});

const textStyle = {
  fontFamily: 'Lexend',
  '& .MuiInputBase-root': {
    '& > fieldset': {
      borderColor: '#DAE8E7',
    },
    '&:hover fieldset': {
      borderColor: '#4C12A1',
    },

    '&.Mui-focused fieldset': {
      borderColor: '#4C12A1',
      color: '#243030',
    },
    '&.Mui-focused svg': {
      color: '#4C12A1',
    },
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-1.25rem',
  },
  '& .MuiInputBase-root.Mui-disabled': {
    '& > fieldset': {
      borderColor: '#DAE8E7',
    },
    '&:hover fieldset': {
      borderColor: '#DAE8E7',
    },
  },
};

const inputStyle = {
  style: {
    fontFamily: 'Lexend',
    fontSize: '14px',
    fontWeight: '400',
    color: '#243030',
  },
};

const inputLabelStyle = {
  style: {
    fontFamily: 'Lexend',
    fontSize: '14px',
    fontWeight: '300',
    color: '#8CA19F',
  },
  sx: {
    '& .MuiOutlinedInput-notchedOutline': { fontFamily: 'Lexend' },
  },
};

const CustomTextField = ({
  label,
  placeholder,
  className,
  inputLabelProps,
  sx,
  ...custom
}) => {
  const classes = usestyles();

  return (
    <TextField
      label={label}
      placeholder={label}
      {...custom}
      classes={{ root: classes.root }}
      sx={{ textStyle, ...sx }}
      inputProps={inputStyle}
      InputLabelProps={{
        style: inputLabelStyle.style,
        sx: inputLabelStyle.sx,
      }}
      className={className}
    />
  );
};
export { textStyle, inputStyle, inputLabelStyle, CustomTextField };
