import { useState } from "react";
import { useRecords } from "./recordsContext";
import { useNavigate } from "react-router-dom";
import Record from "./record";

function User() {
    const { record, setReload } = useRecords();
    const [loading, setLoading] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm(prevForm => ({
          ...prevForm,
          [name]: value
        }));
    }   

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
    
        try {
            const userResponse = await fetch("https://waldo-server-wx8s.onrender.com/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: form.username })
            });
    
            const userData = await userResponse.json();
            console.log("user", userData);
            if (!userResponse.ok) {
                setError(userData.message || "Failed to save user");
                return;
            }
            
            localStorage.setItem("user", JSON.stringify(userData.user));
            const userId = userData.user.id;
            if (!userId) {
                setError("User ID not returned from server");
                return;
            }
            
            const gameRecord = Record(userId, record, setReload);

            if (!gameRecord.ok) {
                setError(gameRecord);
            }   
    
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        navigate("/leader board");
    }
    
    return(
        <>
         <main>
            {loading && <p>Loading.... please wait.</p>}
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Username:{" "}
                    <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    />
                </label>
                <button type="submit">Sumbit</button>
            </form>
         </main>
        </>
    )
}

export default User;