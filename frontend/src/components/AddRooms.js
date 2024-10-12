import React, { useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AddRooms() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setRoomName] = useState("");
    const [roomType, setRoomType] = useState("");
    const [pricePerDay, setPricePerDay] = useState(0);
    const [phoneNo, setPhoneNo] = useState("");
    const [description, setDescription] = useState("");
    const [maxCount, setMaxCount] = useState(0);
    const [imageOne, setImageOne] = useState("");
    const [imageTwo, setImageTwo] = useState("");
    const [imageThree, setImageThree] = useState("");

    async function addRoom() {
        try {
            setLoading(true);
            const room = {
                name,
                imgURL : [imageOne,imageTwo,imageThree],
                pricePerDay,
                roomType,
                maxCount,
                phoneNo,
                bookedDates: [],
                description,
            };
            await axios.post(`${baseUrl}/api/rooms/addRoom`, room);
            setLoading(false);
            Swal.fire({
                title: "Room Added Successfully",
                text: "Press 'OK' to redirect to Room List",
                icon: "success",
            }).then(results => {
                window.location.href = '/admin'
            })
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <div className="container">
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <div className="row mt-1">
                    <div className="col-md-6">
                        <h3
                            className="text-start"
                            style={{ fontWeight: "bold" }}
                        >
                            Add Room
                        </h3>
                        <hr />
                        <input
                            type="text"
                            className="form-control inputs"
                            placeholder="Room Name"
                            value={name}
                            onChange={(e) => {
                                setRoomName(e.target.value);
                            }}
                            required
                        />
                        <div className="row">
                            <div className="col-md-4">
                                <input
                                    type="number"
                                    className="form-control inputs"
                                    placeholder="Visitor Count"
                                    onChange={(e) => {
                                        setMaxCount(Number(e.target.value));
                                    }}
                                    required
                                />
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control inputs"
                                    placeholder="Image-1 URL"
                                    onChange={(e) => {
                                        setImageOne(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <div class="input-group mb-3">
                                    <input
                                        type="number"
                                        class="form-control"
                                        placeholder="Price Per Day"
                                        onChange={(e) => {
                                            setPricePerDay(
                                                Number(e.target.value)
                                            );
                                        }}
                                        required
                                    />
                                    <div class="input-group-prepend">
                                        <div class="input-group-text" style={{ height: "45px" }}>LKR</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control inputs"
                                    placeholder="Image-2 URL"
                                    onChange={(e) => {
                                        setImageTwo(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4">
                                <select
                                    class="form-select"
                                    id="ControlSelect"
                                    style={{ height: "45px" }}
                                    onChange={(e) => {
                                        setRoomType(e.target.value);
                                    }}
                                >
                                    <option disabled>Select Type</option>
                                    <option value="deluxe">Deluxe</option>
                                    <option value="non-deluxe">
                                        Non-Deluxe
                                    </option>
                                </select>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    className="form-control inputs"
                                    placeholder="Image-3 URL"
                                    onChange={(e) => {
                                        setImageThree(e.target.value);
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        <input
                            type="number"
                            className="form-control inputs"
                            placeholder="Phone Number"
                            onChange={(e) => {
                                setPhoneNo(e.target.value);
                            }}
                            required
                        />

                        <textarea
                            className="form-control"
                            placeholder="Description"
                            rows="3"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            required
                        ></textarea>

                        <button
                            className="btn btn-primary my-3"
                            onClick={addRoom}
                        >
                            Add Room
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddRooms;