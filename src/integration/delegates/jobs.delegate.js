// this modules is responsible for allowing to publish HITs in
// any of the supported platforms. Also to implement any other 
// functionality related to HITs.

const jobsDao = require(__base + 'integration/dao/jobs.dao');
const errHandler = require(__base + 'utils/errors');

const publish = async (job) => {
  //TODO
};

const createJob = async (job) => {
  if (!(job instanceof Object)) {
    throw errHandler.createBusinessError('Job not defined!');
  }
  if (!(job.data instanceof Object)) {
    throw errHandler.createBusinessError('Job data not defined!');
  }
  if (job.data.name === undefined) {
    throw errHandler.createBusinessError('Job name not defined!');
  }
  if (job.data.reward === undefined) {
    throw errHandler.createBusinessError('Job reward not defined!');
  }
  if (job.data.items_csv === undefined) {
    throw errHandler.createBusinessError('Items CSV path not defined!');
  }

  let newJob = await jobsDao.createJob(job);
  return newJob;
};

const getJob = async (jobId) => {
  if (typeof jobId != "number") {
    throw errHandler.createBusinessError('Job id is of an invalid type!');
  }

  try {
    let job = await jobsDao.getJob(jobId);
    return job;
  }
  catch (e) {
    throw errHandler.createBusinessError('Job id does not exist!');
  }
};

module.exports = {
  publish,
  createJob,
  getJob
};