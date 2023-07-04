/**
 * Interface for the message object
 * @property {string} message
 * @property {string} sender
 */
export interface IMessagesObject {
  message: string;
  sender: string;
}

/**
 * Interface for the BreadCrumbs modal
 * @property {(value: string) => void} onSubmit
 * @property {IMessagesObject} messages
 * @property {boolean} useChosenTextVerbage
 */
export interface IBreadCrumbsChat {
  onSubmit: (value: string) => void;
  messages: IMessagesObject[];
  useChosenTextVerbage: boolean;
}

/**
 * Interface for the BreadCrumbs modal
 * @property {boolean} isOpen
 * @property {() => void} onDismiss
 * @property {string[]} selectedText
 */
export interface IBreadCrumbsModal {
  isOpen: boolean;
  onDismiss: () => void;
  selectedText?: string[];
  initialBreakpoint?: number;
}
