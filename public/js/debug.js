$(document).ready(() => {
    // add datepickers
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy'
    });

    // get categories
    $.get('/api/categories')
        .done((data) => {
            console.log(data);
            var options = ['<option value=""></option>', ...data.Categories.map((cat) => 
                    `<option value="${cat._id}">${cat.Name}</option>`)
                ].join('\n');
            $('#CategorySup').html(options);
            $('#AuthorCat').html(options);
        })
        .fail((err) => console.log(err));

    $.get('/api/dates')
        .done((data) => {
            console.log(data);
            $('#AuthorDates').html(
                ['<option value=""></option>', ...data.dates.map((date) => 
                    `<option value="${date._id}">${date.Name}</option>`)
                ].join('\n'));
        })
        .fail((err) => console.log(err));

    $('#AddCategory').on('click', (e) => {
        e.preventDefault();
        var body = {};
        ['CategoryName', 'CategoryDescription', 'CategorySup']
            .forEach((input) => body[input] = $('#' + input).val());
        $.post('/api/categories', body)
            .done((res) => console.log(res))
            .fail((err) => console.error(err));
    });

    $('#AddAuthor').on('click', (e) => {
        e.preventDefault();
        var body = {};
        ['AuthorName', 'AuthorDescription', 'AuthorCat', 'AuthorDates', 'Birthdate', 'Deathdate']
            .forEach((input) => body[input] = $('#' + input).val());
        $.post('/api/authors', body)
            .done((res) => console.log(res))
            .fail((err) => console.error(err));
    });

});
