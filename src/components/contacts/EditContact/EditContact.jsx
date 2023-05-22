import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../../services/ContactService";
import Spinner from "../../spinner/spinner";

const EditContact = () => {
  let navigate = useNavigate();
  let { contactId } = useParams();

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
    },
    groups: [],
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        let response = await ContactService.getContact(contactId);
        let groupResponse = await ContactService.getGroups();
        setState({
          ...state,
          loading: false,
          contact: response.data,
          groups: groupResponse.data,
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
  }, [contactId]);

  let updateInput = (event) => {
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
        navigate("/contacts/list", { replace: true });
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
        <Spinner />
      ) : (
        <React.Fragment>
          <section className="add-contact">
            <div className="container">
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
