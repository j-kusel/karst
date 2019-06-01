$(document).ready(() => {
    // add datepickers
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy'
    });

    // get categories
    $.get('/api/categories')
        .done((data) => {
            console.log(data);
            $('#CategorySup').html(
                ['<option value=""></option>', ...data.Categories.map((cat) => 
                    `<option value="${cat._id}">${cat.Name}</option>`)
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

});
