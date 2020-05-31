var capture_log;

var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  // 요청에 대한 콜백
  if (xhr.readyState === xhr.DONE) {
    // 요청이 완료되면
    if (xhr.status === 200 || xhr.status === 201) {
      capture_log = JSON.parse(xhr.responseText);
      console.log(capture_log.length);
      document.write(
        '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">'
      );
      document.write(
        "<scr" +
          'ipt src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"><' +
          "/script>"
      );

      document.write('<table class="table table-striped">');
      document.write('<thead class="thead-dark">');
      document.write("<tr>");
      document.write("<th> 번호 </th>");
      document.write("<th> 카메라 </th>");
      document.write("<th> 시간 </th>");
      document.write("<th> 탐지한 수 </th>");
      document.write("<th> img </th>");
      document.write("</tr>");
      document.write("</thead>");
      document.write("<tbody>");

      for (var i = capture_log.length - 1; i >= 0; i--) {
        document.write("<tr>");
        document.write("<td>" + (i + 1) + "</td>");
        document.write("<td>" + capture_log[i].id + "</td>");
        document.write("<td>" + capture_log[i].time + "</td>");
        document.write("<td>" + capture_log[i].count + "</td>");
        //document.write('<td> <a href="http://155.230.28.207:3000/request_img?img_name='+capture_log[i].img_name+'">확인</a> </td>');
        document.write(
          '<td> <a href="http://155.230.28.207:3000/request_img?img_name=' +
            capture_log[i].img_name +
            '" onclick="window.open(this.href,"_blank","width=400,,height=400");return false">확인</a> </td>'
        );
        document.write("</tr>");
      }
      document.write("</tbody>");
      document.write("</table>");
    } else {
      console.log(xhr.responseText);
    }
  }
};
function button1_click() {
  alert("hihihihi");
  xhr.open(
    "GET",
    "http://155.230.28.207:3000/capture_log?cam_id=" + "001",
    true
  );
  xhr.send();
}
function button2_click() {
  xhr.open(
    "GET",
    "http://155.230.28.207:3000/capture_log?cam_id=" + "002",
    true
  );
  xhr.send();
}
function button3_click() {
  xhr.open(
    "GET",
    "http://155.230.28.207:3000/capture_log?cam_id=" + "003",
    true
  );
  xhr.send();
}
