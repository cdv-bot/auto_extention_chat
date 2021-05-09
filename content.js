// chrome.storage.sync.set({ check: "false" }, function () {
//   console.log("ADasd");
// });
// console.log("ADasd");

const handler = {
  time(data = "test", time = 2000) {
    this.a = setInterval(() => {
      let a = $('[class="_5y14 _52cp btn btnC mfss touchable"]');
      a.removeAttr("disabled");
      $("#composerInput").val(data);
      $('[class="_5y14 _52cp btn btnC mfss touchable"]').trigger("click");
    }, time);
  },
  clear() {
    clearInterval(this.a);
    return false;
  },
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.cancel === "false") {
    let oclock = 2000;
    let value = "i love you";
    if (request.textSpam.trim() !== "") {
      value = request.textSpam;
    }
    if (request.oclock > 1000) {
      oclock = request.oclock;
    }
    handler.time(value, oclock);
  }
  if (request.cancel === "true") {
    handler.clear();
  }
  return true;
});
