export default (data) => `
    <h3>${data.Name} - ${moment(data.Date).format('MM-DD-YYYY')}</h3>
    <p>${data.Description}</p>
`;
