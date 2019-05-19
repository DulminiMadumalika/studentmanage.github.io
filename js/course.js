//
// $(document).ready(function () {
//     $("#txtCoursID").focus();
//     Courses();
// })

// function Courses() {
//     $("#tblCourse tbody tr").remove();
//     for(var i=0;i<course.length;i++){
//         var tblcours = "<tr>"+
//             "<td>"+course[i].cid+"</td>"+
//             "<td>"+course[i].cname+"</td>"+
//             "<td>"+course[i].description+"</td>"+
//             "<td>"+course[i].duration+"</td>"+
//             "<td><i class=\"fas fa-trash\"></i></td>"+
//             "</tr>";
//         $("#tblCourse tbody").append(tblcours);
//
//         DeleteCourse();
//
//         $("#tblCourse tbody tr").click(function () {
//             var cid=$(this).find("td:first-child").text();
//             var cname=$(this).find("td:nth-child(2)").text();
//             var cdescription=$(this).find("td:nth-child(3)").text();
//             var cduration=$(this).find("td:nth-child(4)").text();
//
//             $("#txtCoursID").val(cid);
//             $("#txtCourseName").val(cname);
//             $("#txtCourseDescription").val(cdescription);
//             $("#txtCourseDuration").val(cduration);
//
//             $("#txtCoursID").attr("disabled", true);
//             $("#btnSave").text("Update");
//         });
//     }
//
// }

// function DeleteCourse() {
//     $("#tblCourse tbody i").off('click');
//     $("#tblCourse tbody i").click(function () {
//         if (confirm("Are you sure to delete this customer?")) {
//             var row = $(this).parents("tr");
//             row.fadeOut(1000, function () {
//                 row.remove();
//                 $("#txtCoursID, #txtCourseName, #txtCourseDescription, #txtCourseDuration").val("");
//             });
//         }
//     });
// }

// $("#btnsave").click(function () {
//
//     var courseid = $("#txtCoursID").val();
//     var coursename =$("#txtCourseName").val();
//     var coursedescription = $("#txtCourseDescription").val();
//     var courseduration = $("#txtCourseDuration").val();
//
//     var flag = true;
//
//     if(courseduration.trim().length==0){
//         $("#txtCourseDuration").select();
//         flag = false;
//     }
//
//     if(coursedescription.trim().length==0){
//         $("#txtCourseDescription").select();
//         flag=false;
//     }
//
//     if(coursename.trim().length==0){
//         $("#txtCourseName").select();
//         flag=false;
//     }
//
//     if(courseid.trim().length==0){
//         $("#txtCoursID").select();
//         flag=false;
//     }
//
//     if ($("#btnSave").text() !== "Update") {
//         $("#tblCourse tbody tr td:first-child").each(function () {
//             var id = $(this).text();
//             if (id === courseid) {
//                 alert("Course Id is already exists in the table");
//                 $("#txtCoursID").select();
//
//             }
//         });
//     }
//
//     if (!flag) return;
//
//     if ($("#btnSave").text() === "Update") {
//         var courses = course.find(function (courses) {
//             return courses.cid == courseid;
//         });
//
//         courses.cname = coursename;
//         courses.description = coursedescription;
//         courses.duration = courseduration;
//         $("#btnSave").text("Save");
//         $("#txtCoursID").attr("disabled",false);
//
//     } else {
//         course.push({
//             cid: courseid,
//             cname: coursename,
//             description: coursedescription,
//             duration: courseduration
//         });
//     }
//
//     Courses();
//
//     $("#txtCoursID").focus();
//     $("#txtCoursID, #txtCourseName, #txtCourseDescription, #txtCourseDuration").val("");
// });

// loadAllCourseID();
// $("#cmbCourseID").val("");
//
// function loadAllCourseID() {
//     for (var i = 0; i < course.length; i++) {
//         var cid = course[i].cid;
//         var html = '<option value="' + cid + '">' + cid + '</option>';
//         $("#cmbCourseID").append(html);
//     }
//     $("#cmbCourseID").change(function () {
//         var courseID = $(this).val();
//         for (var i = 0; i < course.length; i++) {
//             if (course[i].cid == courseID) {
//                 $("#lblCourseName").text(course[i].cname);
//                 break;
//             }
//         }
//     });
// }
//
//
//
//
//
//

$(document).ready(function () {
    for (var j=0; j<course.length; j++) {
        var courseID=course[j].cid;
        $("#cmbCourseID").append("<option>"+courseID+"</option>");

    }
});

$("#cmbCourseID").change(function () {
    var courseID=$("#cmbCourseID").val();

    for (var j=0; j<course.length; j++) {

        if (courseID==course[j].cid){
            $("#lblCourseName").text(course[j].cname);
        }

    }

    $("#txtBatchId").focus();
});

$("#btnSave").click(function () {
    var batchId=$("#txtBatchId").val();
    var batchName=$("#txtBatchName").val();
    var courseId=$("#cmbCourseID").val();
    var courseName=$("#lblCourseName").text();

    var html="<tr>" +
        "<td>"+batchId+"</td>" +
        "<td>"+batchName+"</td>" +
        "<td>"+courseId+"</td>" +
        "<td>"+courseName+"</td>" +
        "<td class='deleteIcon'><i class=\"fas fa-trash-alt\" style='font-size: 25px'></i></td>" +
        "</tr>";

    $("#tblCourse tbody").append(html);


    $("#tblCourse tbody tr:last-child td:last-child").click(function () {
            if (confirm("Are you sure whether you want to delete this record?")) {
                var row = $(this).parents("tr");
                $(this).parents("tr").fadeOut(200, function () {
                        row.remove();
                    }
                )
            }
        }
    );
});

