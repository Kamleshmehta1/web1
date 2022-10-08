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
      if (ele.type !== "radio" && ele.type !== "checkbox") {
        this.rightContainer = document.createElement("div");
      }
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
    let element;
    arr.forEach((ele) => {
      if (type === "select") {
        element = document.createElement("select");
      } else if (type === "radio" || type === "checkbox") {
        element = document.createElement("input");
      }
      for (let x in ele) {
        console.log(ele[x]);
        if (typeof ele[x] === "object") {
          this.callRecursiveIteration(ele[x]);
        } else {
          if (x === "innerText") {
            element.innerText = ele[x]
          } else {
            element.setAttribute(x, ele[x])
          }
        }
      }
      this.rightElement.appendChild(element);
      if (type === "radio" || type === "checkbox") {
        this.rightContainer.appendChild(this.rightElement)
      }
    })
  }
}
