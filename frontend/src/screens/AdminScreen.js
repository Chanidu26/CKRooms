import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import { Tag } from "antd";
import AdminRooms from "../components/AdminRooms";
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import AddRooms from "../components/AddRooms";
const baseUrl = process.env.REACT_APP_API_BASE_URL;
const { TabPane } = Tabs;

function AdminScreen() {
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (!user) {
            window.location.href = "/login";
        } else if (user.isAdmin === false) {
            window.location.href = "/";
        }
    });

    return (
        <div className="bs">
            <h2 className="mt-4">Admin Panel</h2>
            <div className="container mt-3">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Rooms" key="1">
                        <AdminRooms />
                    </TabPane>
                    <TabPane tab="Add Room" key="2">
                        <AddRooms />
                    </TabPane>
                    <TabPane tab="Bookings" key="3">
                        <Bookings />
                    </TabPane>
                    <TabPane tab="Users" key="4">
                        <Users />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default AdminScreen;

export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            const getBookings = async () => {
                setLoading(true);
                const response = await axios.get(
                    `${baseUrl}/api/bookings/getAllBookings`
                );
                setBookings(response.data);
                setLoading(false);
            };
            getBookings();
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }
    }, []);
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
                            <th scope="col">Room Name</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Payment Id</th>
                            <th scope="col">Booking Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{booking.roomName}</td>
                                    <td>{booking.fromDate}</td>
                                    <td>{booking.toDate}</td>
                                    <td>{booking.totalAmount} LKR</td>
                                    <td>{booking.transactionId}</td>
                                    <td>
                                        {booking.isBooked ? (
                                            <Tag color="green">Active</Tag>
                                        ) : (
                                            <Tag color="red">Canceled</Tag>
                                        )}
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

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(
        () => async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/api/users/getAllUsers`);
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
                console.log(error);
            }
        },
        []
    );
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
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">User Created at</th>
                            <th scope="col">User Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.userName}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {moment(user.createdAt).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </td>
                                    <td>
                                        {user.isAdmin ? (
                                            <Tag color="red">Admin</Tag>
                                        ) : (
                                            <Tag color="green">User</Tag>
                                        )}
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