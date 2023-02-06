const buttons = document.querySelector(".form .buttons");
const result = document.querySelector(".form .result");
const body = document.querySelector("body");

const errorMessage = (error) => {
  result.value = "Sintax Error";
  const div = document.createElement("div");
  const p = document.createElement("p");
  p.textContent = error;

  div.classList.add("error");
  div.appendChild(p);

  body.appendChild(div);
  setTimeout(() => {
    div.remove();
    result.value = "";
  }, 5000);
};

buttons.addEventListener("click", (e) => {
  const target = e.target;

  if (result.value == "Sintax Error") return false;

  if (target.tagName == "INPUT") {
    if (target.dataset.operationEspecial) {
      const operation = target.dataset.operationEspecial;

      switch (operation) {
        case "=":
          try {
            const evalresult = eval(result.value);
            result.value = evalresult;
          } catch (error) {
            errorMessage(error);
          }
          break;
        case "Del":
          const resultvalue = result.value.substring(
            0,
            result.value.length - 1
          );
          result.value = resultvalue;
          break;
        case "AC":
          result.value = "";
          break;
      }
      return false;
    }
    if (target.dataset.operation) {
      result.value += " " + target.value + " ";
      return false;
    }
    result.value += target.value;
  }
});
