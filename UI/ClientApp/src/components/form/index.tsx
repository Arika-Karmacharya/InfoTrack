import isEmpty from "helpers/isEmpty";
import classnames from "classnames";
import React from "react";
import { wholeFormInterface } from "ts/interfaces/formInterface";
import ReactSelect from "./reactSelect";
import TextInput from "./textInput";

declare module "react" {
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    validators?: any[];
  }
}

class index extends React.Component<wholeFormInterface, {}> {
  public static defaultProps = {
    formName: "textinput",
    name: "",
    label: "",
    autoFocus: false,
    alignment: "vertical",
    validators: [],
  };

  constructor(props: wholeFormInterface) {
    super(props);
    this.getDynamicComponent = this.getDynamicComponent.bind(this);
  }

  getDynamicComponent(): any {
    let { formName } = this.props;
    // formName = formName.toLowerCase();

    switch (formName) {
      case "textinput":
        return TextInput;

      case "reactselect":
        return ReactSelect;

      default:
        return null;
    }
  }

  render() {
    const {
      formName,
      name,
      label,
      alignment,
      size,
      width,
      className,
      validators,
      error,
      loading,
    } = this.props;

    let inputclass = classnames({
      "genericForm-group": true,
      error: !isEmpty(error) && error,
      horizontalGenericForm: alignment && alignment == "horizontal",
      [className]: className,
      [size]: size,
    });

    let DynamicComponent = this.getDynamicComponent();
    const load = !isEmpty(loading) ? loading : false;
    return (
      <div
        id={name}
        validators={validators}
        className={inputclass}
        style={{ width }}
      >
        {label && !load && (
          <div className="genericForm-group__label">
            <label htmlFor={name} className="genericForm-group__label">
              {label}{" "}
              {!isEmpty(validators) && validators.find((f) => f == "required")
                ? " *"
                : ""}
            </label>
          </div>
        )}
        {DynamicComponent ? (
          <DynamicComponent {...this.props} />
        ) : (
          "Invalid form name"
        )}
        {error && <div className="genericForm-group__message">{error}</div>}
      </div>
    );
  }
}

export default index;
