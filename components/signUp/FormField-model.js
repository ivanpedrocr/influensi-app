export class TextField {
  name;
  args;
  constructor(name, args) {
    Object.assign(this, { name, type: "text", ...args });
  }
}
