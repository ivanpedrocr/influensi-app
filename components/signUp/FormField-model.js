export class TextField {
  name;
  args;
  constructor(name, args) {
    Object.assign(this, { name, type: "text", ...args });
  }
}

export class DatePickerField {
  name;
  args;
  constructor(name, args) {
    Object.assign(this, { name, type: "date-picker", ...args });
  }
}

export class PickerField {
  name;
  args;
  constructor(name, args) {
    Object.assign(this, { name, type: "picker", ...args });
  }
}

export class RadioButtonField {
  name;
  args;
  constructor(name, args) {
    Object.assign(this, { name, type: "radio_button", ...args });
  }
}
