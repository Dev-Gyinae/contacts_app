import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";

const AddContact = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    loading: false,
    contact: {
      name: "",
      photo: "",
      mobile: "",
      email: "",
      company: "",
      title: "",
      groupId: "",
      id: "",
    },
    groups: [],
    errorMessage: "",
  });

  const updateInput = (event) => {
    setState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [event.target.name]: event.target.value,
      },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));

        let response = await ContactService.getGroups();

        setState((prevState) => ({
          ...prevState,
          loading: false,
          groups: response.data,
        }));
      } catch (error) {
        // Handle the error if needed
      }
    };

    fetchData();
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      let response = await ContactService.createContact(state.contact);
      if (response) {
        navigate("/contacts/list", { replace: true });
      }
    } catch (error) {
      setState({ ...state, errorMessage: error.message });
      navigate("/contacts/add", { replace: false });
    }
  };

  const { loading, contact, errorMessage, groups } = state;

  return (
    <>
      <section className="add-contact">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Quisquam magnam sequi dolor, suscipit dignissimos inventore
                nihil. Dignissimos, blanditiis expedita fuga doloremque sapiente
                quo iusto tenetur distinctio placeat qui, possimus ad.
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <form onSubmit={submitForm}>
                <div className="mb-2">
                  <input
                    name="name"
                    value={contact.name}
                    onChange={updateInput}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Name"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="photo"
                    value={contact.photo}
                    onChange={updateInput}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Photo Url"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="mobile"
                    value={contact.mobile}
                    onChange={updateInput}
                    required
                    type="number"
                    className="form-control"
                    placeholder="Mobile"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="email"
                    value={contact.email}
                    onChange={updateInput}
                    required
                    type="email"
                    className="form-control"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="company"
                    value={contact.company}
                    onChange={updateInput}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Company"
                  />
                </div>
                <div className="mb-2">
                  <input
                    name="title"
                    value={contact.title}
                    onChange={updateInput}
                    required
                    type="text"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>

                <div className="mb-2">
                  <select
                    name="groupId"
                    value={contact.groupId}
                    onChange={updateInput}
                    required
                    className="form-control"
                  >
                    <option value="">Choose Category</option>
                    {groups.length > 0 &&
                      groups.map((group) => (
                        <option key={group.id} value={group.id}>
                          {group.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="mb-2">
                  <input
                    type="submit"
                    className="btn btn-success"
                    value="Create"
                  />
                  <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                    Close
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
