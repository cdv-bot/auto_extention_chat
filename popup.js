chrome.storage.sync.set({ check: "true" }, function () {
  $("#ok_btn").attr("disabled", "true");
});
document.addEventListener("DOMContentLoaded", documentEvents, false);

function myAction(input) {
  return input.value;
}
window.onload = function () {
  let a = document.getElementById("name_textbox");
  a.oninput = function () {
    chrome.storage.sync.set({ check: "false" }, function () {
      $("#ok_btn").removeAttr("disabled");
    });
  };
};
function documentEvents() {
  document.getElementById("ok_btn").addEventListener("click", function () {
    chrome.storage.sync.get("check", function (obj) {
      $("#ok_btn").attr("disabled", obj?.check || "true");
    });
    document.getElementById("demo").innerHTML = "đang chạy nè !!";
    let value = myAction(document.getElementById("name_textbox"));
    let oclock = myAction(document.getElementById("oclock"));
    chrome.storage.sync.set({ check: "true" }, function () {});

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          textSpam: value,
          oclock,
          cancel: "false",
        },
        function (response) {
          console.log(response);
        }
      );
    });
  });
  document.getElementById("cancel").addEventListener("click", function () {
    $("#ok_btn").removeAttr("disabled");
    chrome.storage.sync.set({ check: "false" }, function () {});
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          cancel: "true",
        },
        function (response) {}
      );
    });
  });
}
