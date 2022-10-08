class Form {
  constructor(formContainerId, formData) {
    this.renderForm(formContainerId, formData);
    this.globalObject = {};
    // Pass formContainerId to append form element inside of HTML DIV element
    this.mainContainer;
    this.leftContainer;
    this.rightContainer;
    this.leftElement;
    this.rightElement;
  }
  // create methods/event to create form/ reset form/ submit form, etc
  isValidElement(input) {
    return document.createElement(input).toString() != "[object HTMLUnknownElement]";
  }

  renderForm(formContainerId, formData) {
    formData.forEach((ele) => {
      this.leftElement = document.createElement("label");
      this.rightElement = document.createElement(`${this.isValidElement(ele.type) ? ele.type : "input"}`);
      this.leftContainer = document.createElement("div");
      this.rightContainer = document.createElement("div");
      this.mainContainer = document.createElement("div");
      this.mainContainer.id = "inputLabel"
      this.callRecursiveIteration(ele)
      this.leftContainer.appendChild(this.leftElement)
      this.leftContainer.classList = "left";
      this.rightContainer.appendChild(this.rightElement)
      this.rightContainer.classList = "right";
      this.mainContainer.appendChild(this.leftContainer);
      this.mainContainer.appendChild(this.rightContainer);
      formContainerId.appendChild(this.mainContainer)
    })
  }

  callRecursiveIteration(Obj) {
    for (let key in Obj) {
      if (Obj?.type && Array.isArray(Obj[key])) {
        this.iterateArray(Obj[key], Obj.type);
      }
      if (typeof Obj[key] === "object") {
        this.callRecursiveIteration(Obj[key]);
      } else {
        this.rightElement.setAttribute(key, Obj[key] ? Obj[key] : "");
        if (this.leftElement && key === "id") {
          this.leftElement.setAttribute("for", Obj[key])
        } else if (this.leftElement && key === "label" && Obj?.type !== "hidden") {
          this.leftElement.innerHTML = Obj[key];
        }
      }
    }
  }

  iterateArray(arr, type) {
    arr.forEach((ele) => {
      let element = document.createElement(`${type === "select" ? "option" : type}`);
      for (let x in ele) {
        
      }
      this.rightElement.appendChild(element);
    })
  }
}