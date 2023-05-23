import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/spinner";

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

  // State variables to manage the component state
  const [state, setState] = useState({
    loading: false, // Loading state for displaying a spinner
    contact: {
      // Object to hold the contact data
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
    },
    groups: [], // Array to hold the available groups
    errorMessage: "", // Error message if any error occurs
  });

  useEffect(() => {
    // Fetch contact and group data when the component mounts
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true }); // Set loading state to true
        let response = await ContactService.getContact(contactId); // Fetch the contact data
        let groupResponse = await ContactService.getGroups(); // Fetch the group data
        setState({
          ...state,
          loading: false, // Set loading state to false
          contact: response.data, // Set the contact data
          groups: groupResponse.data, // Set the group data
        });
      } catch (error) {
        setState({
          ...state,
          loading: false, // Set loading state to false
          errorMessage: error.message, // Set the error message if an error occurs
        });
      }
    };

    fetchData();
  }, [contactId]);

  let updateInput = (event) => {
    // Update the input field values when they change
    setState({
      ...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.updateContact(
        state.contact,
        contactId
      );
      if (response) {
        navigate("/contacts/list", { replace: true }); // Navigate to the contact list page
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate(`/contacts/edit/${contactId}`, { replace: false });
    }
  };

  let { contact, errorMessage, groups, loading } = state;

  return (
    <React.Fragment>
      {loading ? (
        <Spinner /> // Show a spinner while the data is being loaded
      ) : (
        <React.Fragment>
          <section className="add-contact">
            <div className="container">
              {/* Form for editing contact details */}
              <div className="row">
                <div className="col">
                  <p className="h4 text-primary fw-bold"> Edit Contact</p>
                  <p className="fst-italic">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quisquam magnam sequi dolor, suscipit dignissimos inventore
                    nihil. Dignissimos, blanditiis expedita fuga doloremque
                    sapiente quo iusto tenetur distinctio placeat qui, possimus
                    ad.
                  </p>
                </div>
              </div>
              <div className="row align-items-center">
                <div className="col-md-4">
                  <form onSubmit={submitForm}>
                    {/* Input fields for editing contact details */}
                    <div className="mb-2">
                      <input
                        required
                        name="name"
                        value={contact.name}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        onChange={updateInput}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name="photo"
                        value={contact.photo}
                        type="text"
                        className="form-control"
                        placeholder="Photo Url"
                        onChange={updateInput}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name="mobile"
                        value={contact.mobile}
                        type="number"
                        className="form-control"
                        placeholder="Mobile"
                        onChange={updateInput}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name="email"
                        value={contact.email}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        onChange={updateInput}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name="company"
                        value={contact.company}
                        type="text"
                        className="form-control"
                        placeholder="Company"
                        onChange={updateInput}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        required
                        name="title"
                        value={contact.title}
                        type="text"
                        className="form-control"
                        placeholder="Title"
                        onChange={updateInput}
                      />
                    </div>

                    <div className="mb-2">
                      <select
                        required
                        name="groupId"
                        value={contact.groupId}
                        className="form-control"
                        onChange={updateInput}
                      >
                        <option value=""> Choose Category </option>
                        {/* Dropdown options for selecting a group */}
                        {groups.length > 0 &&
                          groups.map((group) => {
                            return (
                              <option key={group.id} value={group.id}>
                                {" "}
                                {group.name}{" "}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Update"
                      />
                      <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                        {" "}
                        Cancel{" "}
                      </Link>
                    </div>
                  </form>
                </div>
                <div className="col-md-6">
                  <img className="contact-img" src={contact.photo} alt="" />
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default EditContact;
