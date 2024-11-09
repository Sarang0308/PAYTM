import { useState,useEffect } from "react";
import axios from "axios";

export const Balance = () => {
    const [balance, setBalance] = useState(null); // State to store balance


    useEffect(() => {
        // Fetch balance from API
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
        .then(res => {
            let { balance } = res.data; // Assuming 'amount' is in points
            balance = Math.floor(balance); // Round down to nearest integer
            setBalance(balance);
        })
        .catch(err => {
            console.error("Error fetching balance", err); // Add error handling
        });
    }, []);


    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance !== null ? balance : "Loading..."} 
        </div>
    </div>
}