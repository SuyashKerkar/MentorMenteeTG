const { connection } = require('../../config/dbconfig');
const fs = require('fs');
exports.cocurrAct = (body, files) => {
    const cocurriact = JSON.parse(body.Cocurriact);
    const getS_id = "SELECT s_id FROM login WHERE email = ?";

    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], async (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err); // Reject the promise in case of error
            }
            if (user.length > 0) {
                let s_id = user[0].s_id;

                const selectActivities =
                    "SELECT * FROM mentor.student_cocurricula_activity WHERE s_id = ?";

                // Execute the second query
                connection.query(selectActivities, [s_id], (err, result) => {
                    if (err) {
                        console.error("Error fetching student details:", err);
                        return reject(err); // Reject the promise in case of error
                    }

                    if (result.length > 0) {
                            if (result.length == cocurriact.length) {
                                cocurriact.forEach((activity) => {
                                    updatecocurriactRecord(activity, files)
                                })
                                resolve({ message: "Student internship details updated successfully" });
                            } else if (result.length < cocurriact.length) {
                                cocurriact.forEach((activity) => {
                                    if (activity.idx < result.length) {
                                        updatecocurriactRecord(activity, files)
                                    } else {
                                        insertcocurriactRecord(s_id, activity, files)
                                    }
                                })
                                resolve({ message: "Student internship details updated successfully" });
                            } else if (result.length > cocurriact.length) {
                                // No such case handled by deleteInternshipRecord
                            }
                    } else {
                        // No existing records, proceed directly to insertion
                        insertcocurriactRecords(s_id, cocurriact, resolve, reject, files);
                    }
                });
            }
        });
    })
}

exports.delActivity = (co_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM mentor.student_cocurricula_activity WHERE co_id = ?";
        connection.query(query, [co_id], (err, result) => {
            if (err) {
                reject(err);
            }
            
            deleteFileIfExists(result[0].activity_certificate_path).then(() => {
                const deleteQuery = "DELETE FROM mentor.student_cocurricula_activity WHERE co_id = ?";
                connection.query(deleteQuery, [co_id], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                });
            }).catch((err) => {
                console.error("Error during file deletion or record deletion:", err);
            });
            resolve(result);
        });
    })
}

exports.getcocurrAct = (email) => {
    return new Promise(async (resolve, reject) => {
        const getS_id = "SELECT s_id FROM mentor.login WHERE email = ?";
        await connection.query(getS_id, [email], async (err, user) => {
            if (err) {
                reject(err);
            }
            let s_id = user[0].s_id;
            const query = "SELECT * FROM mentor.student_cocurricula_activity WHERE s_id = ?";
            await connection.query(query, [s_id], (err, activitys) => {
                if (err) {
                    reject(err);
                }
                resolve(activitys);
            })
        })
    })
}

const deleteFileIfExists = (filePath) => {
    return new Promise((resolve, reject) => {
        if (filePath) {
            fs.access(filePath, fs.constants.F_OK, (err) => {
                if (!err) {
                    // File exists, remove it
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error removing file:', err);
                            return reject(err); // Reject the promise for file deletion
                        } else {
                            resolve(); // Resolve the file deletion promise
                        }
                    });
                } else {
                    resolve(); // File does not exist, resolve immediately
                }
            });
        } else {
            resolve(); // No path, resolve immediately
        }
    });
};


const insertcocurriactRecord = (s_id, activitys, files) => {
    const { date, sem, activity, status, document} = activitys;
    const insertQuery = `INSERT INTO mentor.student_cocurricula_activity (s_id, date, semester, activity, status, activity_certificate, activity_certificate_path) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    let certificatePath = null;
    files.forEach(file => {
        if (file.originalname === document) {
            certificatePath = file.path;
        }
    });

    connection.query(insertQuery, [s_id, date, sem, activity, status, document, certificatePath], (err, result) => {
        if (err) {
            console.error(err)
        }
    })
}

const updatecocurriactRecord = (activitys, files) => {
    const {co_id, updated, date, sem, activity, status, document} = activitys;
    if (updated) {
        const query = `UPDATE student_cocurricula_activity SET date = ?, semester = ?, activity = ?, status = ?, activity_certificate = COALESCE(?,activity_certificate), activity_certificate_path = COALESCE(?, activity_certificate_path) WHERE co_id = ?`;


        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === document) {
                certificatePath = file.path;
            }
        });
        if(certificatePath){
            const query = `SELECT activity_certificate_path FROM mentor.student_cocurricula_activity WHERE co_id = ?`

            connection.query(query, [co_id], (err, result) => {
                if (err) {
                    console.error(err)
                }
                deleteFileIfExists(result[0].activity_certificate_path);
            })
        }
        connection.query(query, [date, sem, activity, status, document, certificatePath, co_id], (err, result) => {
            if (err) {
                console.error(err)
            }
        })
    }
}
//  Function to handle insertion logic
const insertcocurriactRecords = (s_id, cocurriact, resolve, reject, files) => {
    const insertActivityQuery = `INSERT INTO mentor.student_cocurricula_activity 
        (s_id, date, semester, activity, status, activity_certificate, activity_certificate_path) 
        VALUES `;

    const valueSets = [];
    const values = [];

    cocurriact.forEach(activitys => {
        const {
            date,
            sem, // renamed to match the DB field
            activity,
            status,
            document // Document (certificate) file name from the request
        } = activitys;

        // Find the corresponding certificate file path
        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === document) {
                certificatePath = file.path;
            }
        });

        valueSets.push(`(?, ?, ?, ?, ?, ?, ?)`); // For values (s_id, date, semester, activity, status, certificate, certificatePath)
        values.push(s_id, date, sem, activity, status, document, certificatePath);
    });

    const finalQuery = insertActivityQuery + valueSets.join(', ');

    // Execute the SQL query
    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student co-curricular activity details:", err);
            return reject(err);
        }
        resolve({ message: "Student co-curricular activity details inserted successfully: " + result });
    });
};
