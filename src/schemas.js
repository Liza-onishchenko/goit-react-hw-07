import * as Yup from "yup";

const phoneNumber = /^\+380\d{9}$/;

const AddContactsSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Занадто коротко!")
    .max(50, "Занадто довго!")
    .required("Ім'я обов'язкове"),
  number: Yup.string()
    .matches(phoneNumber, "Неправильний номер. Номер має бути +380XXXXXXXXX")
    .required("Номер обов'язковий"),
});

export default AddContactsSchema;
