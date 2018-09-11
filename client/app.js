$(document).ready(function () {

    let chirps = [];
    let user;
    let text;


    function handleResponse(data) {
        let entries = Object.entries(data)
        for (const [id, data] of entries) {
            chirps.push({
                "user": `${data.user}`,
                "text": `${data.text}`, 
                "id": `${id}`
            });
        }

        chirps.pop();

        chirps.map(chirp => {
            let x = $('<button>x</button>').attr('class', 'delete');
            let p = $(`<p>${chirp.user}: ${chirp.text}</p>`).attr({
                class: "chirps",
                id: `${chirp.id}`
            }).append(x);
            $('.current').append(p)
        })
    }


    $.get('http://127.0.0.1:3000/api/chirps').then(handleResponse).catch(err => console.log(err));      // or use localhost:3000


    $('#submit').click(() => {
        user = $('#user').val();
        text = $('#text').val();

        $.ajax({
            type: "POST",
            url: 'http://127.0.0.1:3000/api/chirps/',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
                "user": `${user}`,
                "text": `${text}`,
            })
        })
            .catch(err => console.log(err));
    })

    $(document).on("click", ".delete", event => {
        let chirpToDelete = $(event.target).parent()
        chirpToDelete.remove()

        $.ajax({
            type: "DELETE",
            url: `http://127.0.0.1:3000/api/chirps/${chirpToDelete.attr('id')}`
        })
            .catch(err => console.log(err))
    })
})