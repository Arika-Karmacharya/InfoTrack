import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Select from "react-select";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { NoSsr } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { Chip } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
// import { CancelIcon } from "@material-ui/icons";
import isEmpty from "helpers/isEmpty";
import { Skeleton } from "@material-ui/lab";
import { Checkbox } from "@material-ui/core";
import { Arrays, ArraysKey } from "helpers/getTextLabel";
import {reactSelectInterface} from 'ts/interfaces/formInterface'

//#region useStyles
const useStyles = (width: any) =>
  makeStyles((theme) => ({
    input: {
      display: "flex",
      height: "1.5rem",
      border: "1px solid #c5c5c5",
      borderRadius: "4px",
      padding: "5px",
      backgroundColor: "#fff",
    },
    valueContainer: {
      display: "flex",
      border: "none",
      flex: 1,
      alignItems: "center",
      overflow: "hidden",
    },
    chip: {
      margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
      backgroundColor: emphasize(
        theme.palette.type === "light"
          ? theme.palette.grey[300]
          : theme.palette.grey[700],
        0.08
      ),
    },
    noOptionsMessage: {
      padding: theme.spacing(1, 2),
    },
    singleValue: {
      fontSize: 14,
      width: "100%",
      height: "100%",
      whiteSpace: "nowrap",
    },
    placeholder: {
      position: "absolute",
      left: 10,
      bottom: 6,
      fontSize: 14,
    },

    paper: {
      position: "absolute",
      zIndex: 1,
      marginTop: theme.spacing(1),
      left: 0,
      right: 0,
      border: '1px solid #cfcfcf',
      borderRadius:4,
      // width: width,

      '& + div':{
        padding: 0
      }
    },
    paperAbove: {
      position: "absolute",
      zIndex: 1,
      bottom: "100%",
      marginBottom: theme.spacing(1),
      left: 0,
      right: 0,
    },
    divider: {
      height: theme.spacing(2),
    },
  }));
//#endregion useStyles

//#region  NoOptionsMessage
function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

NoOptionsMessage.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props to be passed on to the wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};
//#endregion  NoOptionsMessage

//#region inputComponent
function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

inputComponent.propTypes = {
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]),
};
//#endregion inputComponent

//#region Control
function Control(props) {
  const {
    children,
    innerProps,
    innerRef,
    selectProps: { classes, TextFieldProps },
  } = props;
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: classes && classes.input,
          ref: innerRef,
          children,
          ...innerProps,
        },
      }}
      {...TextFieldProps}
    />
  );
}
Control.propTypes = {
  /**
   * Children to render.
   */
  children: PropTypes.node,
  /**
   * The mouse down event and the innerRef to pass down to the controller element.
   */
  innerProps: PropTypes.shape({
    onMouseDown: PropTypes.func.isRequired,
  }).isRequired,
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  selectProps: PropTypes.object.isRequired,
};
//#endregion Control

//#region  Option
function Option(props) {
  return (
    <MenuItem
      ref={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
        backgroundColor: props.isSelected ? "#cfebff" : null,
        borderBottom: props.isSelected ? "1px solid #c4c4c4" : null,
        color: props.isSelected ? "#444" : "#333",
        padding: props.isMulti ? 0 : 10,
      }}
      {...props.innerProps}
    >
      {props.isMulti ? (
        <span>
          <Checkbox checked={props.isSelected} color="primary" />
          {props.children}
        </span>
      ) : (
        props.children
      )}
    </MenuItem>
  );
}

Option.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.shape({
    id: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    onMouseOver: PropTypes.func.isRequired,
    tabIndex: PropTypes.number.isRequired,
  }).isRequired,
  /**
   * Inner ref to DOM Node
   */
  innerRef: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.any.isRequired,
    }),
  ]).isRequired,
  /**
   * Whether the option is focused.
   */
  isFocused: PropTypes.bool.isRequired,
  /**
   * Whether the option is selected.
   */
  isSelected: PropTypes.bool.isRequired,
};

//#endregion Option

//#region Placeholder
function Placeholder(props) {
  const { selectProps, innerProps = {}, children } = props;
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes && selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

Placeholder.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * props passed to the wrapping element for the group.
   */
  innerProps: PropTypes.object,
  selectProps: PropTypes.object.isRequired,
};
//#endregion Placeholder

//#region  SingleValue
function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

SingleValue.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  /**
   * Props passed to the wrapping element for the group.
   */
  // innerProps: PropTypes.any.isRequired,
  innerProps: PropTypes.any,
  selectProps: PropTypes.object.isRequired,
};

//#endregion SingleValue

