import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import spinner from "../../spinner/spinner";

let ContactList = () => {
  let [query, setQuery] = useState({
    text: "",
  });

  let [state, setState] = useState({
    loading: false,
    contacts: [],
    filteredContacts: [],
    errorMessage: "",
  });

  useEffect(() => {
    // Fetch contacts data when the component mounts
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };

    fetchData();
  }, []);

  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        let response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
          filteredContacts: response.data,
        });
      }
    } catch (error) {
      setState({
        ...state,
        loading: false,
        errorMessage: error.message,
      });
    }
  };

  let searchContacts = (event) => {
    setQuery({ ...query, text: event.target.value });
    let theContacts = state.contacts.filter((contact) => {
      return contact.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setState({
      ...state,
      filteredContacts: theContacts,
    });
  };

  const { loading, contacts, errorMessage, filteredContacts } = state;

  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3">
                  Contact Manager{" "}
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" />
                    New
                  </Link>
                </p>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  molestias explicabo aut. Architecto deserunt incidunt sapiente
                  eum animi, nulla reprehenderit nobis similique, consectetur,
                  obcaecati excepturi veniam voluptates? Accusamus, assumenda
                  quisquam?
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row">
                  <div className="col">
                    <div className="mb-2">
                      <input
                        name="text"
                        value={query.text}
                        onChange={searchContacts}
                        type="text"
                        className="form-control"
                        placeholder="search names"
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-2">
                      <input
                        type="submit"
                        className="btn btn-outline-dark"
                        value="Search"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <spinner />
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                {filteredContacts.length > 0 &&
                  filteredContacts.map((contact) => {
                    return (
                      <div className="col-md-6">
                        <div className="card">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  className="contact-img"
                                  src={contact.photo}
                                  alt=""
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:{" "}
                                    <span className="fw-bold">
                                      {" "}
                                      {contact.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Number:{" "}
                                    <span className="fw-bold">
                                      {" "}
                                      {contact.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:{" "}
                                    <span className="fw-bold">
                                      {" "}
                                      {contact.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contact.id}`}
                                  className="btn btn-warning my-1"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contact.id}`}
                                  className="btn btn-primary my-1"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button
                                  onClick={() => clickDelete(contact.id)}
                                  className="btn btn-danger my-1"
                                >
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ContactList;
