import React, { useState } from "react";
import { Modal, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

function Room({ room, fromDate, toDate }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row bShadow">
            <div className="col-md-4">
                <img src={room.imgURL[0]} className="smallImg" alt=""></img>
            </div>
            <div className="col-md-7 text-start mt-2">
                <h4>{room.name}</h4>
                <p>Max Count :{room.maxCount}</p>
                <p>Phone no :{room.phoneNo}</p>
                <p>Type : {room.roomType}</p>

                <div style={{ float: "right" }}>
                    {(fromDate && toDate) && (
                        <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                            <button
                                className="btn btn-primary m-3"
                                style={{
                                    backgroundColor: "#323232",
                                    boxShadow: "none",
                                    borderColor: "#323232",
                                }}
                            >
                                Book Now
                            </button>
                        </Link>
                    )}
                    <button
                        className="btn btn-primary viewDetailsBtn"
                        style={{
                            backgroundColor: "#323232",
                            boxShadow: "none",
                            borderColor: "#323232",
                            
                        }}
                        onClick={handleShow}
                    >
                        View Details
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} size="large">
                <Modal.Header closeButton>
                    <Modal.Title className="popupTitle">
                        {room.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imgURL.map((img) => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100 bigImg"
                                        src={img}
                                        alt="First slide"
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                    <p className="popupDescription">{room.description}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Room;