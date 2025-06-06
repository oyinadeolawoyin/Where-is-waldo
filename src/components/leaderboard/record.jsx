async function Record(userId, record, setReload) {
    const recordResponse = await fetch(`https://waldo-server-wx8s.onrender.com/api/user/gameRecord`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            userId: Number(userId),
            record: Number(record)
        })
    });

    const recordData = await recordResponse.json();
    setReload(recordData);

    if (!recordResponse.ok) {
        throw new Error(recordData.message || "Failed to save game record");
    }
    
    return recordData.message;
}

export default Record;