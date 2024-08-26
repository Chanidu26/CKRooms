import React from "react";
import { Tag } from "antd";
import Link from "antd/es/typography/Link";

function Profile() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <div className="text-start mx-4">
            <h2 className="mt-1 ">My Profile</h2>
            <div style={{ fontSize: "1.1rem" }} className="mt-3">
                <p>First Name : {user.firstName}</p>
                <p>Last Name : {user.lastName}</p>
                <p>Email : {user.email}</p>
                <p>
                    Profile Status :{" "}
                    {user.isAdmin ? (
                        <Tag color="red">ADMIN</Tag>
                    ) : (
                        <Tag color="green">USER</Tag>
                    )}
                </p>
                {user.isAdmin && (
                    <Link href="/admin">
                    <button
                        className="btn btn-primary"
                        style={{
                            backgroundColor: "#323232",
                            boxShadow: "none",
                            borderColor: "#323232",
                        }}
                    >
                        Admin Dashboard
                    </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Profile;