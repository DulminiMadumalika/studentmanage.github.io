$(window).on('load', function () {

    loadStudent();

    for(var i=0; i<course.length; i++){
        $('#cmbCourse').append(
            '<option>'+ course[i].cid +'</option>'
        );

        $('#cmbCourse').change(function () {
            var cid = $('#cmbCourse option:selected').text();
            findCourse(cid);
        });
    }
    findCourse($('#cmbCourse').val());

    for(var i=0; i<batch.length; i++){
        $('#cmbBatch').append(
            '<option>'+ batch[i].bid +'</option>'
        );

        $('#cmbBatch').change(function () {
            var bid = $('#cmbBatch option:selected').text();
            findBatch(bid);
        });
    }
    findBatch($('#cmbBatch').val());
    loadTable();
});

function loadStudent() {
    $('#cmbStudentid option').remove();

    for(var i=0; i<student.length; i++){
        $('#cmbStudentid').append(
            '<option>'+ student[i].sid +'</option>'
        );

        $('#cmbStudentid').change(function () {
            var sid = $('#cmbStudentid option:selected').text();
            findName(sid);
        });
    }
    findName($('#cmbStudentid').val());
}

function findName(sid){
    for(var i=0; i<student.length; i++){
        if(student[i].sid == sid){
            $('#txtstudentname').val(student[i].sname);
            return;
        }
    }
}

function findCourse(cid){
    for(var i=0; i<course.length; i++){
        if(course[i].cid == cid){
            $('#txtCourse').val(course[i].cname);
            return;
        }
    }
}

function findBatch(bid){
    for(var i=0; i<batch.length; i++){
        if(batch[i].bid == bid){
            $('#txtBatchname').val(batch[i].bname);
            return;
        }
    }
}

$('#btnRegister').click(function () {

    var bool = validation();

    if(!bool){
        alert("Tis student already register for this batch");
        return;
    }
    var stid = $('#cmbStudentid').val();
    var csid = $('#cmbCourse').val();
    var btid = $('#cmbBatch').val();

    register.push(
        {
            sid:stid,
            cid:csid,
            bid:btid
        }
    );

    loadTable();
});

function validation(){
    var studentId = $('#cmbStudentid').val();
    var batchId = $('#cmbBatch').val();

    for (var i=0; i<register.length; i++){
        if(studentId  == register[i].sid){
            if(batchId == register[i].bid){
                return false;
            }
        }
    }
    return true;
}

function loadTable(){

    $('#tblStudent tbody tr').remove();

    for(var i=0; i<register.length; i++){
        var sname = "";
        for(var j=0; j<student.length; j++){
            if(register[i].sid == student[j].sid){
                sname = student[j].sname;
            }
        }

        var cname = "";
        for(var j=0; j<course.length; j++){
            if(register[i].cid == course[j].cid){
                cname = course[j].cname;
            }
        }

        var bname = "";
        for(var j=0; j<batch.length; j++){
            if(register[i].bid == batch[j].bid){
                bname = batch[j].bname;
            }
        }

        $('#tblStudent tbody').append(
            '<tr>' +
            '<td>'+ register[i].sid+'</td>' +
            '<td>'+ sname+'</td>' +
            '<td>'+ register[i].cid+'</td>' +
            '<td>'+ cname+'</td>' +
            '<td>'+ register[i].bid+'</td>' +
            '<td>'+ bname+'</td>' +
            '<td><i class="fas fa-trash"></i></td>' +
            '</tr>'
        );
        
        $('#tblStudent tbody').children('tr').last().find('i').click(function () {
            console.log('came to delete');
            setInterval(deleteRegister($(this)),4000);
        });
    }
}

function deleteRegister(id){

    var sid = $(id.parents('tr').children('td')[0]).text();
    var cid = $(id.parents('tr').children('td')[2]).text();
    var bid = $(id.parents('tr').children('td')[4]).text();

    console.log(sid);
    console.log(cid);
    console.log(bid);

    id.parents('tr').fadeOut('slow', function () {
        $(this).parents('tr').remove();
        for(var j=0; j<register.length; j++){
            if((sid  == register[j].sid) && (cid == register[j].cid) && (bid == register[j].bid)){
                register.splice(j,1);
            }
        }
    })
}

$('#btnAddNew').click(function () {
    generateId();
});

function generateId(){
    var sid = parseInt(student[student.length-1].sid.substr(1))+1;
    var pre = "S";
    if(sid.toString().length == 1){
        pre = "S00";
    }else if(sid.toString().length == 2){
        pre = "S0";
    }
    $('#txtStudentid').val(pre+sid);
}

$('#btnSave').click(function () {

    if($('#txtStudentid').val().trim().length ==0){
        alert("Please Enter Student ID");
        $('#txtStudentid').focus();
        return;
    }

    if($('#txtAddStudent').val().trim().length ==0){
        alert("Please Enter Student Name");
        $('#txtAddStudent').focus();
        return;
    }

    if($('#txtStudentContact').val().trim().length ==0){
        alert("Please Enter Student Contact");
        $('#txtStudentContact').focus();
        return;
    }

    if($('#txtStudentContact').val().trim().length >0){
        var regEx = /^\d{10}$/;
        var bool = regEx.test($('#txtStudentContact').val());
        if(!bool){
            alert("Please Enter Valid Contact");
            $('#txtStudentContact').focus();
            return;
        }
    }

    var sid = $('#txtStudentid').val();
    var sname = $('#txtAddStudent').val();
    var scon = $('#txtStudentContact').val();

    student.push(
        {
            sid: sid,
            sname: sname,
            scontact : scon
        }
    );

    $('#txtStudentid').val("");
    $('#txtAddStudent').val("");
    $('#txtStudentContact').val("");

    loadStudent();
    $('#exampleModalCenter').attr('aria-hidden',false);

});