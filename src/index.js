const commandLineArgs = require('command-line-args');
const { findContest } = require('./codeforces-fetcher');

const defaultDivision = 2;

const options = commandLineArgs([
    { name: 'division', alias: 'd', type: Number },
    { name: 'participants', alias: 'p', type: String, multiple: true }
]);

const division = options.division || defaultDivision;
const participants = options.participants || [];

const printContest = async () => {
    try {
        const { id, name } = await findContest(division, participants);
        console.log(`Try ${name} (https://codeforces.com/contest/${id})`);
    } catch (e) {
        console.log(e.message);
    }
};

printContest();
