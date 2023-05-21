import React from "react";
import { Link } from "react-router-dom";

let AddContact = () => {
    return (
        <React.Fragment>
            <section className="add-contact">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="h4 text-success fw-bold"> Create Contact</p>
                            <p className="fst-italic">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam magnam sequi dolor, suscipit dignissimos inventore nihil. Dignissimos, blanditiis expedita fuga doloremque sapiente quo iusto tenetur distinctio placeat qui, possimus ad.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <form>
                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Name"/>

                                </div>
                                                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Photo Url"/>
                                    
                                </div>
                                                                <div className="mb-2">
                                    <input type="number" className="form-control" placeholder="Mobile"/>
                                    
                                </div>
                                                                <div className="mb-2">
                                    <input type="email" className="form-control" placeholder="Email"/>
                                    
                                </div>
                                                                <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Company"/>
                                    
                                </div>
                                        <div className="mb-2">
                                    <input type="text" className="form-control" placeholder="Title"/>
                                    
                                </div>
                                
                                <div className="mb-2">
                                    <select className="form-control">
                                        <option value=""> Choose Category </option>
                                    </select>
                                </div>
                                     <div className="mb-2">
                                         <input type="submit" className="btn btn-success" value="Create"/>
                                         <Link to={'/contacts/list'} className="btn btn-dark ms-2"> Close </Link> 
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

export default AddContact;