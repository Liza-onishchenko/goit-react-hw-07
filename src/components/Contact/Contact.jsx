import React from "react";
import ContactList from "../ContactList/ContactList";
import css from "./Contact.module.css";

const Contact = ({ name, number, id, onDeleteContacts }) => {
  return (
    <li className={css.listItemContact}>
      🙍‍♂️ {name}: 📱{number}
      <button
        type="button"
        onClick={() => onDeleteContacts(id)}
        className={css.buttonContacts}
      >
        Delete
      </button>
    </li>
  );
};

export default Contact;
