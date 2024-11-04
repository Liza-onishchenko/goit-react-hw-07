import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./contactsOps";
import { selectorFilter } from "./filterSlice";

const INITIAL_STATE = {
  items: [],
  isLoading: false,
  error: null,
};

//слайс фабрика(чорнетка)
export const contactsSlice = createSlice({
  name: "contacts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //зовнішні редюсери. опрацьовуємо 3 методи
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

//Згенерували фабрику reducer(цех) підєднати до стору
export const contactsReducer = contactsSlice.reducer;

//селектори
export const selectorContacts = (state) => state.contactsData.items;
export const getIsLoading = (state) => state.contactsData.isLoading;
export const getError = (state) => state.contactsData.error;

//мемоізований селектор
export const selectFilteredContacts = createSelector(
  [selectorContacts, selectorFilter],
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    )
);
