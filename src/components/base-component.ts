namespace App {
    // Component Base Class
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        element: U;  // HTMLElement  and HTMLFormElement;
        hostElement : T; //HTMLDivElement;

        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild as U;
            if(newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }

        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning? 'afterbegin':'beforeend', this.element);
        }

        abstract configure(): void;
        abstract renderContent(): void;    // private abstract is not possible
    }

}
