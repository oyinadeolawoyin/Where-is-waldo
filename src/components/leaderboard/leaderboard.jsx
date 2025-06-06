import { useRecords } from "./recordsContext";
import styles from './leaderboard.module.css';
import { Link } from "react-router-dom";

function Leaderboard() {
    const { records, error, loading } = useRecords();
    
    return (
        <div className={styles.body}>  
        <header>
            <h1><Link to="/" className={styles.link}>Where's&nbsp;<span>Wally?</span></Link></h1>
            <p>LeaderBoard</p>
        </header>
            <main>
                {error && <p>{error}</p>}
                {loading && <p>Loading... please wait. It might take a few minutes.</p>}
                <p><b>Check your Rank!</b></p>
                {records.length > 0 ? (
                    <ul>
                        <li className={`${styles.header} ${styles.head}`}>
                            <p>Username</p>
                            <p>Records</p>
                        </li>
                        {records.map((record) => (
                            <li key={record.id} className={`${styles.header} ${styles.records}`}>
                                <p>{record.user?.username || user.username}</p>
                                <p>{record.record} secs</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Records yet!</p>
                )}
            </main>
        </div>
    )
}

export default Leaderboard;