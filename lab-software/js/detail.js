var mainkey;
let scanner = new Instascan.Scanner({
  video: document.getElementById("preview")
});
scanner.addListener("scan", function(content) {
  alert(content);
  mainkey = content;
  // scanner.destroy(function(status) {
  //   console.log(status);
  // });
  var docRef = db.collection("Components").doc(mainkey);

  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        list_div.innerHTML =
          "<br><h3> name : " +
          doc.data().name +
          "</h3><br><h3> Use : " +
          doc.data().use +
          "</h3><br><h3> diagram : <img src=" +
          doc.data().diagram +
          ">" +
          "</h3><br><h3> Discription : " +
          doc.data().desc +
          "</h3><br><h3> Quantity : " +
          doc.data().quantity +
          "</h3><br><h3>";
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        list_div.innerHTML = "No data found";
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
});
Instascan.Camera.getCameras()
  .then(function(cameras) {
    if (cameras.length > 0) {
      if (cameras.length == 1) {
        scanner.start(cameras[0]);
      } else {
        scanner.start(cameras[1]);
      }
    } else {
      console.error("No cameras found.");
    }
  })
  .catch(function(e) {
    console.error(e);
  });
var db = firebase.firestore();
