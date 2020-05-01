import Cmp from "./base-component";
import {autobind as Autobind} from "../decorators/autobind";
import {projectState} from "../state/project-state";
import * as Validation from "../util/validation";

// Project Input class
export class ProjectInput extends Cmp<HTMLDivElement, HTMLFormElement>{
        // templateElement: HTMLTemplateElement;
        // element: HTMLFormElement;
        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;
        // hostElement: HTMLDivElement;

        constructor() {
            super('project-input', 'app', true, 'user-input');
            // this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            // const importedNode = document.importNode(this.templateElement.content, true);
            // this.element = importedNode.firstElementChild as HTMLFormElement;
            // this.element.id = 'user-input';
            this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
            this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;
            // this.hostElement = document.getElementById('app')! as HTMLDivElement;
            this.configure();
            // this.attach();
        }

        /* private attach() {
             this.hostElement.insertAdjacentElement('afterbegin', this.element);
         }*/

        /*private*/ configure() {
            this.element.addEventListener('submit', this.submitHandler);
        }

        renderContent() {
        }

        @Autobind
        private submitHandler(event: Event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if(Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                console.log(title, desc, people);
                projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }

        private gatherUserInput(): [string, string, number] | void {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;

            const titleValidatable: Validation.Validatable = {
                value: enteredTitle,
                required: true
            };

            const descriptionValidatable: Validation.Validatable = {
                value: enteredDescription,
                required: true,
                minLength: 5
            };

            const peopleValidatable: Validation.Validatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5
            };
            if(!Validation.validate(titleValidatable) || !Validation.validate(descriptionValidatable) ||
                !Validation.validate(peopleValidatable)) {
                alert('Invalid input, please try again!')
            } else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descriptionInputElement.value = '';
            this.peopleInputElement.value = '';
        }
    }


