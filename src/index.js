const commandLineArgs = require('command-line-args');
const { chooseContest } = require('./codeforces-fetcher');

const defaultDivision = 2;

const options = commandLineArgs([
    { name: 'division', alias: 'd', type: Number },
    { name: 'participants', alias: 'p', type: String, multiple: true }
]);

const division = options.division || defaultDivision;
const participants = options.participants || [];

const printContest = async () => {
    const { id, name } = await chooseContest(division, participants);
    console.log(`Try ${name} (https://codeforces.com/contest/${id})`);
};

printContest();
