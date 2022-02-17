import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.email}</td>
      <td>{contact.mobile}</td>
      <td>{contact.dob}</td>
      <td>{contact.jobtype}</td>
      <td>
        <button className="btn2" type="button"
          onClick={(event) => handleEditClick(event, contact)}>
          Edit
        </button>

        <button className="btn3" type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;