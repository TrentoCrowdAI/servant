const db = require(__base + "db/index");


// create
const createJob = async (job) => {
    let res = await db.query(
        `insert into ${db.TABLES.Job}(created_at, data) values($1, $2) returning *`,
        [new Date(), job.data]
    );

    return res.rows[0];
};

// get
const getJob = async (jobId) => {
    let res = await db.query(
        `select * from ${db.TABLES.Job} where id = $1`,
        [jobId]
    );

    return res.rows[0];
};

// delete

// update
const updateJob = async (job) => {
    let res = await db.query(
        `update ${db.TABLES.Job} 
            set updated_at = $1, data = $2
            where id = $3 returning *`,
        [new Date(), job.data, job.id]
    );

    return res.rows[0];
};

module.exports = {
    createJob,
    getJob,
    updateJob
};