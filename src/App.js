import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    jobtype: "",

  });

  const [editFormData, setEditFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    jobtype: "",
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      email: addFormData.email,
      mobile: addFormData.mobile,
      dob: addFormData.dob,
      jobtype: addFormData.jobtype,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      email: editFormData.email,
      mobile: editFormData.mobile,
      dob: editFormData.dob,
      jobtype: editFormData.jobtype,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      email: contact.email,
      mobile: contact.mobile,
      dob: contact.dob,
      jobtype: contact.jobtype,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <center className="bgcontainer">
      <h1>Registration</h1>
      <form onSubmit={handleAddFormSubmit}>
        <div className="input1">
          <label for ="name"><b>Fullname</b></label>
          <input  type="text" name="fullName" required="required"
          id="name" onChange={handleAddFormChange} /> <br />
         
          <label className="form2" for ="image"><b>Profile Pic</b></label>
          <input type="file" name="profilepic"  required="required"
          id="image" onChange={handleAddFormChange}/> <br/>
        </div>
       
          <div className="input2">
          <label for ="name"><b>Mobile</b></label>
          <input type="text" name="mobile" required="required"
           onChange={handleAddFormChange} /> <br />
          <label className="form2" for ="name"><b>Email ID</b></label>
           <input type="email" name="email" required="required"
           onChange={handleAddFormChange} />
       </div> 

       <div className="input3">
          <label for ="name"><b>Job Type</b></label>
          <input type="text" name="jobtype" required="required"
           onChange={handleAddFormChange} /> <br />

           <label className="form2" for ="name"><b>DOB</b></label>
           <input  type="date" name="dob" required="required"
           onChange={handleAddFormChange} />
       </div> 
       <button className="btn1">Add/Update</button>
      </form>
      </center>


      <form className="downform" onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>DOB</th>
              <th>JobType</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      
    </div>
  );
     }


export default App