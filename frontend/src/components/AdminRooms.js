import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import Error from "./Error";
import axios from "axios";
import Swal from "sweetalert2";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchRooms() {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/api/rooms/getAllRooms`);
                setRooms(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);
            }
        }
        fetchRooms();
    }, []);

    const deleteRoom = (roomId) => {
        try{
            setLoading(true);
            axios.get(`${baseUrl}/api/rooms/deleteRoom/${roomId}`);
            setLoading(false);
            Swal.fire({
                title: "Room Deleted Successfully",
                text: "Press 'OK' to redirect",
                icon: "success",
            }).then(results => {
                window.location.reload();
            })

        }catch(error){
            setError(true);
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <div class="table-responsive">
                <table class="table table-striped text-start">
                    <thead class="thead">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Room ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Type</th>
                            <th scope="col">Max Visitor Count</th>
                            <th scope="col">Price (Per Day)</th>
                            <th scope="col">Phone No</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.roomType}</td>
                                    <td>{room.maxCount}</td>
                                    <td>{room.pricePerDay} LKR</td>
                                    <td>{room.phoneNo}</td>
                                    <td>
                                        <span className="material-symbols-outlined" id={`delete-${index}`} onClick={() => deleteRoom(room._id)} >
                                            delete
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    );
}

export default AdminRooms;