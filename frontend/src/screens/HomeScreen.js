import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space, Input, Radio } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Search } = Input;

function HomeScreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fromDate, setFromDate] = useState();
    const [toDate, setToDate] = useState();
    const [dateFilteredRooms, setDateFilteredRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        let getRes = async () => {
            try {
                setLoading(true);
                const response = (await axios.get("http://localhost:8000/api/rooms/getAllRooms"))
                    .data;
                setRooms(response);
                setFilteredRooms(response);
                setDateFilteredRooms(response);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getRes();
    }, []);

    function filterByDate(dates) {
        const startDate = moment(new Date(dates[0]), "DD-MM-YYYY");
        const endDate = moment(new Date(dates[1]), "DD-MM-YYYY");

        setFromDate(moment(startDate).format("DD-MM-YYYY"));
        setToDate(moment(endDate).format("DD-MM-YYYY"));

        var tempRooms = [];

        if (dates[0] === null || dates[1] === null) {
            setFilteredRooms(rooms);
        } else {
            for (const room of rooms) {
                if (room.bookedDates.length > 0) {
                    for (const booking of room.bookedDates) {
                        const start = moment(booking.fromDate,"DD-MM-YYYY");
                        const end = moment(booking.toDate, "DD-MM-YYYY");
                        console.log(startDate, endDate, moment(endDate).isSame(start));
                        if (!moment(startDate).isBetween(start, end) && !moment(endDate).isBetween(start, end)
                        && !moment(start).isBetween(startDate, endDate) && !moment(end).isBetween(startDate, endDate)
                        && !moment(startDate).isSame(start) && !moment(endDate).isSame(end)
                        && !moment(startDate).isSame(end) && !moment(endDate).isSame(start)
                        ) {
                            tempRooms.push(room);
                        }
                    }
                } else {
                    tempRooms.push(room);
                }
            }
            setDateFilteredRooms(tempRooms);
            setFilteredRooms(tempRooms);
        }
    }

    function filterBySearch(keyword) {

        if(keyword === "") {
            setFilteredRooms(dateFilteredRooms);
        } else {
            const temp = dateFilteredRooms.filter(room => room.name.toLowerCase().includes(keyword.toLowerCase()));
            setFilteredRooms(temp);
        }
    }

    function filterByType(type) {
        setSelectedType(type);

        if(type === "all"){
            setFilteredRooms(dateFilteredRooms);
        }else{
            const temp = dateFilteredRooms.filter(room => (room.roomType.toLowerCase()) === (type.toLowerCase()));
            setFilteredRooms(temp);
        }
    }

    return (
        <div className="container">
            <div className="row mt-5 justify-content-md-center">
                <div className="col-md-3 mt-2">
                    <Space direction="vertical" size={12}>
                        <RangePicker
                            format="DD-MM-YYYY"
                            onChange={filterByDate}
                        />
                    </Space>
                </div>
                <div className="col-md-3 mt-2">
                    <Space direction="vertical" size={12} >
                        <Search
                            placeholder="input search text"
                            allowClear
                            onSearch={(value) =>filterBySearch(value)}
                            style={{
                                width: 290,
                            }}
                        />
                    </Space>
                </div>
                <div className="col-md-3 mt-2">
                    <Radio.Group onChange={(e) => filterByType(e.target.value)} defaultValue={selectedType}>
                        <Radio.Button value="all">All</Radio.Button>
                        <Radio.Button value="deluxe">Deluxe</Radio.Button>
                        <Radio.Button value="non-deluxe">Non-Deluxe</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            <div className="row justify-content-center my-4 roomContainer">
                {loading ? (
                    <Loader />
                ) : filteredRooms ? (
                    filteredRooms.map((room) => {
                        return (
                            <div className="col-md-9 mb-2" key={room._id}>
                                <Room
                                    room={room}
                                    fromDate={fromDate}
                                    toDate={toDate}
                                />
                            </div>
                        );
                    })
                ) : (
                    <Error />
                )}
            </div>
            
        </div>
        

    );
}

export default HomeScreen;