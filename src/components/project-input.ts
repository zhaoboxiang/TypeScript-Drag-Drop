/// <reference path="base-component.ts" />

namespace App {
  // ProjectInput class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.configure();
    }

    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent() {}

    private clearInput() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    private getTheUserInputs(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const enteredTitleValidate: Validatable = {
        value: enteredTitle,
        required: true,
      };
      const enteredDescriptionValidate: Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };
      const enteredPeopleValidate: Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(enteredTitleValidate) ||
        !validate(enteredDescriptionValidate) ||
        !validate(enteredPeopleValidate)
      ) {
        alert("Invaid input! please try again.");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();

      const userInput = this.getTheUserInputs();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        //   console.log(title, description, people);
        projectState.addProject(title, description, people);
        this.clearInput();
      }
    }
  }
}
