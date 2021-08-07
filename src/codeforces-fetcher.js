const axios = require('axios');

const API_URL = 'https://codeforces.com/api';

const fetchContests = async division => {
    const response = await axios.get(`${API_URL}/contest.list`);
    if (response.data.status === 'FAILED')
        throw new Exception('There was a problem trying to fetch Codeforces contests...');

    let contests = response.data.result;
    contests = contests.filter(({ type, phase }) => {
        return (type === 'CF' || type === 'ICPC') && phase === 'FINISHED';
    });

    contests = contests.map(({ id, name }) => ({ id, name }));
    contests = contests.filter(({ name }) => (
        name.startsWith('Codeforces Round #') &&
        name.endsWith(`(Div. ${division})`)
    ));

    return contests;
};

const chooseContest = async (division, participants) => {
    // TODO: Shuffle array
    const contests = await fetchContests(division);
    for (let i = 0; i < contests.length; i++) {
        const { id } = contests[i];

        const queryParams = [
            `contestId=${id}`,
            `handles=${participants.join(';')}`,
            `showUnofficial=true`
        ];

        const url = `${API_URL}/contest.standings?${queryParams.join('&')}`;
        const response = await axios.get(url);

        if (response.data.status === 'FAILED')
            throw new Exception('There was a problem trying to fecth standings...');
            
        const participated = {};
        participants.forEach(handle => participated[handle] = false);
            
        const standings = response.data.result.rows;
        standings.forEach(({ party }) => {
            const handle = party.members[0].handle;
            participated[handle] = true;
        });
        
        let allowed = true;
        participants.forEach(handle => {
            allowed &= !participated[handle];
        });

        if (allowed) return contests[i];
    }
};

module.exports = { chooseContest };
