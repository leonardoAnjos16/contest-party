const commandLineArgs = require('command-line-args');

const defaultDivision = 2;
const defaultParticipantsFilePath = 'participants.txt';

const options = commandLineArgs([
    { name: 'division', alias: 'd', type: Number },
    { name: 'participants', alias: 'p', type: String }
]);

const division = options.division || defaultDivision;
const participantsFilePath = options.participants || defaultParticipantsFilePath;
