import React, { useEffect } from "react";
import { Tabs } from "antd";
import MyBookings from "../components/MyBookings";
import Profile from "../components/Profile";

const { TabPane } = Tabs;

function ProfileScreen() {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, [user]);

    return (
        <div>
            <div className="profileContainer mt-3">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Bookings" key="1">
                        <MyBookings />
                    </TabPane>
                    <TabPane tab="Profile" key="2">
                        <Profile />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
export default ProfileScreen;