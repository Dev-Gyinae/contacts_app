import React from "react";
import { Link } from "react-router-dom";

let ViewContact = () => {
    return (
        <React.Fragment>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h3 text-warning fw-bold">View Contact</p>
                            <p className="fst-italic"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas necessitatibus magni error non maiores quas? Accusamus, animi excepturi! In maxime beatae ut ratione! Quas, neque. Illo at nam totam ad.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="view-contact mt-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <img className="contact-img" src="https://www.pngmart.com/files/22/User-Avatar-Profile-PNG.png" alt="" />
                        </div>
                        <div className="col-md-8">
                             <ul className="list-group">
                                            <li className="list-group-item list-group-item-action">
                                                Name: <span className="fw-bold"> Anna Maria</span>
                                            </li>

                                             <li className="list-group-item list-group-item-action">
                                                Number: <span className="fw-bold"> 12324356567676</span>

                                            </li>

                                             <li className="list-group-item list-group-item-action">
                                                Email: <span className="fw-bold"> asasadadadsds@yahoo.com</span>

                                            </li>
                                               <li className="list-group-item list-group-item-action">
                                                Company: <span className="fw-bold"> asasadadadsds@yahoo.com</span>

                                            </li>
                                               <li className="list-group-item list-group-item-action">
                                                Title: <span className="fw-bold"> asasadadadsds@yahoo.com</span>

                                            </li>
                                               <li className="list-group-item list-group-item-action">
                                                Group: <span className="fw-bold"> asasadadadsds@yahoo.com</span>

                                            </li>
                                        </ul>
                        </div>
                        
                    </div>
                    <div className="row">
                        <div className="col">
                            <Link to={'/contacts/list'} className="btn btn-warning">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default ViewContact;