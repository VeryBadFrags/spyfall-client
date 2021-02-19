function Error() {
  function printError(content) {
    // let errorBox = document.getElementById("error");
    // errorBox.innerText = content;
    // errorBox.style.display = "block";
  }

  function resetErrors() {
    // let errorBox = document.getElementById("error");
    // errorBox.style.display = "none";
    // errorBox.innerHTML = "";
  }

  return (
    <div className="alert alert-danger mb-3" style={{ display: "none" }}></div>
  );
}

export default Error;
