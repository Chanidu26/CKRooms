import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";

function BookingScreen() {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});
    const [access, setAccess] = useState(false);
    const [error, setError] = useState(false);
    let { roomId, fromDate, toDate } = useParams();

    const start = moment(fromDate,"DD-MM-YYYY");
    const end = moment(toDate, "DD-MM-YYYY");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (currentUser && room) {
            setAccess(true);
        } else {
            window.location.href = "/login";
        }
    }, [currentUser, room]);

    const totalDays =
        moment
            .duration(
                moment(toDate, "DD-MM-YYYY").diff(
                    moment(fromDate, "DD-MM-YYYY")
                )
            )
            .asDays() + 1;

    useEffect(() => {
        let getRes = async () => {
            try {
                setLoading(true);
                const response = (
                    await axios.post("http://localhost:8000/api/rooms/getRoomById", {
                        RoomId: roomId,
                    })
                ).data;
                setRoom(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(true);
            }
        };
        getRes();
    }, [roomId]);

    async function bookRoom(transaction) {
        const bookingDetails = {
            roomId,
            userId: currentUser._id,
            roomName: room.name,
            fromDate: moment(start).format("DD-MM-YYYY"),
            toDate: moment(end).format("DD-MM-YYYY"),
            totalAmount: totalDays * room.pricePerDay,
            totalDays,
            transactionId: transaction.id,
        };

        console.log(bookingDetails);

        await axios.post("/api/bookings/bookRoom", bookingDetails).then(
            (response) => {
                Swal.fire({
                    title: "Your booking is successful",
                    text: "Please check your email for more details",
                    icon: "success",
                }).then(() => {
                    window.location.href = "/profile";
                });
                
            },
            (error) => {
                setError(true);
                console.log(error);
            }
        );
    }

    async function onToken(token) {
        const stripeToken = {
            token,
            amount: totalDays * room.pricePerDay,
            description: room.name,
        }
        await axios.post("/api/bookings/payment", stripeToken).then(
            (response) => {
                bookRoom(response.data);
            }, (error) => {
                console.log(error);
                setError(true);
            });
    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : access && !error ? (
                <div className="bookingContainer">
                    <div className="row">
                        <div className="col-md-6">
                            <Carousel style={{width : "100%"}}>
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
                        </div>
                        <div className="col-md-6">
                            <h4>{room.name}</h4>
                            <div
                                style={{
                                    textAlign: "left",
                                    marginTop: "20px",
                                    marginLeft: "20px",
                                }}
                            >
                                <p style={{ fontWeight: "bold" }}>
                                    Booking Details
                                </p>
                                <p>
                                    Customer's Name : {currentUser.firstName}{" "}
                                    {currentUser.lastName}
                                </p>
                                <p className="marginReducer">
                                    From Date : {fromDate}
                                </p>
                                <p className="marginReducer">
                                    To Date : {toDate}
                                </p>
                                <p className="marginReducer">
                                    Room Type : {room.roomType}
                                </p>
                                <p className="marginReducer">
                                    Max Guests Count : {room.maxCount}
                                </p>

                                <p style={{ fontWeight: "bold" }}>Amount</p>
                                <p>Type : {room.roomType}</p>
                                <p className="marginReducer">
                                    Price Per Day : {room.pricePerDay}/= LKR
                                </p>
                                <p className="marginReducer">
                                    Total Days : {totalDays}{" "}
                                </p>
                                <p className="marginReducer">
                                    Price : {totalDays * room.pricePerDay}/= LKR
                                </p>
                            </div>
                            

                            <StripeCheckout
                                amount={totalDays * room.pricePerDay * 100}
                                currency="LKR"
                                token={onToken}
                                stripeKey="pk_test_51OW27PIgh0lMKMevGMnDm4suVchcjJqo78U5Zw86wYtbRbg1af16R1JXdYsKhzYhnFnyycKuoLyE3RtbmTR9sYPe00cNsii5yG"
                            >
                            <button
                                className="btn btn-primary bookNowBtn"
                                style={{
                                    backgroundColor: "#323232",
                                    boxShadow: "none",
                                    borderColor: "#323232",
                                    float: "right",
                                    marginTop: "20px",
                                }}
                            >
                                Pay Now
                            </button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            ) : (
                <Error />
            )}
        </div>
    );
}

export default BookingScreen;