import { useRecords } from "./recordsContext";

function Leaderboard() {
    const { records, error, loading } = useRecords();
   
    return (
        <>  
            <header>
                <h1>Leader Board</h1>
            </header>
            <main>
                {error && <p>{error}</p>}
                {loading && <p>Loading... please wait. It might take a few minutes.</p>}
                
                {records.length > 0 ? (
                    <ul>
                        <li>
                            <p>Username</p>
                            <p>Records</p>
                        </li>
                        {records.map((record) => (
                            <li key={record.id}>
                            <p>{record.user.username}</p>
                            <p>{record.record} secs</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No game yet!</p>
                )}
            </main>
        </>
    )
}

export default Leaderboard;