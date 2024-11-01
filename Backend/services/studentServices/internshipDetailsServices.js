const { connection } = require('../../config/dbconfig');
const fs = require('fs');

exports.intdetails = (body, files) => {
    const internships = JSON.parse(body.internships);
    const getS_id = "SELECT s_id FROM login WHERE email = ?";

    return new Promise((resolve, reject) => {
        connection.query(getS_id, [body.email], (err, user) => {
            if (err) {
                console.error("Error fetching data:", err);
                return reject(err);
            }

            if (user.length === 0) {
                return reject(new Error("No user found with the provided email."));
            }

            let s_id = user[0].s_id;
            const selectInternships = "SELECT * FROM mentor.students_internships WHERE s_id = ?";

            connection.query(selectInternships, [s_id], (err, result) => {
                if (err) {
                    console.error("Error fetching internship details:", err);
                    return reject(err);
                }

                // If records exist, delete them before inserting new ones
                if (result.length > 0) {
                    if (result.length == internships.length) {
                        internships.forEach((internship) => {
                            updateIntenshipRecord(internship, files)
                        })
                        resolve({ message: "Student internship details updated successfully" });
                    } else if (result.length < internships.length) {
                        internships.forEach((internship) => {
                            if (internship.idx < result.length) {
                                updateIntenshipRecord(internship, files)
                            } else {
                                insertIntenshipRecord(s_id, internship, files)
                            }
                        })
                        resolve({ message: "Student internship details updated successfully" });
                    } else if (result.length > internships.length) {
                        // No such case handled by deleteInternshipRecord
                    }
                } else {
                    // No existing records, proceed directly to insertion
                    insertInternshipRecords(s_id, internships, resolve, reject, files);
                }
            });
        });
    });
};
exports.getInternshipRecord = (email) => {
    return new Promise(async (resolve, reject) => {
        const getS_id = "SELECT s_id FROM mentor.login WHERE email = ?";
        await connection.query(getS_id, [email], async (err, user) => {
            if (err) {
                reject(err);
            }
            let s_id = user[0].s_id;
            const query = "SELECT * FROM mentor.students_internships WHERE s_id = ?";
            await connection.query(query, [s_id], (err, int) => {
                if (err) {
                    reject(err);
                }
                resolve(int);
            })
        })
    })
}
exports.deleteInternshipRecord = (int_id) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM mentor.students_internships WHERE int_id = ?";
        connection.query(query, [int_id], (err, result) => {
            if (err) {
                reject(err);
            }
            deleteFileIfExists(result[0].internship_certificate_path).then(() => {
                const deleteQuery = "DELETE FROM mentor.students_internships WHERE int_id = ?";
                connection.query(deleteQuery, [int_id], (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    console.log(result);
                });
            }).catch((err) => {
                console.error("Error during file deletion or record deletion:", err);
            });
            resolve(result);
        });
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


const insertIntenshipRecord = (s_id, internship, files) => {
    const { companyName, jobProfile, startDate, endDate, stipendStatus, stipend, certificate } = internship;

    const insertQuery = `INSERT INTO mentor.students_internships (s_id, company_name, job_profile, start_date, end_date, stipent_status, stipent, internship_cerificate, internship_certificate_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

    let certificatePath = null;
    files.forEach(file => {
        if (file.originalname === certificate) {
            certificatePath = file.path;
        }
    });

    connection.query(insertQuery, [s_id, companyName, jobProfile, startDate, endDate, stipendStatus, stipend, certificate, certificatePath], (err, result) => {
        if (err) {
            console.error(err)
        }
    })
}

const updateIntenshipRecord = (internship, files) => {
    const { int_id, companyName, updated, jobProfile, startDate, endDate, stipendStatus, stipend, certificate } = internship;
    if (updated) {
        const query = `UPDATE students_internships SET company_name = ?, job_profile = ?, start_date = ?, end_date = ?, stipent_status = ?, stipent = ?, internship_cerificate = COALESCE(?,internship_cerificate), internship_certificate_path = COALESCE(?, internship_certificate_path) WHERE int_id = ?`;


        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === certificate) {
                certificatePath = file.path;
            }
        });
        if(certificatePath){
            const query = `SELECT internship_certificate_path FROM mentor.students_internships WHERE int_id = ?`

            connection.query(query, [int_id], (err, result) => {
                if (err) {
                    console.error(err)
                }
                deleteFileIfExists(result[0].internship_certificate_path);
            })
        }
        connection.query(query, [companyName, jobProfile, startDate, endDate, stipendStatus, stipend, certificate, certificatePath, int_id], (err, result) => {
            if (err) {
                console.error(err)
            }
        })
    }
}


// Function to handle insertion logic
const insertInternshipRecords = (s_id, internships, resolve, reject, files) => {
    const insertInternshipQuery = `INSERT INTO mentor.students_internships (s_id, company_name, job_profile, start_date, end_date, stipent_status, stipent, internship_cerificate, internship_certificate_path) VALUES `;

    const valueSets = [];
    const values = [];

    internships.forEach(internship => {
        const {
            companyName,
            jobProfile,
            startDate,
            endDate,
            stipendStatus,
            stipend,
            certificate
        } = internship;

        // Get the certificate path
        let certificatePath = null;
        files.forEach(file => {
            if (file.originalname === certificate) {
                certificatePath = file.path;
            }
        });

        valueSets.push(`(?, ?, ?, ?, ?, ?, ?, ?, ?)`);
        values.push(s_id, companyName, jobProfile, startDate, endDate, stipendStatus, stipend, certificate, certificatePath);
    });

    const finalQuery = insertInternshipQuery + valueSets.join(', ');

    connection.query(finalQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting student internship details:", err);
            return reject(err);
        }
        resolve({ message: "Student internship details inserted successfully: " + result });
    });
};
