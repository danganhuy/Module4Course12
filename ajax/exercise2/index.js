function addNewSmartPhone() {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        //tên API
        url: "http://localhost:8080/api/smartphones",
        success: successHandler

    });
    event.preventDefault();
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",
        success: function (data) {
            let content = '    <table id="display-list"  border="1"><tr>\n' +
                '        <th>Producer</td>\n' +
                '        <th>Model</td>\n' +
                '        <th>Price</td>\n' +
                '        <th colspan="2">Action</td>\n' +
                '    </tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>"
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('display-create').style.display = "block";
            document.getElementById('title').style.display = "block";
        }
    });
}

function displayFormCreate() {
    document.getElementById("producer").value = "";
    document.getElementById("model").value = "";
    document.getElementById("price").value = "";
    document.getElementById("submit").value = "Add";
    document.getElementById("submit").onclick = addNewSmartPhone;
    document.getElementById('smartphoneList').style.display = "none";
    document.getElementById('add-smartphone').style.display = "block";
    document.getElementById('display-create').style.display = "none";
    document.getElementById('title').style.display = "none";
}

function displayFormUpdate(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones/" + id,
        success: function (data) {
            document.getElementById("producer").value = data.producer;
            document.getElementById("model").value = data.model;
            document.getElementById("price").value = data.price;
            document.getElementById("submit").value = "Update";
            document.getElementById("submit").onclick = function () {updateSmartphone(id)};
            document.getElementById('smartphoneList').style.display = "none";
            document.getElementById('add-smartphone').style.display = "block";
            document.getElementById('display-create').style.display = "none";
            document.getElementById('title').style.display = "none";
        }
    });
}

function getSmartphone(smartphone) {
    return  `<tr>` +
                `<td>${smartphone.producer}</td>` +
                `<td>${smartphone.model}</td>` +
                `<td>${smartphone.price}</td>` +
                `<td class="btn"><button class="action" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>` +
                `<td class="btn"><button class="action" onclick="displayFormUpdate(${smartphone.id})">Update</button></td>` +
            `</tr>`;
}

function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: successHandler
    });
}


function updateSmartphone(id) {
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/api/smartphones/" + id,
        success: successHandler
    });
    event.preventDefault();
}

successHandler()