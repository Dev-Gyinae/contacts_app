import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/spinner";

const ViewContact = () => {
  // Retrieve the contactId parameter from the URL
  let { contactId } = useParams();

  // Define the state variables using the useState hook
  let [state, setState] = useState({
    loading: false, // Indicates if the data is being loaded
    contact: {}, // Stores the contact details
    errorMessage: "", // Stores any error message
    group: {}, // Stores the group details
  });

  // Use the useEffect hook to fetch the contact and group data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set the loading state to true
        setState({ ...state, loading: true });

        // Fetch the contact details using the contactId
        let response = await ContactService.getContact(contactId);

        // Fetch the group details associated with the contact
        let groupResponse = await ContactService.getGroup(response.data);

        // Update the state with the fetched data and set loading to false
        setState({
          ...state,
          loading: false,
          contact: response.data,
          group: groupResponse.data,
        });
      } catch (error) {
        // If an error occurs, update the state with the error message and set loading to false
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };

    fetchData();
  }, [contactId]);

  // Destructure the state variables for easier access
  let { loading, contact, errorMessage, group } = state;

  return (
    <React.Fragment>
      {/* Display the intro section */}
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Voluptas necessitatibus magni error non maiores quas? Accusamus,
                animi excepturi! In maxime beatae ut ratione! Quas, neque. Illo
                at nam totam ad.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Display a spinner if the data is still loading */}
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {/* Render the contact details and group information */}
          {Object.keys(contact).length > 0 && Object.keys(group).length > 0 && (
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row align-items-center">
                  <div className="col-md-4">
                    {/* Display the contact's photo */}
                    <img className="contact-img" src={contact.photo} alt="" />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      {/* Display the contact details */}
                      <li className="list-group-item list-group-item-action">
                        Name: <span className="fw-bold"> {contact.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Number:{" "}
                        <span className="fw-bold">{contact.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email: <span className="fw-bold">{contact.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company:{" "}
                        <span className="fw-bold">{contact.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title: <span className="fw-bold">{contact.title}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Group: <span className="fw-bold">{group.name}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    {/* Provide a link to navigate back to the contact list */}
                    <Link to={"/contacts/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ViewContact;