//#region  ValueContainer
function ValueContainer(props) {
  const { value, isMulti } = props.selectProps;
  const valueClasses = props.selectProps.classes && props.selectProps.classes.valueContainer 
  return value !== null && value.length > 1 && isMulti ? (
    <div className={valueClasses}>
      <Typography
        className={props.selectProps.classes.singleValue}
        {...props.innerProps}
      >
        {value.length} Selected
      </Typography>
      {props.children}
    </div>
  ) : (
    <div className={valueClasses}>
      {props.children}
    </div>
  );
}

ValueContainer.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.node,
  selectProps: PropTypes.object.isRequired,
};
//#endregion ValueContainer

MultiValue.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.bool.isRequired,
  removeProps: PropTypes.shape({
    onClick: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onTouchEnd: PropTypes.func.isRequired,
  }).isRequired,
  selectProps: PropTypes.object.isRequired,
};

//#region  MultiValue
function MultiValue(props) {
  const { value } = props.selectProps;
  // debugger;
  return value.length === 1 ? (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {value[0].label}
    </Typography>
  ) : (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    ></Typography>
  );
  // <Chip
  //   tabIndex={-1}
  //   label={props.children}
  //   className={clsx(props.selectProps.classes.chip, {
  //     [props.selectProps.classes.chipFocused]: props.isFocused,
  //   })}
  //   onDelete={props.removeProps.onClick}
  //   deleteIcon={<CancelIcon {...props.removeProps} />}
  // />
}

//#endregion MultiValue

//#region Menu
function Menu(props) {
  return (
    <Paper
      square
      className={
        props.selectProps && props.selectProps.isAbove
          ? props.selectProps.classes.paperAbove
          : props.selectProps.classes.paper
      }
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

Menu.propTypes = {
  /**
   * The children to be rendered.
   */
  children: PropTypes.element.isRequired,
  /**
   * Props to be passed to the menu wrapper.
   */
  innerProps: PropTypes.object.isRequired,
  selectProps: PropTypes.object.isRequired,
};
//#endregion Menu

//#region AutoSelect

const components:any = {
  // Control,
  Menu,
  MultiValue,
  // NoOptionsMessage,
  // Option,
  // Placeholder,
  // SingleValue,
  // ValueContainer,
};

const renderLoading = (props) => {
  const { loading, loadingType, width } = props;
  if (loadingType === "skeleton") {
    return (
      <div className="form-group">
        <Skeleton variant="text" width={75} height={15} />
        <Skeleton variant="rect" width={width ? width : 210} height={40} />
      </div>
    );
  } else if (loadingType === "circle") {
    return <h2>Loading...</h2>;
  } else {
    return <h2>Loading...</h2>;
  }
};

const renderOptions = (props: reactSelectInterface) => {
  const { options, isArray, isArrayKeys } = props;
  let setOption: any = [];
  if (options) {
    setOption = options;
  }
  if (isArray) {
    if (!isEmpty(options)) {
      if (isArrayKeys) {
        return ArraysKey(setOption);
      }
      return Arrays(setOption);
    } else {
      return [];
    }
  } else {
    return options;
  }
};

export default function ReactSelect(props: reactSelectInterface) {
  const {
    multiple,
    placeholder,
    name,
    value,
    // validators,
    label,
    width,
    loading,
    loadingType,
    disabled,
    isAbove,
  } = props;
  const classes = useStyles(width)();
  const theme = useTheme();

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: "#f2f2f2", //theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };

  const load = !isEmpty(loading) ? loading : false;
  if (load) {
    return renderLoading(props);
  }

  return (
    // <div>
    <>
      {/* <NoSsr> */}
      {multiple ? (
        <Select
          isMulti
          isDisabled={disabled}
          classes={classes}
          // styles={selectStyles}
          // inputId="react-select-multiple"
          hideSelectedOptions={false}
          placeholder={placeholder}
          className="isMulti"
          allowSelectAll={true}
          options={renderOptions(props)}
          components={components}
          value={isEmpty(value) ? null : value}
          closeMenuOnSelect={false}
          name={name}
          isAbove={isAbove && isAbove ? true : false}
          onChange={(value, action) => {
            props.onChange && props.onChange(action.name, value);
          }}
        />
      ) : (
        <Select
          isDisabled={disabled}
          classes={classes}
          // styles={selectStyles}
          // inputId="react-select-single"
          onChange={(value, action) => {
            props.onChange && props.onChange(action.name, value);
          }}
          name={name}
          className="isSingle"
          isClearable={true}
          placeholder={placeholder}
          isAbove={isAbove && isAbove ? true : false}
          options={renderOptions(props)}
          components={components}
          value={isEmpty(value) ? null : value}
        />
      )}
      {/* </NoSsr> */}
    {/* </div> */}
    </>
  );
}

ReactSelect.defaultProps = {
  name: "",
  value: null,
  multiple: false,
  placeholder: "",
  width: "100%",
};
//#endregion AutoSelect
